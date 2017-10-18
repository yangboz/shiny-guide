import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { createTransition } from './transition-registry';
import { isPresent } from '../util/util';
import { Platform } from '../platform/platform';
/**
 * @private
 */
export var TransitionController = (function () {
    function TransitionController(plt, _config) {
        this.plt = plt;
        this._config = _config;
        this._ids = 0;
        this._trns = {};
    }
    TransitionController.prototype.getRootTrnsId = function (nav) {
        var parent = nav.parent;
        while (parent) {
            if (isPresent(parent._trnsId)) {
                return parent._trnsId;
            }
            parent = parent.parent;
        }
        return null;
    };
    TransitionController.prototype.nextId = function () {
        return this._ids++;
    };
    TransitionController.prototype.get = function (trnsId, enteringView, leavingView, opts) {
        var trns = createTransition(this.plt, this._config, opts.animation, enteringView, leavingView, opts);
        trns.trnsId = trnsId;
        if (!this._trns[trnsId]) {
            // we haven't created the root transition yet
            this._trns[trnsId] = trns;
        }
        else {
            // we already have a root transition created
            // add this new transition as a child to the root
            this._trns[trnsId].add(trns);
        }
        return trns;
    };
    TransitionController.prototype.destroy = function (trnsId) {
        if (this._trns[trnsId]) {
            this._trns[trnsId].destroy();
            delete this._trns[trnsId];
        }
    };
    TransitionController.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TransitionController.ctorParameters = [
        { type: Platform, },
        { type: Config, },
    ];
    return TransitionController;
}());
//# sourceMappingURL=transition-controller.js.map