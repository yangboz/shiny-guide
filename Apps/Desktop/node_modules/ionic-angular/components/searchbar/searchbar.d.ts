import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Platform } from '../../platform/platform';
import { TimeoutDebouncer } from '../../util/debouncer';
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [showCancelButton]="shouldShowCancel"
 *   (ionInput)="onInput($event)"
 *   (ionCancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * @demo /docs/v2/demos/src/searchbar/
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export declare class Searchbar extends Ion {
    private _plt;
    _value: string | number;
    _shouldBlur: boolean;
    _shouldAlignLeft: boolean;
    _isCancelVisible: boolean;
    _spellcheck: boolean;
    _autocomplete: string;
    _autocorrect: string;
    _isActive: boolean;
    _debouncer: TimeoutDebouncer;
    _showCancelButton: boolean;
    _animated: boolean;
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
     * @input {string} Set the the cancel button text. Default: `"Cancel"`.
     */
    cancelButtonText: string;
    /**
     * @input {boolean} If true, show the cancel button.
     */
    showCancelButton: boolean;
    /**
     * @input {number} How long, in milliseconds, to wait to trigger the `ionInput` event after each keystroke. Default `250`.
     */
    debounce: number;
    /**
     * @input {string} Set the input's placeholder. Default `"Search"`.
     */
    placeholder: string;
    /**
     * @input {string} Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocomplete: string;
    /**
     * @input {string} Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocorrect: string;
    /**
     * @input {string|boolean} Set the input's spellcheck property. Values: `true`, `false`. Default `false`.
     */
    spellcheck: string | boolean;
    /**
     * @input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
     */
    type: string;
    /**
     * @input {boolean} If true, enable searchbar animation.
     */
    animated: boolean;
    /**
     * @output {event} Emitted when the Searchbar input has changed, including when it's cleared.
     */
    ionInput: EventEmitter<UIEvent>;
    /**
     * @output {event} Emitted when the Searchbar input has blurred.
     */
    ionBlur: EventEmitter<UIEvent>;
    /**
     * @output {event} Emitted when the Searchbar input has focused.
     */
    ionFocus: EventEmitter<UIEvent>;
    /**
     * @output {event} Emitted when the cancel button is clicked.
     */
    ionCancel: EventEmitter<UIEvent>;
    /**
     * @output {event} Emitted when the clear input button is clicked.
     */
    ionClear: EventEmitter<UIEvent>;
    /**
     * @private
     */
    _sbHasFocus: boolean;
    constructor(config: Config, _plt: Platform, elementRef: ElementRef, renderer: Renderer, ngControl: NgControl);
    _searchbarInput: ElementRef;
    _searchbarIcon: ElementRef;
    _cancelButton: ElementRef;
    /**
     * @input {string} Set the input value.
     */
    value: string | number;
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     * After View Checked position the elements
     */
    ngAfterContentInit(): void;
    /**
     * @private
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    positionElements(): void;
    positionPlaceholder(): void;
    /**
     * @private
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    positionCancelButton(): void;
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev: any): void;
    /**
     * @private
     * Sets the Searchbar to focused and active on input focus.
     */
    inputFocused(ev: UIEvent): void;
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred(ev: UIEvent): void;
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    clearInput(ev: UIEvent): void;
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(ev: UIEvent): void;
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    onChange: (_: any) => void;
    /**
     * @private
     */
    onTouched: () => void;
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => {}): void;
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => {}): void;
    setFocus(): void;
}
