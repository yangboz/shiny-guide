import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Platform } from '../../platform/platform';
/**
 * @private
 */
export var NativeInput = (function () {
    function NativeInput(_elementRef, _renderer, config, _plt, ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._plt = _plt;
        this.ngControl = ngControl;
        this.focusChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.keydown = new EventEmitter();
        this._clone = config.getBoolean('inputCloning', false);
        this._blurring = config.getBoolean('inputBlurring', false);
    }
    NativeInput.prototype._change = function (ev) {
        this.valueChange.emit(ev.target.value);
    };
    NativeInput.prototype._keyDown = function (ev) {
        if (ev) {
            ev.target && this.keydown.emit(ev.target.value);
        }
    };
    NativeInput.prototype._focus = function () {
        var self = this;
        self.focusChange.emit(true);
        if (self._blurring) {
            // automatically blur input if:
            // 1) this input has focus
            // 2) the newly tapped document element is not an input
            (void 0) /* console.debug */;
            var unregTouchEnd = this._plt.registerListener(this._plt.doc(), 'touchend', function (ev) {
                var tapped = ev.target;
                if (tapped && self.element()) {
                    if (tapped.tagName !== 'INPUT' && tapped.tagName !== 'TEXTAREA' && !tapped.classList.contains('input-cover')) {
                        self.element().blur();
                    }
                }
            }, {
                capture: true,
                zone: false
            });
            self._unrefBlur = function () {
                (void 0) /* console.debug */;
                unregTouchEnd();
            };
        }
    };
    NativeInput.prototype._blur = function () {
        this.focusChange.emit(false);
        this.hideFocus(false);
        this._unrefBlur && this._unrefBlur();
        this._unrefBlur = null;
    };
    NativeInput.prototype.labelledBy = function (val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
    };
    NativeInput.prototype.isDisabled = function (val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
    };
    NativeInput.prototype.setFocus = function () {
        // let's set focus to the element
        // but only if it does not already have focus
        if (this._plt.getActiveElement() !== this.element()) {
            this.element().focus();
        }
    };
    NativeInput.prototype.beginFocus = function (shouldFocus, inputRelativeY) {
        if (this._relocated !== shouldFocus) {
            var focusedInputEle = this.element();
            if (shouldFocus) {
                // we should focus into this element
                if (this._clone) {
                    // this platform needs the input to be cloned
                    // this allows for the actual input to receive the focus from
                    // the user's touch event, but before it receives focus, it
                    // moves the actual input to a location that will not screw
                    // up the app's layout, and does not allow the native browser
                    // to attempt to scroll the input into place (messing up headers/footers)
                    // the cloned input fills the area of where native input should be
                    // while the native input fakes out the browser by relocating itself
                    // before it receives the actual focus event
                    cloneInputComponent(this._plt, focusedInputEle);
                    // move the native input to a location safe to receive focus
                    // according to the browser, the native input receives focus in an
                    // area which doesn't require the browser to scroll the input into place
                    focusedInputEle.style[this._plt.Css.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                    focusedInputEle.style.opacity = '0';
                }
                // let's now set focus to the actual native element
                // at this point it is safe to assume the browser will not attempt
                // to scroll the input into view itself (screwing up headers/footers)
                this.setFocus();
            }
            else {
                // should remove the focus
                if (this._clone) {
                    // should remove the cloned node
                    removeClone(this._plt, focusedInputEle);
                }
            }
            this._relocated = shouldFocus;
        }
    };
    NativeInput.prototype.hideFocus = function (shouldHideFocus) {
        var focusedInputEle = this.element();
        (void 0) /* console.debug */;
        if (shouldHideFocus) {
            cloneInputComponent(this._plt, focusedInputEle);
            focusedInputEle.style[this._plt.Css.transform] = 'scale(0)';
        }
        else {
            removeClone(this._plt, focusedInputEle);
        }
    };
    NativeInput.prototype.setValue = function (val) {
        this._elementRef.nativeElement['value'] = val;
    };
    NativeInput.prototype.getValue = function () {
        return this.element().value;
    };
    NativeInput.prototype.setMin = function (val) {
        this._elementRef.nativeElement['min'] = val;
    };
    NativeInput.prototype.setMax = function (val) {
        this._elementRef.nativeElement['max'] = val;
    };
    NativeInput.prototype.setStep = function (val) {
        this._elementRef.nativeElement['step'] = val;
    };
    NativeInput.prototype.setElementClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    NativeInput.prototype.element = function () {
        return this._elementRef.nativeElement;
    };
    NativeInput.prototype.ngOnDestroy = function () {
        this._unrefBlur && this._unrefBlur();
    };
    NativeInput.decorators = [
        { type: Directive, args: [{
                    selector: '.text-input'
                },] },
    ];
    /** @nocollapse */
    NativeInput.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: Config, },
        { type: Platform, },
        { type: NgControl, },
    ];
    NativeInput.propDecorators = {
        'focusChange': [{ type: Output },],
        'valueChange': [{ type: Output },],
        'keydown': [{ type: Output },],
        '_change': [{ type: HostListener, args: ['input', ['$event'],] },],
        '_keyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
        '_focus': [{ type: HostListener, args: ['focus',] },],
        '_blur': [{ type: HostListener, args: ['blur',] },],
    };
    return NativeInput;
}());
function cloneInputComponent(plt, srcNativeInputEle) {
    // given a native <input> or <textarea> element
    // find its parent wrapping component like <ion-input> or <ion-textarea>
    // then clone the entire component
    var srcComponentEle = srcNativeInputEle.closest('ion-input,ion-textarea');
    if (srcComponentEle) {
        // DOM READ
        var srcTop = srcComponentEle.offsetTop;
        var srcLeft = srcComponentEle.offsetLeft;
        var srcWidth = srcComponentEle.offsetWidth;
        var srcHeight = srcComponentEle.offsetHeight;
        // DOM WRITE
        // not using deep clone so we don't pull in unnecessary nodes
        var clonedComponentEle = srcComponentEle.cloneNode(false);
        clonedComponentEle.classList.add('cloned-input');
        clonedComponentEle.setAttribute('aria-hidden', 'true');
        clonedComponentEle.style.pointerEvents = 'none';
        clonedComponentEle.style.position = 'absolute';
        clonedComponentEle.style.top = srcTop + 'px';
        clonedComponentEle.style.left = srcLeft + 'px';
        clonedComponentEle.style.width = srcWidth + 'px';
        clonedComponentEle.style.height = srcHeight + 'px';
        var clonedNativeInputEle = srcNativeInputEle.cloneNode(false);
        clonedNativeInputEle.value = srcNativeInputEle.value;
        clonedNativeInputEle.tabIndex = -1;
        clonedComponentEle.appendChild(clonedNativeInputEle);
        srcComponentEle.parentNode.appendChild(clonedComponentEle);
        srcComponentEle.style.pointerEvents = 'none';
    }
    srcNativeInputEle.style[plt.Css.transform] = 'scale(0)';
}
function removeClone(plt, srcNativeInputEle) {
    var srcComponentEle = srcNativeInputEle.closest('ion-input,ion-textarea');
    if (srcComponentEle && srcComponentEle.parentElement) {
        var clonedInputEles = srcComponentEle.parentElement.querySelectorAll('.cloned-input');
        for (var i = 0; i < clonedInputEles.length; i++) {
            clonedInputEles[i].parentNode.removeChild(clonedInputEles[i]);
        }
        srcComponentEle.style.pointerEvents = '';
    }
    srcNativeInputEle.style[plt.Css.transform] = '';
    srcNativeInputEle.style.opacity = '';
}
/**
 * @private
 */
export var NextInput = (function () {
    function NextInput() {
        this.focused = new EventEmitter();
    }
    NextInput.prototype.receivedFocus = function () {
        (void 0) /* console.debug */;
        this.focused.emit(true);
    };
    NextInput.decorators = [
        { type: Directive, args: [{
                    selector: '[next-input]'
                },] },
    ];
    /** @nocollapse */
    NextInput.ctorParameters = [];
    NextInput.propDecorators = {
        'focused': [{ type: Output },],
        'receivedFocus': [{ type: HostListener, args: ['focus',] },],
    };
    return NextInput;
}());
//# sourceMappingURL=native-input.js.map