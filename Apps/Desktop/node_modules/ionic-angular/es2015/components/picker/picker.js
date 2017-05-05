import { EventEmitter, Injectable, Output } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PickerCmp } from './picker-component';
import { ViewController } from '../../navigation/view-controller';
/**
 * @private
 */
export class Picker extends ViewController {
    constructor(app, opts = {}) {
        opts.columns = opts.columns || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        super(PickerCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
        this.ionChange = new EventEmitter();
    }
    /**
    * @private
    */
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'pickerLeave' : 'pickerEnter');
        return this._nav && this._nav.config.get(key);
    }
    /**
     * @param {any} button Picker toolbar button
     */
    addButton(button) {
        this.data.buttons.push(button);
    }
    /**
     * @param {any} button Picker toolbar button
     */
    addColumn(column) {
        this.data.columns.push(column);
    }
    getColumns() {
        return this.data.columns;
    }
    refresh() {
        this._cmp && this._cmp.instance.refresh && this._cmp.instance.refresh();
    }
    /**
     * @param {string} cssClass CSS class name to add to the picker's outer wrapper.
     */
    setCssClass(cssClass) {
        this.data.cssClass = cssClass;
    }
    /**
     * Present the picker instance.
     *
     * @param {NavOptions} [opts={}] Nav options to go with this transition.
     * @returns {Promise} Returns a promise which is resolved when the transition has completed.
     */
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
Picker.propDecorators = {
    'ionChange': [{ type: Output },],
};
/**
 * @private
 * @name PickerController
 * @description
 *
 */
export class PickerController {
    constructor(_app) {
        this._app = _app;
    }
    /**
     * Open a picker.
     */
    create(opts = {}) {
        return new Picker(this._app, opts);
    }
}
PickerController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PickerController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=picker.js.map