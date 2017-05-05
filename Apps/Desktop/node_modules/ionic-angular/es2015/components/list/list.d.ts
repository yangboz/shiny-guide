import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { Ion } from '../ion';
import { Platform } from '../../platform/platform';
/**
 * The List is a widely used interface element in almost any mobile app,
 * and can include content ranging from basic text all the way to
 * buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves
 * can be any HTML element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and
 * removing items.
 *
 * @demo /docs/v2/demos/src/list/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @advanced
 *
 * Enable the sliding items.
 *
 * ```ts
 * import { Component, ViewChild } from '@angular/core';
 * import { List } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyClass {
 *   @ViewChild(List) list: List;
 *
 *   constructor() { }
 *
 *   stopSliding() {
 *     this.list.enableSlidingItems(false);
 *   }
 * }
 * ```
 *
 */
export declare class List extends Ion {
    private _plt;
    private _gestureCtrl;
    private _domCtrl;
    private _enableSliding;
    private _containsSlidingItems;
    private _slidingGesture;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, _plt: Platform, _gestureCtrl: GestureController, _domCtrl: DomController);
    /**
     * @input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     */
    mode: string;
    /**
     * @input {boolean} If true, the sliding items will be enabled.
     */
    sliding: boolean;
    /**
     * @private
     */
    containsSlidingItem(contains: boolean): void;
    private _updateSlidingState();
    /**
     * Close any sliding items that are open.
     */
    closeSlidingItems(): void;
    /**
     * @private
     */
    destroy(): void;
}
