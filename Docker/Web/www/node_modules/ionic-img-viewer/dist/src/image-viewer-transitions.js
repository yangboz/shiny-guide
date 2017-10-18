var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Transition, Animation } from 'ionic-angular';
export function registerCustomTransitions(config) {
    return function () {
        config.setTransition('image-viewer-enter', ImageViewerEnter);
        config.setTransition('image-viewer-leave', ImageViewerLeave);
    };
}
export var ImageViewerEnter = (function (_super) {
    __extends(ImageViewerEnter, _super);
    function ImageViewerEnter() {
        _super.apply(this, arguments);
    }
    ImageViewerEnter.prototype.init = function () {
        var ele = this.enteringView.pageRef().nativeElement;
        var fromPosition = this.enteringView.data.position;
        var toPosition = ele.querySelector('img').getBoundingClientRect();
        var flipS = fromPosition.width / toPosition.width;
        var flipY = fromPosition.top - toPosition.top;
        var flipX = fromPosition.left - toPosition.left;
        var backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var image = new Animation(this.plt, ele.querySelector('.image'));
        image.fromTo('translateY', flipY + "px", '0px')
            .fromTo('translateX', flipX + "px", '0px')
            .fromTo('scale', flipS, '1')
            .beforeStyles({ 'transform-origin': '0 0' })
            .afterClearStyles(['transform-origin']);
        backdrop.fromTo('opacity', '0.01', '1');
        this.easing('ease-in')
            .duration(150)
            .add(backdrop)
            .add(image);
        var enteringPageEle = this.enteringView.pageRef().nativeElement;
        var enteringNavbarEle = enteringPageEle.querySelector('ion-navbar');
        var enteringBackBtnEle = enteringPageEle.querySelector('.back-button');
        var enteringNavBar = new Animation(this.plt, enteringNavbarEle);
        enteringNavBar.beforeAddClass('show-navbar');
        this.add(enteringNavBar);
        var enteringBackButton = new Animation(this.plt, enteringBackBtnEle);
        this.add(enteringBackButton);
        enteringBackButton.beforeAddClass('show-back-button');
    };
    return ImageViewerEnter;
}(Transition));
export var ImageViewerLeave = (function (_super) {
    __extends(ImageViewerLeave, _super);
    function ImageViewerLeave() {
        _super.apply(this, arguments);
    }
    ImageViewerLeave.prototype.init = function () {
        var ele = this.leavingView.pageRef().nativeElement;
        var toPosition = this.leavingView.data.position;
        var fromPosition = ele.querySelector('img').getBoundingClientRect();
        var offsetY = 0;
        var imageYOffset = ele.querySelector('.image').style[this.plt.Css.transform];
        if (imageYOffset) {
            var regexResult = imageYOffset.match(/translateY\((-?\d*\.?\d*)px\)/);
            offsetY = regexResult ? parseFloat(regexResult[1]) : offsetY;
        }
        var flipS = toPosition.width / fromPosition.width;
        var flipY = toPosition.top - fromPosition.top + offsetY;
        var flipX = toPosition.left - fromPosition.left;
        var backdropOpacity = ele.querySelector('ion-backdrop').style['opacity'];
        var backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var image = new Animation(this.plt, ele.querySelector('.image'));
        image.fromTo('translateY', offsetY + "px", flipY + "px")
            .fromTo('translateX', "0px", flipX + "px")
            .fromTo('scale', '1', flipS)
            .beforeStyles({ 'transform-origin': '0 0' })
            .afterClearStyles(['transform-origin']);
        backdrop.fromTo('opacity', backdropOpacity, '0');
        this.easing('ease-in-out')
            .duration(150)
            .add(backdrop)
            .add(image);
    };
    return ImageViewerLeave;
}(Transition));
//# sourceMappingURL=image-viewer-transitions.js.map