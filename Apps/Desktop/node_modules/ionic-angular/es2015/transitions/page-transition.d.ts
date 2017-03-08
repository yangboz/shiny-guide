import { Animation } from '../animations/animation';
import { Transition } from './transition';
/**
 * @private
 */
export declare class PageTransition extends Transition {
    enteringPage: Animation;
    init(): void;
    destroy(): void;
}
