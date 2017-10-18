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
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../navigation/deep-linker', '../../platform/dom-controller', '../../gestures/gesture-controller', '../../util/util', '../../platform/keyboard', '../../navigation/nav-controller-base', '../../platform/platform', './tabs', '../../transitions/transition-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var dom_controller_1 = require('../../platform/dom-controller');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var util_1 = require('../../util/util');
    var keyboard_1 = require('../../platform/keyboard');
    var nav_controller_base_1 = require('../../navigation/nav-controller-base');
    var platform_1 = require('../../platform/platform');
    var tabs_1 = require('./tabs');
    var transition_controller_1 = require('../../transitions/transition-controller');
    /**
     * @name Tab
     * @description
     * The Tab component, written `<ion-tab>`, is styled based on the mode and should
     * be used in conjunction with the [Tabs](../Tabs/) component.
     *
     * Each `ion-tab` is a declarative component for a [NavController](../../../navigation/NavController/).
     * Basically, each tab is a `NavController`. For more information on using
     * navigation controllers take a look at the [NavController API Docs](../../../navigation/NavController/).
     *
     * See the [Tabs API Docs](../Tabs/) for more details on configuring Tabs.
     *
     * @usage
     *
     * To add a basic tab, you can use the following markup where the `root` property
     * is the page you want to load for that tab, `tabTitle` is the optional text to
     * display on the tab, and `tabIcon` is the optional [icon](../../icon/Icon/).
     *
     * ```html
     * <ion-tabs>
     *  <ion-tab [root]="chatRoot" tabTitle="Chat" tabIcon="chat"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * Then, in your class you can set `chatRoot` to an imported class:
     *
     * ```ts
     * import { ChatPage } from '../chat/chat';
     *
     * export class Tabs {
     *   // here we'll set the property of chatRoot to
     *   // the imported class of ChatPage
     *   chatRoot = ChatPage;
     *
     *   constructor() {
     *
     *   }
     * }
     * ```
     *
     * You can also pass some parameters to the root page of the tab through
     * `rootParams`. Below we pass `chatParams` to the Chat tab:
     *
     * ```html
     * <ion-tabs>
     *  <ion-tab [root]="chatRoot" [rootParams]="chatParams" tabTitle="Chat" tabIcon="chat"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * ```ts
     * export class Tabs {
     *   chatRoot = ChatPage;
     *
     *   // set some user information on chatParams
     *   chatParams = {
     *     user1: "admin",
     *     user2: "ionic"
     *   };
     *
     *   constructor() {
     *
     *   }
     * }
     * ```
     *
     * And in `ChatPage` you can get the data from `NavParams`:
     *
     * ```ts
     * export class ChatPage {
     *   constructor(navParams: NavParams) {
     *     console.log("Passed params", navParams.data);
     *   }
     * }
     * ```
     *
     * Sometimes you may want to call a method instead of navigating to a new
     * page. You can use the `(ionSelect)` event to call a method on your class when
     * the tab is selected. Below is an example of presenting a modal from one of
     * the tabs.
     *
     * ```html
     * <ion-tabs>
     *   <ion-tab (ionSelect)="chat()" tabTitle="Show Modal"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * ```ts
     * export class Tabs {
     *   constructor(public modalCtrl: ModalController) {
     *
     *   }
     *
     *   chat() {
     *     let modal = this.modalCtrl.create(ChatPage);
     *     modal.present();
     *   }
     * }
     * ```
     *
     *
     * @demo /docs/v2/demos/src/tabs/
     * @see {@link /docs/v2/components#tabs Tabs Component Docs}
     * @see {@link ../../tabs/Tabs Tabs API Docs}
     * @see {@link ../../nav/Nav Nav API Docs}
     * @see {@link ../../nav/NavController NavController API Docs}
     */
    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(parent, app, config, plt, keyboard, elementRef, zone, renderer, cfr, _cd, gestureCtrl, transCtrl, linker, _dom) {
            // A Tab is a NavController for its child pages
            _super.call(this, parent, app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, _dom);
            this._cd = _cd;
            this.linker = linker;
            this._dom = _dom;
            /**
             * @private
             */
            this._isEnabled = true;
            /**
             * @private
             */
            this._isShown = true;
            /**
             * @output {Tab} Emitted when the current tab is selected.
             */
            this.ionSelect = new core_1.EventEmitter();
            this.id = parent.add(this);
            this._tabsHideOnSubPages = config.getBoolean('tabsHideOnSubPages');
            this._tabId = 'tabpanel-' + this.id;
            this._btnId = 'tab-' + this.id;
        }
        Object.defineProperty(Tab.prototype, "enabled", {
            /**
             * @input {boolean} If true, enable the tab. If false,
             * the user cannot interact with this element.
             * Default: `true`.
             */
            get: function () {
                return this._isEnabled;
            },
            set: function (val) {
                this._isEnabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "show", {
            /**
             * @input {boolean} If true, the tab button is visible within the
             * tabbar. Default: `true`.
             */
            get: function () {
                return this._isShown;
            },
            set: function (val) {
                this._isShown = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "swipeBackEnabled", {
            /**
             * @input {boolean} If true, swipe to go back is enabled.
             */
            get: function () {
                return this._sbEnabled;
            },
            set: function (val) {
                this._sbEnabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "tabsHideOnSubPages", {
            /**
             * @input {boolean} If true, hide the tabs on child pages.
             */
            get: function () {
                return this._tabsHideOnSubPages;
            },
            set: function (val) {
                this._tabsHideOnSubPages = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "_vp", {
            /**
             * @private
             */
            set: function (val) {
                this.setViewport(val);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Tab.prototype.ngOnInit = function () {
            this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
        };
        /**
         * @private
         */
        Tab.prototype.load = function (opts, done) {
            var _this = this;
            if (!this._loaded && this.root) {
                this.setElementClass('show-tab', true);
                this.push(this.root, this.rootParams, opts, done);
                this._loaded = true;
            }
            else {
                // if this is not the Tab's initial load then we need
                // to refresh the tabbar and content dimensions to be sure
                // they're lined up correctly
                this._dom.read(function () {
                    var active = _this.getActive();
                    if (!active) {
                        return;
                    }
                    var content = active.getIONContent();
                    content && content.resize();
                });
                done(true);
            }
        };
        /**
         * @private
         */
        Tab.prototype._viewAttachToDOM = function (viewCtrl, componentRef, viewport) {
            var isTabSubPage = (this._tabsHideOnSubPages && viewCtrl.index > 0);
            if (isTabSubPage) {
                viewport = this.parent.portal;
            }
            _super.prototype._viewAttachToDOM.call(this, viewCtrl, componentRef, viewport);
            if (isTabSubPage) {
                // add the .tab-subpage css class to tabs pages that should act like subpages
                var pageEleRef = viewCtrl.pageRef();
                if (pageEleRef) {
                    this._renderer.setElementClass(pageEleRef.nativeElement, 'tab-subpage', true);
                }
            }
        };
        /**
         * @private
         */
        Tab.prototype.setSelected = function (isSelected) {
            this.isSelected = isSelected;
            this.setElementClass('show-tab', isSelected);
            this.setElementAttribute('aria-hidden', (!isSelected).toString());
            if (isSelected) {
                // this is the selected tab, detect changes
                this._cd.reattach();
            }
            else {
                // this tab is not selected, do not detect changes
                this._cd.detach();
            }
        };
        Object.defineProperty(Tab.prototype, "index", {
            /**
             * @private
             */
            get: function () {
                return this.parent.getIndex(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Tab.prototype.updateHref = function (component, data) {
            if (this.btn && this.linker) {
                var href = this.linker.createUrl(this, component, data) || '#';
                this.btn.updateHref(href);
            }
        };
        /**
         * @private
         */
        Tab.prototype.destroy = function () {
            this.destroy();
        };
        Tab.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-tab',
                        template: '<div #viewport></div><div class="nav-decor"></div>',
                        host: {
                            '[attr.id]': '_tabId',
                            '[attr.aria-labelledby]': '_btnId',
                            'role': 'tabpanel'
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        Tab.ctorParameters = [
            { type: tabs_1.Tabs, },
            { type: app_1.App, },
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.ChangeDetectorRef, },
            { type: gesture_controller_1.GestureController, },
            { type: transition_controller_1.TransitionController, },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
            { type: dom_controller_1.DomController, },
        ];
        Tab.propDecorators = {
            'root': [{ type: core_1.Input },],
            'rootParams': [{ type: core_1.Input },],
            'tabUrlPath': [{ type: core_1.Input },],
            'tabTitle': [{ type: core_1.Input },],
            'tabIcon': [{ type: core_1.Input },],
            'tabBadge': [{ type: core_1.Input },],
            'tabBadgeStyle': [{ type: core_1.Input },],
            'enabled': [{ type: core_1.Input },],
            'show': [{ type: core_1.Input },],
            'swipeBackEnabled': [{ type: core_1.Input },],
            'tabsHideOnSubPages': [{ type: core_1.Input },],
            'ionSelect': [{ type: core_1.Output },],
            '_vp': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
        };
        return Tab;
    }(nav_controller_base_1.NavControllerBase));
    exports.Tab = Tab;
});
//# sourceMappingURL=tab.js.map