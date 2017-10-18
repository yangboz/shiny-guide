(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/platform-browser', '../../config/config', '../../navigation/nav-util', '../../platform/platform', '../menu/menu-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_browser_1 = require('@angular/platform-browser');
    var config_1 = require('../../config/config');
    var nav_util_1 = require('../../navigation/nav-util');
    var platform_1 = require('../../platform/platform');
    var menu_controller_1 = require('../menu/menu-controller');
    /**
     * @name App
     * @description
     * App is a utility class used in Ionic to get information about various aspects of an app
     */
    var App = (function () {
        function App(_config, _plt, _menuCtrl) {
            this._config = _config;
            this._plt = _plt;
            this._menuCtrl = _menuCtrl;
            this._disTime = 0;
            this._scrollTime = 0;
            this._title = '';
            this._titleSrv = new platform_browser_1.Title();
            this._rootNav = null;
            /**
             * Observable that emits whenever a view loads in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewDidLoad = new core_1.EventEmitter();
            /**
             * Observable that emits before any view is entered in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewWillEnter = new core_1.EventEmitter();
            /**
             * Observable that emits after any view is entered in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewDidEnter = new core_1.EventEmitter();
            /**
             * Observable that emits before any view is exited in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewWillLeave = new core_1.EventEmitter();
            /**
             * Observable that emits after any view is exited in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewDidLeave = new core_1.EventEmitter();
            /**
             * Observable that emits before any view unloads in the app.
             * @returns {Observable} Returns an observable
             */
            this.viewWillUnload = new core_1.EventEmitter();
            // listen for hardware back button events
            // register this back button action with a default priority
            _plt.registerBackButtonAction(this.goBack.bind(this));
            this._disableScrollAssist = _config.getBoolean('disableScrollAssist', false);
            (void 0) /* runInDev */;
        }
        /**
         * Sets the document title.
         * @param {string} val  Value to set the document title to.
         */
        App.prototype.setTitle = function (val) {
            if (val !== this._title) {
                this._title = val;
                this._titleSrv.setTitle(val);
            }
        };
        /**
         * @private
         */
        App.prototype.setElementClass = function (className, isAdd) {
            this._appRoot.setElementClass(className, isAdd);
        };
        /**
         * @private
         * Sets if the app is currently enabled or not, meaning if it's
         * available to accept new user commands. For example, this is set to `false`
         * while views transition, a modal slides up, an action-sheet
         * slides up, etc. After the transition completes it is set back to `true`.
         * @param {boolean} isEnabled `true` for enabled, `false` for disabled
         * @param {number} duration  When `isEnabled` is set to `false`, this argument
         * is used to set the maximum number of milliseconds that app will wait until
         * it will automatically enable the app again. It's basically a fallback incase
         * something goes wrong during a transition and the app wasn't re-enabled correctly.
         */
        App.prototype.setEnabled = function (isEnabled, duration, minDuration) {
            if (duration === void 0) { duration = 700; }
            if (minDuration === void 0) { minDuration = 0; }
            this._disTime = (isEnabled ? 0 : Date.now() + duration);
            if (this._clickBlock) {
                if (isEnabled) {
                    // disable the click block if it's enabled, or the duration is tiny
                    this._clickBlock.activate(false, CLICK_BLOCK_BUFFER_IN_MILLIS, minDuration);
                }
                else {
                    // show the click block for duration + some number
                    this._clickBlock.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS, minDuration);
                }
            }
        };
        /**
         * @private
         * Toggles whether an application can be scrolled
         * @param {boolean} disableScroll when set to `false`, the application's
         * scrolling is enabled. When set to `true`, scrolling is disabled.
         */
        App.prototype._setDisableScroll = function (disableScroll) {
            if (this._disableScrollAssist) {
                this._appRoot._disableScroll(disableScroll);
            }
        };
        /**
         * @private
         * Boolean if the app is actively enabled or not.
         * @return {boolean}
         */
        App.prototype.isEnabled = function () {
            var disTime = this._disTime;
            if (disTime === 0) {
                return true;
            }
            return (disTime < Date.now());
        };
        /**
         * @private
         */
        App.prototype.setScrolling = function () {
            this._scrollTime = Date.now() + ACTIVE_SCROLLING_TIME;
        };
        /**
         * Boolean if the app is actively scrolling or not.
         * @return {boolean} returns true or false
         */
        App.prototype.isScrolling = function () {
            var scrollTime = this._scrollTime;
            if (scrollTime === 0) {
                return false;
            }
            if (scrollTime < Date.now()) {
                this._scrollTime = 0;
                return false;
            }
            return true;
        };
        /**
         * @return {NavController} Returns the active NavController. Using this method is preferred when we need access to the top-level navigation controller while on the outside views and handlers like `registerBackButtonAction()`
         */
        App.prototype.getActiveNav = function () {
            var portal = this._appRoot._getPortal(MODAL);
            if (portal.length() > 0) {
                return findTopNav(portal);
            }
            return findTopNav(this._rootNav || null);
        };
        /**
         * @return {NavController} Returns the root NavController
         */
        App.prototype.getRootNav = function () {
            return this._rootNav;
        };
        /**
         * @private
         */
        App.prototype._setRootNav = function (nav) {
            this._rootNav = nav;
        };
        /**
         * @private
         */
        App.prototype.present = function (enteringView, opts, appPortal) {
            var portal = this._appRoot._getPortal(appPortal);
            enteringView._setNav(portal);
            opts.keyboardClose = false;
            opts.direction = nav_util_1.DIRECTION_FORWARD;
            if (!opts.animation) {
                opts.animation = enteringView.getTransitionName(nav_util_1.DIRECTION_FORWARD);
            }
            enteringView.setLeavingOpts({
                keyboardClose: false,
                direction: nav_util_1.DIRECTION_BACK,
                animation: enteringView.getTransitionName(nav_util_1.DIRECTION_BACK),
                ev: opts.ev
            });
            return portal.insertPages(-1, [enteringView], opts);
        };
        /**
         * @private
         */
        App.prototype.goBack = function () {
            if (this._menuCtrl && this._menuCtrl.isOpen()) {
                return this._menuCtrl.close();
            }
            var navPromise = this.navPop();
            if (navPromise === null) {
                // no views to go back to
                // let's exit the app
                if (this._config.getBoolean('navExitApp', true)) {
                    (void 0) /* console.debug */;
                    this._plt.exitApp();
                }
            }
            return navPromise;
        };
        /**
         * @private
         */
        App.prototype.navPop = function () {
            if (!this._rootNav || !this.isEnabled()) {
                return Promise.resolve();
            }
            // If there are any alert/actionsheet open, let's do nothing
            var portal = this._appRoot._getPortal(DEFAULT);
            if (portal.length() > 0) {
                return Promise.resolve();
            }
            // next get the active nav, check itself and climb up all
            // of its parent navs until it finds a nav that can pop
            return recursivePop(this.getActiveNav());
        };
        App.decorators = [
            { type: core_1.Injectable },
        ];
        /** @nocollapse */
        App.ctorParameters = [
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: menu_controller_1.MenuController, decorators: [{ type: core_1.Optional },] },
        ];
        return App;
    }());
    exports.App = App;
    function recursivePop(nav) {
        if (!nav) {
            return null;
        }
        if (nav_util_1.isNav(nav)) {
            var len = nav.length();
            if (len > 1 || (nav._isPortal && len > 0)) {
                // this nav controller has more than one view
                // pop the current view on this nav and we're done here
                (void 0) /* console.debug */;
                return nav.pop();
            }
        }
        // try again using the parent nav (if there is one)
        return recursivePop(nav.parent);
    }
    function findTopNav(nav) {
        var activeChildNav;
        while (nav) {
            activeChildNav = nav.getActiveChildNav();
            if (!activeChildNav) {
                break;
            }
            nav = activeChildNav;
        }
        return nav;
    }
    var DEFAULT = 0; // AppPortal.DEFAULT
    var MODAL = 1; // AppPortal.MODAL
    var ACTIVE_SCROLLING_TIME = 100;
    var CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
});
//# sourceMappingURL=app.js.map