import { DomController, NavController, NavParams, Ion, GestureController, Config, Platform } from 'ionic-angular';
import { ElementRef, Renderer, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageViewerTransitionGesture } from './image-viewer-transition-gesture';
export declare class ImageViewerComponent extends Ion implements OnInit, OnDestroy, AfterViewInit {
    _gestureCtrl: GestureController;
    elementRef: ElementRef;
    private _nav;
    private _zone;
    private renderer;
    private domCtrl;
    private platform;
    imageUrl: SafeUrl;
    dragGesture: ImageViewerTransitionGesture;
    imageContainer: any;
    private pinchGesture;
    isZoomed: boolean;
    constructor(_gestureCtrl: GestureController, elementRef: ElementRef, _nav: NavController, _zone: NgZone, renderer: Renderer, domCtrl: DomController, platform: Platform, _navParams: NavParams, _config: Config, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
