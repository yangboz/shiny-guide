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
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'card');
        }
        Object.defineProperty(Card.prototype, "color", {
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
        Object.defineProperty(Card.prototype, "mode", {
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
        Card.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card'
                    },] },
        ];
        /** @nocollapse */
        Card.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Card.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Card;
    }(ion_1.Ion));
    exports.Card = Card;
    /**
     * @private
     */
    var CardContent = (function (_super) {
        __extends(CardContent, _super);
        function CardContent(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'card-content');
        }
        Object.defineProperty(CardContent.prototype, "color", {
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
        Object.defineProperty(CardContent.prototype, "mode", {
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
        CardContent.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-content'
                    },] },
        ];
        /** @nocollapse */
        CardContent.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        CardContent.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return CardContent;
    }(ion_1.Ion));
    exports.CardContent = CardContent;
    /**
     * @private
     */
    var CardHeader = (function (_super) {
        __extends(CardHeader, _super);
        function CardHeader(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'card-header');
        }
        Object.defineProperty(CardHeader.prototype, "color", {
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
        Object.defineProperty(CardHeader.prototype, "mode", {
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
        CardHeader.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-header'
                    },] },
        ];
        /** @nocollapse */
        CardHeader.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        CardHeader.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return CardHeader;
    }(ion_1.Ion));
    exports.CardHeader = CardHeader;
    /**
     * @private
     */
    var CardTitle = (function (_super) {
        __extends(CardTitle, _super);
        function CardTitle(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'card-title');
        }
        Object.defineProperty(CardTitle.prototype, "color", {
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
        Object.defineProperty(CardTitle.prototype, "mode", {
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
        CardTitle.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-title'
                    },] },
        ];
        /** @nocollapse */
        CardTitle.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        CardTitle.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return CardTitle;
    }(ion_1.Ion));
    exports.CardTitle = CardTitle;
});
//# sourceMappingURL=card.js.map