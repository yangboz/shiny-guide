var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ViewController } from 'ionic-angular';
import { ImageViewerComponent } from './image-viewer.component';
export var ImageViewer = (function (_super) {
    __extends(ImageViewer, _super);
    function ImageViewer(opts) {
        if (opts === void 0) { opts = {}; }
        _super.call(this, ImageViewerComponent, opts);
    }
    ImageViewer.prototype.getTransitionName = function (direction) {
        var key = 'image-viewer-' + (direction === 'back' ? 'leave' : 'enter');
        return key;
    };
    ImageViewer.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new ImageViewer(opts);
    };
    return ImageViewer;
}(ViewController));
//# sourceMappingURL=image-viewer.js.map