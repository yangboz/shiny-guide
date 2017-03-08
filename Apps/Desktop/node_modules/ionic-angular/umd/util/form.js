(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var util_1 = require('./util');
    /**
     * @private
     */
    var Form = (function () {
        function Form() {
            this._focused = null;
            this._ids = -1;
            this._inputs = [];
        }
        Form.prototype.register = function (input) {
            this._inputs.push(input);
        };
        Form.prototype.deregister = function (input) {
            util_1.removeArrayItem(this._inputs, input);
            if (input === this._focused) {
                this._focused = null;
            }
        };
        Form.prototype.setAsFocused = function (input) {
            this._focused = input;
        };
        /**
         * Focuses the next input element, if it exists.
         */
        Form.prototype.tabFocus = function (currentInput) {
            var index = this._inputs.indexOf(currentInput);
            if (index > -1 && (index + 1) < this._inputs.length) {
                var nextInput = this._inputs[index + 1];
                if (nextInput !== this._focused) {
                    (void 0) /* console.debug */;
                    return nextInput.initFocus();
                }
            }
            index = this._inputs.indexOf(this._focused);
            if (index > 0) {
                var previousInput = this._inputs[index - 1];
                if (previousInput) {
                    (void 0) /* console.debug */;
                    previousInput.initFocus();
                }
            }
        };
        Form.prototype.nextId = function () {
            return ++this._ids;
        };
        Form.decorators = [
            { type: core_1.Injectable },
        ];
        /** @nocollapse */
        Form.ctorParameters = [];
        return Form;
    }());
    exports.Form = Form;
    /**
     * @private
     */
    var IonicTapInput = (function () {
        function IonicTapInput() {
        }
        Object.defineProperty(IonicTapInput.prototype, "checked", {
            get: function () { },
            set: function (val) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonicTapInput.prototype, "disabled", {
            get: function () { },
            set: function (val) { },
            enumerable: true,
            configurable: true
        });
        return IonicTapInput;
    }());
    exports.IonicTapInput = IonicTapInput;
    /**
     * @private
     */
    var IonicFormInput = (function () {
        function IonicFormInput() {
        }
        return IonicFormInput;
    }());
    exports.IonicFormInput = IonicFormInput;
});
//# sourceMappingURL=form.js.map