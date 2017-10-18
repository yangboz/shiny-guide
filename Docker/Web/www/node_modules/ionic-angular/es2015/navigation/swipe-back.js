import { swipeShouldReset } from '../util/util';
import { GESTURE_GO_BACK_SWIPE } from '../gestures/gesture-controller';
import { SlideEdgeGesture } from '../gestures/slide-edge-gesture';
/**
 * @private
 */
export class SwipeBackGesture extends SlideEdgeGesture {
    constructor(plt, _nav, gestureCtlr, domCtrl) {
        super(plt, plt.doc().body, {
            direction: 'x',
            edge: 'left',
            maxEdgeStart: 75,
            threshold: 5,
            zone: false,
            domController: domCtrl,
            gesture: gestureCtlr.createGesture({
                name: GESTURE_GO_BACK_SWIPE,
                priority: 20 /* GoBackSwipe */,
                disableScroll: true
            })
        });
        this._nav = _nav;
    }
    canStart(ev) {
        // the gesture swipe angle must be mainly horizontal and the
        // gesture distance would be relatively short for a swipe back
        // and swipe back must be possible on this nav controller
        return (this._nav.canSwipeBack() &&
            super.canStart(ev));
    }
    onSlideBeforeStart(ev) {
        this._nav.swipeBackStart();
    }
    onSlide(slide, ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let stepValue = (slide.distance / slide.max);
        this._nav.swipeBackProgress(stepValue);
    }
    onSlideEnd(slide, ev) {
        const velocity = slide.velocity;
        const currentStepValue = (slide.distance / slide.max);
        const isResetDirecction = velocity < 0;
        const isMovingFast = Math.abs(slide.velocity) > 0.4;
        const isInResetZone = Math.abs(slide.delta) < Math.abs(slide.max) * 0.5;
        const shouldComplete = !swipeShouldReset(isResetDirecction, isMovingFast, isInResetZone);
        this._nav.swipeBackEnd(shouldComplete, currentStepValue, velocity);
    }
}
//# sourceMappingURL=swipe-back.js.map