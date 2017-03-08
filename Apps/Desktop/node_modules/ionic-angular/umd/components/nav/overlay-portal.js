var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../navigation/deep-linker', '../../platform/dom-controller', '../../gestures/gesture-controller', '../../platform/keyboard', '../../navigation/nav-controller-base', '../../platform/platform', '../../transitions/transition-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var dom_controller_1 = require('../../platform/dom-controller');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var keyboard_1 = require('../../platform/keyboard');
    var nav_controller_base_1 = require('../../navigation/nav-controller-base');
    var platform_1 = require('../../platform/platform');
    var transition_controller_1 = require('../../transitions/transition-controller');
    /**
     * @private
     */
    var OverlayPortal = (function (_super) {
        __extends(OverlayPortal, _super);
        function OverlayPortal(app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, viewPort, domCtrl) {
            var _this = this;
            _super.call(this, null, app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl);
            this._isPortal = true;
            this._init = true;
            this.setViewport(viewPort);
            // on every page change make sure the portal has
            // dismissed any views that should be auto dismissed on page change
            app.viewDidLeave.subscribe(function (ev) {
                !ev.isOverlay && _this.dismissPageChangeViews();
            });
        }
        Object.defineProperty(OverlayPortal.prototype, "_overlayPortal", {
            set: function (val) {
                this._zIndexOffset = (val || 0);
            },
            enumerable: true,
            configurable: true
        });
        OverlayPortal.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[overlay-portal]',
                    },] },
        ];
        /** @nocollapse */
        OverlayPortal.ctorParameters = [
            { type: app_1.App, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return app_1.App; }),] },] },
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: core_1.ComponentFactoryResolver, },
            { type: gesture_controller_1.GestureController, },
            { type: transition_controller_1.TransitionController, },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
            { type: core_1.ViewContainerRef, },
            { type: dom_controller_1.DomController, },
        ];
        OverlayPortal.propDecorators = {
            '_overlayPortal': [{ type: core_1.Input, args: ['overlay-portal',] },],
        };
        return OverlayPortal;
    }(nav_controller_base_1.NavControllerBase));
    exports.OverlayPortal = OverlayPortal;
});
//# sourceMappingURL=overlay-portal.js.map