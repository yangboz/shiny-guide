/**
 * @private
 */
export function indexForItem(element) {
    return element['$ionIndex'];
}
/**
 * @private
 */
export function reorderListForItem(element) {
    return element['$ionReorderList'];
}
/**
 * @private
 */
export function findReorderItem(node, listNode) {
    var nested = 0;
    while (node && nested < 4) {
        if (indexForItem(node) !== undefined) {
            if (listNode && node.parentNode !== listNode) {
                return null;
            }
            return node;
        }
        node = node.parentNode;
        nested++;
    }
    return null;
}
//# sourceMappingURL=item-reorder-util.js.map