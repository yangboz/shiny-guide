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
      * @name Chip
      * @module ionic
      * @description
      * Chips represent complex entities in small blocks, such as a contact.
      *
      *
      * @usage
      *
      * ```html
      * <ion-chip>
      *   <ion-label>Default</ion-label>
      * </ion-chip>
      *
      * <ion-chip>
      *   <ion-label color="secondary">Secondary Label</ion-label>
      * </ion-chip>
      *
      * <ion-chip color="secondary">
      *   <ion-label color="dark">Secondary w/ Dark label</ion-label>
      * </ion-chip>
      *
      * <ion-chip color="danger">
      *   <ion-label>Danger</ion-label>
      * </ion-chip>
      *
      * <ion-chip>
      *   <ion-icon name="pin"></ion-icon>
      *   <ion-label>Default</ion-label>
      * </ion-chip>
      *
      * <ion-chip>
      *   <ion-icon name="heart" color="dark"></ion-icon>
      *   <ion-label>Default</ion-label>
      * </ion-chip>
      *
      * <ion-chip>
      *   <ion-avatar>
      *     <img src="img/my-img.png">
      *   </ion-avatar>
      *   <ion-label>Default</ion-label>
      * </ion-chip>
      * ```
      *
      *
      * @advanced
      *
      * ```html
      * <ion-chip #chip1>
      *   <ion-label>Default</ion-label>
      *   <button ion-button clear color="light" (click)="delete(chip1)">
      *     <ion-icon name="close-circle"></ion-icon>
      *   </button>
      * </ion-chip>
      *
      * <ion-chip #chip2>
      *   <ion-icon name="pin" color="primary"></ion-icon>
      *   <ion-label>With Icon</ion-label>
      *   <button ion-button (click)="delete(chip2)">
      *     <ion-icon name="close"></ion-icon>
      *   </button>
      * </ion-chip>
      *
      * <ion-chip #chip3>
      *   <ion-avatar>
      *     <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==">
      *   </ion-avatar>
      *   <ion-label>With Avatar</ion-label>
      *   <button ion-button clear color="dark" (click)="delete(chip3)">
      *     <ion-icon name="close-circle"></ion-icon>
      *   </button>
      * </ion-chip>
      * ```
      *
      * ```ts
      * @Component({
      *   templateUrl: 'main.html'
      * })
      * class E2EPage {
      *   delete(chip: Element) {
      *     chip.remove();
      *   }
      * }
      * ```
      *
      * @demo /docs/v2/demos/src/chip/
     **/
    var Chip = (function (_super) {
        __extends(Chip, _super);
        function Chip(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'chip');
        }
        Object.defineProperty(Chip.prototype, "color", {
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
        Object.defineProperty(Chip.prototype, "mode", {
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
        Chip.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-chip'
                    },] },
        ];
        /** @nocollapse */
        Chip.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Chip.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Chip;
    }(ion_1.Ion));
    exports.Chip = Chip;
});
//# sourceMappingURL=chip.js.map