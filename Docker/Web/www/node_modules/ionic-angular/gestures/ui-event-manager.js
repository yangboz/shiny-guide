import { PointerEvents } from './pointer-events';
/**
 * @private
 */
export var UIEventManager = (function () {
    function UIEventManager(plt) {
        this.plt = plt;
        this.evts = [];
    }
    UIEventManager.prototype.pointerEvents = function (config) {
        if (!config.element || !config.pointerDown) {
            console.error('PointerEvents config is invalid');
            return;
        }
        var eventListnerOpts = {
            capture: config.capture,
            passive: config.passive,
            zone: config.zone
        };
        var pointerEvents = new PointerEvents(this.plt, config.element, config.pointerDown, config.pointerMove, config.pointerUp, eventListnerOpts);
        var removeFunc = function () { return pointerEvents.destroy(); };
        this.evts.push(removeFunc);
        return pointerEvents;
    };
    UIEventManager.prototype.listen = function (ele, eventName, callback, opts) {
        if (ele) {
            var removeFunc = this.plt.registerListener(ele, eventName, callback, opts);
            this.evts.push(removeFunc);
            return removeFunc;
        }
    };
    UIEventManager.prototype.destroy = function () {
        this.evts.forEach(function (unRegEvent) {
            unRegEvent();
        });
        this.evts.length = 0;
    };
    return UIEventManager;
}());
//# sourceMappingURL=ui-event-manager.js.map