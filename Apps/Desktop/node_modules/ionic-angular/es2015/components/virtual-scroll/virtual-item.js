import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @private
 */
export class VirtualHeader {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualHeader.decorators = [
    { type: Directive, args: [{ selector: '[virtualHeader]' },] },
];
/** @nocollapse */
VirtualHeader.ctorParameters = [
    { type: TemplateRef, },
];
/**
 * @private
 */
export class VirtualFooter {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualFooter.decorators = [
    { type: Directive, args: [{ selector: '[virtualFooter]' },] },
];
/** @nocollapse */
VirtualFooter.ctorParameters = [
    { type: TemplateRef, },
];
/**
 * @private
 */
export class VirtualItem {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
}
VirtualItem.decorators = [
    { type: Directive, args: [{ selector: '[virtualItem]' },] },
];
/** @nocollapse */
VirtualItem.ctorParameters = [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
//# sourceMappingURL=virtual-item.js.map