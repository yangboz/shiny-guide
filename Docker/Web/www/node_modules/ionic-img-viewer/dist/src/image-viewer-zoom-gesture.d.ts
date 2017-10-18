import { Renderer } from '@angular/core';
import { Gesture, Platform } from 'ionic-angular';
import { ImageViewerComponent } from './image-viewer.component';
export declare class ImageViewerZoomGesture extends Gesture {
    private component;
    private platform;
    private renderer;
    private adjustScale;
    private adjustDeltaX;
    private adjustDeltaY;
    private currentScale;
    private currentDeltaX;
    private currentDeltaY;
    private allowedXMargin;
    private allowedYMargin;
    constructor(component: ImageViewerComponent, element: any, platform: Platform, renderer: Renderer);
    onPinch(event: any): void;
    onPinchEnd(event: any): void;
    onPanStart(event: any): void;
    onPan(event: any): void;
    boundAdjustement(adjustement: any, bound: any): any;
    onPanEnd(event: any): void;
    onDoubleTap(event: any): void;
    setImageContainerTransform(): void;
}
