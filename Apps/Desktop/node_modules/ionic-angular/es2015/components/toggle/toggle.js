import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Config } from '../../config/config';
import { DomController } from '../../platform/dom-controller';
import { Form } from '../../util/form';
import { GestureController } from '../../gestures/gesture-controller';
import { Haptic } from '../../tap-click/haptic';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
import { Key } from '../../platform/key';
import { Platform } from '../../platform/platform';
import { ToggleGesture } from './toggle-gesture';
export const TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Toggle),
    multi: true
};
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
export class Toggle extends Ion {
    constructor(_form, config, _plt, elementRef, renderer, _haptic, _item, _gestureCtrl, _domCtrl, _cd) {
        super(config, elementRef, renderer, 'toggle');
        this._form = _form;
        this._plt = _plt;
        this._haptic = _haptic;
        this._item = _item;
        this._gestureCtrl = _gestureCtrl;
        this._domCtrl = _domCtrl;
        this._cd = _cd;
        this._checked = false;
        this._init = false;
        this._disabled = false;
        this._activated = false;
        this._msPrv = 0;
        this._fn = null;
        /**
         * @output {Toggle} Emitted when the toggle value changes.
         */
        this.ionChange = new EventEmitter();
        _form.register(this);
        if (_item) {
            this.id = 'tgl-' + _item.registerInput('toggle');
            this._labelId = 'lbl-' + _item.id;
            this._item.setElementClass('item-toggle', true);
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
     * @private
     */
    ngAfterContentInit() {
        this._init = true;
        this._gesture = new ToggleGesture(this._plt, this, this._gestureCtrl, this._domCtrl);
        this._gesture.listen();
    }
    /**
     * @private
     */
    _onDragStart(startX) {
        (void 0) /* assert */;
        (void 0) /* console.debug */;
        this._startX = startX;
        this._activated = true;
    }
    /**
     * @private
     */
    _onDragMove(currentX) {
        if (!this._startX) {
            (void 0) /* assert */;
            return;
        }
        (void 0) /* console.debug */;
        if (this._checked) {
            if (currentX + 15 < this._startX) {
                this.onChange(false);
                this._haptic.selection();
                this._startX = currentX;
                this._activated = true;
            }
        }
        else if (currentX - 15 > this._startX) {
            this.onChange(true);
            this._haptic.selection();
            this._startX = currentX;
            this._activated = (currentX < this._startX + 5);
        }
    }
    /**
     * @private
     */
    _onDragEnd(endX) {
        if (!this._startX) {
            (void 0) /* assert */;
            return;
        }
        (void 0) /* console.debug */;
        if (this.checked) {
            if (this._startX + 4 > endX) {
                this.onChange(false);
                this._haptic.selection();
            }
        }
        else if (this._startX - 4 < endX) {
            this.onChange(true);
            this._haptic.selection();
        }
        this._activated = false;
        this._startX = null;
    }
    /**
     * @input {boolean} If true, the element is selected.
     */
    get checked() {
        return this._checked;
    }
    set checked(val) {
        this._setChecked(isTrueProperty(val));
        this.onChange(this._checked);
    }
    /**
     * @private
     */
    _setChecked(isChecked) {
        if (isChecked !== this._checked) {
            this._checked = isChecked;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._item && this._item.setElementClass('item-toggle-checked', isChecked);
        }
    }
    /**
     * @private
     */
    writeValue(val) {
        this._setChecked(isTrueProperty(val));
    }
    /**
     * @private
     */
    registerOnChange(fn) {
        this._fn = fn;
    }
    /**
     * @private
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @input {boolean} If true, the user cannot interact with this element.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-toggle-disabled', this._disabled);
    }
    /**
     * @private
     */
    onChange(isChecked) {
        // used when this input does not have an ngModel or formControlName
        (void 0) /* console.debug */;
        this._fn && this._fn(isChecked);
        this._setChecked(isChecked);
        this.onTouched();
        this._cd.detectChanges();
    }
    /**
     * @private
     */
    onTouched() { }
    /**
     * @private
     */
    _keyup(ev) {
        if (ev.keyCode === Key.SPACE || ev.keyCode === Key.ENTER) {
            (void 0) /* console.debug */;
            ev.preventDefault();
            ev.stopPropagation();
            this.onChange(!this._checked);
        }
    }
    /**
     * @private
     */
    initFocus() {
        this._elementRef.nativeElement.querySelector('button').focus();
    }
    /**
     * @private
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @private
     */
    ngOnDestroy() {
        this._form && this._form.deregister(this);
        this._gesture && this._gesture.destroy();
        this._fn = null;
    }
}
Toggle.decorators = [
    { type: Component, args: [{
                selector: 'ion-toggle',
                template: '<div class="toggle-icon" [class.toggle-checked]="_checked" [class.toggle-activated]="_activated">' +
                    '<div class="toggle-inner"></div>' +
                    '</div>' +
                    '<button role="checkbox" ' +
                    'type="button" ' +
                    'ion-button="item-cover" ' +
                    '[id]="id" ' +
                    '[attr.aria-checked]="_checked" ' +
                    '[attr.aria-labelledby]="_labelId" ' +
                    '[attr.aria-disabled]="_disabled" ' +
                    'class="item-cover">' +
                    '</button>',
                host: {
                    '[class.toggle-disabled]': '_disabled'
                },
                providers: [TOGGLE_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
Toggle.ctorParameters = [
    { type: Form, },
    { type: Config, },
    { type: Platform, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Haptic, },
    { type: Item, decorators: [{ type: Optional },] },
    { type: GestureController, },
    { type: DomController, },
    { type: ChangeDetectorRef, },
];
Toggle.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionChange': [{ type: Output },],
    'checked': [{ type: Input },],
    'disabled': [{ type: Input },],
    '_keyup': [{ type: HostListener, args: ['keyup', ['$event'],] },],
};
//# sourceMappingURL=toggle.js.map