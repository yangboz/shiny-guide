import { Config } from '../config/config';
import { Platform } from '../platform/platform';
import { Transition } from './transition';
export declare function registerTransitions(config: Config): () => void;
export declare function createTransition(plt: Platform, config: Config, transitionName: string, enteringView: any, leavingView: any, opts: any): Transition;
