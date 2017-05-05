import { Directive, ElementRef, HostBinding, Input, Renderer } from '@angular/core';
import { isTrueProperty } from '../../util/util';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components.
 * For a full list of available icons, check out the
 * [Ionicons docs](../../../../ionicons).
 *
 * One feature of Ionicons in Ionic is when icon names are set, the actual icon
 * which is rendered can change slightly depending on the mode the app is
 * running from. For example, by setting the icon name of `alarm`, on iOS the
 * icon will automatically apply `ios-alarm`, and on Material Design it will
 * automatically apply `md-alarm`. This allows the developer to write the
 * markup once while Ionic applies the appropriate icon based on the mode.
 *
 * @usage
 * ```html
 * <!-- automatically uses the correct "star" icon depending on the mode -->
 * <ion-icon name="star"></ion-icon>
 *
 * <!-- explicity set the icon for each mode -->
 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
 *
 * <!-- always use the same icon, no matter what the mode -->
 * <ion-icon name="ios-clock"></ion-icon>
 * <ion-icon name="logo-twitter"></ion-icon>
 * ```
 *
 * @demo /docs/v2/demos/src/icon/
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
export class Icon extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'icon');
        /** @private */
        this._isActive = true;
        /** @private */
        this._name = '';
        /** @private */
        this._ios = '';
        /** @private */
        this._md = '';
        /** @private */
        this._css = '';
        /**
         * @private
         */
        this._hidden = false;
        this._iconMode = config.get('iconMode');
    }
    /**
     * @input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     */
    get color() {
        return this._color;
    }
    set color(value) {
        this._setColor(value);
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
    ngOnDestroy() {
        if (this._css) {
            this.setElementClass(this._css, false);
        }
    }
    /**
     * @input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
     * For more information, see [Ionicons](/docs/v2/ionicons/).
     */
    get name() {
        return this._name;
    }
    set name(val) {
        if (!(/^md-|^ios-|^logo-/.test(val))) {
            // this does not have one of the defaults
            // so lets auto add in the mode prefix for them
            this._name = this._iconMode + '-' + val;
        }
        else {
            this._name = val;
        }
        this.update();
    }
    /**
     * @input {string} Specifies which icon to use on `ios` mode.
     */
    get ios() {
        return this._ios;
    }
    set ios(val) {
        this._ios = val;
        this.update();
    }
    /**
     * @input {string} Specifies which icon to use on `md` mode.
     */
    get md() {
        return this._md;
    }
    set md(val) {
        this._md = val;
        this.update();
    }
    /**
     * @input {boolean} If true, the icon is styled with an "active" appearance.
     * An active icon is filled in, and an inactive icon is the outline of the icon.
     * The `isActive` property is largely used by the tabbar. Only affects `ios` icons.
     */
    get isActive() {
        return this._isActive;
    }
    set isActive(val) {
        this._isActive = isTrueProperty(val);
        this.update();
    }
    /**
     * @private
     */
    update() {
        let iconName;
        if (this._ios && this._iconMode === 'ios') {
            iconName = this._ios;
        }
        else if (this._md && this._iconMode === 'md') {
            iconName = this._md;
        }
        else {
            iconName = this._name;
        }
        let hidden = this._hidden = (iconName === null);
        if (hidden) {
            return;
        }
        let iconMode = iconName.split('-', 2)[0];
        if (iconMode === 'ios' &&
            !this._isActive &&
            iconName.indexOf('logo-') < 0 &&
            iconName.indexOf('-outline') < 0) {
            iconName += '-outline';
        }
        let css = 'ion-' + iconName;
        if (this._css === css) {
            return;
        }
        if (this._css) {
            this.setElementClass(this._css, false);
        }
        this._css = css;
        this.setElementClass(css, true);
        let label = iconName
            .replace('ios-', '')
            .replace('md-', '')
            .replace('-', ' ');
        this.setElementAttribute('aria-label', label);
    }
}
Icon.decorators = [
    { type: Directive, args: [{
                selector: 'ion-icon',
                host: {
                    'role': 'img'
                }
            },] },
];
/** @nocollapse */
Icon.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Icon.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'name': [{ type: Input },],
    'ios': [{ type: Input },],
    'md': [{ type: Input },],
    'isActive': [{ type: Input },],
    '_hidden': [{ type: HostBinding, args: ['class.hide',] },],
};
//# sourceMappingURL=icon.js.map