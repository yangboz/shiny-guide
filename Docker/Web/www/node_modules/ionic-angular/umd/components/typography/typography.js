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
      * @private TODO remove this line when we remove the other selectors in order to document it
      * @name Typography
      * @module ionic
      * @description
      *
      * The Typography component is a simple component that can be used to style the text color of any element.
      * The `ion-text` attribute should be added to the element in order to pass a color from the Sass `$colors`
      * map and change the text color of that element.
      *
      * @usage
      *
      * ```html
      * <h1 ion-text color="secondary">H1: The quick brown fox jumps over the lazy dog</h1>
      *
      * <h2 ion-text color="primary">H2: The quick brown fox jumps over the lazy dog</h2>
      *
      * <h3 ion-text color="light">H3: The quick brown fox jumps over the lazy dog</h3>
      *
      * <h4 ion-text color="danger">H4: The quick brown fox jumps over the lazy dog</h4>
      *
      * <h5 ion-text color="dark">H5: The quick brown fox jumps over the lazy dog</h5>
      *
      * <h6 ion-text [color]="dynamicColor">H6: The quick brown fox jumps over the lazy dog</h6>
      *
      * <p>
      *   I saw a werewolf with a Chinese menu in his hand.
      *   Walking through the <sub ion-text color="danger">streets</sub> of Soho in the rain.
      *   He <i ion-text color="primary">was</i> looking for a place called Lee Ho Fook's.
      *   Gonna get a <a ion-text color="secondary">big dish of beef chow mein.</a>
      * </p>
      *
      * <p>
      *   He's the hairy-handed gent who ran amuck in Kent.
      *   Lately he's <sup ion-text color="primary">been</sup> overheard in Mayfair.
      *   Better stay away from him.
      *   He'll rip your lungs out, Jim.
      *   I'd like to meet his tailor.
      * </p>
      * ```
      *
     */
    var Typography = (function (_super) {
        __extends(Typography, _super);
        function Typography(config, elementRef, renderer, ionText) {
            _super.call(this, config, elementRef, renderer, 'text');
            // TODO: Deprecated: all selectors besides `[ion-text]` rc.3
            // Remove all other selectors and the `ionText` attribute
            if (ionText === null) {
                console.warn('Deprecated: The color input has been removed from HTML elements. Please add the `ion-text` attribute in order to use the color input. For example: `<a ion-text color="secondary">Link</a>`');
            }
        }
        Object.defineProperty(Typography.prototype, "color", {
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
        Object.defineProperty(Typography.prototype, "mode", {
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
        Typography.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'h1[color], h2[color], h3[color], h4[color], h5[color], h6[color], a[color]:not([ion-button]):not([ion-item]):not([ion-fab]), p[color], span[color], b[color], i[color], strong[color], em[color], small[color], sub[color], sup[color], [ion-text]'
                    },] },
        ];
        /** @nocollapse */
        Typography.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['ion-text',] },] },
        ];
        Typography.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Typography;
    }(ion_1.Ion));
    exports.Typography = Typography;
});
//# sourceMappingURL=typography.js.map