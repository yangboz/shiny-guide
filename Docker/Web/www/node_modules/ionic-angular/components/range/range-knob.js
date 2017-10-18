import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Key } from '../../platform/key';
/**
 * @private
 */
export var RangeKnob = (function () {
    function RangeKnob() {
        this.ionIncrease = new EventEmitter();
        this.ionDecrease = new EventEmitter();
    }
    Object.defineProperty(RangeKnob.prototype, "ratio", {
        set: function (r) {
            this._x = r * 100 + "%";
        },
        enumerable: true,
        configurable: true
    });
    RangeKnob.prototype._keyup = function (ev) {
        var keyCode = ev.keyCode;
        if (keyCode === Key.LEFT || keyCode === Key.DOWN) {
            (void 0) /* console.debug */;
            this.ionDecrease.emit();
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (keyCode === Key.RIGHT || keyCode === Key.UP) {
            (void 0) /* console.debug */;
            this.ionIncrease.emit();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    RangeKnob.decorators = [
        { type: Component, args: [{
                    selector: '.range-knob-handle',
                    template: '<div class="range-pin" *ngIf="pin" role="presentation">{{val}}</div>' +
                        '<div class="range-knob" role="presentation"></div>',
                    host: {
                        '[class.range-knob-pressed]': 'pressed',
                        '[class.range-knob-min]': 'val===min||val===undefined',
                        '[class.range-knob-max]': 'val===max',
                        '[style.left]': '_x',
                        '[attr.aria-valuenow]': 'val',
                        '[attr.aria-valuemin]': 'min',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.aria-labelledby]': 'labelId',
                        '[tabindex]': 'disabled?-1:0',
                        'role': 'slider'
                    }
                },] },
    ];
    /** @nocollapse */
    RangeKnob.ctorParameters = [];
    RangeKnob.propDecorators = {
        'ratio': [{ type: Input },],
        'pressed': [{ type: Input },],
        'pin': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'val': [{ type: Input },],
        'disabled': [{ type: Input },],
        'labelId': [{ type: Input },],
        'ionIncrease': [{ type: Output },],
        'ionDecrease': [{ type: Output },],
        '_keyup': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return RangeKnob;
}());
//# sourceMappingURL=range-knob.js.map