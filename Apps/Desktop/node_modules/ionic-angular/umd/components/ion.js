(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Base class for all Ionic components. Exposes some common functionality
     * that all Ionic components need, such as accessing underlying native elements and
     * sending/receiving app-level events.
     */
    var Ion = (function () {
        function Ion(config, elementRef, renderer, componentName) {
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
        Ion.prototype.setElementClass = function (className, isAdd) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, isAdd);
        };
        /** @private */
        Ion.prototype.setElementAttribute = function (attributeName, attributeValue) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, attributeName, attributeValue);
        };
        /** @private */
        Ion.prototype.setElementStyle = function (property, value) {
            this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
        };
        /** @private */
        Ion.prototype._setColor = function (newColor, componentName) {
            if (componentName) {
                // This is needed for the item-radio
                this._componentName = componentName;
            }
            if (this._color) {
                this.setElementClass(this._componentName + "-" + this._mode + "-" + this._color, false);
            }
            if (newColor) {
                this.setElementClass(this._componentName + "-" + this._mode + "-" + newColor, true);
                this._color = newColor;
            }
        };
        /** @private */
        Ion.prototype._setMode = function (newMode) {
            if (this._mode) {
                this.setElementClass(this._componentName + "-" + this._mode, false);
            }
            if (newMode) {
                this.setElementClass(this._componentName + "-" + newMode, true);
                // Remove the color class associated with the previous mode,
                // change the mode, then add the new color class
                this._setColor(null);
                this._mode = newMode;
                this._setColor(this._color);
            }
        };
        /** @private */
        Ion.prototype._setComponentName = function () {
            this.setElementClass(this._componentName, true);
        };
        /** @private */
        Ion.prototype.getElementRef = function () {
            return this._elementRef;
        };
        /** @private */
        Ion.prototype.getNativeElement = function () {
            return this._elementRef.nativeElement;
        };
        return Ion;
    }());
    exports.Ion = Ion;
});
//# sourceMappingURL=ion.js.map