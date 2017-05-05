import { GESTURE_MENU_SWIPE } from '../../gestures/gesture-controller';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
/**
 * Gesture attached to the content which the menu is assigned to
 */
export class MenuContentGesture extends SlideEdgeGesture {
    constructor(plt, menu, gestureCtrl, domCtrl) {
        super(plt, plt.doc().body, {
            direction: 'x',
            edge: menu.side,
            threshold: 5,
            maxEdgeStart: menu.maxEdgeStart || 50,
            zone: false,
            passive: true,
            domController: domCtrl,
            gesture: gestureCtrl.createGesture({
                name: GESTURE_MENU_SWIPE,
                priority: 10 /* MenuSwipe */,
                disableScroll: true
            })
        });
        this.menu = menu;
    }
    canStart(ev) {
        let menu = this.menu;
        if (!menu.canSwipe()) {
            return false;
        }
        if (menu.isOpen) {
            return true;
        }
        else if (menu.getMenuController().getOpen()) {
            return false;
        }
        return super.canStart(ev);
    }
    // Set CSS, then wait one frame for it to apply before sliding starts
    onSlideBeforeStart(ev) {
        (void 0) /* console.debug */;
        this.menu._swipeBeforeStart();
    }
    onSlideStart() {
        (void 0) /* console.debug */;
        this.menu._swipeStart();
    }
    onSlide(slide, ev) {
        let z = (this.menu.side === 'right' ? slide.min : slide.max);
        let stepValue = (slide.distance / z);
        this.menu._swipeProgress(stepValue);
    }
    onSlideEnd(slide, ev) {
        let z = (this.menu.side === 'right' ? slide.min : slide.max);
        let currentStepValue = (slide.distance / z);
        let velocity = slide.velocity;
        z = Math.abs(z * 0.5);
        let shouldCompleteRight = (velocity >= 0)
            && (velocity > 0.2 || slide.delta > z);
        let shouldCompleteLeft = (velocity <= 0)
            && (velocity < -0.2 || slide.delta < -z);
        (void 0) /* console.debug */;
        this.menu._swipeEnd(shouldCompleteLeft, shouldCompleteRight, currentStepValue, velocity);
    }
    getElementStartPos(slide, ev) {
        if (this.menu.side === 'right') {
            return this.menu.isOpen ? slide.min : slide.max;
        }
        // left menu
        return this.menu.isOpen ? slide.max : slide.min;
    }
    getSlideBoundaries() {
        if (this.menu.side === 'right') {
            return {
                min: -this.menu.width(),
                max: 0
            };
        }
        // left menu
        return {
            min: 0,
            max: this.menu.width()
        };
    }
}
//# sourceMappingURL=menu-gestures.js.map