import { EventEmitter, Output } from '@angular/core';
import { isPresent } from '../util/util';
import { NavParams } from './nav-params';
/**
 * @name ViewController
 * @description
 * Access various features and information about the current view.
 * @usage
 *  ```ts
 * import { Component } from '@angular/core';
 * import { ViewController } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyPage{
 *
 *   constructor(public viewCtrl: ViewController) {}
 *
 * }
 * ```
 */
export class ViewController {
    constructor(component, data, rootCssClass = DEFAULT_CSS_CLASS) {
        this.component = component;
        this._isHidden = false;
        /**
         * Observable to be subscribed to when the current component will become active
         * @returns {Observable} Returns an observable
         */
        this.willEnter = new EventEmitter();
        /**
         * Observable to be subscribed to when the current component has become active
         * @returns {Observable} Returns an observable
         */
        this.didEnter = new EventEmitter();
        /**
         * Observable to be subscribed to when the current component will no longer be active
         * @returns {Observable} Returns an observable
         */
        this.willLeave = new EventEmitter();
        /**
         * Observable to be subscribed to when the current component is no long active
         * @returns {Observable} Returns an observable
         */
        this.didLeave = new EventEmitter();
        /**
         * Observable to be subscribed to when the current component has been destroyed
         * @returns {Observable} Returns an observable
         */
        this.willUnload = new EventEmitter();
        /**
         * @private
         */
        this.readReady = new EventEmitter();
        /**
         * @private
         */
        this.writeReady = new EventEmitter();
        /** @private */
        this.isOverlay = false;
        /** @private */
        this._emitter = new EventEmitter();
        // passed in data could be NavParams, but all we care about is its data object
        this.data = (data instanceof NavParams ? data.data : (isPresent(data) ? data : {}));
        this._cssClass = rootCssClass;
    }
    /**
     * @private
     */
    init(componentRef) {
        this._cmp = componentRef;
        this.instance = this.instance || componentRef.instance;
        this._detached = false;
    }
    _setNav(navCtrl) {
        this._nav = navCtrl;
    }
    _setInstance(instance) {
        this.instance = instance;
    }
    /**
     * @private
     */
    subscribe(generatorOrNext) {
        return this._emitter.subscribe(generatorOrNext);
    }
    /**
     * @private
     */
    emit(data) {
        this._emitter.emit(data);
    }
    /**
     * Called when the current viewController has be successfully dismissed
     */
    onDidDismiss(callback) {
        this._onDidDismiss = callback;
    }
    /**
     * Called when the current viewController will be dismissed
     */
    onWillDismiss(callback) {
        this._onWillDismiss = callback;
    }
    /**
     * Dismiss the current viewController
     * @param {any} [data] Data that you want to return when the viewController is dismissed.
     * @param {any} [role ]
     * @param {NavOptions} NavOptions Options for the dismiss navigation.
     * @returns {any} data Returns the data passed in, if any.
     */
    dismiss(data, role, navOptions = {}) {
        if (!this._nav) {
            return Promise.resolve(false);
        }
        if (this.isOverlay && !navOptions.minClickBlockDuration) {
            // This is a Modal being dismissed so we need
            // to add the minClickBlockDuration option
            // for UIWebView
            navOptions.minClickBlockDuration = 400;
        }
        this._dismissData = data;
        this._dismissRole = role;
        const options = Object.assign({}, this._leavingOpts, navOptions);
        return this._nav.removeView(this, options).then(() => data);
    }
    /**
     * @private
     */
    getNav() {
        return this._nav;
    }
    /**
     * @private
     */
    getTransitionName(direction) {
        return this._nav && this._nav.config.get('pageTransition');
    }
    /**
     * @private
     */
    getNavParams() {
        return new NavParams(this.data);
    }
    /**
     * @private
     */
    setLeavingOpts(opts) {
        this._leavingOpts = opts;
    }
    /**
     * Check to see if you can go back in the navigation stack.
     * @returns {boolean} Returns if it's possible to go back from this Page.
     */
    enableBack() {
        // update if it's possible to go back from this nav item
        if (!this._nav) {
            return false;
        }
        // the previous view may exist, but if it's about to be destroyed
        // it shouldn't be able to go back to
        const previousItem = this._nav.getPrevious(this);
        return !!(previousItem);
    }
    /**
     * @private
     */
    get name() {
        return this.component ? this.component.name : '';
    }
    /**
     * Get the index of the current component in the current navigation stack.
     * @returns {number} Returns the index of this page within its `NavController`.
     */
    get index() {
        return (this._nav ? this._nav.indexOf(this) : -1);
    }
    /**
     * @returns {boolean} Returns if this Page is the first in the stack of pages within its NavController.
     */
    isFirst() {
        return (this._nav ? this._nav.first() === this : false);
    }
    /**
     * @returns {boolean} Returns if this Page is the last in the stack of pages within its NavController.
     */
    isLast() {
        return (this._nav ? this._nav.last() === this : false);
    }
    /**
     * @private
     * DOM WRITE
     */
    _domShow(shouldShow, renderer) {
        // using hidden element attribute to display:none and not render views
        // _hidden value of '' means the hidden attribute will be added
        // _hidden value of null means the hidden attribute will be removed
        // doing checks to make sure we only update the DOM when actually needed
        if (this._cmp) {
            // if it should render, then the hidden attribute should not be on the element
            if (shouldShow === this._isHidden) {
                this._isHidden = !shouldShow;
                let value = (shouldShow ? null : '');
                // ******** DOM WRITE ****************
                renderer.setElementAttribute(this.pageRef().nativeElement, 'hidden', value);
            }
        }
    }
    /**
     * @private
     */
    getZIndex() {
        return this._zIndex;
    }
    /**
     * @private
     * DOM WRITE
     */
    _setZIndex(zIndex, renderer) {
        if (zIndex !== this._zIndex) {
            this._zIndex = zIndex;
            const pageRef = this.pageRef();
            if (pageRef) {
                // ******** DOM WRITE ****************
                renderer.setElementStyle(pageRef.nativeElement, 'z-index', zIndex);
            }
        }
    }
    /**
     * @returns {ElementRef} Returns the Page's ElementRef.
     */
    pageRef() {
        return this._cmp && this._cmp.location;
    }
    _setContent(directive) {
        this._cntDir = directive;
    }
    /**
     * @returns {component} Returns the Page's Content component reference.
     */
    getContent() {
        return this._cntDir;
    }
    _setContentRef(elementRef) {
        this._cntRef = elementRef;
    }
    /**
     * @returns {ElementRef} Returns the Content's ElementRef.
     */
    contentRef() {
        return this._cntRef;
    }
    _setIONContent(content) {
        this._setContent(content);
        this._ionCntDir = content;
    }
    /**
     * @private
     */
    getIONContent() {
        return this._ionCntDir;
    }
    _setIONContentRef(elementRef) {
        this._setContentRef(elementRef);
        this._ionCntRef = elementRef;
    }
    /**
     * @private
     */
    getIONContentRef() {
        return this._ionCntRef;
    }
    _setHeader(directive) {
        this._hdrDir = directive;
    }
    /**
     * @private
     */
    getHeader() {
        return this._hdrDir;
    }
    _setFooter(directive) {
        this._ftrDir = directive;
    }
    /**
     * @private
     */
    getFooter() {
        return this._ftrDir;
    }
    _setNavbar(directive) {
        this._nb = directive;
    }
    /**
     * @private
     */
    getNavbar() {
        return this._nb;
    }
    /**
     * Find out if the current component has a NavBar or not. Be sure
     * to wrap this in an `ionViewWillEnter` method in order to make sure
     * the view has rendered fully.
     * @returns {boolean} Returns a boolean if this Page has a navbar or not.
     */
    hasNavbar() {
        return !!this._nb;
    }
    /**
     * Change the title of the back-button. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {string} backButtonText Set the back button text.
     */
    setBackButtonText(val) {
        this._nb && this._nb.setBackButtonText(val);
    }
    /**
     * Set if the back button for the current view is visible or not. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {boolean} Set if this Page's back button should show or not.
     */
    showBackButton(shouldShow) {
        if (this._nb) {
            this._nb.hideBackButton = !shouldShow;
        }
    }
    _preLoad() {
        this._lifecycle('PreLoad');
    }
    /**
     * @private
     * The view has loaded. This event only happens once per view will be created.
     * This event is fired before the component and his children have been initialized.
     */
    _willLoad() {
        this._lifecycle('WillLoad');
    }
    /**
     * @private
     * The view has loaded. This event only happens once per view being
     * created. If a view leaves but is cached, then this will not
     * fire again on a subsequent viewing. This method is a good place
     * to put your setup code for the view; however, it is not the
     * recommended method to use when a view becomes active.
     */
    _didLoad() {
        this._lifecycle('DidLoad');
    }
    /**
     * @private
     * The view is about to enter and become the active view.
     */
    _willEnter() {
        if (this._detached && this._cmp) {
            // ensure this has been re-attached to the change detector
            this._cmp.changeDetectorRef.reattach();
            this._detached = false;
        }
        this.willEnter.emit(null);
        this._lifecycle('WillEnter');
    }
    /**
     * @private
     * The view has fully entered and is now the active view. This
     * will fire, whether it was the first load or loaded from the cache.
     */
    _didEnter() {
        this._nb && this._nb.didEnter();
        this.didEnter.emit(null);
        this._lifecycle('DidEnter');
    }
    /**
     * @private
     * The view is about to leave and no longer be the active view.
     */
    _willLeave(willUnload) {
        this.willLeave.emit(null);
        this._lifecycle('WillLeave');
        if (willUnload && this._onWillDismiss) {
            this._onWillDismiss(this._dismissData, this._dismissRole);
            this._onWillDismiss = null;
        }
    }
    /**
     * @private
     * The view has finished leaving and is no longer the active view. This
     * will fire, whether it is cached or unloaded.
     */
    _didLeave() {
        this.didLeave.emit(null);
        this._lifecycle('DidLeave');
        // when this is not the active page
        // we no longer need to detect changes
        if (!this._detached && this._cmp) {
            this._cmp.changeDetectorRef.detach();
            this._detached = true;
        }
    }
    /**
     * @private
     */
    _willUnload() {
        this.willUnload.emit(null);
        this._lifecycle('WillUnload');
        this._onDidDismiss && this._onDidDismiss(this._dismissData, this._dismissRole);
        this._onDidDismiss = null;
        this._dismissData = null;
        this._dismissRole = null;
    }
    /**
     * @private
     * DOM WRITE
     */
    _destroy(renderer) {
        if (this._cmp) {
            if (renderer) {
                // ensure the element is cleaned up for when the view pool reuses this element
                // ******** DOM WRITE ****************
                var cmpEle = this._cmp.location.nativeElement;
                renderer.setElementAttribute(cmpEle, 'class', null);
                renderer.setElementAttribute(cmpEle, 'style', null);
            }
            // completely destroy this component. boom.
            this._cmp.destroy();
        }
        this._nav = this._cmp = this.instance = this._cntDir = this._cntRef = this._hdrDir = this._ftrDir = this._nb = this._onDidDismiss = this._onWillDismiss = null;
    }
    /**
     * @private
     */
    _lifecycleTest(lifecycle) {
        const instance = this.instance;
        const methodName = 'ionViewCan' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                let result = instance[methodName]();
                if (result === false) {
                    return false;
                }
                else if (result instanceof Promise) {
                    return result;
                }
                else {
                    return true;
                }
            }
            catch (e) {
                console.error(`${this.name} ${methodName} error: ${e.message}`);
                return false;
            }
        }
        return true;
    }
    _lifecycle(lifecycle) {
        const instance = this.instance;
        const methodName = 'ionView' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                instance[methodName]();
            }
            catch (e) {
                console.error(`${this.name} ${methodName} error: ${e.message}`);
            }
        }
    }
}
ViewController.propDecorators = {
    '_emitter': [{ type: Output },],
};
export function isViewController(viewCtrl) {
    return !!(viewCtrl && viewCtrl._didLoad && viewCtrl._willUnload);
}
const DEFAULT_CSS_CLASS = 'ion-page';
//# sourceMappingURL=view-controller.js.map