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
     * @private
     */
    var ListHeader = (function (_super) {
        __extends(ListHeader, _super);
        function ListHeader(config, renderer, elementRef, _id) {
            _super.call(this, config, elementRef, renderer, 'list-header');
            this._id = _id;
        }
        Object.defineProperty(ListHeader.prototype, "color", {
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
        Object.defineProperty(ListHeader.prototype, "mode", {
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
        Object.defineProperty(ListHeader.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (val) {
                this._id = val;
                this.setElementAttribute('id', val);
            },
            enumerable: true,
            configurable: true
        });
        ListHeader.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-list-header'
                    },] },
        ];
        /** @nocollapse */
        ListHeader.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.Renderer, },
            { type: core_1.ElementRef, },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['id',] },] },
        ];
        ListHeader.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return ListHeader;
    }(ion_1.Ion));
    exports.ListHeader = ListHeader;
});
//# sourceMappingURL=list-header.js.map