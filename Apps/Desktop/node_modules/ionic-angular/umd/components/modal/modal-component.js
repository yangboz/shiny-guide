(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../platform/key', '../../navigation/nav-params', '../../navigation/view-controller', '../../gestures/gesture-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var key_1 = require('../../platform/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    /**
     * @private
     */
    var ModalCmp = (function () {
        function ModalCmp(_cfr, _renderer, _navParams, _viewCtrl, gestureCtrl) {
            this._cfr = _cfr;
            this._renderer = _renderer;
            this._navParams = _navParams;
            this._viewCtrl = _viewCtrl;
            var opts = _navParams.get('opts');
            (void 0) /* assert */;
            this._gestureBlocker = gestureCtrl.createBlocker({
                disable: [gesture_controller_1.GESTURE_MENU_SWIPE, gesture_controller_1.GESTURE_GO_BACK_SWIPE]
            });
            this._bdDismiss = opts.enableBackdropDismiss;
        }
        ModalCmp.prototype.ionViewPreLoad = function () {
            this._load(this._navParams.data.component);
        };
        /** @private */
        ModalCmp.prototype._load = function (component) {
            if (component) {
                var componentFactory = this._cfr.resolveComponentFactory(component);
                // ******** DOM WRITE ****************
                var componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
                this._viewCtrl._setInstance(componentRef.instance);
                this._setCssClass(componentRef, 'ion-page');
                this._setCssClass(componentRef, 'show-page');
                this._enabled = true;
                this._viewCtrl.willEnter.subscribe(this._viewWillEnter.bind(this));
                this._viewCtrl.didLeave.subscribe(this._viewDidLeave.bind(this));
            }
        };
        ModalCmp.prototype._viewWillEnter = function () {
            this._gestureBlocker.block();
        };
        ModalCmp.prototype._viewDidLeave = function () {
            this._gestureBlocker.unblock();
        };
        /** @private */
        ModalCmp.prototype._setCssClass = function (componentRef, className) {
            this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
        };
        ModalCmp.prototype._bdClick = function () {
            if (this._enabled && this._bdDismiss) {
                var opts = {
                    minClickBlockDuration: 400
                };
                return this._viewCtrl.dismiss(null, 'backdrop', opts).catch(function () {
                    (void 0) /* console.debug */;
                });
            }
        };
        ModalCmp.prototype._keyUp = function (ev) {
            if (this._enabled && this._viewCtrl.isLast() && ev.keyCode === key_1.Key.ESCAPE) {
                this._bdClick();
            }
        };
        ModalCmp.prototype.ngOnDestroy = function () {
            (void 0) /* assert */;
            this._gestureBlocker.destroy();
        };
        ModalCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-modal',
                        template: '<ion-backdrop (click)="_bdClick()" [class.backdrop-no-tappable]="!_bdDismiss"></ion-backdrop>' +
                            '<div class="modal-wrapper">' +
                            '<div #viewport nav-viewport></div>' +
                            '</div>'
                    },] },
        ];
        /** @nocollapse */
        ModalCmp.ctorParameters = [
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.Renderer, },
            { type: nav_params_1.NavParams, },
            { type: view_controller_1.ViewController, },
            { type: gesture_controller_1.GestureController, },
        ];
        ModalCmp.propDecorators = {
            '_viewport': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
            '_keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return ModalCmp;
    }());
    exports.ModalCmp = ModalCmp;
});
//# sourceMappingURL=modal-component.js.map