import { Platform, EventListenerOptions } from '../platform/platform';
/**
 * @private
 */
export declare class PointerEvents {
    private plt;
    private ele;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    private option;
    private rmTouchStart;
    private rmTouchMove;
    private rmTouchEnd;
    private rmTouchCancel;
    private rmMouseStart;
    private rmMouseMove;
    private rmMouseUp;
    private bindTouchEnd;
    private bindMouseUp;
    private lastTouchEvent;
    mouseWait: number;
    lastEventType: PointerEventType;
    constructor(plt: Platform, ele: any, pointerDown: any, pointerMove: any, pointerUp: any, option: EventListenerOptions);
    private handleTouchStart(ev);
    private handleMouseDown(ev);
    private handleTouchEnd(ev);
    private handleMouseUp(ev);
    private stopTouch();
    private stopMouse();
    stop(): void;
    destroy(): void;
}
export declare const enum PointerEventType {
    UNDEFINED = 0,
    MOUSE = 1,
    TOUCH = 2,
}
export interface PointerEventsConfig {
    element?: HTMLElement;
    pointerDown: (ev: any) => boolean;
    pointerMove?: (ev: any) => void;
    pointerUp?: (ev: any) => void;
    zone?: boolean;
    capture?: boolean;
    passive?: boolean;
}
