import { GESTURE_TOGGLE } from '../../gestures/gesture-controller';
import { PanGesture } from '../../gestures/drag-gesture';
import { pointerCoord } from '../../util/dom';
/**
 * @private
 */
export class ToggleGesture extends PanGesture {
    constructor(plt, toggle, gestureCtrl, domCtrl) {
        super(plt, toggle.getNativeElement(), {
            threshold: 0,
            zone: true,
            domController: domCtrl,
            gesture: gestureCtrl.createGesture({
                name: GESTURE_TOGGLE,
                priority: 30 /* Toggle */,
            })
        });
        this.toggle = toggle;
    }
    canStart(ev) {
        return true;
    }
    onDragStart(ev) {
        ev.preventDefault();
        this.toggle._onDragStart(pointerCoord(ev).x);
    }
    onDragMove(ev) {
        ev.preventDefault();
        this.toggle._onDragMove(pointerCoord(ev).x);
    }
    onDragEnd(ev) {
        ev.preventDefault();
        this.toggle._onDragEnd(pointerCoord(ev).x);
    }
}
//# sourceMappingURL=toggle-gesture.js.map