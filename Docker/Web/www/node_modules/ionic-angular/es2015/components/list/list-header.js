import { Attribute, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * @private
 */
export class ListHeader extends Ion {
    constructor(config, renderer, elementRef, _id) {
        super(config, elementRef, renderer, 'list-header');
        this._id = _id;
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
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
        this.setElementAttribute('id', val);
    }
}
ListHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list-header'
            },] },
];
/** @nocollapse */
ListHeader.ctorParameters = [
    { type: Config, },
    { type: Renderer, },
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Attribute, args: ['id',] },] },
];
ListHeader.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
//# sourceMappingURL=list-header.js.map