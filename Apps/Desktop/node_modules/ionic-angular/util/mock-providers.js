var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { NgZone } from '@angular/core';
import { App } from '../components/app/app';
import { Config } from '../config/config';
import { Content } from '../components/content/content';
import { DeepLinker } from '../navigation/deep-linker';
import { DomController } from '../platform/dom-controller';
import { GestureController } from '../gestures/gesture-controller';
import { Haptic } from '../tap-click/haptic';
import { IonicApp } from '../components/app/app-root';
import { Keyboard } from '../platform/keyboard';
import { Menu } from '../components/menu/menu';
import { NavControllerBase } from '../navigation/nav-controller-base';
import { OverlayPortal } from '../components/nav/overlay-portal';
import { PageTransition } from '../transitions/page-transition';
import { Platform } from '../platform/platform';
import { QueryParams } from '../platform/query-params';
import { Tab } from '../components/tabs/tab';
import { Tabs } from '../components/tabs/tabs';
import { TransitionController } from '../transitions/transition-controller';
import { UrlSerializer } from '../navigation/url-serializer';
import { ViewController } from '../navigation/view-controller';
import { ViewState } from '../navigation/nav-util';
export function mockConfig(config, url, platform) {
    if (url === void 0) { url = '/'; }
    var c = new Config();
    var p = platform || mockPlatform();
    c.init(config, p);
    return c;
}
export function mockQueryParams(url) {
    if (url === void 0) { url = '/'; }
    var qp = new QueryParams();
    qp.parseUrl(url);
    return qp;
}
export function mockPlatform() {
    return new MockPlatform();
}
export var MockPlatform = (function (_super) {
    __extends(MockPlatform, _super);
    function MockPlatform() {
        _super.call(this);
        this.timeoutIds = 0;
        this.timeouts = [];
        this.rafIds = 0;
        this.timeStamps = 0;
        this.rafs = [];
        var doc = document.implementation.createHTMLDocument('');
        this.setWindow(window);
        this.setDocument(doc);
        this.setCssProps(doc.documentElement);
    }
    MockPlatform.prototype.timeout = function (callback, timeout) {
        var timeoutId = ++this.timeoutIds;
        this.timeouts.push({
            callback: callback,
            timeout: timeout,
            timeoutId: timeoutId
        });
        return timeoutId;
    };
    MockPlatform.prototype.cancelTimeout = function (timeoutId) {
        for (var i = 0; i < this.timeouts.length; i++) {
            if (timeoutId === this.timeouts[i].timeoutId) {
                this.timeouts.splice(i, 1);
                break;
            }
        }
    };
    MockPlatform.prototype.flushTimeouts = function (done) {
        var _this = this;
        setTimeout(function () {
            _this.timeouts.sort(function (a, b) {
                if (a.timeout < b.timeout)
                    return -1;
                if (a.timeout > b.timeout)
                    return 1;
                return 0;
            }).forEach(function (t) {
                t.callback();
            });
            _this.timeouts.length = 0;
            done();
        });
    };
    MockPlatform.prototype.flushTimeoutsUntil = function (timeout, done) {
        var _this = this;
        setTimeout(function () {
            _this.timeouts.sort(function (a, b) {
                if (a.timeout < b.timeout)
                    return -1;
                if (a.timeout > b.timeout)
                    return 1;
                return 0;
            });
            var keepers = [];
            _this.timeouts.forEach(function (t) {
                if (t.timeout < timeout) {
                    t.callback();
                }
                else {
                    keepers.push(t);
                }
            });
            _this.timeouts = keepers;
            done();
        });
    };
    MockPlatform.prototype.raf = function (callback) {
        var rafId = ++this.rafIds;
        this.rafs.push({
            callback: callback,
            rafId: rafId
        });
        return rafId;
    };
    MockPlatform.prototype.cancelRaf = function (rafId) {
        for (var i = 0; i < this.rafs.length; i++) {
            if (rafId === this.rafs[i].rafId) {
                this.rafs.splice(i, 1);
                break;
            }
        }
    };
    MockPlatform.prototype.flushRafs = function (done) {
        var _this = this;
        var timestamp = ++this.timeStamps;
        setTimeout(function () {
            _this.rafs.forEach(function (raf) {
                raf.callback(timestamp);
            });
            _this.rafs.length = 0;
            done(timestamp);
        });
    };
    return MockPlatform;
}(Platform));
export function mockDomController(platform) {
    platform = platform || mockPlatform();
    return new MockDomController(platform);
}
export var MockDomController = (function (_super) {
    __extends(MockDomController, _super);
    function MockDomController(mockedPlatform) {
        _super.call(this, mockedPlatform);
        this.mockedPlatform = mockedPlatform;
    }
    MockDomController.prototype.flush = function (done) {
        var _this = this;
        this.mockedPlatform.flushTimeouts(function () {
            _this.mockedPlatform.flushRafs(function (timeStamp) {
                done(timeStamp);
            });
        });
    };
    MockDomController.prototype.flushUntil = function (timeout, done) {
        var _this = this;
        this.mockedPlatform.flushTimeoutsUntil(timeout, function () {
            _this.mockedPlatform.flushRafs(function (timeStamp) {
                done(timeStamp);
            });
        });
    };
    return MockDomController;
}(DomController));
export function mockApp(config, platform) {
    platform = platform || mockPlatform();
    config = config || mockConfig(null, '/', platform);
    var app = new App(config, platform);
    mockIonicApp(app, config, platform);
    return app;
}
export function mockIonicApp(app, config, plt) {
    var appRoot = new IonicApp(null, null, mockElementRef(), mockRenderer(), config, plt, app);
    appRoot._loadingPortal = mockOverlayPortal(app, config, plt);
    appRoot._toastPortal = mockOverlayPortal(app, config, plt);
    appRoot._overlayPortal = mockOverlayPortal(app, config, plt);
    appRoot._modalPortal = mockOverlayPortal(app, config, plt);
    return appRoot;
}
export var mockTrasitionController = function (config) {
    var platform = mockPlatform();
    platform.raf = function (callback) {
        callback();
    };
    var trnsCtrl = new TransitionController(platform, config);
    trnsCtrl.get = function (trnsId, enteringView, leavingView, opts) {
        var trns = new PageTransition(platform, enteringView, leavingView, opts);
        trns.trnsId = trnsId;
        return trns;
    };
    return trnsCtrl;
};
export function mockContent() {
    var platform = mockPlatform();
    return new Content(mockConfig(), platform, mockDomController(platform), mockElementRef(), mockRenderer(), null, null, mockZone(), null, null);
}
export function mockZone() {
    return new NgZone(false);
}
export function mockChangeDetectorRef() {
    var cd = {
        reattach: function () { },
        detach: function () { },
        detectChanges: function () { }
    };
    return cd;
}
export var MockElementRef = (function () {
    function MockElementRef() {
        this.nativeElement = new MockElement();
    }
    return MockElementRef;
}());
export var MockElement = (function () {
    function MockElement() {
        this.children = [];
        this.classList = new ClassList();
        this.attributes = {};
        this.style = {};
        this.clientWidth = 0;
        this.clientHeight = 0;
        this.clientTop = 0;
        this.clientLeft = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 0;
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.scrollTop = 0;
        this.scrollHeight = 0;
    }
    Object.defineProperty(MockElement.prototype, "className", {
        get: function () {
            return this.classList.classes.join(' ');
        },
        set: function (val) {
            this.classList.classes = val.split(' ');
        },
        enumerable: true,
        configurable: true
    });
    MockElement.prototype.hasAttribute = function (name) {
        return !!this.attributes[name];
    };
    MockElement.prototype.getAttribute = function (name) {
        return this.attributes[name];
    };
    MockElement.prototype.setAttribute = function (name, val) {
        this.attributes[name] = val;
    };
    MockElement.prototype.removeAttribute = function (name) {
        delete this.attributes[name];
    };
    return MockElement;
}());
export var ClassList = (function () {
    function ClassList() {
        this.classes = [];
    }
    ClassList.prototype.add = function (className) {
        if (!this.contains(className)) {
            this.classes.push(className);
        }
    };
    ClassList.prototype.remove = function (className) {
        var index = this.classes.indexOf(className);
        if (index > -1) {
            this.classes.splice(index, 1);
        }
    };
    ClassList.prototype.toggle = function (className) {
        if (this.contains(className)) {
            this.remove(className);
        }
        else {
            this.add(className);
        }
    };
    ClassList.prototype.contains = function (className) {
        return this.classes.indexOf(className) > -1;
    };
    return ClassList;
}());
export function mockElementRef() {
    return new MockElementRef();
}
export var MockRenderer = (function () {
    function MockRenderer() {
    }
    MockRenderer.prototype.setElementAttribute = function (renderElement, name, val) {
        if (name === null) {
            renderElement.removeAttribute(name);
        }
        else {
            renderElement.setAttribute(name, val);
        }
    };
    MockRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    };
    MockRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        renderElement.style[styleName] = styleValue;
    };
    return MockRenderer;
}());
export function mockRenderer() {
    var renderer = new MockRenderer();
    return renderer;
}
export function mockLocation() {
    var location = {
        path: function () { return ''; },
        subscribe: function () { },
        go: function () { },
        back: function () { }
    };
    return location;
}
export function mockView(component, data) {
    if (!component) {
        component = MockView;
    }
    var view = new ViewController(component, data);
    view.init(mockComponentRef());
    return view;
}
export function mockViews(nav, views) {
    nav._views = views;
    views.forEach(function (v) { return v._setNav(nav); });
}
export function mockComponentRef() {
    var componentRef = {
        location: mockElementRef(),
        changeDetectorRef: mockChangeDetectorRef(),
        destroy: function () { }
    };
    return componentRef;
}
export function mockDeepLinker(linkConfig, app) {
    if (linkConfig === void 0) { linkConfig = null; }
    var serializer = new UrlSerializer(linkConfig);
    var location = mockLocation();
    return new DeepLinker(app || mockApp(), serializer, location);
}
export function mockNavController() {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    var app = mockApp(config, platform);
    var zone = mockZone();
    var dom = mockDomController(platform);
    var keyboard = new Keyboard(config, platform, zone, dom);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var componentFactoryResolver = null;
    var gestureCtrl = new GestureController(app);
    var linker = mockDeepLinker(null, app);
    var trnsCtrl = mockTrasitionController(config);
    var nav = new NavControllerBase(null, app, config, platform, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, trnsCtrl, linker, dom);
    nav._viewInit = function (enteringView) {
        enteringView.init(mockComponentRef());
        enteringView._state = ViewState.INITIALIZED;
    };
    nav._orgViewInsert = nav._viewAttachToDOM;
    nav._viewAttachToDOM = function (view, componentRef, viewport) {
        var mockedViewport = {
            insert: function () { }
        };
        nav._orgViewInsert(view, componentRef, mockedViewport);
    };
    return nav;
}
export function mockOverlayPortal(app, config, plt) {
    var zone = mockZone();
    var dom = mockDomController(plt);
    var keyboard = new Keyboard(config, plt, zone, dom);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var componentFactoryResolver = null;
    var gestureCtrl = new GestureController(app);
    var serializer = new UrlSerializer(null);
    var location = mockLocation();
    var deepLinker = new DeepLinker(app, serializer, location);
    return new OverlayPortal(app, config, plt, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, null, deepLinker, null, dom);
}
export function mockTab(parentTabs) {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    var app = parentTabs._app || mockApp(config, platform);
    var zone = mockZone();
    var dom = mockDomController(platform);
    var keyboard = new Keyboard(config, platform, zone, dom);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var changeDetectorRef = mockChangeDetectorRef();
    var compiler = null;
    var gestureCtrl = new GestureController(app);
    var linker = mockDeepLinker(null, app);
    var tab = new Tab(parentTabs, app, config, platform, keyboard, elementRef, zone, renderer, compiler, changeDetectorRef, gestureCtrl, null, linker, dom);
    tab.load = function (opts, cb) {
        cb();
    };
    return tab;
}
export function mockTabs(app) {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    app = app || mockApp(config, platform);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var linker = mockDeepLinker();
    return new Tabs(null, null, app, config, elementRef, platform, renderer, linker);
}
export function mockMenu() {
    var app = mockApp();
    var gestureCtrl = new GestureController(app);
    var dom = mockDomController();
    return new Menu(null, null, null, null, null, null, null, gestureCtrl, dom, app);
}
export function mockDeepLinkConfig(links) {
    return {
        links: links || [
            { component: MockView1, name: 'viewone' },
            { component: MockView2, name: 'viewtwo' },
            { component: MockView3, name: 'viewthree' },
            { component: MockView4, name: 'viewfour' },
            { component: MockView5, name: 'viewfive' }
        ]
    };
}
export function mockHaptic() {
    return new Haptic(mockPlatform());
}
export var MockView = (function () {
    function MockView() {
    }
    return MockView;
}());
export var MockView1 = (function () {
    function MockView1() {
    }
    return MockView1;
}());
export var MockView2 = (function () {
    function MockView2() {
    }
    return MockView2;
}());
export var MockView3 = (function () {
    function MockView3() {
    }
    return MockView3;
}());
export var MockView4 = (function () {
    function MockView4() {
    }
    return MockView4;
}());
export var MockView5 = (function () {
    function MockView5() {
    }
    return MockView5;
}());
export function noop() { return 'noop'; }
;
//# sourceMappingURL=mock-providers.js.map