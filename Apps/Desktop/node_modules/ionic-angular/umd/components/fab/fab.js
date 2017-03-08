var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../util/util', '../../platform/platform', '../../gestures/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var platform_1 = require('../../platform/platform');
    var ui_event_manager_1 = require('../../gestures/ui-event-manager');
    /**
      * @name FabButton
      * @module ionic
      *
      * @description
      * FABs (Floating Action Buttons) are standard material design components. They are shaped as a circle that represents a promoted action. When pressed, it may contain more related actions.
      * FABs as its name suggests are floating over the content in a fixed position. This is not achieved exclusively with `<button ion-fab>Button</button>` but it has to wrapped with the `<ion-fab>` component, like this:
      *
      * ```html
      * <ion-content>
      *  <!-- Real floating action button, fixed. It will not scroll with the content -->
      *  <ion-fab>
      *    <button ion-fab>Button</button>
      *  </ion-fab>
      *
      *  <!-- Button shaped as a circle that just like a normal button scrolls with the content -->
      *  <button ion-fab>Button</button>
      * </ion-content>
      *
      * ```
      *
      * In case the button is not wrapped with `<ion-fab>`, the fab button will behave like a normal button, scrolling with the content.
      *
      * See [ion-fab] to learn more information about how to position the fab button.
      *
      * @property [mini] - Makes a fab button with a reduced size.
      *
      * @usage
      *
      * ```html
      *
      * <!-- Colors -->
      * <ion-fab>
      *   <button ion-fab color="primary">Button</button>
      * </ion-fab>
      *
      * <!-- Mini -->
      * <ion-fab>
      *   <button ion-fab mini>Small</button>
      * </ion-fab>
      * ```
      *
      * @demo /docs/v2/demos/src/fab/
      * @see {@link /docs/v2/components#fabs FAB Component Docs}
     */
    var FabButton = (function (_super) {
        __extends(FabButton, _super);
        function FabButton(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer, 'fab');
        }
        Object.defineProperty(FabButton.prototype, "color", {
            /**
             * @input {string} The color to use from your Sass `$colors` map.
             * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
             * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
             */
            set: function (val) {
                this._setColor(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FabButton.prototype, "mode", {
            /**
             * @input {string} The mode determines which platform styles to use.
             * Possible values are: `"ios"`, `"md"`, or `"wp"`.
             * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
             */
            set: function (val) {
                this._setMode(val);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        FabButton.prototype.setActiveClose = function (closeVisible) {
            this.setElementClass('fab-close-active', closeVisible);
        };
        FabButton.decorators = [
            { type: core_1.Component, args: [{
                        selector: '[ion-fab]',
                        template: '<ion-icon name="close" class="fab-close-icon"></ion-icon>' +
                            '<span class="button-inner">' +
                            '<ng-content></ng-content>' +
                            '</span>' +
                            '<div class="button-effect"></div>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        FabButton.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        FabButton.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return FabButton;
    }(ion_1.Ion));
    exports.FabButton = FabButton;
    /**
      * @name FabList
      * @description
      * `ion-fab-list` is a container for multiple FAB buttons. They are components of `ion-fab` and allow you to specificy the buttons position, left, right, top, bottom.
      * @usage
      *
      * ```html
      *  <ion-fab bottom right >
      *    <button ion-fab>Share</button>
      *    <ion-fab-list side="top">
      *      <button ion-fab>Facebook</button>
      *      <button ion-fab>Twitter</button>
      *      <button ion-fab>Youtube</button>
      *    </ion-fab-list>
      *    <ion-fab-list side="left">
      *      <button ion-fab>Vimeo</button>
      *    </ion-fab-list>
      *  </ion-fab>
      * ```
      * @module ionic
      *
      * @demo /docs/v2/demos/src/fab/
      * @see {@link /docs/v2/components#fab Fab Component Docs}
     */
    var FabList = (function () {
        function FabList(_elementRef, _renderer, config, _plt) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._plt = _plt;
            this._visible = false;
            this._fabs = [];
            this._mode = config.get('mode');
        }
        Object.defineProperty(FabList.prototype, "_setbuttons", {
            set: function (query) {
                var fabs = this._fabs = query.toArray();
                var className = "fab-" + this._mode + "-in-list";
                for (var _i = 0, fabs_1 = fabs; _i < fabs_1.length; _i++) {
                    var fab = fabs_1[_i];
                    fab.setElementClass('fab-in-list', true);
                    fab.setElementClass(className, true);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        FabList.prototype.setVisible = function (val) {
            var _this = this;
            var visible = util_1.isTrueProperty(val);
            if (visible === this._visible) {
                return;
            }
            this._visible = visible;
            var fabs = this._fabs;
            var i = 1;
            if (visible) {
                fabs.forEach(function (fab) {
                    _this._plt.timeout(function () { return fab.setElementClass('show', true); }, i * 30);
                    i++;
                });
            }
            else {
                fabs.forEach(function (fab) { return fab.setElementClass('show', false); });
            }
            this.setElementClass('fab-list-active', visible);
        };
        /**
         * @internal
         */
        FabList.prototype.setElementClass = function (className, add) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
        };
        FabList.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-fab-list',
                    },] },
        ];
        /** @nocollapse */
        FabList.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: config_1.Config, },
            { type: platform_1.Platform, },
        ];
        FabList.propDecorators = {
            '_setbuttons': [{ type: core_1.ContentChildren, args: [FabButton,] },],
        };
        return FabList;
    }());
    exports.FabList = FabList;
    /**
      * @name FabContainer
      * @module ionic
      *
      * @description
      * `<ion-fab>` is not a FAB button by itself but a container that assist the fab button (`<button ion-fab>`) allowing it
      * to be placed in fixed position that does not scroll with the content. It is also used to implement "material design speed dial",
      * ie. a FAB buttons displays a small lists of related actions when clicked.
      *
      * @property [top] - Places the container on the top of the content
      * @property [bottom] - Places the container on the bottom  of the content
      * @property [left] - Places the container on the left
      * @property [right] - Places the container on the right
      * @property [middle] - Places the container on the middle vertically
      * @property [center] - Places the container on the center horizontally
      * @property [edge] - Used to place the container between the content and the header/footer
      *
      * @usage
      *
      * ```html
      * <!-- this fab is placed at top right -->
      * <ion-content>
      *  <ion-fab top right>
      *    <button ion-fab>Button</button>
      *  </ion-fab>
      *
      *  <!-- this fab is placed at the center of the content viewport -->
      *  <ion-fab center middle>
      *    <button ion-fab>Button</button>
      *  </ion-fab>
      * </ion-content>
      * ```
      *
      * Ionic's FAB also supports "material design's fab speed dial". It is a normal fab button
      * that shows a list of related actions when clicked.
      *
      * The same `ion-fab` container can contain several `ion-fab-list` with different side values:
      * `top`, `bottom`, `left` and `right`. For example, if you want to have a list of button that are
      * on the top of the main button, you should use `side="top"` and so on. By default, if side is ommited, `side="bottom"`.
      *
      * ```html
      * <ion-content>
      *  <!-- this fab is placed at bottom right -->
      *  <ion-fab bottom right >
      *    <button ion-fab>Share</button>
      *    <ion-fab-list side="top">
      *      <button ion-fab>Facebook</button>
      *      <button ion-fab>Twitter</button>
      *      <button ion-fab>Youtube</button>
      *    </ion-fab-list>
      *    <ion-fab-list side="left">
      *      <button ion-fab>Vimeo</button>
      *    </ion-fab-list>
      *  </ion-fab>
      * </ion-content>
      * ```
      *
      * A FAB speed dial can also be closed programatically.
      *
      * ```html
      * <ion-content>
      *  <ion-fab bottom right #fab>
      *    <button ion-fab>Share</button>
      *    <ion-fab-list side="top">
      *      <button ion-fab (click)="share('facebook', fab)">Facebook</button>
      *      <button ion-fab (click)="share('twitter', fab)">Twitter</button>
      *    </ion-fab-list>
      *  </ion-fab>
      * </ion-content>
      * ```
      *
      * ```ts
      * share(socialNet: string, fab: FabContainer) {
      *   fab.close();
      *   console.log("Sharing in", socialNet);
      * }
      * ```
      *
      * @demo /docs/v2/demos/src/fab/
      * @see {@link /docs/v2/components#fabs FAB Component Docs}
     */
    var FabContainer = (function () {
        function FabContainer(_elementRef, plt) {
            this._elementRef = _elementRef;
            /**
             * @private
             */
            this._listsActive = false;
            this._events = new ui_event_manager_1.UIEventManager(plt);
        }
        /**
         * @private
         */
        FabContainer.prototype.ngAfterContentInit = function () {
            var mainButton = this._mainButton;
            if (!mainButton || !mainButton.getNativeElement()) {
                console.error('FAB container needs a main <button ion-fab>');
                return;
            }
            this._events.listen(mainButton.getNativeElement(), 'click', this.clickHandler.bind(this), { zone: true });
        };
        /**
         * @private
         */
        FabContainer.prototype.clickHandler = function (ev) {
            if (this.canActivateList(ev)) {
                this.toggleList();
            }
        };
        /**
         * @private
         */
        FabContainer.prototype.canActivateList = function (ev) {
            if (this._fabLists.length > 0 && this._mainButton && ev.target) {
                var ele = ev.target.closest('ion-fab>[ion-fab]');
                return (ele && ele === this._mainButton.getNativeElement());
            }
            return false;
        };
        /**
         * @private
         */
        FabContainer.prototype.toggleList = function () {
            this.setActiveLists(!this._listsActive);
        };
        /**
         * @private
         */
        FabContainer.prototype.setActiveLists = function (isActive) {
            if (isActive === this._listsActive) {
                return;
            }
            var lists = this._fabLists.toArray();
            for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
                var list = lists_1[_i];
                list.setVisible(isActive);
            }
            this._mainButton.setActiveClose(isActive);
            this._listsActive = isActive;
        };
        /**
         * Close an active FAB list container
         */
        FabContainer.prototype.close = function () {
            this.setActiveLists(false);
        };
        /**
         * @private
         */
        FabContainer.prototype.ngOnDestroy = function () {
            this._events.destroy();
        };
        FabContainer.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-fab',
                        template: '<ng-content></ng-content>'
                    },] },
        ];
        /** @nocollapse */
        FabContainer.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: platform_1.Platform, },
        ];
        FabContainer.propDecorators = {
            '_mainButton': [{ type: core_1.ContentChild, args: [FabButton,] },],
            '_fabLists': [{ type: core_1.ContentChildren, args: [FabList,] },],
        };
        return FabContainer;
    }());
    exports.FabContainer = FabContainer;
});
//# sourceMappingURL=fab.js.map