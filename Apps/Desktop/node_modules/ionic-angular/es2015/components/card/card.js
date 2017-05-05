import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
  * @private
  */
export class Card extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card');
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
}
Card.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card'
            },] },
];
/** @nocollapse */
Card.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Card.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
/**
 * @private
 */
export class CardContent extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-content');
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
}
CardContent.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-content'
            },] },
];
/** @nocollapse */
CardContent.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardContent.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
/**
 * @private
 */
export class CardHeader extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-header');
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
}
CardHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-header'
            },] },
];
/** @nocollapse */
CardHeader.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardHeader.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
/**
 * @private
 */
export class CardTitle extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-title');
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
}
CardTitle.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-title'
            },] },
];
/** @nocollapse */
CardTitle.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardTitle.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
//# sourceMappingURL=card.js.map