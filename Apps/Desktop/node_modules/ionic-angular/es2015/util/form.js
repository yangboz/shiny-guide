import { Injectable } from '@angular/core';
import { removeArrayItem } from './util';
/**
 * @private
 */
export class Form {
    constructor() {
        this._focused = null;
        this._ids = -1;
        this._inputs = [];
    }
    register(input) {
        this._inputs.push(input);
    }
    deregister(input) {
        removeArrayItem(this._inputs, input);
        if (input === this._focused) {
            this._focused = null;
        }
    }
    setAsFocused(input) {
        this._focused = input;
    }
    /**
     * Focuses the next input element, if it exists.
     */
    tabFocus(currentInput) {
        let index = this._inputs.indexOf(currentInput);
        if (index > -1 && (index + 1) < this._inputs.length) {
            let nextInput = this._inputs[index + 1];
            if (nextInput !== this._focused) {
                (void 0) /* console.debug */;
                return nextInput.initFocus();
            }
        }
        index = this._inputs.indexOf(this._focused);
        if (index > 0) {
            let previousInput = this._inputs[index - 1];
            if (previousInput) {
                (void 0) /* console.debug */;
                previousInput.initFocus();
            }
        }
    }
    nextId() {
        return ++this._ids;
    }
}
Form.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Form.ctorParameters = [];
/**
 * @private
 */
export class IonicTapInput {
    get checked() { }
    set checked(val) { }
    get disabled() { }
    set disabled(val) { }
}
/**
 * @private
 */
export class IonicFormInput {
}
//# sourceMappingURL=form.js.map