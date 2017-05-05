import { ElementRef, Renderer } from '@angular/core';
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
export declare class Icon extends Ion {
    /** @private */
    _iconMode: string;
    /** @private */
    _isActive: boolean;
    /** @private */
    _name: string;
    /** @private */
    _ios: string;
    /** @private */
    _md: string;
    /** @private */
    _css: string;
    /**
     * @input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     */
    color: string;
    /**
     * @input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     */
    mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
     * For more information, see [Ionicons](/docs/v2/ionicons/).
     */
    name: string;
    /**
     * @input {string} Specifies which icon to use on `ios` mode.
     */
    ios: string;
    /**
     * @input {string} Specifies which icon to use on `md` mode.
     */
    md: string;
    /**
     * @input {boolean} If true, the icon is styled with an "active" appearance.
     * An active icon is filled in, and an inactive icon is the outline of the icon.
     * The `isActive` property is largely used by the tabbar. Only affects `ios` icons.
     */
    isActive: boolean;
    /**
     * @private
     */
    _hidden: boolean;
    /**
     * @private
     */
    update(): void;
}
