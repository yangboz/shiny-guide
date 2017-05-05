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
      * @name Thumbnail
      * @module ionic
      * @description
      * A Thumbnail is a component that creates a squared image for an item.
      * Thumbnails can be place on the left or right side of an item with the `item-left` or `item-right` directive.
      * @see {@link /docs/v2/components/#thumbnail-list Thumbnail Component Docs}
     */
    var Thumbnail = (function () {
        function Thumbnail() {
        }
        Thumbnail.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-thumbnail'
                    },] },
        ];
        /** @nocollapse */
        Thumbnail.ctorParameters = [];
        return Thumbnail;
    }());
    exports.Thumbnail = Thumbnail;
});
//# sourceMappingURL=thumbnail.js.map