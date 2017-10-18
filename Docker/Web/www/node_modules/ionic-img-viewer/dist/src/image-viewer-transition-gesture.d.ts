import { Renderer } from '@angular/core';
import { ImageViewerComponent } from './image-viewer.component';
import { PanGesture } from 'ionic-angular/gestures/drag-gesture';
import { Platform } from 'ionic-angular/platform/platform';
import { DomController } from 'ionic-angular';
export declare class ImageViewerTransitionGesture extends PanGesture {
    private component;
    private renderer;
    private cb;
    private translationY;
    private opacity;
    private startY;
    private imageContainer;
    private backdrop;
    constructor(platform: Platform, component: ImageViewerComponent, domCtrl: DomController, renderer: Renderer, cb: Function);
    isPinching(ev: any): boolean;
    onDragStart(ev: any): boolean;
    canStart(ev: any): boolean;
    onDragMove(ev: any): boolean;
    onDragEnd(ev: any): boolean;
}
