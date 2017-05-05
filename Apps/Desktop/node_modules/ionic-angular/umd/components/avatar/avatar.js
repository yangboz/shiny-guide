(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    /**
      * @name Avatar
      * @module ionic
      * @description
      * An Avatar is a component that creates a circular image for an item.
      * Avatar's can be placed on the left or right side of an item with the `item-left` or `item-right` directive.
      * @see {@link /docs/v2/components/#avatar-list Avatar Component Docs}
     */
    var Avatar = (function () {
        function Avatar() {
        }
        Avatar.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-avatar'
                    },] },
        ];
        /** @nocollapse */
        Avatar.ctorParameters = [];
        return Avatar;
    }());
    exports.Avatar = Avatar;
});
//# sourceMappingURL=avatar.js.map