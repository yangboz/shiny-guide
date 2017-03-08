/**
 * @private
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export declare function clamp(min: number, n: number, max: number): number;
/** @private */
export declare function deepCopy(obj: any): any;
/** @private */
export declare function debounce(fn: Function, wait: number, immediate?: boolean): any;
/**
 * @private
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
export declare function defaults(dest: any, ...args: any[]): any;
/** @private */
export declare function isBoolean(val: any): boolean;
/** @private */
export declare function isString(val: any): boolean;
/** @private */
export declare function isNumber(val: any): boolean;
/** @private */
export declare function isFunction(val: any): boolean;
/** @private */
export declare function isDefined(val: any): boolean;
/** @private */
export declare function isUndefined(val: any): boolean;
/** @private */
export declare function isPresent(val: any): boolean;
/** @private */
export declare function isBlank(val: any): boolean;
/** @private */
export declare function isObject(val: any): boolean;
/** @private */
export declare function isArray(val: any): boolean;
/** @private */
export declare function isPrimitive(val: any): boolean;
/** @private */
export declare function isTrueProperty(val: any): boolean;
/** @private */
export declare function isCheckedProperty(a: any, b: any): boolean;
/** @private */
export declare function reorderArray(array: any[], indexes: {
    from: number;
    to: number;
}): any[];
/** @private */
export declare function removeArrayItem(array: any[], item: any): boolean;
/** @private */
export declare function swipeShouldReset(isResetDirection: boolean, isMovingFast: boolean, isOnResetZone: boolean): boolean;
/** @private */
declare function _runInDev(fn: Function): any;
/** @private */
declare function _assert(actual: any, reason?: string): void;
/** @private */
export { _assert as assert };
/** @private */
export { _runInDev as runInDev };
