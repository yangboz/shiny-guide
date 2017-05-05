import { Directive, ElementRef } from '@angular/core';
import { DomController } from '../../platform/dom-controller';
/**
 * @private
 */
export var TabHighlight = (function () {
    function TabHighlight(_elementRef, _dom) {
        this._elementRef = _elementRef;
        this._dom = _dom;
    }
    TabHighlight.prototype.select = function (tab) {
        var _this = this;
        var dom = this._dom;
        dom.read(function () {
            var btnEle = tab.btn.getElementRef().nativeElement;
            var transform = "translate3d(" + btnEle.offsetLeft + "px,0,0) scaleX(" + btnEle.offsetWidth + ")";
            dom.write(function () {
                var ele = _this._elementRef.nativeElement;
                ele.style[dom.plt.Css.transform] = transform;
                if (!_this._init) {
                    _this._init = true;
                    dom.write(function () {
                        ele.classList.add('animate');
                    }, 80);
                }
            });
        }, 32);
    };
    TabHighlight.decorators = [
        { type: Directive, args: [{
                    selector: '.tab-highlight'
                },] },
    ];
    /** @nocollapse */
    TabHighlight.ctorParameters = [
        { type: ElementRef, },
        { type: DomController, },
    ];
    return TabHighlight;
}());
//# sourceMappingURL=tab-highlight.js.map