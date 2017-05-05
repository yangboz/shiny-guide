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
      * @name Note
      * @module ionic
      * @description
      * A note is detailed item in an ion-item. It creates greyed out element that can be on the left or right side of an item.
      * @usage
      *
      * ```html
      * <ion-content>
      *   <ion-list>
      *     <ion-item>
      *       <ion-note item-left>
      *         Left Note
      *       </ion-note>
      *       My Item
      *       <ion-note item-right>
      *         Right Note
      *       </ion-note>
      *     </ion-item>
      *   </ion-list>
      * </ion-content>
      *```
     * {@link /docs/v2/api/components/api/components/item/item ion-item}
      */
    var Note = (function (_super) {
        __extends(Note, _super);
        function Note(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'note');
        }
        Object.defineProperty(Note.prototype, "color", {
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
        Object.defineProperty(Note.prototype, "mode", {
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
        Note.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-note'
                    },] },
        ];
        /** @nocollapse */
        Note.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Note.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Note;
    }(ion_1.Ion));
    exports.Note = Note;
});
//# sourceMappingURL=note.js.map