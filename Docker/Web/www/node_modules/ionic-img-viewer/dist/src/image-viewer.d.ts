import { ViewController } from 'ionic-angular';
export declare class ImageViewer extends ViewController {
    constructor(opts?: ImageViewerOptions);
    getTransitionName(direction: string): string;
    static create(opts?: ImageViewerOptions): ImageViewer;
}
export interface ImageViewerOptions {
    enableBackdropDismiss?: boolean;
    image?: string;
    position?: ClientRect;
}
