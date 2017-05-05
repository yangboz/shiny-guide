import { Directive, ElementRef } from '@angular/core';
import { DomController } from '../../platform/dom-controller';
/**
 * @private
 */
export class TabHighlight {
    constructor(_elementRef, _dom) {
        this._elementRef = _elementRef;
        this._dom = _dom;
    }
    select(tab) {
        const dom = this._dom;
        dom.read(() => {
            const btnEle = tab.btn.getElementRef().nativeElement;
            const transform = `translate3d(${btnEle.offsetLeft}px,0,0) scaleX(${btnEle.offsetWidth})`;
            dom.write(() => {
                const ele = this._elementRef.nativeElement;
                ele.style[dom.plt.Css.transform] = transform;
                if (!this._init) {
                    this._init = true;
                    dom.write(() => {
                        ele.classList.add('animate');
                    }, 80);
                }
            });
        }, 32);
    }
}
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
//# sourceMappingURL=tab-highlight.js.map