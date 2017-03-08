import { EventEmitter, ReflectiveInjector } from '@angular/core';
import { convertToView, convertToViews, DIRECTION_BACK, DIRECTION_FORWARD, INIT_ZINDEX, ViewState } from './nav-util';
import { setZIndex } from './nav-util';
import { isBlank, isNumber, isPresent, removeArrayItem } from '../util/util';
import { isViewController, ViewController } from './view-controller';
import { Ion } from '../components/ion';
import { NavController } from './nav-controller';
import { NavParams } from './nav-params';
import { SwipeBackGesture } from './swipe-back';
/**
 * @private
 * This class is for internal use only. It is not exported publicly.
 */
export class NavControllerBase extends Ion {
    constructor(parent, _app, config, plt, _keyboard, elementRef, _zone, renderer, _cfr, _gestureCtrl, _trnsCtrl, _linker, _domCtrl) {
        super(config, elementRef, renderer);
        this.parent = parent;
        this._app = _app;
        this.config = config;
        this.plt = plt;
        this._keyboard = _keyboard;
        this._zone = _zone;
        this._cfr = _cfr;
        this._gestureCtrl = _gestureCtrl;
        this._trnsCtrl = _trnsCtrl;
        this._linker = _linker;
        this._domCtrl = _domCtrl;
        this._children = [];
        this._ids = -1;
        this._init = false;
        this._queue = [];
        this._trnsId = null;
        this._trnsTm = false;
        this._views = [];
        this._zIndexOffset = 0;
        this.viewDidLoad = new EventEmitter();
        this.viewWillEnter = new EventEmitter();
        this.viewDidEnter = new EventEmitter();
        this.viewWillLeave = new EventEmitter();
        this.viewDidLeave = new EventEmitter();
        this.viewWillUnload = new EventEmitter();
        this._sbEnabled = config.getBoolean('swipeBackEnabled');
        this.id = 'n' + (++ctrlIds);
    }
    push(page, params, opts, done) {
        return this._queueTrns({
            insertStart: -1,
            insertViews: [convertToView(this._linker, page, params)],
            opts: opts,
        }, done);
    }
    insert(insertIndex, page, params, opts, done) {
        return this._queueTrns({
            insertStart: insertIndex,
            insertViews: [convertToView(this._linker, page, params)],
            opts: opts,
        }, done);
    }
    insertPages(insertIndex, insertPages, opts, done) {
        return this._queueTrns({
            insertStart: insertIndex,
            insertViews: convertToViews(this._linker, insertPages),
            opts: opts,
        }, done);
    }
    pop(opts, done) {
        return this._queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, done);
    }
    popTo(indexOrViewCtrl, opts, done) {
        let config = {
            removeStart: -1,
            removeCount: -1,
            opts: opts
        };
        if (isViewController(indexOrViewCtrl)) {
            config.removeView = indexOrViewCtrl;
            config.removeStart = 1;
        }
        else if (isNumber(indexOrViewCtrl)) {
            config.removeStart = indexOrViewCtrl + 1;
        }
        return this._queueTrns(config, done);
    }
    popToRoot(opts, done) {
        return this._queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts: opts,
        }, done);
    }
    popAll() {
        let promises = [];
        for (var i = this._views.length - 1; i >= 0; i--) {
            promises.push(this.pop(null));
        }
        return Promise.all(promises);
    }
    remove(startIndex, removeCount = 1, opts, done) {
        return this._queueTrns({
            removeStart: startIndex,
            removeCount: removeCount,
            opts: opts,
        }, done);
    }
    removeView(viewController, opts, done) {
        return this._queueTrns({
            removeView: viewController,
            removeStart: 0,
            removeCount: 1,
            opts: opts,
        }, done);
    }
    setRoot(pageOrViewCtrl, params, opts, done) {
        const viewControllers = [convertToView(this._linker, pageOrViewCtrl, params)];
        return this._setPages(viewControllers, opts, done);
    }
    setPages(pages, opts, done) {
        const viewControllers = convertToViews(this._linker, pages);
        return this._setPages(viewControllers, opts, done);
    }
    _setPages(viewControllers, opts, done) {
        if (isBlank(opts)) {
            opts = {};
        }
        // if animation wasn't set to true then default it to NOT animate
        if (opts.animate !== true) {
            opts.animate = false;
        }
        return this._queueTrns({
            insertStart: 0,
            insertViews: viewControllers,
            removeStart: 0,
            removeCount: -1,
            opts: opts
        }, done);
    }
    _queueTrns(ti, done) {
        let promise;
        let resolve = done;
        let reject = done;
        if (done === undefined) {
            // only create a promise if a done callback wasn't provided
            // done can be a null, which avoids any functions
            promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
        }
        ti.resolve = (hasCompleted, isAsync, enteringName, leavingName, direction) => {
            // transition has successfully resolved
            this._trnsId = null;
            this._init = true;
            resolve && resolve(hasCompleted, isAsync, enteringName, leavingName, direction);
            // let's see if there's another to kick off
            this.setTransitioning(false);
            this._swipeBackCheck();
            this._nextTrns();
        };
        ti.reject = (rejectReason, trns) => {
            // rut row raggy, something rejected this transition
            this._trnsId = null;
            this._queue.length = 0;
            while (trns) {
                if (trns.enteringView && (trns.enteringView._state !== ViewState.LOADED)) {
                    // destroy the entering views and all of their hopes and dreams
                    this._destroyView(trns.enteringView);
                }
                if (!trns.parent) {
                    break;
                }
            }
            if (trns) {
                this._trnsCtrl.destroy(trns.trnsId);
            }
            reject && reject(false, false, rejectReason);
            // let's see if there's another to kick off
            this.setTransitioning(false);
            this._swipeBackCheck();
            this._nextTrns();
        };
        if (ti.insertViews) {
            // ensure we've got good views to insert
            ti.insertViews = ti.insertViews.filter(v => v !== null);
            if (ti.insertViews.length === 0) {
                ti.reject('invalid views to insert');
                return promise;
            }
        }
        else if (isPresent(ti.removeStart) && this._views.length === 0 && !this._isPortal) {
            ti.reject('no views in the stack to be removed');
            return promise;
        }
        this._queue.push(ti);
        // if there isn't a transition already happening
        // then this will kick off this transition
        this._nextTrns();
        // promise is undefined if a done callbacks was provided
        return promise;
    }
    _nextTrns() {
        // this is the framework's bread 'n butta function
        // only one transition is allowed at any given time
        if (this.isTransitioning()) {
            return false;
        }
        // there is no transition happening right now
        // get the next instruction
        const ti = this._nextTI();
        if (!ti) {
            return false;
        }
        // Get entering and leaving views
        const leavingView = this.getActive();
        const enteringView = this._getEnteringView(ti, leavingView);
        if (!leavingView && !enteringView) {
            ti.reject('leavingView and enteringView are null. stack is already empty');
            return false;
        }
        // set that this nav is actively transitioning
        this.setTransitioning(true);
        // Initialize enteringView
        if (enteringView && isBlank(enteringView._state)) {
            // render the entering view, and all child navs and views
            // ******** DOM WRITE ****************
            this._viewInit(enteringView);
        }
        // Only test canLeave/canEnter if there is transition
        const requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
        if (requiresTransition) {
            // views have been initialized, now let's test
            // to see if the transition is even allowed or not
            return this._viewTest(enteringView, leavingView, ti);
        }
        else {
            return this._postViewInit(enteringView, leavingView, ti);
        }
    }
    _nextTI() {
        const ti = this._queue.shift();
        if (!ti) {
            return null;
        }
        const viewsLength = this._views.length;
        if (isPresent(ti.removeView)) {
            (void 0) /* assert */;
            (void 0) /* assert */;
            var index = this._views.indexOf(ti.removeView);
            if (index >= 0) {
                ti.removeStart += index;
            }
        }
        if (isPresent(ti.removeStart)) {
            if (ti.removeStart < 0) {
                ti.removeStart = (viewsLength - 1);
            }
            if (ti.removeCount < 0) {
                ti.removeCount = (viewsLength - ti.removeStart);
            }
            ti.leavingRequiresTransition = ((ti.removeStart + ti.removeCount) === viewsLength);
        }
        if (ti.insertViews) {
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = (ti.insertStart === viewsLength);
        }
        return ti;
    }
    _getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews) {
            // grab the very last view of the views to be inserted
            // and initialize it as the new entering view
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (isPresent(removeStart)) {
            var views = this._views;
            var removeEnd = removeStart + ti.removeCount;
            var i;
            var view;
            for (i = views.length - 1; i >= 0; i--) {
                view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return null;
    }
    _postViewInit(enteringView, leavingView, ti) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        (void 0) /* assert */;
        const opts = ti.opts || {};
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        const removeCount = ti.removeCount;
        let view;
        let i;
        let destroyQueue;
        // there are views to remove
        if (isPresent(removeStart)) {
            (void 0) /* assert */;
            (void 0) /* assert */;
            destroyQueue = [];
            for (i = 0; i < removeCount; i++) {
                view = this._views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            // default the direction to "back"
            opts.direction = opts.direction || DIRECTION_BACK;
        }
        const finalBalance = this._views.length + (insertViews ? insertViews.length : 0) - (removeCount ? removeCount : 0);
        (void 0) /* assert */;
        if (finalBalance === 0 && !this._isPortal) {
            console.warn(`You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.getNativeElement());
            ti.reject('navigation stack needs at least one root page');
            return false;
        }
        // there are views to insert
        if (insertViews) {
            // manually set the new view's id if an id was passed in the options
            if (isPresent(opts.id)) {
                enteringView.id = opts.id;
            }
            // add the views to the
            for (i = 0; i < insertViews.length; i++) {
                view = insertViews[i];
                (void 0) /* assert */;
                this._insertViewAt(view, ti.insertStart + i);
            }
            if (ti.enteringRequiresTransition) {
                // default to forward if not already set
                opts.direction = opts.direction || DIRECTION_FORWARD;
            }
        }
        // if the views to be removed are in the beginning or middle
        // and there is not a view that needs to visually transition out
        // then just destroy them and don't transition anything
        // batch all of lifecycles together
        // let's make sure, callbacks are zoned
        if (destroyQueue && destroyQueue.length > 0) {
            this._zone.run(() => {
                for (i = 0; i < destroyQueue.length; i++) {
                    view = destroyQueue[i];
                    this._willLeave(view, true);
                    this._didLeave(view);
                    this._willUnload(view);
                }
            });
            // once all lifecycle events has been delivered, we can safely detroy the views
            for (i = 0; i < destroyQueue.length; i++) {
                this._destroyView(destroyQueue[i]);
            }
        }
        if (ti.enteringRequiresTransition || ti.leavingRequiresTransition && enteringView !== leavingView) {
            // set which animation it should use if it wasn't set yet
            if (!opts.animation) {
                if (isPresent(ti.removeStart)) {
                    opts.animation = (leavingView || enteringView).getTransitionName(opts.direction);
                }
                else {
                    opts.animation = (enteringView || leavingView).getTransitionName(opts.direction);
                }
            }
            // huzzah! let us transition these views
            this._transition(enteringView, leavingView, opts, ti.resolve);
        }
        else {
            // they're inserting/removing the views somewhere in the middle or
            // beginning, so visually nothing needs to animate/transition
            // resolve immediately because there's no animation that's happening
            ti.resolve(true, false);
        }
        return true;
    }
    /**
     * DOM WRITE
     */
    _viewInit(enteringView) {
        // entering view has not been initialized yet
        const componentProviders = ReflectiveInjector.resolve([
            { provide: NavController, useValue: this },
            { provide: ViewController, useValue: enteringView },
            { provide: NavParams, useValue: enteringView.getNavParams() }
        ]);
        const componentFactory = this._cfr.resolveComponentFactory(enteringView.component);
        const childInjector = ReflectiveInjector.fromResolvedProviders(componentProviders, this._viewport.parentInjector);
        // create ComponentRef and set it to the entering view
        enteringView.init(componentFactory.create(childInjector, []));
        enteringView._state = ViewState.INITIALIZED;
        this._preLoad(enteringView);
    }
    _viewAttachToDOM(view, componentRef, viewport) {
        (void 0) /* assert */;
        // fire willLoad before change detection runs
        this._willLoad(view);
        // render the component ref instance to the DOM
        // ******** DOM WRITE ****************
        viewport.insert(componentRef.hostView, viewport.length);
        view._state = ViewState.PRE_RENDERED;
        if (view._cssClass) {
            // the ElementRef of the actual ion-page created
            var pageElement = componentRef.location.nativeElement;
            // ******** DOM WRITE ****************
            this._renderer.setElementClass(pageElement, view._cssClass, true);
        }
        componentRef.changeDetectorRef.detectChanges();
        // successfully finished loading the entering view
        // fire off the "didLoad" lifecycle events
        this._zone.run(this._didLoad.bind(this, view));
    }
    _viewTest(enteringView, leavingView, ti) {
        const promises = [];
        if (leavingView) {
            var leavingTestResult = leavingView._lifecycleTest('Leave');
            if (leavingTestResult === false) {
                // synchronous reject
                ti.reject((leavingTestResult !== false ? leavingTestResult : `ionViewCanLeave rejected`));
                return false;
            }
            else if (leavingTestResult instanceof Promise) {
                // async promise
                promises.push(leavingTestResult);
            }
        }
        if (enteringView) {
            var enteringTestResult = enteringView._lifecycleTest('Enter');
            if (enteringTestResult === false) {
                // synchronous reject
                ti.reject((enteringTestResult !== false ? enteringTestResult : `ionViewCanEnter rejected`));
                return false;
            }
            else if (enteringTestResult instanceof Promise) {
                // async promise
                promises.push(enteringTestResult);
            }
        }
        if (promises.length) {
            // darn, async promises, gotta wait for them to resolve
            Promise.all(promises).then((values) => {
                if (values.some(result => result === false)) {
                    ti.reject(`ionViewCanEnter rejected`);
                }
                else {
                    this._postViewInit(enteringView, leavingView, ti);
                }
            }).catch(ti.reject);
            return true;
        }
        else {
            // synchronous and all tests passed! let's move on already
            return this._postViewInit(enteringView, leavingView, ti);
        }
    }
    _transition(enteringView, leavingView, opts, resolve) {
        // figure out if this transition is the root one or a
        // child of a parent nav that has the root transition
        this._trnsId = this._trnsCtrl.getRootTrnsId(this);
        if (this._trnsId === null) {
            // this is the root transition, meaning all child navs and their views
            // should be added as a child transition to this one
            this._trnsId = this._trnsCtrl.nextId();
        }
        // create the transition options
        const animationOpts = {
            animation: opts.animation,
            direction: opts.direction,
            duration: (opts.animate === false ? 0 : opts.duration),
            easing: opts.easing,
            isRTL: this._config.plt.isRTL(),
            ev: opts.ev,
        };
        // create the transition animation from the TransitionController
        // this will either create the root transition, or add it as a child transition
        const transition = this._trnsCtrl.get(this._trnsId, enteringView, leavingView, animationOpts);
        // ensure any swipeback transitions are cleared out
        this._sbTrns && this._sbTrns.destroy();
        this._sbTrns = null;
        // swipe to go back root transition
        if (transition.isRoot() && opts.progressAnimation) {
            this._sbTrns = transition;
        }
        // transition start has to be registered before attaching the view to the DOM!
        transition.registerStart(() => {
            this._trnsStart(transition, enteringView, leavingView, opts, resolve);
            if (transition.parent) {
                transition.parent.start();
            }
        });
        if (enteringView && enteringView._state === ViewState.INITIALIZED) {
            // render the entering component in the DOM
            // this would also render new child navs/views
            // which may have their very own async canEnter/Leave tests
            // ******** DOM WRITE ****************
            this._viewAttachToDOM(enteringView, enteringView._cmp, this._viewport);
        }
        else {
            (void 0) /* console.debug */;
        }
        if (!transition.hasChildren) {
            // lowest level transition, so kick it off and let it bubble up to start all of them
            transition.start();
        }
    }
    _trnsStart(transition, enteringView, leavingView, opts, resolve) {
        (void 0) /* assert */;
        this._trnsId = null;
        // set the correct zIndex for the entering and leaving views
        // ******** DOM WRITE ****************
        setZIndex(this, enteringView, leavingView, opts.direction, this._renderer);
        // always ensure the entering view is viewable
        // ******** DOM WRITE ****************
        enteringView && enteringView._domShow(true, this._renderer);
        // always ensure the leaving view is viewable
        // ******** DOM WRITE ****************
        leavingView && leavingView._domShow(true, this._renderer);
        // initialize the transition
        transition.init();
        // we should animate (duration > 0) if the pushed page is not the first one (startup)
        // or if it is a portal (modal, actionsheet, etc.)
        const isFirstPage = !this._init && this._views.length === 1;
        const shouldNotAnimate = isFirstPage && !this._isPortal;
        const canNotAnimate = this._config.get('animate') === false;
        if (shouldNotAnimate || canNotAnimate) {
            opts.animate = false;
        }
        if (opts.animate === false) {
            // if it was somehow set to not animation, then make the duration zero
            transition.duration(0);
        }
        // create a callback that needs to run within zone
        // that will fire off the willEnter/Leave lifecycle events at the right time
        transition.beforeAddRead(this._viewsWillLifecycles.bind(this, enteringView, leavingView));
        // create a callback for when the animation is done
        transition.onFinish(() => {
            // transition animation has ended
            this._zone.run(this._trnsFinish.bind(this, transition, opts, resolve));
        });
        // get the set duration of this transition
        const duration = transition.getDuration();
        if (transition.isRoot()) {
            // this is the top most, or only active transition, so disable the app
            // add XXms to the duration the app is disabled when the keyboard is open
            if (duration > DISABLE_APP_MINIMUM_DURATION && opts.disableApp !== false) {
                // if this transition has a duration and this is the root transition
                // then set that the app is actively disabled
                this._app.setEnabled(false, duration + ACTIVE_TRANSITION_OFFSET, opts.minClickBlockDuration);
            }
            else {
                (void 0) /* console.debug */;
            }
            // cool, let's do this, start the transition
            if (opts.progressAnimation) {
                // this is a swipe to go back, just get the transition progress ready
                // kick off the swipe animation start
                transition.progressStart();
            }
            else {
                // only the top level transition should actually start "play"
                // kick it off and let it play through
                // ******** DOM WRITE ****************
                transition.play();
            }
        }
    }
    _viewsWillLifecycles(enteringView, leavingView) {
        if (enteringView || leavingView) {
            this._zone.run(() => {
                // Here, the order is important. WillLeave must be called before WillEnter.
                leavingView && this._willLeave(leavingView, !enteringView);
                enteringView && this._willEnter(enteringView);
            });
        }
    }
    _trnsFinish(transition, opts, resolve) {
        const hasCompleted = transition.hasCompleted;
        const enteringView = transition.enteringView;
        const leavingView = transition.leavingView;
        // mainly for testing
        let enteringName;
        let leavingName;
        if (hasCompleted) {
            // transition has completed (went from 0 to 1)
            if (enteringView) {
                enteringName = enteringView.name;
                this._didEnter(enteringView);
            }
            if (leavingView) {
                leavingName = leavingView.name;
                this._didLeave(leavingView);
            }
            this._cleanup(enteringView);
        }
        else {
            // If transition does not complete, we have to cleanup anyway, because
            // previous pages in the stack are not hidden probably.
            this._cleanup(leavingView);
        }
        if (transition.isRoot()) {
            // this is the root transition
            // it's save to destroy this transition
            this._trnsCtrl.destroy(transition.trnsId);
            // it's safe to enable the app again
            this._app.setEnabled(true);
            if (opts.updateUrl !== false) {
                // notify deep linker of the nav change
                // if a direction was provided and should update url
                this._linker.navChange(opts.direction);
            }
            if (opts.keyboardClose !== false) {
                // the keyboard is still open!
                // no problem, let's just close for them
                this._keyboard.close();
            }
        }
        // congrats, we did it!
        resolve(hasCompleted, true, enteringName, leavingName, opts.direction);
    }
    _insertViewAt(view, index) {
        const existingIndex = this._views.indexOf(view);
        if (existingIndex > -1) {
            // this view is already in the stack!!
            // move it to its new location
            this._views.splice(index, 0, this._views.splice(existingIndex, 1)[0]);
        }
        else {
            // this is a new view to add to the stack
            // create the new entering view
            view._setNav(this);
            // give this inserted view an ID
            this._ids++;
            if (!view.id) {
                view.id = `${this.id}-${this._ids}`;
            }
            // insert the entering view into the correct index in the stack
            this._views.splice(index, 0, view);
        }
    }
    _removeView(view) {
        const views = this._views;
        const index = views.indexOf(view);
        (void 0) /* assert */;
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    _destroyView(view) {
        view._destroy(this._renderer);
        this._removeView(view);
    }
    /**
     * DOM WRITE
     */
    _cleanup(activeView) {
        // ok, cleanup time!! Destroy all of the views that are
        // INACTIVE and come after the active view
        const activeViewIndex = this.indexOf(activeView);
        const views = this._views;
        let reorderZIndexes = false;
        let view;
        let i;
        for (i = views.length - 1; i >= 0; i--) {
            view = views[i];
            if (i > activeViewIndex) {
                // this view comes after the active view
                // let's unload it
                this._willUnload(view);
                this._destroyView(view);
            }
            else if (i < activeViewIndex && !this._isPortal) {
                // this view comes before the active view
                // and it is not a portal then ensure it is hidden
                view._domShow(false, this._renderer);
            }
            if (view._zIndex <= 0) {
                reorderZIndexes = true;
            }
        }
        if (!this._isPortal && reorderZIndexes) {
            for (i = 0; i < views.length; i++) {
                view = views[i];
                // ******** DOM WRITE ****************
                view._setZIndex(view._zIndex + INIT_ZINDEX + 1, this._renderer);
            }
        }
    }
    _preLoad(view) {
        (void 0) /* assert */;
        view._preLoad();
    }
    _willLoad(view) {
        (void 0) /* assert */;
        view._willLoad();
    }
    _didLoad(view) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._didLoad();
        this.viewDidLoad.emit(view);
        this._app.viewDidLoad.emit(view);
    }
    _willEnter(view) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._willEnter();
        this.viewWillEnter.emit(view);
        this._app.viewWillEnter.emit(view);
    }
    _didEnter(view) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._didEnter();
        this.viewDidEnter.emit(view);
        this._app.viewDidEnter.emit(view);
    }
    _willLeave(view, willUnload) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._willLeave(willUnload);
        this.viewWillLeave.emit(view);
        this._app.viewWillLeave.emit(view);
    }
    _didLeave(view) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._didLeave();
        this.viewDidLeave.emit(view);
        this._app.viewDidLeave.emit(view);
    }
    _willUnload(view) {
        (void 0) /* assert */;
        (void 0) /* assert */;
        view._willUnload();
        this.viewWillUnload.emit(view);
        this._app.viewWillUnload.emit(view);
    }
    getActiveChildNav() {
        return this._children[this._children.length - 1];
    }
    registerChildNav(nav) {
        this._children.push(nav);
    }
    unregisterChildNav(nav) {
        removeArrayItem(this._children, nav);
    }
    destroy() {
        const views = this._views;
        let view;
        for (var i = 0; i < views.length; i++) {
            view = views[i];
            view._willUnload();
            view._destroy(this._renderer);
        }
        // purge stack
        this._views.length = 0;
        // release swipe back gesture and transition
        this._sbGesture && this._sbGesture.destroy();
        this._sbTrns && this._sbTrns.destroy();
        this._sbGesture = this._sbTrns = null;
        // Unregister navcontroller
        if (this.parent && this.parent.unregisterChildNav) {
            this.parent.unregisterChildNav(this);
        }
    }
    swipeBackStart() {
        if (this.isTransitioning() || this._queue.length > 0) {
            return;
        }
        // default the direction to "back";
        const opts = {
            direction: DIRECTION_BACK,
            progressAnimation: true
        };
        this._queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, null);
    }
    swipeBackProgress(stepValue) {
        if (this._sbTrns && this._sbGesture) {
            // continue to disable the app while actively dragging
            this._app.setEnabled(false, ACTIVE_TRANSITION_DEFAULT);
            this.setTransitioning(true);
            // set the transition animation's progress
            this._sbTrns.progressStep(stepValue);
        }
    }
    swipeBackEnd(shouldComplete, currentStepValue, velocity) {
        if (this._sbTrns && this._sbGesture) {
            // the swipe back gesture has ended
            var dur = this._sbTrns.getDuration() / (Math.abs(velocity) + 1);
            this._sbTrns.progressEnd(shouldComplete, currentStepValue, dur);
        }
    }
    _swipeBackCheck() {
        if (this.canSwipeBack()) {
            if (!this._sbGesture) {
                this._sbGesture = new SwipeBackGesture(this.plt, this, this._gestureCtrl, this._domCtrl);
            }
            this._sbGesture.listen();
        }
        else if (this._sbGesture) {
            this._sbGesture.unlisten();
        }
    }
    canSwipeBack() {
        return (this._sbEnabled &&
            !this._isPortal &&
            this._children.length <= 1 &&
            !this.isTransitioning() &&
            this._app.isEnabled() &&
            this.canGoBack());
    }
    canGoBack() {
        const activeView = this.getActive();
        return !!(activeView && activeView.enableBack());
    }
    isTransitioning() {
        return this._trnsTm;
    }
    setTransitioning(isTransitioning) {
        this._trnsTm = isTransitioning;
    }
    getActive() {
        return this._views[this._views.length - 1];
    }
    isActive(view) {
        return (view === this.getActive());
    }
    getByIndex(index) {
        return this._views[index];
    }
    getPrevious(view) {
        // returns the view controller which is before the given view controller.
        if (!view) {
            view = this.getActive();
        }
        return this._views[this.indexOf(view) - 1];
    }
    first() {
        // returns the first view controller in this nav controller's stack.
        return this._views[0];
    }
    last() {
        // returns the last page in this nav controller's stack.
        return this._views[this._views.length - 1];
    }
    indexOf(view) {
        // returns the index number of the given view controller.
        return this._views.indexOf(view);
    }
    length() {
        return this._views.length;
    }
    /**
     * Return the stack of views in this NavController.
     */
    getViews() {
        return this._views;
    }
    isSwipeBackEnabled() {
        return this._sbEnabled;
    }
    dismissPageChangeViews() {
        for (let view of this._views) {
            if (view.data && view.data.dismissOnPageChange) {
                view.dismiss();
            }
        }
    }
    setViewport(val) {
        this._viewport = val;
    }
}
let ctrlIds = -1;
const DISABLE_APP_MINIMUM_DURATION = 64;
const ACTIVE_TRANSITION_DEFAULT = 5000;
const ACTIVE_TRANSITION_OFFSET = 2000;
//# sourceMappingURL=nav-controller-base.js.map