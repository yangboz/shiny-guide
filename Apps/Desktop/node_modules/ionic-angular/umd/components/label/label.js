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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    /**
     * @name Label
     * @description
     * Labels are placed inside of an `ion-item` element and can be used
     * to describe an `ion-input`, `ion-toggle`, `ion-checkbox`, and more.
     *
     * @property [fixed] - A persistent label that sits next the input.
     * @property [floating] - A label that will float above the input if the input is empty or loses focus.
     * @property [stacked] - A stacked label will always appear on top of the input.
    
     *
     * @usage
     * ```html
     *  <ion-item>
     *    <ion-label>Username</ion-label>
     *    <ion-input></ion-input>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label fixed>Website</ion-label>
     *    <ion-input type="url"></ion-input>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label floating>Email</ion-label>
     *    <ion-input type="email"></ion-input>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label stacked>Phone</ion-label>
     *    <ion-input type="tel"></ion-input>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label>Toggle</ion-label>
     *    <ion-toggle></ion-toggle>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label>Checkbox</ion-label>
     *    <ion-checkbox></ion-checkbox>
     *  </ion-item>
     * ```
     *
     * @demo /docs/v2/demos/src/label/
     * @see {@link ../../../../components#inputs Input Component Docs}
     * @see {@link ../../input/Input Input API Docs}
     *
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(config, elementRef, renderer, isFloating, isStacked, isFixed, isInset) {
            _super.call(this, config, elementRef, renderer, 'label');
            this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
        }
        Object.defineProperty(Label.prototype, "color", {
            /**
             * @input {string} The color to use from your Sass `$colors` map.
             * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
             * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
             */
            set: function (val) {
                this._setColor(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "mode", {
            /**
             * @input {string} The mode determines which platform styles to use.
             * Possible values are: `"ios"`, `"md"`, or `"wp"`.
             * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
             */
            set: function (val) {
                this._setMode(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "id", {
            /**
             * @private
             */
            get: function () {
                return this._id;
            },
            set: function (val) {
                this._id = val;
                if (val) {
                    this.setElementAttribute('id', val);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "text", {
            /**
             * @private
             */
            get: function () {
                return this.getNativeElement().textContent || '';
            },
            enumerable: true,
            configurable: true
        });
        Label.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-label'
                    },] },
        ];
        /** @nocollapse */
        Label.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['floating',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['stacked',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['fixed',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['inset',] },] },
        ];
        Label.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'id': [{ type: core_1.Input },],
        };
        return Label;
    }(ion_1.Ion));
    exports.Label = Label;
});
//# sourceMappingURL=label.js.map