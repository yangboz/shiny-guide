import { ElementRef, EventEmitter, NgZone, QueryList, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { DomController, DomDebouncer } from '../../platform/dom-controller';
import { GestureController, BlockerDelegate } from '../../gestures/gesture-controller';
import { Haptic } from '../../tap-click/haptic';
import { NavParams } from '../../navigation/nav-params';
import { PickerOptions, PickerColumn, PickerColumnOption } from './picker-options';
import { Platform } from '../../platform/platform';
import { UIEventManager } from '../../gestures/ui-event-manager';
import { ViewController } from '../../navigation/view-controller';
/**
 * @private
 */
export declare class PickerColumnCmp {
    private _plt;
    private elementRef;
    private _zone;
    private _haptic;
    colEle: ElementRef;
    col: PickerColumn;
    y: number;
    colHeight: number;
    optHeight: number;
    velocity: number;
    pos: number[];
    startY: number;
    rafId: number;
    bounceFrom: number;
    minY: number;
    maxY: number;
    rotateFactor: number;
    scaleFactor: number;
    lastIndex: number;
    lastTempIndex: number;
    decelerateFunc: Function;
    debouncer: DomDebouncer;
    events: UIEventManager;
    ionChange: EventEmitter<any>;
    constructor(config: Config, _plt: Platform, elementRef: ElementRef, _zone: NgZone, _haptic: Haptic, plt: Platform, domCtrl: DomController);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    pointerStart(ev: UIEvent): boolean;
    pointerMove(ev: UIEvent): void;
    pointerEnd(ev: UIEvent): void;
    decelerate(): void;
    optClick(ev: UIEvent, index: number): void;
    setSelected(selectedIndex: number, duration: number): void;
    update(y: number, duration: number, saveY: boolean, emitChange: boolean): void;
    refresh(): void;
}
/**
 * @private
 */
export declare class PickerCmp {
    private _viewCtrl;
    private _elementRef;
    private _plt;
    _cols: QueryList<PickerColumnCmp>;
    d: PickerOptions;
    enabled: boolean;
    lastClick: number;
    id: number;
    mode: string;
    _gestureBlocker: BlockerDelegate;
    constructor(_viewCtrl: ViewController, _elementRef: ElementRef, config: Config, _plt: Platform, gestureCtrl: GestureController, params: NavParams, renderer: Renderer);
    ionViewWillLoad(): void;
    ionViewWillEnter(): void;
    ionViewDidLeave(): void;
    refresh(): void;
    _colChange(selectedOption: PickerColumnOption): void;
    _keyUp(ev: KeyboardEvent): void;
    ionViewDidEnter(): void;
    btnClick(button: any): void;
    bdClick(): void;
    dismiss(role: any): Promise<any>;
    getSelected(): any;
    ngOnDestroy(): void;
}
