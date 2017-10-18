import { Attribute, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
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
export class Label extends Ion {
    constructor(config, elementRef, renderer, isFloating, isStacked, isFixed, isInset) {
        super(config, elementRef, renderer, 'label');
        this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
    }
    /**
     * @input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     */
    set color(val) {
        this._setColor(val);
    }
    /**
     * @input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     */
    set mode(val) {
        this._setMode(val);
    }
    /**
     * @private
     */
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
        if (val) {
            this.setElementAttribute('id', val);
        }
    }
    /**
     * @private
     */
    get text() {
        return this.getNativeElement().textContent || '';
    }
}
Label.decorators = [
    { type: Directive, args: [{
                selector: 'ion-label'
            },] },
];
/** @nocollapse */
Label.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: undefined, decorators: [{ type: Attribute, args: ['floating',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['stacked',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['fixed',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['inset',] },] },
];
Label.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'id': [{ type: Input },],
};
//# sourceMappingURL=label.js.map