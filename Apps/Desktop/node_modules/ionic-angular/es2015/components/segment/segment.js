import { Component, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Optional, Renderer, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isPresent, isTrueProperty } from '../../util/util';
/**
 * @name SegmentButton
 * @description
 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
 *
 * @usage
 *
 * ```html
 * <ion-content>
 *   <!-- Segment buttons with icons -->
 *   <ion-segment [(ngModel)]="icons" color="secondary">
 *     <ion-segment-button value="camera">
 *       <ion-icon name="camera"></ion-icon>
 *     </ion-segment-button>
 *     <ion-segment-button value="bookmark">
 *       <ion-icon name="bookmark"></ion-icon>
 *     </ion-segment-button>
 *   </ion-segment>
 *
 *   <!-- Segment buttons with text -->
 *   <ion-segment [(ngModel)]="relationship" color="primary">
 *     <ion-segment-button value="friends" (ionSelect)="selectedFriends()">
 *       Friends
 *     </ion-segment-button>
 *     <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">
 *       Enemies
 *     </ion-segment-button>
 *   </ion-segment>
 * </ion-content>
 * ```
 *
 *
 * @demo /docs/v2/demos/src/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see {@link /docs/v2/api/components/segment/Segment/ Segment API Docs}
 */
export class SegmentButton {
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
        /**
         * @output {SegmentButton} Emitted when a segment button has been clicked.
         */
        this.ionSelect = new EventEmitter();
    }
    /**
     * @input {boolean} If true, the user cannot interact with this element.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._setElementClass('segment-button-disabled', this._disabled);
    }
    /**
     * @private
     */
    _setElementClass(cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    }
    /**
     * @private
     * On click of a SegmentButton
     */
    onClick() {
        (void 0) /* console.debug */;
        this.ionSelect.emit(this);
    }
    /**
     * @private
     */
    ngOnInit() {
        if (!isPresent(this.value)) {
            console.warn('<ion-segment-button> requires a "value" attribute');
        }
    }
    /**
     * @private
     */
    set isActive(isActive) {
        this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
    }
}
SegmentButton.decorators = [
    { type: Component, args: [{
                selector: 'ion-segment-button',
                template: '<ng-content></ng-content>' +
                    '<div class="button-effect"></div>',
                host: {
                    'tappable': '',
                    'class': 'segment-button',
                    'role': 'button'
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
SegmentButton.ctorParameters = [
    { type: Renderer, },
    { type: ElementRef, },
];
SegmentButton.propDecorators = {
    'value': [{ type: Input },],
    'ionSelect': [{ type: Output },],
    'disabled': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click',] },],
};
/**
 * @name Segment
 * @description
 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
 * You could use Angular 2's `ngModel` or `FormBuilder` API. For an overview on how `FormBuilder` works, checkout [Angular 2 Forms](http://learnangular2.com/forms/), or [Angular FormBuilder](https://angular.io/docs/ts/latest/api/forms/index/FormBuilder-class.html)
 *
 *
 * ```html
 * <!-- Segment in a header -->
 * <ion-header>
 *   <ion-toolbar>
 *     <ion-segment [(ngModel)]="icons" color="secondary">
 *       <ion-segment-button value="camera">
 *         <ion-icon name="camera"></ion-icon>
 *       </ion-segment-button>
 *       <ion-segment-button value="bookmark">
 *         <ion-icon name="bookmark"></ion-icon>
 *       </ion-segment-button>
 *     </ion-segment>
 *   </ion-toolbar>
 * </ion-header>
 *
 * <ion-content>
 *   <!-- Segment in content -->
 *   <ion-segment [(ngModel)]="relationship" color="primary">
 *     <ion-segment-button value="friends" (ionSelect)="selectedFriends()">
 *       Friends
 *     </ion-segment-button>
 *     <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">
 *       Enemies
 *     </ion-segment-button>
 *   </ion-segment>
 *
 *   <!-- Segment in a form -->
 *   <form [formGroup]="myForm">
 *     <ion-segment formControlName="mapStyle" color="danger">
 *       <ion-segment-button value="standard">
 *         Standard
 *       </ion-segment-button>
 *       <ion-segment-button value="hybrid">
 *         Hybrid
 *       </ion-segment-button>
 *       <ion-segment-button value="sat">
 *         Satellite
 *       </ion-segment-button>
 *     </ion-segment>
 *   </form>
 * </ion-content>
 * ```
 *
 *
 * @demo /docs/v2/demos/src/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see [Angular 2 Forms](http://learnangular2.com/forms/)
 */
export class Segment extends Ion {
    constructor(config, elementRef, renderer, ngControl) {
        super(config, elementRef, renderer, 'segment');
        this._disabled = false;
        /**
         * @output {Any} Emitted when a segment button has been changed.
         */
        this.ionChange = new EventEmitter();
        /**
         * @private
         */
        this.onChange = (_) => { };
        /**
         * @private
         */
        this.onTouched = (_) => { };
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
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
     * @input {boolean} If true, the user cannot interact with any of the buttons in the segment.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        if (this._buttons) {
            this._buttons.forEach(button => {
                button._setElementClass('segment-button-disabled', this._disabled);
            });
        }
    }
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(value) {
        this.value = isPresent(value) ? value : '';
        if (this._buttons) {
            let buttons = this._buttons.toArray();
            for (let button of buttons) {
                button.isActive = (button.value === this.value);
            }
        }
    }
    /**
     * @private
     */
    ngAfterViewInit() {
        this._buttons.forEach(button => {
            button.ionSelect.subscribe((selectedButton) => {
                this.writeValue(selectedButton.value);
                this.onChange(selectedButton.value);
                this.ionChange.emit(selectedButton);
            });
            if (isPresent(this.value)) {
                button.isActive = (button.value === this.value);
            }
            if (isTrueProperty(this._disabled)) {
                button._setElementClass('segment-button-disabled', this._disabled);
            }
        });
    }
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn) { this.onTouched = fn; }
}
Segment.decorators = [
    { type: Directive, args: [{
                selector: 'ion-segment'
            },] },
];
/** @nocollapse */
Segment.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, decorators: [{ type: Optional },] },
];
Segment.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionChange': [{ type: Output },],
    '_buttons': [{ type: ContentChildren, args: [SegmentButton,] },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=segment.js.map