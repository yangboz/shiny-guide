import { Component, ComponentFactoryResolver, ElementRef, Input, Optional, NgZone, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { Keyboard } from '../../platform/keyboard';
import { NavController } from '../../navigation/nav-controller';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { Platform } from '../../platform/platform';
import { TransitionController } from '../../transitions/transition-controller';
import { ViewController } from '../../navigation/view-controller';
/**
 * @name Nav
 * @description
 *
 * `ion-nav` is the declarative component for a [NavController](../../../navigation/NavController/).
 *
 * For more information on using nav controllers like Nav or [Tab](../../Tabs/Tab/),
 * take a look at the [NavController API Docs](../../../navigation/NavController/).
 *
 *
 * @usage
 * You must set a root page to be loaded initially by any Nav you create, using
 * the 'root' property:
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { GettingStartedPage } from './getting-started';
 *
 * @Component({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 * })
 * class MyApp {
 *   root = GettingStartedPage;
 *
 *   constructor(){
 *   }
 * }
 * ```
 *
 * @demo /docs/v2/demos/src/navigation/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 */
export class Nav extends NavControllerBase {
    constructor(viewCtrl, parent, app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl) {
        super(parent, app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl);
        this._hasInit = false;
        if (viewCtrl) {
            // an ion-nav can also act as an ion-page within a parent ion-nav
            // this would happen when an ion-nav nests a child ion-nav.
            viewCtrl._setContent(this);
        }
        if (parent) {
            // this Nav has a parent Nav
            parent.registerChildNav(this);
        }
        else if (viewCtrl && viewCtrl.getNav()) {
            // this Nav was opened from a modal
            this.parent = viewCtrl.getNav();
            this.parent.registerChildNav(this);
        }
        else if (app && !app.getRootNav()) {
            // a root nav has not been registered yet with the app
            // this is the root navcontroller for the entire app
            app._setRootNav(this);
        }
    }
    /**
     * @private
     */
    set _vp(val) {
        this.setViewport(val);
    }
    ngAfterViewInit() {
        this._hasInit = true;
        let navSegment = this._linker.initNav(this);
        if (navSegment && navSegment.component) {
            // there is a segment match in the linker
            this.setPages(this._linker.initViews(navSegment), null, null);
        }
        else if (this._root) {
            // no segment match, so use the root property
            this.push(this._root, this.rootParams, {
                isNavRoot: (this._app.getRootNav() === this)
            }, null);
        }
    }
    goToRoot(opts) {
        this.setRoot(this._root, this.rootParams, opts, null);
    }
    /**
     * @input {Page} The Page component to load as the root page within this nav.
     */
    get root() {
        return this._root;
    }
    set root(page) {
        this._root = page;
        if (this._hasInit) {
            this.setRoot(page);
        }
    }
    /**
     * @input {boolean} If true, swipe to go back is enabled.
     */
    get swipeBackEnabled() {
        return this._sbEnabled;
    }
    set swipeBackEnabled(val) {
        this._sbEnabled = isTrueProperty(val);
        this._swipeBackCheck();
    }
    /**
     * @private
     */
    destroy() {
        this.destroy();
    }
}
Nav.decorators = [
    { type: Component, args: [{
                selector: 'ion-nav',
                template: '<div #viewport nav-viewport></div>' +
                    '<div class="nav-decor"></div>',
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
Nav.ctorParameters = [
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: NavController, decorators: [{ type: Optional },] },
    { type: App, },
    { type: Config, },
    { type: Platform, },
    { type: Keyboard, },
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer, },
    { type: ComponentFactoryResolver, },
    { type: GestureController, },
    { type: TransitionController, },
    { type: DeepLinker, decorators: [{ type: Optional },] },
    { type: DomController, },
];
Nav.propDecorators = {
    '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
    'root': [{ type: Input },],
    'rootParams': [{ type: Input },],
    'swipeBackEnabled': [{ type: Input },],
};
//# sourceMappingURL=nav.js.map