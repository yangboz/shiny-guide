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
        define(["require", "exports", '@angular/core', '../app/app', '../../util/util', './modal-component', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var util_1 = require('../../util/util');
    var modal_component_1 = require('./modal-component');
    var view_controller_1 = require('../../navigation/view-controller');
    /**
     * @private
     */
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(app, component, data, opts) {
            if (opts === void 0) { opts = {}; }
            data = data || {};
            data.component = component;
            opts.showBackdrop = util_1.isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
            opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
            data.opts = opts;
            _super.call(this, modal_component_1.ModalCmp, data, null);
            this._app = app;
            this._enterAnimation = opts.enterAnimation;
            this._leaveAnimation = opts.leaveAnimation;
            this.isOverlay = true;
        }
        /**
         * @private
         */
        Modal.prototype.getTransitionName = function (direction) {
            var key;
            if (direction === 'back') {
                if (this._leaveAnimation) {
                    return this._leaveAnimation;
                }
                key = 'modalLeave';
            }
            else {
                if (this._enterAnimation) {
                    return this._enterAnimation;
                }
                key = 'modalEnter';
            }
            return this._nav && this._nav.config.get(key);
        };
        /**
         * Present the action sheet instance.
         *
         * @param {NavOptions} [opts={}] Nav options to go with this transition.
         * @returns {Promise} Returns a promise which is resolved when the transition has completed.
         */
        Modal.prototype.present = function (navOptions) {
            if (navOptions === void 0) { navOptions = {}; }
            navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
            return this._app.present(this, navOptions, 1 /* MODAL */);
        };
        return Modal;
    }(view_controller_1.ViewController));
    exports.Modal = Modal;
    /**
     * @name ModalController
     * @description
     * A Modal is a content pane that goes over the user's current page.
     * Usually it is used for making a choice or editing an item. A modal uses the
     * `NavController` to
     * {@link /docs/v2/api/components/nav/NavController/#present present}
     * itself in the root nav stack. It is added to the stack similar to how
     * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
     * works.
     *
     * When a modal (or any other overlay such as an alert or actionsheet) is
     * "presented" to a nav controller, the overlay is added to the app's root nav.
     * After the modal has been presented, from within the component instance The
     * modal can later be closed or "dismissed" by using the ViewController's
     * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
     * on the root nav controller. Modals are not reusable. When a modal is dismissed
     * it is destroyed.
     *
     * Data can be passed to a new modal through `Modal.create()` as the second
     * argument. The data can then be accessed from the opened page by injecting
     * `NavParams`. Note that the page, which opened as a modal, has no special
     * "modal" logic within it, but uses `NavParams` no differently than a
     * standard page.
     *
     * @usage
     * ```ts
     * import { ModalController, NavParams } from 'ionic-angular';
     *
     * @Component(...)
     * class HomePage {
     *
     *  constructor(public modalCtrl: ModalController) {
     *
     *  }
     *
     *  presentProfileModal() {
     *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
     *    profileModal.present();
     *  }
     *
     * }
     *
     * @Component(...)
     * class Profile {
     *
     *  constructor(params: NavParams) {
     *    console.log('UserId', params.get('userId'));
     *  }
     *
     * }
     * ```
     *
     * @advanced
     *
     * | Option                | Type       | Description                                                                                                      |
     * |-----------------------|------------|------------------------------------------------------------------------------------------------------------------|
     * | showBackdrop          |`boolean`   | Whether to show the backdrop. Default true.                                                                      |
     * | enableBackdropDismiss |`boolean`   | Whether the popover should be dismissed by tapping the backdrop. Default true.                                   |
     *
     * A modal can also emit data, which is useful when it is used to add or edit
     * data. For example, a profile page could slide up in a modal, and on submit,
     * the submit button could pass the updated profile data, then dismiss the
     * modal.
     *
     * ```ts
     * import { Component } from '@angular/core';
     * import { ModalController, ViewController } from 'ionic-angular';
     *
     * @Component(...)
     * class HomePage {
     *
     *  constructor(public modalCtrl: ModalController) {
     *
     *  }
     *
     *  presentContactModal() {
     *    let contactModal = this.modalCtrl.create(ContactUs);
     *    contactModal.present();
     *  }
     *
     *  presentProfileModal() {
     *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
     *    profileModal.onDidDismiss(data => {
     *      console.log(data);
     *    });
     *    profileModal.present();
     *  }
     *
     * }
     *
     * @Component(...)
     * class Profile {
     *
     *  constructor(public viewCtrl: ViewController) {
     *
     *  }
     *
     *  dismiss() {
     *    let data = { 'foo': 'bar' };
     *    this.viewCtrl.dismiss(data);
     *  }
     *
     * }
     * ```
     * @demo /docs/v2/demos/src/modal/
     * @see {@link /docs/v2/components#modals Modal Component Docs}
     */
    var ModalController = (function () {
        function ModalController(_app) {
            this._app = _app;
        }
        /**
         * Create a modal to display. See below for options.
         *
         * @param {object} component The Modal view
         * @param {object} data Any data to pass to the Modal view
         * @param {object} opts Modal options
         */
        ModalController.prototype.create = function (component, data, opts) {
            if (data === void 0) { data = {}; }
            if (opts === void 0) { opts = {}; }
            return new Modal(this._app, component, data, opts);
        };
        ModalController.decorators = [
            { type: core_1.Injectable },
        ];
        /** @nocollapse */
        ModalController.ctorParameters = [
            { type: app_1.App, },
        ];
        return ModalController;
    }());
    exports.ModalController = ModalController;
});
//# sourceMappingURL=modal.js.map