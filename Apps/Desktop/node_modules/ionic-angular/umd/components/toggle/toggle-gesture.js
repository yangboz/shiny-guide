var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../gestures/gesture-controller', '../../gestures/drag-gesture', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var drag_gesture_1 = require('../../gestures/drag-gesture');
    var dom_1 = require('../../util/dom');
    /**
     * @private
     */
    var ToggleGesture = (function (_super) {
        __extends(ToggleGesture, _super);
        function ToggleGesture(plt, toggle, gestureCtrl, domCtrl) {
            _super.call(this, plt, toggle.getNativeElement(), {
                threshold: 0,
                zone: true,
                domController: domCtrl,
                gesture: gestureCtrl.createGesture({
                    name: gesture_controller_1.GESTURE_TOGGLE,
                    priority: 30 /* Toggle */,
                })
            });
            this.toggle = toggle;
        }
        ToggleGesture.prototype.canStart = function (ev) {
            return true;
        };
        ToggleGesture.prototype.onDragStart = function (ev) {
            ev.preventDefault();
            this.toggle._onDragStart(dom_1.pointerCoord(ev).x);
        };
        ToggleGesture.prototype.onDragMove = function (ev) {
            ev.preventDefault();
            this.toggle._onDragMove(dom_1.pointerCoord(ev).x);
        };
        ToggleGesture.prototype.onDragEnd = function (ev) {
            ev.preventDefault();
            this.toggle._onDragEnd(dom_1.pointerCoord(ev).x);
        };
        return ToggleGesture;
    }(drag_gesture_1.PanGesture));
    exports.ToggleGesture = ToggleGesture;
});
//# sourceMappingURL=toggle-gesture.js.map