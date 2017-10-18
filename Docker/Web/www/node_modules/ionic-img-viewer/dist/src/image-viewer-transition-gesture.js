var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { PanGesture } from 'ionic-angular/gestures/drag-gesture';
import { pointerCoord } from 'ionic-angular/util/dom';
import { Animation } from 'ionic-angular';
var HAMMER_THRESHOLD = 10;
var MAX_ATTACK_ANGLE = 45;
var DRAG_THRESHOLD = 70;
export var ImageViewerTransitionGesture = (function (_super) {
    __extends(ImageViewerTransitionGesture, _super);
    function ImageViewerTransitionGesture(platform, component, domCtrl, renderer, cb) {
        _super.call(this, platform, component.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,
            threshold: HAMMER_THRESHOLD,
            gesture: component._gestureCtrl.createGesture({ name: 'image-viewer' }),
            direction: 'y',
            domController: domCtrl
        });
        this.component = component;
        this.renderer = renderer;
        this.cb = cb;
        this.translationY = 0;
        this.imageContainer = component.getNativeElement().querySelector('.image');
        this.backdrop = component.getNativeElement().querySelector('ion-backdrop');
        this.listen();
    }
    // As we handle both pinch and drag, we have to make sure we don't drag when we are trying to pinch
    ImageViewerTransitionGesture.prototype.isPinching = function (ev) {
        return ev.touches && ev.touches.length > 1;
    };
    ImageViewerTransitionGesture.prototype.onDragStart = function (ev) {
        if (this.isPinching(ev)) {
            this.abort(ev);
        }
        var coord = pointerCoord(ev);
        this.startY = coord.y;
        return true;
    };
    ImageViewerTransitionGesture.prototype.canStart = function (ev) {
        return !this.component.isZoomed && !this.isPinching(ev);
    };
    ImageViewerTransitionGesture.prototype.onDragMove = function (ev) {
        var _this = this;
        if (this.isPinching(ev)) {
            this.abort(ev);
        }
        var coord = pointerCoord(ev);
        this.translationY = coord.y - this.startY;
        this.opacity = Math.max(1 - Math.abs(this.translationY) / (10 * DRAG_THRESHOLD), .5);
        this.plt.raf(function () {
            _this.renderer.setElementStyle(_this.imageContainer, _this.plt.Css.transform, "translateY(" + _this.translationY + "px)");
            _this.renderer.setElementStyle(_this.backdrop, 'opacity', _this.opacity.toString());
        });
        return true;
    };
    ImageViewerTransitionGesture.prototype.onDragEnd = function (ev) {
        if (Math.abs(this.translationY) > DRAG_THRESHOLD) {
            this.cb();
        }
        else {
            var imageContainerAnimation = new Animation(this.plt, this.imageContainer);
            var backdropAnimation = new Animation(this.plt, this.backdrop);
            backdropAnimation.fromTo('opacity', this.opacity, '1');
            imageContainerAnimation.fromTo('translateY', this.translationY + "px", '0px');
            new Animation(this.plt)
                .easing('ease-in')
                .duration(150)
                .add(backdropAnimation)
                .add(imageContainerAnimation)
                .play();
        }
        return true;
    };
    return ImageViewerTransitionGesture;
}(PanGesture));
//# sourceMappingURL=image-viewer-transition-gesture.js.map