/**
 * Base class for all Ionic components. Exposes some common functionality
 * that all Ionic components need, such as accessing underlying native elements and
 * sending/receiving app-level events.
 */
export class Ion {
    constructor(config, elementRef, renderer, componentName) {
        this._config = config;
        this._elementRef = elementRef;
        this._renderer = renderer;
        this._componentName = componentName;
        if (componentName) {
            this._setComponentName();
            this._setMode(config.get('mode'));
        }
    }
    /** @private */
    setElementClass(className, isAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, isAdd);
    }
    /** @private */
    setElementAttribute(attributeName, attributeValue) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, attributeName, attributeValue);
    }
    /** @private */
    setElementStyle(property, value) {
        this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
    }
    /** @private */
    _setColor(newColor, componentName) {
        if (componentName) {
            // This is needed for the item-radio
            this._componentName = componentName;
        }
        if (this._color) {
            this.setElementClass(`${this._componentName}-${this._mode}-${this._color}`, false);
        }
        if (newColor) {
            this.setElementClass(`${this._componentName}-${this._mode}-${newColor}`, true);
            this._color = newColor;
        }
    }
    /** @private */
    _setMode(newMode) {
        if (this._mode) {
            this.setElementClass(`${this._componentName}-${this._mode}`, false);
        }
        if (newMode) {
            this.setElementClass(`${this._componentName}-${newMode}`, true);
            // Remove the color class associated with the previous mode,
            // change the mode, then add the new color class
            this._setColor(null);
            this._mode = newMode;
            this._setColor(this._color);
        }
    }
    /** @private */
    _setComponentName() {
        this.setElementClass(this._componentName, true);
    }
    /** @private */
    getElementRef() {
        return this._elementRef;
    }
    /** @private */
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
}
//# sourceMappingURL=ion.js.map