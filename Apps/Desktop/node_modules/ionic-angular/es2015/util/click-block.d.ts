import { ElementRef, Renderer } from '@angular/core';
import { App } from '../components/app/app';
import { Config } from '../config/config';
import { Platform } from '../platform/platform';
/**
 * @private
 */
export declare class ClickBlock {
    private plt;
    private elementRef;
    private renderer;
    private _tmr;
    private _showing;
    private _start;
    private _minEnd;
    isEnabled: boolean;
    constructor(app: App, config: Config, plt: Platform, elementRef: ElementRef, renderer: Renderer);
    activate(shouldShow: boolean, expire?: number, minDuration?: number): void;
    /** @internal */
    _activate(shouldShow: boolean): void;
    private _setElementClass(className, add);
}
