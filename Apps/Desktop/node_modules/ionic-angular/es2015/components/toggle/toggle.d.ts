import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Config } from '../../config/config';
import { DomController } from '../../platform/dom-controller';
import { Form, IonicTapInput } from '../../util/form';
import { GestureController } from '../../gestures/gesture-controller';
import { Haptic } from '../../tap-click/haptic';
import { Ion } from '../ion';
import { Item } from '../item/item';
import { Platform } from '../../platform/platform';
import { ToggleGesture } from './toggle-gesture';
export declare const TOGGLE_VALUE_ACCESSOR: any;
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input,
 * except it looks different and is easier to use on a touch device.
 * Toggles can also have colors assigned to them, by adding any color
 * attribute.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-toggle [(ngModel)]="pepperoni"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-toggle [(ngModel)]="sausage" disabled="true"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-toggle [(ngModel)]="mushrooms"></ion-toggle>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/src/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
export declare class Toggle extends Ion implements IonicTapInput, AfterContentInit, ControlValueAccessor, OnDestroy {
    _form: Form;
    private _plt;
    private _haptic;
    _item: Item;
    private _gestureCtrl;
    private _domCtrl;
    private _cd;
    _checked: boolean;
    _init: boolean;
    _disabled: boolean;
    _labelId: string;
    _activated: boolean;
    _startX: number;
    _msPrv: number;
    _fn: Function;
    _gesture: ToggleGesture;
    /** @private */
    id: string;
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
    /**
     * @output {Toggle} Emitted when the toggle value changes.
     */
    ionChange: EventEmitter<Toggle>;
    constructor(_form: Form, config: Config, _plt: Platform, elementRef: ElementRef, renderer: Renderer, _haptic: Haptic, _item: Item, _gestureCtrl: GestureController, _domCtrl: DomController, _cd: ChangeDetectorRef);
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    _onDragStart(startX: number): void;
    /**
     * @private
     */
    _onDragMove(currentX: number): void;
    /**
     * @private
     */
    _onDragEnd(endX: number): void;
    /**
     * @input {boolean} If true, the element is selected.
     */
    checked: boolean;
    /**
     * @private
     */
    _setChecked(isChecked: boolean): void;
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @input {boolean} If true, the user cannot interact with this element.
     */
    disabled: boolean;
    /**
     * @private
     */
    onChange(isChecked: boolean): void;
    /**
     * @private
     */
    onTouched(): void;
    /**
     * @private
     */
    _keyup(ev: KeyboardEvent): void;
    /**
     * @private
     */
    initFocus(): void;
    /**
     * @private
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
