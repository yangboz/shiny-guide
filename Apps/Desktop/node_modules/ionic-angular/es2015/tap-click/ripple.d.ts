import { ActivatorBase } from './activator-base';
import { Activator } from './activator';
import { App } from '../components/app/app';
import { Config } from '../config/config';
import { PointerCoordinates } from '../util/dom';
import { DomController } from '../platform/dom-controller';
/**
 * @private
 */
export declare class RippleActivator implements ActivatorBase {
    private dom;
    protected _queue: HTMLElement[];
    protected _active: HTMLElement[];
    protected highlight: Activator;
    constructor(app: App, config: Config, dom: DomController);
    clickAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    downAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    clearState(animated: boolean): void;
    _downAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    _upAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    _clickAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    startRippleEffect(rippleEle: any, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
}
