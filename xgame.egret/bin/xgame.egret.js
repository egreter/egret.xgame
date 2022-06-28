window.egretx = {};
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
window.__extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (egretx) {
    xgame.XGame.prototype["useEgret"] = function (main) {
        var self = this;
        self.registerServiceProvider(new egretx.EgretProvider(main));
    };
    //================================================
    // Group
    //================================================
    var SBState;
    (function (SBState) {
        SBState[SBState["INVALID"] = 0] = "INVALID";
        SBState[SBState["H_HEAD"] = 1] = "H_HEAD";
        SBState[SBState["H_MID"] = 2] = "H_MID";
        SBState[SBState["H_TAIL"] = 4] = "H_TAIL";
        SBState[SBState["V_HEAD"] = 8] = "V_HEAD";
        SBState[SBState["V_MID"] = 16] = "V_MID";
        SBState[SBState["V_TAIL"] = 32] = "V_TAIL";
    })(SBState = egretx.SBState || (egretx.SBState = {}));
    eui.Group.prototype["onResizeChanged"] = function () {
        var self = this;
        var listener = self.__callback_onResize__;
        if (!listener) {
            listener = new xgame.Signal0();
            self.__callback_onResize__ = listener;
        }
        return listener;
    };
    var group_setContentSize = eui.Group.prototype.setContentSize;
    eui.Group.prototype.setContentSize = function (width, height) {
        group_setContentSize.call(this, width, height);
        var self = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.dispatch();
        }
    };
    eui.Group.prototype["__onHScrollChanged__"] = function () {
        var self = this;
        var v = self.scrollV;
        var max = self.contentHeight;
        var sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onHS__.dispatch(SBState.H_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_TAIL);
            }
        }
        else {
            self.__callback_onHS__.dispatch(SBState.INVALID);
        }
    };
    eui.Group.prototype["onHS"] = function () {
        var self = this;
        if (!self.__callback_onHS__) {
            self.__callback_onHS__ = new xgame.Signal1();
            self.__h_1_wacther__ = eui.Binding.bindHandler(self, ["contentWidth"], self.__onHScrollChanged__, this);
            self.__h_2_wacther__ = eui.Binding.bindHandler(self, ["scrollH"], self.__onHScrollChanged__, this);
        }
        return self.__callback_onHS__;
    };
    eui.Group.prototype["__onVScrollChanged__"] = function () {
        var self = this;
        var v = self.scrollV;
        var max = self.contentHeight;
        var sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onVS__.dispatch(SBState.V_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_TAIL);
            }
        }
        else {
            self.__callback_onVS__.dispatch(SBState.INVALID);
        }
    };
    eui.Group.prototype["onVS"] = function () {
        var self = this;
        if (!self.__callback_onVS__) {
            self.__callback_onVS__ = new xgame.Signal1();
            self.__v_1_wacther__ = eui.Binding.bindHandler(self, ["contentHeight"], self.__onVScrollChanged__, this);
            self.__v_2_wacther__ = eui.Binding.bindHandler(self, ["scrollV"], self.__onVScrollChanged__, this);
        }
        return self.__callback_onVS__;
    };
    var group_onRemoveFromStage = eui.Group.prototype["$onRemoveFromStage"];
    eui.Group.prototype["$onRemoveFromStage"] = function () {
        group_onRemoveFromStage.apply(this);
        var self = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.removeAll();
        }
        if (self.__callback_onHS__) {
            self.__callback_onHS__.removeAll();
            self.__h_1_wacther__.unwatch();
            self.__h_2_wacther__.unwatch();
            self.__callback_onHS__ = undefined;
            self.__h_1_wacther__ = undefined;
            self.__h_2_wacther__ = undefined;
        }
        if (self.__callback_onVS__) {
            self.__callback_onVS__.removeAll();
            self.__v_1_wacther__.unwatch();
            self.__v_2_wacther__.unwatch();
            self.__callback_onVS__ = undefined;
            self.__v_1_wacther__ = undefined;
            self.__v_2_wacther__ = undefined;
        }
    };
    eui.DataGroup.prototype["getScroller"] = function () {
        var self = this;
        if (self.parent && egret.is(self.parent, "eui.Scroller")) {
            return self.parent;
        }
    };
    eui.DataGroup.prototype["setItemWidth"] = function (width) {
        var self = this;
        self.__itemWidth__ = width;
    };
    eui.DataGroup.prototype["setItemHeight"] = function (height) {
        var self = this;
        self.__itemHeight__ = height;
    };
    eui.DataGroup.prototype["scrollToIndex"] = function (index) {
        var self = this;
        var scroller = self.getScroller();
        if (!scroller) {
            return;
        }
        var size = 0;
        var gap = 0;
        var max_size = 0;
        if (egret.is(self.layout, "eui.LinearLayoutBase")) {
            gap = self.layout.gap;
        }
        if (self.__itemWidth__) {
            max_size = self.contentWidth - scroller.width;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemWidth__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollH = size;
        }
        else if (self.__itemHeight__) {
            max_size = self.contentHeight - scroller.height;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemHeight__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollV = size;
        }
    };
    eui.DataGroup.prototype["replaceAll"] = function (items, reset) {
        var self = this;
        var index = 0;
        if (typeof (reset) === "number") {
            index = reset;
            self.onResizeChanged().addOnce(function () {
                self.scrollToIndex(index);
            }, this);
        }
        var dataSource = self.__dataSource__;
        if (dataSource == undefined || typeof (reset) === "boolean" && reset) {
            dataSource = new eui.ArrayCollection(items);
            self.__dataSource__ = dataSource;
            self.dataProvider = dataSource;
        }
        else {
            dataSource.replaceAll(items);
        }
    };
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (egretx) {
    egretx.IUIManager = Symbol.for("IUIManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (egretx) {
    egretx.IUIManagerInternal = Symbol.for("IUIManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./ui/interfaces/IUIManager.ts" />
/// <reference path="./ui/interfaces/IUIManagerInternal.ts" />

(function (egretx) {
    var EgretProvider = (function (_super) {
        __extends(EgretProvider, _super);
        function EgretProvider(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.priority = 100;
            return _this;
        }
        EgretProvider.prototype.onInit = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        EgretProvider.prototype.onStart = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.getService(egretx.IUIManagerInternal).initialize();
                    game.getService(egretx.ITouchManagerInternal).initialize();
                    return [2 /*return*/, true];
                });
            });
        };
        EgretProvider.prototype.onServiceRegister = function (game) {
            game.singleton(egretx.IUIManager, egretx.UIManager).withInstance(new egretx.UIManager(this.main)).setAlias(egretx.IUIManagerInternal);
            game.singleton(egretx.ITouchManager, egretx.TouchManager).withInstance(new egretx.TouchManager(this.main)).setAlias(egretx.ITouchManagerInternal);
        };
        return EgretProvider;
    }(xgame.XObject));
    egretx.EgretProvider = EgretProvider;
    __reflect(EgretProvider.prototype, "egretx.EgretProvider", ["xgame.IServiceProvider"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.event = xgame.event;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.impl = xgame.impl;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.inject = xgame.inject;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.injectable = xgame.injectable;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (egretx) {
    egretx.ITouchManager = Symbol.for("ITouchManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (egretx) {
    egretx.ITouchManagerInternal = Symbol.for("ITouchManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./interfaces/ITouchManager.ts" />
/// <reference path="./interfaces/ITouchManagerInternal.ts" />

(function (egretx) {
    egretx.TOUCH_TAP_BETWEEN_TIME = 300;
    egretx.TOUCH_LONG_PRESS_TIME = 300;
    egretx.TOUCH_SCALE_RADIO = 0.96;
    egretx.touchClickLastTime = 0;
    var TouchManager = (function (_super) {
        __extends(TouchManager, _super);
        function TouchManager(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.delegates = new xgame.Dictionary();
            _this.stage = main.stage;
            return _this;
        }
        TouchManager.prototype.dispose = function () {
            this.delegates.clear(function (delegate) {
                delegate.dispose();
            });
            egretx.touchClickLastTime = 0;
        };
        TouchManager.prototype.initialize = function () {
            this.stage.addEventListener(egret.TouchEvent.LEAVE_STAGE, this.onLeaveStage, this);
        };
        TouchManager.prototype.onLeaveStage = function (event) {
            this.delegates.forValues(function (delegate) {
                delegate.onLeaveStage(event);
            }, this);
        };
        TouchManager.prototype.removeTouchEvents = function (target) {
            var guid = 0;
            if (typeof (target) === "number") {
                guid = target;
            }
            else {
                guid = target.hashCode;
            }
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.remove(guid);
            delegate.dispose();
        };
        TouchManager.prototype.addTouchBegin = function (target, listener, thisObject, scale) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target, scale);
            });
            delegate.addTouchBegin(listener, thisObject);
        };
        TouchManager.prototype.removeTouchBegin = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeTouchBegin(listener, thisObject);
        };
        TouchManager.prototype.addTouchMove = function (target, listener, thisObject) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.addTouchMove(listener, thisObject);
        };
        TouchManager.prototype.removeTouchMove = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeTouchMove(listener, thisObject);
        };
        TouchManager.prototype.addTouchEnd = function (target, listener, thisObject) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.addTouchEnd(listener, thisObject);
        };
        TouchManager.prototype.removeTouchEnd = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeTouchEnd(listener, thisObject);
        };
        TouchManager.prototype.addReleaseOutSide = function (target, listener, thisObject) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.addReleaseOutSide(listener, thisObject);
        };
        TouchManager.prototype.removeReleaseOutSide = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeReleaseOutSide(listener, thisObject);
        };
        TouchManager.prototype.addClick = function (target, listener, thisObject, scale) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target, scale);
            });
            delegate.addClick(listener, thisObject);
        };
        TouchManager.prototype.removeClick = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeClick(listener, thisObject);
        };
        TouchManager.prototype.addLongPress = function (target, listener, thisObject, time, scale) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target, scale);
            });
            delegate.addLongPress(listener, thisObject, time);
        };
        TouchManager.prototype.removeLongPress = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeLongPress(listener, thisObject);
        };
        TouchManager.prototype.addRepeatPress = function (target, listener, thisObject, time, scale) {
            var guid = target.hashCode;
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target, scale);
            });
            delegate.addRepeatPress(listener, thisObject, time);
        };
        TouchManager.prototype.removeRepeatPress = function (target, listener, thisObject) {
            var guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            var delegate = this.delegates.allocf(guid, function () {
                return new egretx.TouchDelegate(target);
            });
            delegate.removeRepeatPress(listener, thisObject);
        };
        TouchManager = __decorate([
            xgame.impl(xgame.IDisposable, egretx.ITouchManager, egretx.ITouchManagerInternal),
            __metadata("design:paramtypes", [egret.DisplayObjectContainer])
        ], TouchManager);
        return TouchManager;
    }(xgame.XObject));
    egretx.TouchManager = TouchManager;
    __reflect(TouchManager.prototype, "egretx.TouchManager", ["xgame.IDisposable", "xgame.IXObject", "egretx.ITouchManager", "egretx.ITouchManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (egretx) {
    var LayoutCache = (function (_super) {
        __extends(LayoutCache, _super);
        function LayoutCache() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.top = NaN;
            _this.bottom = NaN;
            _this.left = NaN;
            _this.right = NaN;
            _this.horizontalCenter = NaN;
            _this.verticalCenter = NaN;
            _this.percentWidth = NaN;
            _this.percentHeight = NaN;
            _this.anchorOffsetX = NaN;
            _this.anchorOffsetY = NaN;
            _this.x = 0;
            _this.y = 0;
            _this.width = 0;
            _this.height = 0;
            _this.scaleX = 1;
            _this.scaleY = 1;
            return _this;
        }
        LayoutCache.prototype.reset = function () {
            this.top = NaN;
            this.bottom = NaN;
            this.left = NaN;
            this.right = NaN;
            this.horizontalCenter = NaN;
            this.verticalCenter = NaN;
            this.percentWidth = NaN;
            this.percentHeight = NaN;
            this.anchorOffsetX = NaN;
            this.anchorOffsetY = NaN;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.scaleX = 1;
            this.scaleY = 1;
        };
        return LayoutCache;
    }(xgame.XObject));
    egretx.LayoutCache = LayoutCache;
    __reflect(LayoutCache.prototype, "egretx.LayoutCache");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (egretx) {
    var TouchBehaviours = (function () {
        function TouchBehaviours() {
        }
        TouchBehaviours.prototype.setTouchManager = function (target) {
            if (this.disposableGroup) {
                return;
            }
            this.disposableGroup = new egretx.TouchDisposableGroup(target);
        };
        TouchBehaviours.prototype.addTouchBegin = function (target, listener, thisObject, scale) {
            this.disposableGroup.addTouchBegin(target, listener, thisObject, scale);
        };
        TouchBehaviours.prototype.removeTouchBegin = function (target, listener, thisObject) {
            this.disposableGroup.removeTouchBegin(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addTouchMove = function (target, listener, thisObject) {
            this.disposableGroup.addTouchMove(target, listener, thisObject);
        };
        TouchBehaviours.prototype.removeTouchMove = function (target, listener, thisObject) {
            this.disposableGroup.removeTouchMove(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addTouchEnd = function (target, listener, thisObject) {
            this.disposableGroup.addTouchEnd(target, listener, thisObject);
        };
        TouchBehaviours.prototype.removeTouchEnd = function (target, listener, thisObject) {
            this.disposableGroup.removeTouchEnd(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addReleaseOutSide = function (target, listener, thisObject) {
            this.disposableGroup.addReleaseOutSide(target, listener, thisObject);
        };
        TouchBehaviours.prototype.removeReleaseOutSide = function (target, listener, thisObject) {
            this.disposableGroup.removeReleaseOutSide(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addClick = function (target, listener, thisObject, scale) {
            this.disposableGroup.addClick(target, listener, thisObject, scale);
        };
        TouchBehaviours.prototype.removeClick = function (target, listener, thisObject) {
            this.disposableGroup.removeClick(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addLongPress = function (target, listener, thisObject, time, scale) {
            this.disposableGroup.addLongPress(target, listener, thisObject, time, scale);
        };
        TouchBehaviours.prototype.removeLongPress = function (target, listener, thisObject) {
            this.disposableGroup.removeLongPress(target, listener, thisObject);
        };
        TouchBehaviours.prototype.addRepeatPress = function (target, listener, thisObject, time, scale) {
            this.disposableGroup.addRepeatPress(target, listener, thisObject, time, scale);
        };
        TouchBehaviours.prototype.removeRepeatPress = function (target, listener, thisObject) {
            this.disposableGroup.removeRepeatPress(target, listener, thisObject);
        };
        return TouchBehaviours;
    }());
    egretx.TouchBehaviours = TouchBehaviours;
    __reflect(TouchBehaviours.prototype, "egretx.TouchBehaviours");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (egretx) {
    var TouchDelegate = (function (_super) {
        __extends(TouchDelegate, _super);
        function TouchDelegate(target, scale) {
            if (scale === void 0) { scale = false; }
            var _this = _super.call(this) || this;
            _this.clickScaleEnable = false;
            _this.longPressTimeDelta = egretx.TOUCH_LONG_PRESS_TIME;
            _this.repeatPressTimeDelta = egretx.TOUCH_LONG_PRESS_TIME;
            _this.repeat_timer_id = 0;
            _this.target = target;
            _this.clickScaleEnable = scale;
            _this.initTouchEvents();
            return _this;
        }
        TouchDelegate.prototype.onLeaveStage = function (event) {
            this.onTouchEnd(event);
        };
        TouchDelegate.prototype.addTouchBegin = function (listener, thisObject) {
            this.beginHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeTouchBegin = function (listener, thisObject) {
            this.beginHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addTouchMove = function (listener, thisObject) {
            this.moveHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeTouchMove = function (listener, thisObject) {
            this.moveHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addTouchEnd = function (listener, thisObject) {
            this.endHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeTouchEnd = function (listener, thisObject) {
            this.endHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addReleaseOutSide = function (listener, thisObject) {
            this.releaseOutsideHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeReleaseOutSide = function (listener, thisObject) {
            this.releaseOutsideHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addClick = function (listener, thisObject) {
            this.clickHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeClick = function (listener, thisObject) {
            this.clickHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addLongPress = function (listener, thisObject, time) {
            if (time === void 0) { time = 300; }
            this.longPressTimeDelta = time;
            this.longPressHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeLongPress = function (listener, thisObject) {
            this.longPressHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.addRepeatPress = function (listener, thisObject, time) {
            if (time === void 0) { time = 300; }
            this.repeatPressTimeDelta = time;
            this.repeatPressHandler.listeners.add(listener, thisObject);
        };
        TouchDelegate.prototype.removeRepeatPress = function (listener, thisObject) {
            this.repeatPressHandler.listeners.remove(listener);
        };
        TouchDelegate.prototype.initTouchEvents = function () {
            this.inited = true;
            this.clickHandler = { listeners: new xgame.Signal1(), happend: false };
            this.longPressHandler = { listeners: new xgame.Signal1(), happend: false };
            this.repeatPressHandler = { listeners: new xgame.Signal1(), happend: false };
            this.releaseOutsideHandler = { listeners: new xgame.Signal1(), happend: false };
            this.beginHandler = { listeners: new xgame.Signal1(), happend: false };
            this.moveHandler = { listeners: new xgame.Signal1(), happend: false };
            this.endHandler = { listeners: new xgame.Signal1(), happend: false };
            this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        };
        TouchDelegate.prototype.setRepeatTimer = function () {
            var _this = this;
            this.clearRepeatTimer();
            this.repeat_timer_id = egret.setInterval(function () {
                _this.repeatPressHandler.happend = true;
                _this.repeatPressHandler.listeners.dispatch(null);
            }, this, this.repeatPressTimeDelta);
        };
        TouchDelegate.prototype.clearRepeatTimer = function () {
            if (this.repeat_timer_id) {
                egret.clearInterval(this.repeat_timer_id);
            }
            this.repeat_timer_id = 0;
        };
        TouchDelegate.prototype.onTouchBegin = function (event) {
            if (this.clickScaleEnable) {
                this.cacheLayout();
                this.updateLayout();
            }
            this.beginHandler.happend = true;
            this.beginHandler.time = egret.getTimer();
            this.beginHandler.identifier = event.touchPointID;
            this.beginHandler.listeners.dispatch(event);
            if (this.repeatPressHandler.listeners.numListeners) {
                this.setRepeatTimer();
            }
        };
        TouchDelegate.prototype.cacheLayout = function () {
            if (!this.cache) {
                this.cache = new egretx.LayoutCache();
            }
            this.cache.x = this.target.x;
            this.cache.y = this.target.y;
            this.cache.width = this.target.width;
            this.cache.height = this.target.height;
            this.cache.scaleX = this.target.scaleX;
            this.cache.scaleY = this.target.scaleY;
            this.cache.anchorOffsetX = this.target.anchorOffsetX;
            this.cache.anchorOffsetY = this.target.anchorOffsetY;
            if (this.target instanceof eui.Component) {
                this.cache.top = this.target.top;
                this.cache.bottom = this.target.bottom;
                this.cache.left = this.target.left;
                this.cache.right = this.target.right;
                this.cache.horizontalCenter = this.target.horizontalCenter;
                this.cache.verticalCenter = this.target.verticalCenter;
                this.cache.percentWidth = this.target.percentWidth;
                this.cache.percentHeight = this.target.percentHeight;
            }
        };
        TouchDelegate.prototype.updateLayout = function (isUp) {
            if (!this.cache) {
                return;
            }
            if (isUp) {
                this.target.x = this.cache.x;
                this.target.y = this.cache.y;
                this.target.width = this.cache.width;
                this.target.height = this.cache.height;
                this.target.scaleX = this.cache.scaleX;
                this.target.scaleY = this.cache.scaleY;
                this.target.anchorOffsetX = this.cache.anchorOffsetX;
                this.target.anchorOffsetY = this.cache.anchorOffsetY;
                if (this.target instanceof eui.Component) {
                    this.target.top = this.cache.top;
                    this.target.bottom = this.cache.bottom;
                    this.target.left = this.cache.left;
                    this.target.right = this.cache.right;
                    this.target.horizontalCenter = this.cache.horizontalCenter;
                    this.target.verticalCenter = this.cache.verticalCenter;
                    this.target.percentWidth = this.cache.percentWidth;
                    this.target.percentHeight = this.cache.percentHeight;
                }
            }
            else {
                this.target.width = this.cache.width;
                this.target.height = this.cache.height;
                this.target.anchorOffsetX = this.cache.width / 2;
                this.target.anchorOffsetY = this.cache.height / 2;
                this.target.x += this.cache.width * this.cache.scaleX / 2;
                this.target.y += this.cache.height * this.cache.scaleY / 2;
                this.target.scaleX = this.cache.scaleX * egretx.TOUCH_SCALE_RADIO;
                this.target.scaleY = this.cache.scaleY * egretx.TOUCH_SCALE_RADIO;
                if (this.target instanceof eui.Component) {
                    this.target.top = NaN;
                    this.target.bottom = NaN;
                    this.target.left = NaN;
                    this.target.right = NaN;
                    this.target.horizontalCenter = NaN;
                    this.target.verticalCenter = NaN;
                    this.target.percentWidth = NaN;
                    this.target.percentHeight = NaN;
                }
            }
        };
        TouchDelegate.prototype.onTouchMove = function (event) {
            if (!this.beginHandler.happend) {
                return;
            }
            this.moveHandler.listeners.dispatch(event);
        };
        TouchDelegate.prototype.onTouchEnd = function (event) {
            if (!this.beginHandler.happend) {
                return;
            }
            if (this.clickScaleEnable) {
                this.updateLayout(true);
            }
            if (event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
                this.releaseOutsideHandler.listeners.dispatch(event);
            }
            else {
                this.endHandler.listeners.dispatch(event);
                var end_time = egret.getTimer();
                if (!this.repeatPressHandler.happend && this.longPressHandler.listeners.numListeners && end_time - this.beginHandler.time >= this.longPressTimeDelta) {
                    this.longPressHandler.happend = true;
                    this.longPressHandler.listeners.dispatch(event);
                }
                if (!this.longPressHandler.happend && !this.repeatPressHandler.happend) {
                    if (end_time - egretx.touchClickLastTime > egretx.TOUCH_TAP_BETWEEN_TIME) {
                        egretx.touchClickLastTime = end_time;
                        this.clickHandler.listeners.dispatch(event);
                    }
                }
            }
            this.clearRepeatTimer();
            this.beginHandler.happend = false;
            this.endHandler.happend = false;
            this.moveHandler.happend = false;
            this.releaseOutsideHandler.happend = false;
            this.longPressHandler.happend = false;
            this.repeatPressHandler.happend = false;
        };
        TouchDelegate.prototype.dispose = function () {
            this.cache = undefined;
            if (this.target) {
                this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            this.clickHandler.listeners.removeAll();
            this.clickHandler.happend = false;
            this.longPressHandler.listeners.removeAll();
            this.longPressHandler.happend = false;
            this.repeatPressHandler.listeners.removeAll();
            this.repeatPressHandler.happend = false;
            this.releaseOutsideHandler.listeners.removeAll();
            this.releaseOutsideHandler.happend = false;
            this.beginHandler.listeners.removeAll();
            this.beginHandler.happend = false;
            this.moveHandler.listeners.removeAll();
            this.moveHandler.happend = false;
            this.endHandler.listeners.removeAll();
            this.endHandler.happend = false;
            this.target = undefined;
            this.inited = false;
        };
        return TouchDelegate;
    }(xgame.XObject));
    egretx.TouchDelegate = TouchDelegate;
    __reflect(TouchDelegate.prototype, "egretx.TouchDelegate", ["xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../TouchManager.ts" />
/// <reference path="../interfaces/ITouchManager.ts" />

(function (egretx) {
    var TouchDisposableGroup = (function (_super) {
        __extends(TouchDisposableGroup, _super);
        function TouchDisposableGroup(displayObject) {
            var _this = _super.call(this) || this;
            _this.displayObject = displayObject;
            _this.touches = new xgame.List();
            xgame.injectInstance(_this);
            if (_this.displayObject) {
                _this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            }
            return _this;
        }
        TouchDisposableGroup.prototype.onRemovedFromStage = function () {
            this.dispose();
        };
        TouchDisposableGroup.prototype.dispose = function () {
            var _this = this;
            this.touches.forEach(function (guid) {
                _this.manager.removeTouchEvents(guid);
            });
            this.touches.clear();
            if (this.displayObject) {
                this.displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            }
            this.manager = undefined;
            this.displayObject = undefined;
        };
        TouchDisposableGroup.prototype.addTouchBegin = function (target, listener, thisObject, scale) {
            this.manager.addTouchBegin(target, listener, thisObject, scale);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeTouchBegin = function (target, listener, thisObject) {
            this.manager.removeTouchBegin(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addTouchMove = function (target, listener, thisObject) {
            this.manager.addTouchMove(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeTouchMove = function (target, listener, thisObject) {
            this.manager.removeTouchMove(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addTouchEnd = function (target, listener, thisObject) {
            this.manager.addTouchEnd(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeTouchEnd = function (target, listener, thisObject) {
            this.manager.removeTouchEnd(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addReleaseOutSide = function (target, listener, thisObject) {
            this.manager.addReleaseOutSide(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeReleaseOutSide = function (target, listener, thisObject) {
            this.manager.removeReleaseOutSide(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addClick = function (target, listener, thisObject, scale) {
            this.manager.addClick(target, listener, thisObject, scale);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeClick = function (target, listener, thisObject) {
            this.manager.removeClick(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addLongPress = function (target, listener, thisObject, time, scale) {
            this.manager.addLongPress(target, listener, thisObject, time, scale);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeLongPress = function (target, listener, thisObject) {
            this.manager.removeLongPress(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.addRepeatPress = function (target, listener, thisObject, time, scale) {
            this.manager.addRepeatPress(target, listener, thisObject, time, scale);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        TouchDisposableGroup.prototype.removeRepeatPress = function (target, listener, thisObject) {
            this.manager.removeRepeatPress(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        };
        __decorate([
            xgame.inject(egretx.ITouchManager),
            __metadata("design:type", egretx.TouchManager)
        ], TouchDisposableGroup.prototype, "manager", void 0);
        return TouchDisposableGroup;
    }(xgame.XObject));
    egretx.TouchDisposableGroup = TouchDisposableGroup;
    __reflect(TouchDisposableGroup.prototype, "egretx.TouchDisposableGroup", ["xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (egretx) {
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.pipelines = [];
            _this.uiMap = new xgame.Dictionary();
            _this.uiLayers = new xgame.Dictionary();
            _this.root = new eui.UILayer();
            _this.onSceneChanged = new xgame.Signal2();
            _this.onUIOpened = new xgame.Signal1();
            _this.onUIClosed = new xgame.Signal1();
            _this.RES = new egretx.UIResManager();
            _this.stage = main.stage;
            return _this;
        }
        UIManager.prototype.initialize = function () {
            this.entityManager = new egretx.UIEntityManager(this);
            this.pipelines.push(this.checkIsOpened.bind(this));
            this.pipelines.push(this.createUIPage.bind(this));
            this.pipelines.push(this.openUIPage.bind(this));
            this.root.name = "UIRoot";
            this.main.addChild(this.root);
            for (var i = egretx.UILayerID.Layer_0_Bottom; i <= egretx.UILayerID.Layer_15_Top; i++) {
                var layerManager = new egretx.UILayerManager(this, i);
                this.root.addChildAt(layerManager, i);
                this.uiLayers.add(i, layerManager);
            }
            this.register(egretx.Alert.NAME, egretx.Alert);
            this.register(egretx.PopupMenu.NAME, egretx.PopupMenu);
            egretx.TipsManager.Instance().initialize();
        };
        Object.defineProperty(UIManager.prototype, "sceneTransition", {
            get: function () {
                return this.$sceneTransition;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.setSceneTransition = function (value) {
            this.$sceneTransition = value;
        };
        UIManager.prototype.getLayerManager = function (layerID) {
            return this.uiLayers.get(layerID);
        };
        UIManager.prototype.register = function (uiName, uiClass) {
            this.uiMap.add(uiName, uiClass);
        };
        UIManager.prototype.popUI = function () {
            return false;
        };
        UIManager.prototype.clearScene = function () {
            if (this.currentScene) {
                this._closeUI(this.$currentScene);
                this.$currentScene = undefined;
            }
        };
        UIManager.prototype.closeUI = function (value) {
            if (typeof (value) == "string") {
                var uiName = value;
                var entities = [];
                if (this.entityManager.tryGetEntities(uiName, entities)) {
                    for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                        var entity = entities_1[_i];
                        this._closeUI(entity);
                    }
                }
            }
            else {
                this._closeUI(value);
            }
        };
        UIManager.prototype._closeUI = function (entity) {
            return __awaiter(this, void 0, void 0, function () {
                var layerManager, uiPage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (entity.isClosed) {
                                return [2 /*return*/];
                            }
                            layerManager = this.uiLayers.get(entity.uiPage.layerID);
                            layerManager.removeEntity(entity);
                            this.entityManager.removeEntity(entity);
                            uiPage = entity.uiPage;
                            return [4 /*yield*/, uiPage.doFadeOut()];
                        case 1:
                            _a.sent();
                            if (uiPage.parent) {
                                entity.uiPage.parent.removeChild(entity.uiPage);
                            }
                            if (entity.mask && entity.mask.parent) {
                                entity.mask.parent.removeChild(entity.mask);
                            }
                            this.onUIClosed.dispatch(entity);
                            this.entityManager.checkEntities();
                            entity.onClose();
                            entity.dispose();
                            entity = undefined;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(UIManager.prototype, "currentScene", {
            get: function () {
                return this.$currentScene;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.replaceScene = function (nameOrClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var uiName, uiClass, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = new egretx.UIOptions();
                            if (typeof (nameOrClass) == "string") {
                                uiName = nameOrClass;
                                if (!this.uiMap.containsKey(uiName)) {
                                    throw new Error("此UI没有注册:{0}".format(uiName));
                                }
                                uiClass = this.uiMap.get(uiName);
                            }
                            else {
                                uiClass = nameOrClass;
                            }
                            options.uiClass = uiClass;
                            options.openArgs = args;
                            options.name = xgame.getQualifiedClassName(uiClass);
                            if (this.currentScene) {
                                this.$currentScene.onSceneChanging();
                            }
                            return [4 /*yield*/, this.startPipelines(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UIManager.prototype.openUI = function (nameOrClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var uiName, uiClass, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = new egretx.UIOptions();
                            if (typeof (nameOrClass) == "string") {
                                uiName = nameOrClass;
                                if (!this.uiMap.containsKey(uiName)) {
                                    throw new Error("此UI没有注册:{0}".format(uiName));
                                }
                                uiClass = this.uiMap.get(uiName);
                            }
                            else {
                                uiClass = nameOrClass;
                            }
                            options.uiClass = uiClass;
                            options.openArgs = args;
                            options.name = xgame.getQualifiedClassName(uiClass);
                            return [4 /*yield*/, this.startPipelines(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UIManager.prototype.openUIWithLayer = function (nameOrClass, layerID) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var uiName, uiClass, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = new egretx.UIOptions();
                            if (typeof (nameOrClass) == "string") {
                                uiName = nameOrClass;
                                if (!this.uiMap.containsKey(uiName)) {
                                    throw new Error("此UI没有注册:{0}".format(uiName));
                                }
                                uiClass = this.uiMap.get(uiName);
                            }
                            else {
                                uiClass = nameOrClass;
                            }
                            options.uiClass = uiClass;
                            options.layerID = layerID;
                            options.openArgs = args;
                            options.name = xgame.getQualifiedClassName(uiClass);
                            return [4 /*yield*/, this.startPipelines(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UIManager.prototype.openUIWithRoot = function (nameOrClass, uiRoot) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var uiName, uiClass, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = new egretx.UIOptions();
                            if (typeof (nameOrClass) == "string") {
                                uiName = nameOrClass;
                                if (!this.uiMap.containsKey(uiName)) {
                                    throw new Error("此UI没有注册:{0}".format(uiName));
                                }
                                uiClass = this.uiMap.get(uiName);
                            }
                            else {
                                uiClass = nameOrClass;
                            }
                            options.uiClass = uiClass;
                            options.uiRoot = uiRoot;
                            options.openArgs = args;
                            options.name = xgame.getQualifiedClassName(uiClass);
                            return [4 /*yield*/, this.startPipelines(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UIManager.prototype.openPopup = function (nameOrClass, hud) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var uiName, uiClass, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = new egretx.UIOptions();
                            if (typeof (nameOrClass) == "string") {
                                uiName = nameOrClass;
                                if (!this.uiMap.containsKey(uiName)) {
                                    throw new Error("此UI没有注册:{0}".format(uiName));
                                }
                                uiClass = this.uiMap.get(uiName);
                            }
                            else {
                                uiClass = nameOrClass;
                            }
                            options.uiClass = uiClass;
                            options.hud = hud;
                            options.openArgs = args;
                            options.name = xgame.getQualifiedClassName(uiClass);
                            return [4 /*yield*/, this.startPipelines(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UIManager.prototype.startPipelines = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, pipeline;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.pipelines;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            pipeline = _a[_i];
                            return [4 /*yield*/, pipeline(options)];
                        case 2:
                            if (!(_b.sent())) {
                                if (options.errorMessage) {
                                    console.error(options.errorMessage);
                                }
                                return [2 /*return*/, null];
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, options.entity];
                    }
                });
            });
        };
        //================================================
        //Pipelines
        //================================================
        /**
         * 检查UIPage是否存在或可以多开
         * @param options
         * @returns
         */
        UIManager.prototype.checkIsOpened = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var results, entity;
                return __generator(this, function (_a) {
                    results = [];
                    if (this.entityManager.tryGetEntities(options.uiClass, results)) {
                        entity = results[0];
                        if (entity.uiPage.flags & egretx.UIFlags.allowMultiple) {
                        }
                        else {
                            options.entity = entity;
                        }
                    }
                    return [2 /*return*/, true];
                });
            });
        };
        /**
         * 如果没有存在就创建UIPage
         * @param options
         * @returns
         */
        UIManager.prototype.createUIPage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var entity, uiPage_1, layerManager, uiPage, layerManager, layerManager, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            entity = options.entity;
                            if (!!entity) return [3 /*break*/, 3];
                            entity = new egretx.UIEntity();
                            entity.uiManager = this;
                            entity.name = options.name;
                            options.entity = entity;
                            uiPage_1 = new ((_a = options.uiClass).bind.apply(_a, [void 0].concat(options.openArgs)))();
                            xgame.injectInstance(uiPage_1);
                            uiPage_1.entity = entity;
                            entity.uiPage = uiPage_1;
                            this.entityManager.addEntity(entity);
                            uiPage_1.onInit();
                            uiPage_1.visible = false;
                            if (options.hud) {
                                uiPage_1.renderWatcher.onChanged().add(function () {
                                    egret.callLater(function () {
                                        egretx.TipsHelper.placeTipsWithHUD(uiPage_1, options.hud, options.gap);
                                    }, _this);
                                }, this);
                            }
                            if (options.uiRoot) {
                                options.uiRoot.addChild(uiPage_1);
                            }
                            else {
                                if (options.layerID) {
                                    uiPage_1.setLayerID(options.layerID);
                                }
                                layerManager = this.uiLayers.get(uiPage_1.layerID);
                                if (uiPage_1.flags & egretx.UIFlags.useMask) {
                                    entity.createMask(uiPage_1.maskColor, uiPage_1.maskAlpha, uiPage_1.flags & egretx.UIFlags.closeByMask);
                                    layerManager.addChild(entity.mask);
                                }
                                if (options.hud || (uiPage_1.flags & egretx.UIFlags.isPlugin)) {
                                }
                                else {
                                    uiPage_1.left = uiPage_1.right = uiPage_1.top = uiPage_1.bottom = 0;
                                }
                                layerManager.addEntity(entity);
                                layerManager.addChild(uiPage_1);
                            }
                            return [4 /*yield*/, uiPage_1.load()];
                        case 1:
                            _b.sent();
                            uiPage_1.onOpen();
                            return [4 /*yield*/, xgame.waitEndFrames()];
                        case 2:
                            _b.sent();
                            if (!options.hud) {
                                uiPage_1.visible = true;
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            uiPage = entity.uiPage;
                            if (options.layerID != undefined && options.layerID != uiPage.layerID) {
                                layerManager = this.uiLayers.get(uiPage.layerID);
                                layerManager.removeEntity(entity);
                                if (entity.mask && entity.mask.parent) {
                                    entity.mask.parent.removeChild(entity.mask);
                                }
                                if (entity.uiPage && entity.uiPage.parent) {
                                    entity.uiPage.parent.removeChild(entity.uiPage);
                                }
                                layerManager = this.uiLayers.get(options.layerID);
                                layerManager.addEntity(entity);
                                if (entity.mask) {
                                    layerManager.addChild(entity.mask);
                                }
                                if (entity.uiPage) {
                                    entity.uiPage.setLayerID(options.layerID);
                                    layerManager.addChild(entity.uiPage);
                                }
                            }
                            else {
                                layerManager = this.uiLayers.get(uiPage.layerID);
                                layerManager.orderToFront(entity);
                            }
                            _b.label = 4;
                        case 4:
                            this.entityManager.checkEntities();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * 如果UIPage创建成功就打开并传递参数
         * @param options
         * @returns
         */
        UIManager.prototype.openUIPage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var entity, uiPage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entity = options.entity;
                            if (!entity) {
                                options.errorMessage = "UIEntity:{0}不能为空".format(options.name);
                                return [2 /*return*/, false];
                            }
                            uiPage = entity.uiPage;
                            if (!uiPage.isLoaded) {
                                options.errorMessage = "UIPage:{0}还没有加载完成".format(options.name);
                                return [2 /*return*/, false];
                            }
                            if (!(uiPage.flags & egretx.UIFlags.Scene)) return [3 /*break*/, 5];
                            if (!this.currentScene) return [3 /*break*/, 4];
                            if (!this.sceneTransition) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sceneTransition.start(this.currentScene.uiPage)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.onSceneChanged.dispatch(entity, this.currentScene);
                            return [4 /*yield*/, this._closeUI(this.$currentScene)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            this.$currentScene = entity;
                            _a.label = 5;
                        case 5: return [4 /*yield*/, uiPage.doFadeIn()];
                        case 6:
                            _a.sent();
                            this.onUIOpened.dispatch(entity);
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        UIManager = __decorate([
            xgame.impl(egretx.IUIManager, egretx.IUIManagerInternal),
            __metadata("design:paramtypes", [egret.DisplayObjectContainer])
        ], UIManager);
        return UIManager;
    }(xgame.XObject));
    egretx.UIManager = UIManager;
    __reflect(UIManager.prototype, "egretx.UIManager", ["egretx.IUIManager", "xgame.IXObject", "egretx.IUIManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-30
*************************************************/

(function (egretx) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            return _super.call(this) || this;
        }
        Group.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.setTouchManager(this);
        };
        Group = __decorate([
            xgame.mixin(egretx.TouchBehaviours),
            __metadata("design:paramtypes", [])
        ], Group);
        return Group;
    }(eui.Group));
    egretx.Group = Group;
    __reflect(Group.prototype, "egretx.Group", ["xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

(function (egretx) {
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            return _super.call(this) || this;
        }
        ItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.setTouchManager(this);
        };
        ItemRenderer = __decorate([
            xgame.mixin(egretx.TouchBehaviours),
            __metadata("design:paramtypes", [])
        ], ItemRenderer);
        return ItemRenderer;
    }(eui.ItemRenderer));
    egretx.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "egretx.ItemRenderer");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (egretx) {
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        function UIComponent() {
            return _super.call(this) || this;
        }
        UIComponent.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.setTouchManager(this);
        };
        UIComponent = __decorate([
            xgame.mixin(egretx.TouchBehaviours),
            __metadata("design:paramtypes", [])
        ], UIComponent);
        return UIComponent;
    }(eui.Component));
    egretx.UIComponent = UIComponent;
    __reflect(UIComponent.prototype, "egretx.UIComponent", ["xgame.IXObject", "eui.UIComponent", "egret.DisplayObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/

(function (egretx) {
    var UIAlign;
    (function (UIAlign) {
        UIAlign[UIAlign["CENTER"] = 0] = "CENTER";
        UIAlign[UIAlign["TOP"] = 1] = "TOP";
        UIAlign[UIAlign["BOTTOM"] = 2] = "BOTTOM";
        UIAlign[UIAlign["LEFT"] = 3] = "LEFT";
        UIAlign[UIAlign["RIGHT"] = 4] = "RIGHT";
    })(UIAlign = egretx.UIAlign || (egretx.UIAlign = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/

(function (egretx) {
    var UIDirection;
    (function (UIDirection) {
        UIDirection[UIDirection["ANY"] = 0] = "ANY";
        UIDirection[UIDirection["TOP"] = 1] = "TOP";
        UIDirection[UIDirection["BOTTOM"] = 2] = "BOTTOM";
        UIDirection[UIDirection["LEFT"] = 3] = "LEFT";
        UIDirection[UIDirection["RIGHT"] = 4] = "RIGHT";
    })(UIDirection = egretx.UIDirection || (egretx.UIDirection = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./UIComponent.ts" />
/// <reference path="../structs/UIAlign.ts" />
/// <reference path="../structs/UIDirection.ts" />

(function (egretx) {
    var UIPage = (function (_super) {
        __extends(UIPage, _super);
        function UIPage(skinPath) {
            if (skinPath === void 0) { skinPath = null; }
            var _this = _super.call(this) || this;
            _this.skinPath = skinPath;
            //UI的类型参数,见UIFlags
            _this.flags = egretx.UIFlags.isStack | egretx.UIFlags.isFullScreen;
            _this.onComplete = new xgame.Signal0();
            _this.$isLoaded = false;
            _this.$isLoading = false;
            _this.deferred = new xgame.Deferred();
            _this.$maskAlpha = 0.5;
            _this.$maskColor = 0x000000;
            //UI的层级ID
            _this.$layerID = egretx.UILayerID.Layer_5_UI;
            return _this;
        }
        Object.defineProperty(UIPage.prototype, "isLoaded", {
            get: function () {
                return this.$isLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIPage.prototype, "isLoading", {
            get: function () {
                return this.$isLoading;
            },
            enumerable: true,
            configurable: true
        });
        UIPage.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.$isLoading = true;
                    if (this.skinPath && !this.isLoaded) {
                        this.once(egret.Event.COMPLETE, function () {
                            _this.doComplete();
                        }, this);
                        this.skinName = this.skinPath;
                    }
                    else {
                        this.doComplete();
                    }
                    return [2 /*return*/, this.deferred.promise];
                });
            });
        };
        UIPage.prototype.doComplete = function () {
            var _this = this;
            egret.callLater(function () {
                _this.$isLoaded = true;
                _this.onComplete.dispatch();
                _this.deferred.resolve();
            }, this);
        };
        Object.defineProperty(UIPage.prototype, "maskAlpha", {
            get: function () {
                return this.$maskAlpha;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIPage.prototype, "maskColor", {
            get: function () {
                return this.$maskColor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIPage.prototype, "layerID", {
            get: function () {
                return this.$layerID;
            },
            enumerable: true,
            configurable: true
        });
        UIPage.prototype.setLayerID = function (layerID) {
            this.$layerID = layerID;
        };
        UIPage.prototype.onInit = function () {
        };
        UIPage.prototype.onOpen = function () {
        };
        UIPage.prototype.onSceneChanging = function () {
        };
        UIPage.prototype.onClose = function () {
            this.entity = undefined;
        };
        UIPage.prototype.onShow = function () {
        };
        UIPage.prototype.onHide = function () {
        };
        UIPage.prototype.close = function () {
            if (this.entity) {
                this.entity.closePage();
            }
        };
        //================================================
        // Fade
        //================================================
        UIPage.prototype.doFadeIn = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        UIPage.prototype.doFadeOut = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return UIPage;
    }(egretx.UIComponent));
    egretx.UIPage = UIPage;
    __reflect(UIPage.prototype, "egretx.UIPage");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (egretx) {
    var UIFlags;
    (function (UIFlags) {
        UIFlags[UIFlags["None"] = 0] = "None";
        UIFlags[UIFlags["useMask"] = 1] = "useMask";
        UIFlags[UIFlags["isStack"] = 2] = "isStack";
        UIFlags[UIFlags["isFullScreen"] = 4] = "isFullScreen";
        UIFlags[UIFlags["allowMultiple"] = 8] = "allowMultiple";
        UIFlags[UIFlags["closeByMask"] = 16] = "closeByMask";
        UIFlags[UIFlags["isPopupMenu"] = 32] = "isPopupMenu";
        UIFlags[UIFlags["isPlugin"] = 64] = "isPlugin";
        UIFlags[UIFlags["Scene"] = 128] = "Scene";
    })(UIFlags = egretx.UIFlags || (egretx.UIFlags = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (egretx) {
    var PluginPage = (function (_super) {
        __extends(PluginPage, _super);
        function PluginPage(skinPath) {
            var _this = _super.call(this, skinPath) || this;
            _this.flags = egretx.UIFlags.isPlugin;
            return _this;
        }
        return PluginPage;
    }(egretx.UIPage));
    egretx.PluginPage = PluginPage;
    __reflect(PluginPage.prototype, "egretx.PluginPage");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (egretx) {
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(skinPath) {
            var _this = _super.call(this, skinPath) || this;
            _this.flags = egretx.UIFlags.isStack | egretx.UIFlags.useMask | egretx.UIFlags.closeByMask;
            _this.setLayerID(egretx.UILayerID.Layer_8_Window);
            return _this;
        }
        return Window;
    }(egretx.UIPage));
    egretx.Window = Window;
    __reflect(Window.prototype, "egretx.Window");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/

(function (egretx) {
    var UILayerID;
    (function (UILayerID) {
        UILayerID[UILayerID["Layer_0_Bottom"] = 0] = "Layer_0_Bottom";
        UILayerID[UILayerID["Layer_1"] = 1] = "Layer_1";
        UILayerID[UILayerID["Layer_2_Scene"] = 2] = "Layer_2_Scene";
        UILayerID[UILayerID["Layer_3_SceneMask"] = 3] = "Layer_3_SceneMask";
        UILayerID[UILayerID["Layer_4_SceneFrame"] = 4] = "Layer_4_SceneFrame";
        UILayerID[UILayerID["Layer_5_UI"] = 5] = "Layer_5_UI";
        UILayerID[UILayerID["Layer_6_UIMask"] = 6] = "Layer_6_UIMask";
        UILayerID[UILayerID["Layer_7_UIFrame"] = 7] = "Layer_7_UIFrame";
        UILayerID[UILayerID["Layer_8_Window"] = 8] = "Layer_8_Window";
        UILayerID[UILayerID["Layer_9"] = 9] = "Layer_9";
        UILayerID[UILayerID["Layer_10_Tips"] = 10] = "Layer_10_Tips";
        UILayerID[UILayerID["Layer_11_Toast"] = 11] = "Layer_11_Toast";
        UILayerID[UILayerID["Layer_12_Loading"] = 12] = "Layer_12_Loading";
        UILayerID[UILayerID["Layer_13"] = 13] = "Layer_13";
        UILayerID[UILayerID["Layer_14"] = 14] = "Layer_14";
        UILayerID[UILayerID["Layer_15_Top"] = 15] = "Layer_15_Top";
    })(UILayerID = egretx.UILayerID || (egretx.UILayerID = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="./Window.ts" />
/// <reference path="../structs/UIFlags.ts" />
/// <reference path="../structs/UILayerID.ts" />

(function (egretx) {
    var PropertyNames = ["x", "y", "width", "height", "visible", "scaleX", "scaleY"];
    var RenderWatcher = (function (_super) {
        __extends(RenderWatcher, _super);
        function RenderWatcher() {
            var views = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                views[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.views = [];
            _this.watchers = [];
            _this.dict = new xgame.Dictionary();
            _this.callback_onChanged = new xgame.Signal0();
            _this.isDispatching = false;
            for (var _a = 0, views_1 = views; _a < views_1.length; _a++) {
                var view = views_1[_a];
                _this.addWatcher(view);
            }
            return _this;
        }
        RenderWatcher.prototype.addWatcher = function (view) {
            if (this.views.indexOf(view) >= 0) {
                return;
            }
            this.views.push(view);
            var list = this.dict.get(view.hashCode);
            if (!list) {
                list = [];
                this.dict.add(view.hashCode, list);
            }
            for (var _i = 0, PropertyNames_1 = PropertyNames; _i < PropertyNames_1.length; _i++) {
                var p = PropertyNames_1[_i];
                var watcher = eui.Binding.bindHandler(view, [p], this.onWatcher, this);
                this.watchers.push(watcher);
                list.push(watcher);
            }
        };
        RenderWatcher.prototype.removeWatcher = function (view) {
            if (!this.dict.containsKey(view.hashCode)) {
                return;
            }
            var list = this.dict.get(view.hashCode);
            var len = this.watchers.length;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var watcher = list_1[_i];
                var indexOf = this.watchers.indexOf(watcher);
                if (indexOf > -1) {
                    this.watchers.splice(indexOf, 1);
                }
                watcher.unwatch();
            }
            list.length = 0;
            this.dict.remove(view.hashCode);
        };
        RenderWatcher.prototype.onWatcher = function (value) {
            this.lateDispatch();
        };
        RenderWatcher.prototype.lateDispatch = function () {
            var _this = this;
            if (this.isDispatching) {
                return;
            }
            this.isDispatching = true;
            egret.callLater(function () {
                _this.callback_onChanged.dispatch();
                _this.isDispatching = false;
            }, this);
        };
        RenderWatcher.prototype.onChanged = function () {
            return this.callback_onChanged;
        };
        RenderWatcher.prototype.dispose = function () {
            this.callback_onChanged.removeAll();
            while (this.watchers.length) {
                var watcher = this.watchers.shift();
                watcher.unwatch();
            }
            if (this.views) {
                this.views.length = 0;
            }
            this.dict.clear();
        };
        return RenderWatcher;
    }(xgame.XObject));
    egretx.RenderWatcher = RenderWatcher;
    __reflect(RenderWatcher.prototype, "egretx.RenderWatcher");
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(skinPath) {
            var _this = _super.call(this, skinPath) || this;
            _this.renderWatcher = new RenderWatcher();
            _this.offset = new egret.Point();
            _this.$uiDirection = egretx.UIDirection.ANY;
            _this.$uiAlign = egretx.UIAlign.CENTER;
            _this.flags = egretx.UIFlags.isStack | egretx.UIFlags.isPopupMenu | egretx.UIFlags.useMask | egretx.UIFlags.closeByMask | egretx.UIFlags.allowMultiple;
            _this.setLayerID(egretx.UILayerID.Layer_10_Tips);
            _this.$maskAlpha = 0;
            _this.renderWatcher.addWatcher(_this);
            return _this;
        }
        Object.defineProperty(Popup.prototype, "uiDirection", {
            get: function () {
                return this.$uiDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Popup.prototype, "uiAlign", {
            get: function () {
                return this.$uiAlign;
            },
            enumerable: true,
            configurable: true
        });
        Popup.prototype.allowUIDirection = function (direction) {
            if (this.allowDirections && this.allowDirections.length) {
                return this.allowDirections.indexOf(direction) >= 0;
            }
            return true;
        };
        Popup.prototype.fixedUIDirection = function (direction) {
        };
        Popup.prototype.onClose = function () {
            if (this.renderWatcher) {
                this.renderWatcher.dispose();
            }
            _super.prototype.onClose.call(this);
        };
        return Popup;
    }(egretx.UIPage));
    egretx.Popup = Popup;
    __reflect(Popup.prototype, "egretx.Popup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UILayerID.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (egretx) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(skinPath) {
            var _this = _super.call(this, skinPath) || this;
            _this.flags = egretx.UIFlags.Scene | egretx.UIFlags.isFullScreen;
            _this.setLayerID(egretx.UILayerID.Layer_2_Scene);
            return _this;
        }
        return Scene;
    }(egretx.UIPage));
    egretx.Scene = Scene;
    __reflect(Scene.prototype, "egretx.Scene");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />

(function (egretx) {
    var UIEntity = (function (_super) {
        __extends(UIEntity, _super);
        function UIEntity() {
            return _super.call(this) || this;
        }
        Object.defineProperty(UIEntity.prototype, "isClosed", {
            get: function () {
                return this.$isClosed;
            },
            enumerable: true,
            configurable: true
        });
        UIEntity.prototype.createMask = function (color, alpha, closeByMask) {
            if (!this.mask) {
                this.mask = new eui.Rect(100, 100, color);
                this.mask.alpha = alpha;
                this.mask.left = this.mask.right = this.mask.top = this.mask.bottom = 0;
                if (closeByMask) {
                    this.mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
                }
            }
        };
        UIEntity.prototype.onMaskClose = function () {
            this.mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
            this.closePage();
        };
        UIEntity.prototype.onSceneChanging = function () {
            if (this.uiPage) {
                this.uiPage.onSceneChanging();
            }
        };
        UIEntity.prototype.onClose = function () {
            this.$isClosed = true;
            if (this.uiPage) {
                this.uiPage.onClose();
            }
        };
        UIEntity.prototype.closePage = function () {
            if (this.uiManager) {
                this.uiManager.closeUI(this);
            }
        };
        UIEntity.prototype.showPage = function () {
            if (this.uiPage) {
                this.uiPage.visible = true;
            }
        };
        UIEntity.prototype.hidePage = function () {
            if (this.uiPage) {
                this.uiPage.visible = false;
            }
        };
        UIEntity.prototype.dispose = function () {
            if (this.mask) {
                this.mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
            }
            this.uiPage = undefined;
            this.mask = undefined;
        };
        return UIEntity;
    }(xgame.XObject));
    egretx.UIEntity = UIEntity;
    __reflect(UIEntity.prototype, "egretx.UIEntity", ["egretx.IUIEntity", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (egretx) {
    var UIHelper = (function () {
        function UIHelper() {
        }
        UIHelper.isFullScreenUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & egretx.UIFlags.isStack)) {
                return false;
            }
            if (!(flags & egretx.UIFlags.isFullScreen)) {
                return false;
            }
            return true;
        };
        UIHelper.isWindowUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & egretx.UIFlags.isStack)) {
                return false;
            }
            if ((flags & egretx.UIFlags.isFullScreen)) {
                return false;
            }
            return !UIHelper.isPopupMenuUI(entity);
        };
        UIHelper.isPopupMenuUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & egretx.UIFlags.isStack)) {
                return false;
            }
            if ((flags & egretx.UIFlags.isFullScreen)) {
                return false;
            }
            if (flags & egretx.UIFlags.isPopupMenu) {
                return true;
            }
            return false;
        };
        UIHelper.isPluginUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (flags & egretx.UIFlags.isPlugin) {
                return true;
            }
            return false;
        };
        UIHelper.isSceneUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (flags & egretx.UIFlags.Scene) {
                return true;
            }
            return false;
        };
        return UIHelper;
    }());
    egretx.UIHelper = UIHelper;
    __reflect(UIHelper.prototype, "egretx.UIHelper");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
/// <reference path="./UIEntity.ts" />
/// <reference path="../utils/UIHelper.ts" />

(function (egretx) {
    var UIEntityManager = (function (_super) {
        __extends(UIEntityManager, _super);
        function UIEntityManager(manager) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.entityMap = new xgame.Dictionary();
            _this.stackList = new xgame.List();
            return _this;
        }
        UIEntityManager.prototype.addEntity = function (entity) {
            var entities = this.entityMap.get(entity.name);
            if (!entities) {
                entities = [];
                this.entityMap.add(entity.name, entities);
            }
            if (entities.indexOf(entity) == -1) {
                entities.push(entity);
                if (entity.uiPage.flags & egretx.UIFlags.isStack) {
                    this.stackList.add(entity);
                }
            }
        };
        Object.defineProperty(UIEntityManager.prototype, "stackCount", {
            get: function () {
                return this.stackList.count();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIEntityManager.prototype, "topUI", {
            get: function () {
                if (this.stackCount > 0) {
                    return this.stackList.last();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIEntityManager.prototype, "topFullScreenUI", {
            get: function () {
                var index = this.stackCount - 1;
                while (index >= 0) {
                    var entity = this.stackList.elementAt(index);
                    if (entity.uiPage.flags & egretx.UIFlags.isFullScreen) {
                        return entity;
                    }
                    index--;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIEntityManager.prototype, "hasPopUp", {
            get: function () {
                var index = this.stackCount - 1;
                while (index >= 0) {
                    var entity = this.stackList.elementAt(index);
                    if (egretx.UIHelper.isWindowUI(entity)) {
                        return true;
                    }
                    index--;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        UIEntityManager.prototype.checkEntities = function () {
            var visible = true;
            var hasFullScreenPage = false;
            var index = this.stackCount - 1;
            while (index >= 0) {
                var entity = this.stackList.elementAt(index);
                if (visible) {
                    entity.showPage();
                }
                else {
                    entity.hidePage();
                }
                if (entity.uiPage.flags & egretx.UIFlags.isFullScreen) {
                    hasFullScreenPage = true;
                    visible = false;
                }
                index--;
            }
            if (hasFullScreenPage) {
                this.hideUIUnderLayers();
            }
            else {
                this.showUIUnderLayers();
            }
        };
        /**
         * 隐藏UI之下的显示层级
         */
        UIEntityManager.prototype.hideUIUnderLayers = function () {
            var _this = this;
            this.manager.uiLayers.forKeys(function (layerID) {
                if (layerID >= egretx.UILayerID.Layer_5_UI) {
                    return true;
                }
                var layerManager = _this.manager.uiLayers.get(layerID);
                layerManager.visible = false;
            }, this);
        };
        /**
         * 显示UI之下的显示层级
         */
        UIEntityManager.prototype.showUIUnderLayers = function () {
            var _this = this;
            this.manager.uiLayers.forKeys(function (layerID) {
                if (layerID >= egretx.UILayerID.Layer_5_UI) {
                    return true;
                }
                var layerManager = _this.manager.uiLayers.get(layerID);
                layerManager.visible = true;
            }, this);
        };
        UIEntityManager.prototype.removeEntity = function (entity) {
            if (this.entityMap.containsKey(entity.name)) {
                var entities = this.entityMap.get(entity.name);
                var indexOf = entities.indexOf(entity);
                if (indexOf >= 0) {
                    entities.splice(indexOf, 1);
                    if (entity.uiPage.flags & egretx.UIFlags.isStack) {
                        this.stackList.remove(entity);
                    }
                }
            }
        };
        UIEntityManager.prototype.tryGetEntities = function (target, results) {
            var uiName, uiClass, name;
            if (typeof (target) == "string") {
                uiName = target;
                if (!this.manager.uiMap.containsKey(uiName)) {
                    throw new Error("此UI没有注册:{0}".format(uiName));
                }
                uiClass = this.manager.uiMap.get(uiName);
            }
            else {
                uiClass = target;
            }
            name = xgame.getQualifiedClassName(uiClass);
            if (this.entityMap.containsKey(name)) {
                var entities = this.entityMap.get(name);
                if (entities && entities.length) {
                    if (results) {
                        results.length = 0;
                        results.push.apply(results, entities);
                    }
                    return true;
                }
            }
            return false;
        };
        return UIEntityManager;
    }(xgame.XObject));
    egretx.UIEntityManager = UIEntityManager;
    __reflect(UIEntityManager.prototype, "egretx.UIEntityManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UILayerID.ts" />

(function (egretx) {
    var UILayerManager = (function (_super) {
        __extends(UILayerManager, _super);
        function UILayerManager(manager, id) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.id = id;
            _this.entities = new xgame.List();
            _this.name = "" + egretx.UILayerID[id];
            _this.touchEnabled = false;
            return _this;
        }
        Object.defineProperty(UILayerManager.prototype, "count", {
            get: function () {
                return this.entities.count();
            },
            enumerable: true,
            configurable: true
        });
        UILayerManager.prototype.addEntity = function (entity) {
            if (!this.entities.contains(entity)) {
                this.entities.add(entity);
            }
        };
        UILayerManager.prototype.removeEntity = function (entity) {
            if (this.entities.contains(entity)) {
                this.entities.remove(entity);
            }
        };
        UILayerManager.prototype.orderToFront = function (entity) {
            if (this.entities.contains(entity)) {
                this.entities.remove(entity);
                var index = this.numChildren - 1;
                if (index < 0) {
                    index = 0;
                }
                this.setChildIndex(entity.uiPage, index);
                if (entity.mask) {
                    index = this.numChildren - 2;
                    if (index < 0) {
                        index = 0;
                    }
                    this.setChildIndex(entity.mask, index);
                }
                this.entities.add(entity);
            }
        };
        return UILayerManager;
    }(eui.UILayer));
    egretx.UILayerManager = UILayerManager;
    __reflect(UILayerManager.prototype, "egretx.UILayerManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-21
*************************************************/
var onDisplayListChanged = new xgame.Signal1();
var onDisplayListDisposed = new xgame.Signal1();
var egret_BitmapData_displayList = egret.BitmapData["_displayList"];
var egret_BitmapData_addDisplayObject = egret.BitmapData.$addDisplayObject;
var egret_BitmapData_removeDisplayObject = egret.BitmapData.$removeDisplayObject;
var egret_BitmapData_dispose = egret.BitmapData.$dispose;
egret.BitmapData.$addDisplayObject = function (displayObject, bitmapData) {
    if (!bitmapData) {
        return;
    }
    var hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    egret_BitmapData_addDisplayObject(displayObject, bitmapData);
    onDisplayListChanged.dispatch(hashCode);
};
egret.BitmapData.$removeDisplayObject = function (displayObject, bitmapData) {
    if (!bitmapData) {
        return;
    }
    var hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    if (!egret_BitmapData_displayList[hashCode]) {
        return;
    }
    egret_BitmapData_removeDisplayObject(displayObject, bitmapData);
    onDisplayListChanged.dispatch(hashCode);
};
egret.BitmapData.$dispose = function (bitmapData) {
    if (!bitmapData) {
        return;
    }
    var hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    egret_BitmapData_dispose(bitmapData);
    if (!egret_BitmapData_displayList[hashCode]) {
        onDisplayListDisposed.dispatch(hashCode);
    }
};
function get_timestamp() {
    return Math.floor(new Date().valueOf() / 1000);
}

(function (egretx) {
    var UIResManager = (function (_super) {
        __extends(UIResManager, _super);
        function UIResManager() {
            var _this = _super.call(this) || this;
            _this.textures = new xgame.Dictionary();
            onDisplayListChanged.add(_this.onDisplayListChanged, _this);
            onDisplayListDisposed.add(_this.onDisplayListDisposed, _this);
            return _this;
        }
        UIResManager.prototype.gc = function (force) {
            var _this = this;
            var timestamp = get_timestamp();
            this.textures.forValues(function (texture) {
                if (texture.reference <= 0) {
                    if (force || timestamp - texture.timestamp >= 60) {
                        _this.destroyRes(texture.key);
                        _this.textures.remove(texture.hashCode);
                    }
                }
            }, this, true);
        };
        UIResManager.prototype.destroyRes = function (key) {
            if (RES.hasRes(key) && RES.getRes(key)) {
                RES.destroyRes(key);
                console.log("UIResManager:destroyRes({0})".format(key));
            }
        };
        UIResManager.prototype.onDisplayListChanged = function (hashCode) {
            if (!this.textures.containsKey(hashCode)) {
                this.textures.add(hashCode, { hashCode: hashCode, reference: 0, timestamp: get_timestamp(), key: "" });
            }
            if (egret_BitmapData_displayList[hashCode]) {
                var texture = this.textures.get(hashCode);
                var list = egret_BitmapData_displayList[hashCode];
                texture.reference = list.length;
                texture.timestamp = get_timestamp();
            }
        };
        UIResManager.prototype.onDisplayListDisposed = function (hashCode) {
            if (this.textures.containsKey(hashCode)) {
                this.textures.remove(hashCode);
            }
        };
        UIResManager.prototype.register = function (key, texture) {
            if (!texture) {
                return;
            }
            var bitmapData = texture.bitmapData;
            if (!bitmapData) {
                return;
            }
            var hashCode = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!this.textures.containsKey(hashCode)) {
                this.textures.add(hashCode, { hashCode: hashCode, reference: 0, timestamp: get_timestamp(), key: key });
            }
            else {
                this.textures.get(hashCode).key = key;
            }
        };
        return UIResManager;
    }(xgame.XObject));
    egretx.UIResManager = UIResManager;
    __reflect(UIResManager.prototype, "egretx.UIResManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../core/Window.ts" />

(function (egretx) {
    function alert(message_or_options, title, buttons_or_nums_or_closeByMask, closeByMask) {
        if (closeByMask === void 0) { closeByMask = true; }
        var options;
        if (typeof (message_or_options) === "string") {
            options = { message: message_or_options, title: title, showCloseButton: true, closeByMask: true };
            if (buttons_or_nums_or_closeByMask != undefined) {
                if (Array.isArray(buttons_or_nums_or_closeByMask)) {
                    options.buttons = buttons_or_nums_or_closeByMask;
                    options.closeByMask = closeByMask;
                }
                else if (typeof (buttons_or_nums_or_closeByMask) === "number") {
                    options.numButton = buttons_or_nums_or_closeByMask;
                    options.closeByMask = closeByMask;
                }
                else if (typeof (buttons_or_nums_or_closeByMask) === "boolean") {
                    options.closeByMask = buttons_or_nums_or_closeByMask;
                }
            }
        }
        else {
            options = message_or_options;
        }
        options.callback = new xgame.Signal1();
        xgame.that.getService(egretx.IUIManager).openUI(Alert, options);
        return options.callback;
    }
    egretx.alert = alert;
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert(options) {
            var _this = _super.call(this, options.skinName || Alert.defaultSkinName) || this;
            _this.options = options;
            _this.clickButtonIndex = undefined;
            if (!_this.options.closeByMask) {
                _this.flags &= ~egretx.UIFlags.closeByMask;
            }
            if (_this.options.width) {
                _this.width = _this.options.width;
            }
            if (_this.options.height) {
                _this.height = _this.options.height;
            }
            return _this;
        }
        Alert.prototype.close = function () {
            if (this.options.callback) {
                this.options.callback.dispatch(this.clickButtonIndex);
            }
            _super.prototype.close.call(this);
        };
        Alert.prototype.onClose = function () {
            if (this.options.callback) {
                this.options.callback.removeAll();
            }
            this.options.callback = undefined;
            this.options.buttons = undefined;
            _super.prototype.onClose.call(this);
        };
        Alert.prototype.getButton = function (index) {
            var btn = this["btn_{0}".format(index)];
            return btn;
        };
        Alert.prototype.onOpen = function () {
            var _this = this;
            _super.prototype.onOpen.call(this);
            this.addClick(this.btn_close, function () {
                _this.close();
            }, this);
            if (!this.options.showCloseButton) {
                this.btn_close.visible = false;
            }
            if (this.options.title) {
                this.lab_title.textFlow = new egret.HtmlTextParser().parse(this.options.title);
            }
            this.lab_content.textFlow = new egret.HtmlTextParser().parse(this.options.message);
            var buttons = [];
            var index = 0;
            while (true) {
                var btn = this.getButton(index);
                if (btn) {
                    buttons.push(btn);
                }
                else {
                    break;
                }
                index++;
            }
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].visible = false;
                buttons[i].name = i.toString();
                buttons[i].includeInLayout = false;
                this.addClick(buttons[i], this.onButtonClick, this);
            }
            if (this.options.buttons && this.options.buttons.length) {
                for (var i = 0; i < this.options.buttons.length; i++) {
                    buttons[i].label = this.options.buttons[i];
                    buttons[i].visible = true;
                    buttons[i].includeInLayout = true;
                }
            }
            else {
                var nums = this.options.numButton || 2;
                for (var i = 0; i < nums; i++) {
                    buttons[i].visible = true;
                    buttons[i].includeInLayout = true;
                }
            }
        };
        Alert.prototype.onButtonClick = function (event) {
            var target = event.target;
            this.clickButtonIndex = parseInt(target.name);
            this.close();
        };
        Alert.defaultSkinName = "";
        Alert.NAME = "Alert";
        __decorate([
            egretx.inject(egretx.IUIManager),
            __metadata("design:type", Object)
        ], Alert.prototype, "uiManager", void 0);
        return Alert;
    }(egretx.Window));
    egretx.Alert = Alert;
    __reflect(Alert.prototype, "egretx.Alert");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/

(function (egretx) {
    var sys = egret.sys;
    function get_measure_width(text, instance) {
        return sys.measureText(text, instance.fontFamily, instance.size, instance.bold, instance.italic);
    }
    egretx.get_measure_width = get_measure_width;
    var bits = 1;
    var InvalidateFlags;
    (function (InvalidateFlags) {
        InvalidateFlags[InvalidateFlags["Any"] = 1] = "Any";
        InvalidateFlags[InvalidateFlags["Source"] = 1 << bits++] = "Source";
        InvalidateFlags[InvalidateFlags["TextColor"] = 1 << bits++] = "TextColor";
        InvalidateFlags[InvalidateFlags["Align"] = 1 << bits++] = "Align";
        InvalidateFlags[InvalidateFlags["Value"] = 1 << bits++] = "Value";
        InvalidateFlags[InvalidateFlags["Dispatch"] = 1 << bits++] = "Dispatch";
        InvalidateFlags[InvalidateFlags["ItemRenderSkinName"] = 1 << bits++] = "ItemRenderSkinName";
    })(InvalidateFlags || (InvalidateFlags = {}));
    var DropdownList = (function (_super) {
        __extends(DropdownList, _super);
        function DropdownList() {
            var _this = _super.call(this) || this;
            _this.invalidateFlags = InvalidateFlags.Any;
            _this.callback_onSelectChanged = new xgame.Signal3();
            _this.$isOpened = false;
            _this.$textColor = 0x606DA1;
            _this.$popupItemHeight = 46;
            _this.$popupTextAlign = egret.HorizontalAlign.CENTER;
            _this.$textAlign = egret.HorizontalAlign.CENTER;
            _this.$selectedIndex = -1;
            _this.$itemRenderGap = 0;
            _this.isLate = false;
            return _this;
        }
        DropdownList.toSource = function (labels) {
            var source = [];
            for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                var v = labels_1[_i];
                source.push({ label: v });
            }
            return source;
        };
        DropdownList.itemToLabel = function (item) {
            if (item.label) {
                return item.label;
            }
            return item.toString();
        };
        DropdownList.prototype.onSelectChanged = function () {
            return this.callback_onSelectChanged;
        };
        DropdownList.prototype.$onRemoveFromStage = function () {
            this.callback_onSelectChanged.removeAll();
            _super.prototype.$onRemoveFromStage.call(this);
        };
        DropdownList.prototype.dispose = function () {
            this.callback_onSelectChanged.removeAll();
        };
        DropdownList.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.touchChildren = false;
            this.lab_title.multiline = false;
            this.lab_title.wordWrap = false;
            this.addClick(this, function () {
                if (!_this.source || _this.source.length == 0) {
                    return;
                }
                _this.openPopup();
            }, this);
        };
        Object.defineProperty(DropdownList.prototype, "isOpened", {
            get: function () {
                return this.$isOpened;
            },
            enumerable: true,
            configurable: true
        });
        DropdownList.prototype.openPopup = function () {
            var _this = this;
            if (this.isOpened) {
                return;
            }
            this.$isOpened = true;
            var items = [];
            for (var i = 0; i < this.source.length; i++) {
                items.push(this.getMenuItem(i));
            }
            this.options = {
                enableClick: true,
                items: items,
                itemGap: this.itemRenderGap ? this.itemRenderGap : 2,
                itemHeight: this.popupItemHeight,
                selected: this.selectedIndex,
                allowDirections: [egretx.UIDirection.BOTTOM, egretx.UIDirection.TOP],
                uiDirection: egretx.UIDirection.ANY,
                minWidth: this.width,
                textAlign: this.popupTextAlign,
                itemRender: this.popupItemRender,
                itemRenderSkinName: this.popupItemRenderSkinName || DropdownList.defaultItemRenderSkinName,
                arrowPadding: this.popupArrowPadding,
                offset: this.popupOffset,
            };
            this.img_icon.scaleY = -1;
            egretx.showPopupMenu(this, this.options).addOnce(function (item) {
                if (item) {
                    _this.setSelectedIndex(item.index, true);
                }
                _this.img_icon.scaleY = 1;
                _this.$isOpened = false;
                _this.options.instance = undefined;
                _this.options = undefined;
            }, this);
        };
        DropdownList.prototype.closePopup = function () {
            if (!this.isOpened) {
                return;
            }
            this.img_icon.scaleY = 1;
            this.$isOpened = false;
            if (this.options && this.options.instance) {
                this.options.instance.close();
                this.options.instance = undefined;
            }
            this.options = undefined;
        };
        Object.defineProperty(DropdownList.prototype, "textColor", {
            get: function () {
                return this.$textColor;
            },
            set: function (value) {
                this.$textColor = value;
                this.invalidateFlags |= InvalidateFlags.TextColor;
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupItemHeight", {
            get: function () {
                return this.$popupItemHeight;
            },
            set: function (value) {
                this.$popupItemHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupTextAlign", {
            get: function () {
                return this.$popupTextAlign;
            },
            set: function (value) {
                this.$popupTextAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "textAlign", {
            get: function () {
                return this.$textAlign;
            },
            set: function (value) {
                this.$textAlign = value;
                this.invalidateFlags |= InvalidateFlags.Align;
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "selectedIndex", {
            get: function () {
                return this.$selectedIndex;
            },
            set: function (value) {
                if (value < 0 || value == this.selectedIndex) {
                    return;
                }
                this.setSelectedIndex(value);
            },
            enumerable: true,
            configurable: true
        });
        DropdownList.prototype.setSelectedIndex = function (value, dispatch) {
            this.$selectedIndex = value;
            this.invalidateFlags |= InvalidateFlags.Value;
            if (dispatch) {
                this.callback_onSelectChanged.dispatch(value, this.source[value], this);
            }
            this.lateUpdate();
        };
        Object.defineProperty(DropdownList.prototype, "selectedItem", {
            get: function () {
                if (this.selectedIndex >= 0 && this.source.length) {
                    return this.source[this.selectedIndex];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "source", {
            get: function () {
                return this.$source;
            },
            set: function (value) {
                this.$source = value;
                this.invalidateFlags |= InvalidateFlags.Source;
                this.minWidth = 0;
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var item = value_1[_i];
                    var w = get_measure_width(this.getTitle(item), this.lab_title) + 75;
                    if (this.minWidth < w) {
                        this.minWidth = w;
                    }
                }
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "itemRenderGap", {
            get: function () {
                return this.$itemRenderGap;
            },
            set: function (value) {
                this.$itemRenderGap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupItemRenderSkinName", {
            get: function () {
                return this.$popupItemRenderSkinName;
            },
            set: function (value) {
                this.$popupItemRenderSkinName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupItemRender", {
            get: function () {
                return this.$popupItemRender;
            },
            set: function (value) {
                this.$popupItemRender = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupArrowPadding", {
            get: function () {
                return this.$popupArrowPadding;
            },
            set: function (value) {
                this.$popupArrowPadding = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownList.prototype, "popupOffset", {
            get: function () {
                return this.$popupOffset;
            },
            set: function (value) {
                this.$popupOffset = value;
            },
            enumerable: true,
            configurable: true
        });
        DropdownList.prototype.lateUpdate = function () {
            var _this = this;
            if (this.isLate) {
                return;
            }
            this.isLate = true;
            egret.callLater(function () {
                _this.onDrawComponent();
                _this.isLate = false;
            }, this);
        };
        DropdownList.prototype.getMenuItem = function (index) {
            var item = { index: index };
            var data = this.source[index];
            item.title = this.getTitle(data);
            return item;
        };
        DropdownList.prototype.getTitle = function (item) {
            return this.itemToLabel ? this.itemToLabel(item) : DropdownList.itemToLabel(item);
        };
        DropdownList.prototype.onDrawComponent = function () {
            if (this.selectedIndex == -1) {
                this.selectedIndex = 0;
            }
            var item = this.source && this.source.length ? this.source[this.selectedIndex] : undefined;
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Source) {
                this.invalidateFlags |= InvalidateFlags.Value;
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Value) {
                if (item) {
                    this.lab_title.text = this.getTitle(item);
                }
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.TextColor) {
                this.lab_title.textColor = this.textColor;
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Align) {
                this.lab_title.textAlign = this.textAlign;
            }
            this.invalidateFlags = 0;
        };
        DropdownList.defaultItemRenderSkinName = "";
        return DropdownList;
    }(egretx.UIComponent));
    egretx.DropdownList = DropdownList;
    __reflect(DropdownList.prototype, "egretx.DropdownList", ["xgame.IPoolable", "xgame.IDisposable"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
/// <reference path="../core/Group.ts" />

(function (egretx) {
    var bits = 1;
    var InvalidateFlags;
    (function (InvalidateFlags) {
        InvalidateFlags[InvalidateFlags["Any"] = 1] = "Any";
        InvalidateFlags[InvalidateFlags["Source"] = 1 << bits++] = "Source";
        InvalidateFlags[InvalidateFlags["TextColor"] = 1 << bits++] = "TextColor";
        InvalidateFlags[InvalidateFlags["Align"] = 1 << bits++] = "Align";
        InvalidateFlags[InvalidateFlags["Value"] = 1 << bits++] = "Value";
        InvalidateFlags[InvalidateFlags["SelectedIndex"] = 1 << bits++] = "SelectedIndex";
        InvalidateFlags[InvalidateFlags["ItemSkinName"] = 1 << bits++] = "ItemSkinName";
    })(InvalidateFlags || (InvalidateFlags = {}));
    var DropdownListGroup = (function (_super) {
        __extends(DropdownListGroup, _super);
        function DropdownListGroup() {
            var _this = _super.call(this) || this;
            _this.invalidateFlags = InvalidateFlags.Any;
            _this.callback_onSelectChanged = new xgame.Signal3();
            _this.$textColor = 0x606DA1;
            _this.$popupItemHeight = 0;
            _this.$popupTextAlign = egret.HorizontalAlign.CENTER;
            _this.$textAlign = egret.HorizontalAlign.CENTER;
            _this.isLate = false;
            _this.selectedIndexes = [];
            _this.items = [];
            _this.pools = new xgame.PoolObject(egretx.DropdownList);
            return _this;
        }
        DropdownListGroup.prototype.destroy = function () {
            this.pools.release();
        };
        DropdownListGroup.prototype.onSelectChanged = function () {
            return this.callback_onSelectChanged;
        };
        Object.defineProperty(DropdownListGroup.prototype, "dropdownSkinName", {
            get: function () {
                return this.$dropdownSkinName;
            },
            set: function (value) {
                this.$dropdownSkinName = value;
                this.invalidateFlags |= InvalidateFlags.ItemSkinName;
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "popupItemRenderSkinName", {
            get: function () {
                return this.$popupItemRenderSkinName;
            },
            set: function (value) {
                this.$popupItemRenderSkinName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "textColor", {
            get: function () {
                return this.$textColor;
            },
            set: function (value) {
                this.$textColor = value;
                this.invalidateFlags |= InvalidateFlags.TextColor;
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "popupItemHeight", {
            get: function () {
                return this.$popupItemHeight;
            },
            set: function (value) {
                this.$popupItemHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "popupTextAlign", {
            get: function () {
                return this.$popupTextAlign;
            },
            set: function (value) {
                this.$popupTextAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "textAlign", {
            get: function () {
                return this.$textAlign;
            },
            set: function (value) {
                this.$textAlign = value;
                this.invalidateFlags |= InvalidateFlags.Align;
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropdownListGroup.prototype, "source", {
            get: function () {
                return this.$source;
            },
            set: function (value) {
                this.$source = value;
                this.invalidateFlags |= InvalidateFlags.Source;
                this.selectedIndexes.length = 0;
                for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                    var item = value_2[_i];
                    this.selectedIndexes.push(item.selectedIndex != undefined ? item.selectedIndex : 0);
                }
                this.lateUpdate();
            },
            enumerable: true,
            configurable: true
        });
        DropdownListGroup.prototype.getSelectedIndexes = function () {
            return this.selectedIndexes;
        };
        DropdownListGroup.prototype.getSelectedIndex = function (index) {
            if (index < this.selectedIndexes.length) {
                return this.selectedIndexes[index];
            }
            return -1;
        };
        DropdownListGroup.prototype.setSelectedIndexes = function (selectedIndexes) {
            var len = selectedIndexes.length;
            len = Math.min(len, this.source.length);
            for (var i = 0; i < len; i++) {
                this.selectedIndexes[i] = selectedIndexes[i];
            }
            this.invalidateFlags |= InvalidateFlags.SelectedIndex;
            this.lateUpdate();
        };
        DropdownListGroup.prototype.setSelectedIndex = function (index, selectedIndex) {
            if (index < this.items.length) {
                this.selectedIndexes[index] = selectedIndex;
                this.invalidateFlags |= InvalidateFlags.SelectedIndex;
                this.lateUpdate();
            }
        };
        DropdownListGroup.prototype.lateUpdate = function () {
            var _this = this;
            if (this.isLate) {
                return;
            }
            this.isLate = true;
            egret.callLater(function () {
                _this.onDrawComponent();
                _this.isLate = false;
            }, this);
        };
        DropdownListGroup.prototype.onDrawComponent = function () {
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Source) {
                this.clearItems();
                this.initItems();
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Align) {
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.textAlign = this.textAlign;
                    item.popupTextAlign = this.popupTextAlign;
                }
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.SelectedIndex) {
                for (var i = 0; i < this.selectedIndexes.length; i++) {
                    this.getItemAt(i).selectedIndex = this.selectedIndexes[i];
                }
            }
            this.invalidateFlags = 0;
        };
        DropdownListGroup.prototype.clearItems = function () {
            while (this.items.length) {
                var dropdown = this.items.pop();
                this.removeChild(dropdown);
                this.pools.recycle(dropdown);
            }
        };
        DropdownListGroup.prototype.initItems = function () {
            if (!this.source || this.source.length == 0) {
                return;
            }
            for (var i = 0; i < this.source.length; i++) {
                var data = this.source[i];
                var dropdown = this.getItemAt(i);
                dropdown.selectedIndex = this.selectedIndexes[i];
                dropdown.textAlign = this.textAlign;
                dropdown.popupTextAlign = this.popupTextAlign;
                dropdown.popupItemHeight = this.popupItemHeight ? this.popupItemHeight : DropdownListGroup.defaultPopupItemHeight;
                dropdown.source = data.source;
                dropdown.skinName = this.dropdownSkinName || DropdownListGroup.defaultDropdownSkinName;
                dropdown.popupItemRenderSkinName = this.popupItemRenderSkinName;
            }
        };
        DropdownListGroup.prototype.getItemAt = function (index) {
            var _this = this;
            if (!this.items[index]) {
                var item = this.pools.fetch(function () { return _this.fetchDropdownList ? _this.fetchDropdownList() : DropdownListGroup.defaultFetchDropdownList(); }, this);
                item.onSelectChanged().add(this.onSelectChangeHandler, this);
                this.items[index] = item;
                this.addChildAt(item, index);
            }
            return this.items[index];
        };
        DropdownListGroup.prototype.indexOf = function (dropdown) {
            return this.items.indexOf(dropdown);
        };
        DropdownListGroup.prototype.onSelectChangeHandler = function (selectedIndex, value, dropdown) {
            var index = this.indexOf(dropdown);
            this.selectedIndexes[index] = selectedIndex;
            var selectedIndexes = this.selectedIndexes.slice();
            var selectedValues = [];
            for (var i = 0; i < this.selectedIndexes.length; i++) {
                selectedValues.push(this.getItemAt(i).source[this.selectedIndexes[i]]);
            }
            this.callback_onSelectChanged.dispatch(index, selectedIndexes, selectedValues);
        };
        DropdownListGroup.defaultDropdownSkinName = "";
        DropdownListGroup.defaultPopupItemHeight = 30;
        return DropdownListGroup;
    }(egretx.Group));
    egretx.DropdownListGroup = DropdownListGroup;
    __reflect(DropdownListGroup.prototype, "egretx.DropdownListGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
/// <reference path="../core/ItemRenderer.ts" />

(function (egretx) {
    var PopupMenuEvent = (function (_super) {
        __extends(PopupMenuEvent, _super);
        function PopupMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopupMenuEvent.ITEM_CLICK = "PopupMenuEvent_itemClick";
        return PopupMenuEvent;
    }(egret.Event));
    egretx.PopupMenuEvent = PopupMenuEvent;
    __reflect(PopupMenuEvent.prototype, "egretx.PopupMenuEvent");
    var PopupMenuItem = (function (_super) {
        __extends(PopupMenuItem, _super);
        function PopupMenuItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PopupMenuItem.prototype, "item", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        PopupMenuItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.left = this.right = 0;
        };
        PopupMenuItem.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.addClick(this, function () {
                if (_this.item) {
                    _this.dispatchEvent(new PopupMenuEvent(PopupMenuEvent.ITEM_CLICK, true, true, _this.item));
                }
            }, this);
        };
        PopupMenuItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.item) {
                this.lab_title.textFlow = new egret.HtmlTextParser().parse("{0}".format(this.item.title));
                if (this.item.textAlign) {
                    this.lab_title.textAlign = this.item.textAlign;
                }
            }
        };
        return PopupMenuItem;
    }(egretx.ItemRenderer));
    egretx.PopupMenuItem = PopupMenuItem;
    __reflect(PopupMenuItem.prototype, "egretx.PopupMenuItem");
    var PopupMenu = (function (_super) {
        __extends(PopupMenu, _super);
        function PopupMenu(options) {
            var _this = _super.call(this, options.skinName || PopupMenu.defaultSkinName) || this;
            _this.options = options;
            _this.callback_onSelect = new xgame.Signal1();
            _this.arrowPadding = 20;
            options.instance = _this;
            if (options.offset) {
                _this.offset.x = options.offset.x;
                _this.offset.y = options.offset.y;
            }
            if (options.arrowPadding == void 0) {
                options.arrowPadding = 20;
            }
            if (options.width) {
                _this.width = options.width;
            }
            if (options.height) {
                _this.height = options.height;
            }
            if (options.uiDirection == undefined) {
                options.uiDirection = egretx.UIDirection.BOTTOM;
            }
            if (options.uiAlign == undefined) {
                options.uiAlign = egretx.UIAlign.CENTER;
            }
            options.itemHeight = options.itemHeight ? options.itemHeight : 30;
            options.itemGap = options.itemGap != undefined ? options.itemGap : 2;
            if (options.allowDirections && options.allowDirections.length) {
                _this.allowDirections = options.allowDirections;
            }
            _this.$uiDirection = options.uiDirection;
            _this.$uiAlign = options.uiAlign;
            _this.arrowPadding = options.arrowPadding;
            var baseHeight = _this.options.baseHeight || PopupMenu.defaultBaseHeight;
            if (!_this.options.height) {
                _this.height = baseHeight + (_this.options.itemHeight + _this.options.itemGap) * _this.options.items.length - _this.options.itemGap;
            }
            if (!_this.options.width && _this.options.minWidth && _this.width < _this.options.minWidth) {
                _this.width = _this.options.minWidth;
            }
            return _this;
        }
        PopupMenu.toOptions = function (titles, selectedIndex) {
            var options = {
                items: [],
                selected: selectedIndex == undefined ? 0 : selectedIndex,
            };
            for (var i = 0; i < titles.length; i++) {
                options.items.push({ index: i, title: titles[i] });
            }
            return options;
        };
        PopupMenu.prototype.onSelect = function () {
            return this.options.callback || this.callback_onSelect;
        };
        PopupMenu.prototype.fixedUIDirection = function (direction) {
            this.updateArrow(direction);
        };
        PopupMenu.prototype.onClose = function () {
            this.onSelect().dispatch(this.selectedItem);
            this.list_item.removeEventListener(PopupMenuEvent.ITEM_CLICK, this.onItemClickHandler, this);
            if (this.options) {
                this.options.instance = undefined;
            }
            _super.prototype.onClose.call(this);
        };
        PopupMenu.prototype.onItemClickHandler = function (event) {
            event.stopPropagation();
            this.selectedItem = event.data;
            this.close();
        };
        PopupMenu.prototype.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.list_item.itemRenderer = this.options.itemRender;
            this.list_item.layout.gap = this.options.itemGap;
            if (this.options.itemRenderSkinName) {
                this.list_item.itemRendererSkinName = this.options.itemRenderSkinName;
            }
            if (this.options.itemRender) {
                this.list_item.itemRenderer = this.options.itemRender;
            }
            else {
                this.list_item.itemRenderer = PopupMenuItem;
            }
            this.list_item.addEventListener(PopupMenuEvent.ITEM_CLICK, this.onItemClickHandler, this);
            this.list_item.replaceAll(this.options.items);
            if (this.options.selected != undefined) {
                var selectedIndex = this.options.selected;
                if (selectedIndex >= 0) {
                    this.list_item.selectedIndex = selectedIndex;
                }
            }
        };
        PopupMenu.prototype.updateArrow = function (direction) {
            this.arrow_down.visible = false;
            this.arrow_up.visible = false;
            this.arrow_left.visible = false;
            this.arrow_right.visible = false;
            if (direction == egretx.UIDirection.BOTTOM) {
                this.arrow_down.visible = true;
                if (this.uiAlign == egretx.UIAlign.LEFT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = this.arrowPadding;
                    this.arrow_down.right = NaN;
                }
                else if (this.uiAlign == egretx.UIAlign.RIGHT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = this.arrowPadding;
                }
                else {
                    this.arrow_down.horizontalCenter = 0;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = NaN;
                }
            }
            else if (direction == egretx.UIDirection.TOP) {
                this.arrow_up.visible = true;
                if (this.uiAlign == egretx.UIAlign.LEFT) {
                    this.arrow_up.horizontalCenter = NaN;
                    this.arrow_up.left = this.arrowPadding;
                    this.arrow_up.right = NaN;
                }
                else if (this.uiAlign == egretx.UIAlign.RIGHT) {
                    this.arrow_up.horizontalCenter = NaN;
                    this.arrow_up.left = NaN;
                    this.arrow_up.right = this.arrowPadding;
                }
                else {
                    this.arrow_up.horizontalCenter = 0;
                    this.arrow_up.left = NaN;
                    this.arrow_up.right = NaN;
                }
            }
            else if (direction == egretx.UIDirection.RIGHT) {
                this.arrow_right.visible = true;
                if (this.uiAlign == egretx.UIAlign.TOP) {
                    this.arrow_right.verticalCenter = NaN;
                    this.arrow_right.top = this.arrowPadding;
                    this.arrow_right.bottom = NaN;
                }
                else if (this.uiAlign == egretx.UIAlign.BOTTOM) {
                    this.arrow_right.verticalCenter = NaN;
                    this.arrow_right.top = NaN;
                    this.arrow_right.bottom = this.arrowPadding;
                }
                else {
                    this.arrow_right.verticalCenter = 0;
                    this.arrow_right.top = NaN;
                    this.arrow_right.bottom = NaN;
                }
            }
            else if (direction == egretx.UIDirection.LEFT) {
                this.arrow_left.visible = true;
                if (this.uiAlign == egretx.UIAlign.TOP) {
                    this.arrow_left.verticalCenter = NaN;
                    this.arrow_left.top = this.arrowPadding;
                    this.arrow_left.bottom = NaN;
                }
                else if (this.uiAlign == egretx.UIAlign.BOTTOM) {
                    this.arrow_left.verticalCenter = NaN;
                    this.arrow_left.top = NaN;
                    this.arrow_left.bottom = this.arrowPadding;
                }
                else {
                    this.arrow_left.verticalCenter = 0;
                    this.arrow_left.top = NaN;
                    this.arrow_left.bottom = NaN;
                }
            }
            else {
                this.arrow_down.visible = true;
                if (this.uiAlign == egretx.UIAlign.LEFT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = this.arrowPadding;
                    this.arrow_down.right = NaN;
                }
                else if (this.uiAlign == egretx.UIAlign.RIGHT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = this.arrowPadding;
                }
                else {
                    this.arrow_down.horizontalCenter = 0;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = NaN;
                }
            }
        };
        PopupMenu.NAME = "PopupMenu";
        PopupMenu.defaultSkinName = "";
        PopupMenu.defaultBaseHeight = 40;
        return PopupMenu;
    }(egretx.Popup));
    egretx.PopupMenu = PopupMenu;
    __reflect(PopupMenu.prototype, "egretx.PopupMenu");
    function showPopupMenu(target, titles_or_options) {
        var options;
        if (Array.isArray(titles_or_options)) {
            options = PopupMenu.toOptions(titles_or_options);
        }
        else {
            options = titles_or_options;
        }
        options.callback = new xgame.Signal1();
        if (options.textAlign) {
            for (var _i = 0, _a = options.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.textAlign = options.textAlign;
            }
        }
        xgame.that.getService(egretx.IUIManager).openPopup(PopupMenu, target, options);
        return options.callback;
    }
    egretx.showPopupMenu = showPopupMenu;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

(function (egretx) {
    var TipsState;
    (function (TipsState) {
        TipsState[TipsState["FadeIn"] = 1] = "FadeIn";
        TipsState[TipsState["Stay"] = 2] = "Stay";
        TipsState[TipsState["FadeOut"] = 3] = "FadeOut";
    })(TipsState = egretx.TipsState || (egretx.TipsState = {}));
    var TipsView = (function (_super) {
        __extends(TipsView, _super);
        function TipsView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.durationFadeIn = 500;
            _this.durationStay = 1000;
            _this.durationFadeOut = 500;
            _this.durationPosition = 500;
            _this.time = 0;
            _this.index = 0;
            return _this;
        }
        Object.defineProperty(TipsView.prototype, "state", {
            get: function () {
                return this.$state;
            },
            set: function (value) {
                this.$state = value;
            },
            enumerable: true,
            configurable: true
        });
        TipsView.prototype.release = function () {
        };
        TipsView.prototype.dispose = function () {
            egret.Tween.removeTweens(this);
        };
        TipsView.prototype.setMessage = function (message) {
            this.time = this.durationStay;
            this.state = TipsState.FadeIn;
            this.y = -this.height / 2;
            this.alpha = 0;
        };
        TipsView.prototype.doFadeIn = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var alpha = _this.alpha;
                var duration = Math.floor(_this.durationFadeIn * (1 - alpha));
                egret.Tween.get(_this).to({ alpha: 1 }, duration).call(function () {
                    resolve();
                }, _this);
            });
        };
        TipsView.prototype.doFadeOut = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var alpha = _this.alpha;
                var duration = Math.floor(_this.durationFadeOut * alpha);
                egret.Tween.get(_this).to({ alpha: 0 }, duration).call(function () {
                    resolve();
                }, _this);
            });
        };
        TipsView.prototype.doStay = function () {
            var _this = this;
            return new Promise(function (resolve) {
                egret.Tween.get(_this).to({ time: 0 }, _this.time).call(function () {
                    resolve();
                }, _this);
            });
        };
        TipsView.prototype.playAnimation = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            egret.Tween.removeTweens(this);
                            egret.Tween.get(this).to({ y: -this.index * this.height - this.height / 2 }, this.durationPosition);
                            if (!(this.state == TipsState.FadeIn)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.doFadeIn()];
                        case 1:
                            _a.sent();
                            this.state = TipsState.Stay;
                            return [4 /*yield*/, this.doStay()];
                        case 2:
                            _a.sent();
                            this.state = TipsState.FadeOut;
                            return [4 /*yield*/, this.doFadeOut()];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 4:
                            if (!(this.state == TipsState.Stay)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.doStay()];
                        case 5:
                            _a.sent();
                            this.state = TipsState.FadeOut;
                            return [4 /*yield*/, this.doFadeOut()];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            if (!(this.state == TipsState.FadeOut)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.doFadeOut()];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        return TipsView;
    }(eui.Component));
    egretx.TipsView = TipsView;
    __reflect(TipsView.prototype, "egretx.TipsView", ["egretx.ITipsView", "xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
    var TipsManager = (function (_super) {
        __extends(TipsManager, _super);
        function TipsManager() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolObject(TipsView);
            _this.parallelMax = 5;
            _this.waitQueues = [];
            return _this;
        }
        Object.defineProperty(TipsManager.prototype, "container", {
            get: function () {
                return this.$container;
            },
            enumerable: true,
            configurable: true
        });
        TipsManager.prototype.append = function (message) {
            if (this.container.numChildren < this.parallelMax) {
                this.play(message);
            }
            else {
                this.waitQueues.push(message);
            }
        };
        TipsManager.prototype.play = function (message) {
            var _this = this;
            var view = this.pools.fetch(function () {
                return _this.fetch();
            }, this);
            this.container.addChildAt(view, 0);
            view.setMessage(message);
            var _loop_1 = function (i) {
                var view_1 = this_1.container.getChildAt(i);
                view_1.index = i;
                egret.Tween.removeTweens(view_1);
                view_1.playAnimation().then(function () {
                    _this.endView(view_1);
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.container.numChildren; i++) {
                _loop_1(i);
            }
        };
        TipsManager.prototype.endView = function (view) {
            if (view.parent) {
                this.container.removeChild(view);
            }
            view.dispose();
            this.pools.recycle(view);
            if (this.waitQueues.length > 0 && this.container.numChildren < this.parallelMax) {
                var message = this.waitQueues.shift();
                this.play(message);
            }
        };
        TipsManager.prototype.clear = function () {
            while (this.container.numChildren) {
                var view = this.container.removeChildAt(0);
                view.dispose();
                this.pools.recycle(view);
            }
            this.waitQueues.length = 0;
        };
        TipsManager.prototype.initialize = function () {
            this.$container = new eui.Group();
            this.$container.width = this.$container.height = 1;
            this.$container.touchChildren = false;
            this.$container.touchEnabled = false;
            this.$container.touchThrough = true;
            this.$container.horizontalCenter = 0;
            this.$container.verticalCenter = 0;
            var parent = xgame.that.getService(egretx.IUIManager).getLayerManager(egretx.UILayerID.Layer_11_Toast);
            parent.addChild(this.$container);
        };
        return TipsManager;
    }(xgame.Singleton));
    egretx.TipsManager = TipsManager;
    __reflect(TipsManager.prototype, "egretx.TipsManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (egretx) {
    var UIOptions = (function (_super) {
        __extends(UIOptions, _super);
        function UIOptions() {
            var _this = _super.call(this) || this;
            _this.gap = 10;
            return _this;
        }
        return UIOptions;
    }(xgame.XObject));
    egretx.UIOptions = UIOptions;
    __reflect(UIOptions.prototype, "egretx.UIOptions");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/

(function (egretx) {
    egretx.ISceneTransition = Symbol.for("ISceneTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-27
*************************************************/
/// <reference path="./ISceneTransition.ts" />
/// <reference path="../interfaces/IUIManager.ts" />

(function (egretx) {
    var SceneTransition = (function (_super) {
        __extends(SceneTransition, _super);
        function SceneTransition() {
            var _this = _super.call(this) || this;
            xgame.injectInstance(_this);
            return _this;
        }
        SceneTransition.prototype.start = function (scene) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        __decorate([
            xgame.inject(egretx.IUIManager),
            __metadata("design:type", Object)
        ], SceneTransition.prototype, "uiManager", void 0);
        SceneTransition = __decorate([
            xgame.impl(egretx.ISceneTransition),
            __metadata("design:paramtypes", [])
        ], SceneTransition);
        return SceneTransition;
    }(xgame.XObject));
    egretx.SceneTransition = SceneTransition;
    __reflect(SceneTransition.prototype, "egretx.SceneTransition", ["egretx.ISceneTransition", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
/// <reference path="./SceneTransition.ts" />

(function (egretx) {
    var SceneFadeTransition = (function (_super) {
        __extends(SceneFadeTransition, _super);
        function SceneFadeTransition(blockSize, duration, style) {
            if (blockSize === void 0) { blockSize = 128; }
            if (duration === void 0) { duration = 500; }
            if (style === void 0) { style = egretx.SceneMotion.RANDOM; }
            var _this = _super.call(this) || this;
            _this.blockSize = blockSize;
            _this.duration = duration;
            _this.style = style;
            return _this;
        }
        SceneFadeTransition.prototype.start = function (scene) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var layerManager = _this.uiManager.getLayerManager(egretx.UILayerID.Layer_3_SceneMask);
                var w = _this.uiManager.stage.stageWidth;
                var h = _this.uiManager.stage.stageHeight;
                var g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                var size_block = _this.blockSize;
                var w_block = size_block;
                var h_block = size_block;
                var count_cols = Math.ceil(w / w_block);
                var count_rows = Math.ceil(h / h_block);
                var count_blocks = count_cols * count_rows;
                var time_transition = _this.duration;
                var col = 0;
                var row = 0;
                for (var i = 0; i < count_blocks; i++) {
                    col = i % count_cols;
                    row = Math.floor(i / count_cols);
                    var x = i % count_cols * w_block;
                    var y = Math.floor(i / count_cols) * h_block;
                    var texture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    var bmp = egretx.BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2;
                    bmp.anchorOffsetY = h_block / 2;
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    var time_random = 0;
                    if (_this.style == egretx.SceneMotion.TOP) {
                        time_random = i * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM) {
                        time_random = (count_blocks - 1 - i) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.LEFT) {
                        time_random = col * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.RIGHT) {
                        time_random = (count_cols - col) * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_LEFT) {
                        time_random = col * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_RIGHT) {
                        time_random = (count_cols - col) * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_LEFT) {
                        time_random = col * (count_rows - row) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_RIGHT) {
                        time_random = (count_cols - col) * (count_rows - row) * 10;
                    }
                    else {
                        time_random = Math.floor(Math.random() * 300);
                    }
                    var tw = egret.Tween.get(bmp);
                    tw.wait(time_random).to({ alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, _this, [bmp]);
                }
                var count_completed = 0;
                function onComplete(bmp) {
                    egretx.BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        };
        return SceneFadeTransition;
    }(egretx.SceneTransition));
    egretx.SceneFadeTransition = SceneFadeTransition;
    __reflect(SceneFadeTransition.prototype, "egretx.SceneFadeTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/

(function (egretx) {
    var SceneHShuttersTransition = (function (_super) {
        __extends(SceneHShuttersTransition, _super);
        function SceneHShuttersTransition(countBlocks, duration) {
            if (countBlocks === void 0) { countBlocks = 8; }
            if (duration === void 0) { duration = 500; }
            var _this = _super.call(this) || this;
            _this.countBlocks = countBlocks;
            _this.duration = duration;
            return _this;
        }
        SceneHShuttersTransition.prototype.start = function (scene) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var layerManager = _this.uiManager.getLayerManager(egretx.UILayerID.Layer_3_SceneMask);
                var w = _this.uiManager.stage.stageWidth;
                var h = _this.uiManager.stage.stageHeight;
                var g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                var count_blocks = _this.countBlocks;
                var count_cols = 1;
                var count_rows = count_blocks / count_cols;
                var w_block = w / count_cols;
                var h_block = h / count_rows;
                var time_transition = _this.duration;
                for (var i = 0; i < count_blocks; i++) {
                    var x = i % count_cols * w_block;
                    var y = Math.floor(i / count_cols) * h_block;
                    var texture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    var bmp = egretx.BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2;
                    bmp.anchorOffsetY = h_block / 2;
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 1, scaleY: 0.2, alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, _this, [bmp]);
                }
                var count_completed = 0;
                function onComplete(bmp) {
                    egretx.BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        };
        return SceneHShuttersTransition;
    }(egretx.SceneTransition));
    egretx.SceneHShuttersTransition = SceneHShuttersTransition;
    __reflect(SceneHShuttersTransition.prototype, "egretx.SceneHShuttersTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-20
*************************************************/

(function (egretx) {
    var SceneMotion;
    (function (SceneMotion) {
        SceneMotion[SceneMotion["TOP"] = 0] = "TOP";
        SceneMotion[SceneMotion["BOTTOM"] = 1] = "BOTTOM";
        SceneMotion[SceneMotion["LEFT"] = 2] = "LEFT";
        SceneMotion[SceneMotion["RIGHT"] = 3] = "RIGHT";
        SceneMotion[SceneMotion["RANDOM"] = 4] = "RANDOM";
        SceneMotion[SceneMotion["TOP_LEFT"] = 5] = "TOP_LEFT";
        SceneMotion[SceneMotion["TOP_RIGHT"] = 6] = "TOP_RIGHT";
        SceneMotion[SceneMotion["BOTTOM_LEFT"] = 7] = "BOTTOM_LEFT";
        SceneMotion[SceneMotion["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
    })(SceneMotion = egretx.SceneMotion || (egretx.SceneMotion = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/

(function (egretx) {
    var SceneRotateTransition = (function (_super) {
        __extends(SceneRotateTransition, _super);
        function SceneRotateTransition(blockSize, duration, style) {
            if (blockSize === void 0) { blockSize = 128; }
            if (duration === void 0) { duration = 500; }
            if (style === void 0) { style = egretx.SceneMotion.RANDOM; }
            var _this = _super.call(this) || this;
            _this.blockSize = blockSize;
            _this.duration = duration;
            _this.style = style;
            return _this;
        }
        SceneRotateTransition.prototype.start = function (scene) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var layerManager = _this.uiManager.getLayerManager(egretx.UILayerID.Layer_3_SceneMask);
                var w = _this.uiManager.stage.stageWidth;
                var h = _this.uiManager.stage.stageHeight;
                var g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                var size_block = _this.blockSize;
                var w_block = size_block;
                var h_block = size_block;
                var count_cols = Math.ceil(w / w_block);
                var count_rows = Math.ceil(h / h_block);
                var count_blocks = count_cols * count_rows;
                var time_transition = _this.duration;
                var col = 0;
                var row = 0;
                for (var i = 0; i < count_blocks; i++) {
                    col = i % count_cols;
                    row = Math.floor(i / count_cols);
                    var x = i % count_cols * w_block;
                    var y = Math.floor(i / count_cols) * h_block;
                    var texture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    var bmp = egretx.BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2;
                    bmp.anchorOffsetY = h_block / 2;
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    var time_random = 0;
                    if (_this.style == egretx.SceneMotion.TOP) {
                        time_random = i * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM) {
                        time_random = (count_blocks - 1 - i) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.LEFT) {
                        time_random = col * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.RIGHT) {
                        time_random = (count_cols - col) * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_LEFT) {
                        time_random = col * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_RIGHT) {
                        time_random = (count_cols - col) * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_LEFT) {
                        time_random = col * (count_rows - row) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_RIGHT) {
                        time_random = (count_cols - col) * (count_rows - row) * 10;
                    }
                    else {
                        time_random = Math.floor(Math.random() * 300);
                    }
                    var tw = egret.Tween.get(bmp);
                    tw.wait(time_random).to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, time_transition, egret.Ease.circIn).call(onComplete, _this, [bmp]);
                }
                var count_completed = 0;
                function onComplete(bmp) {
                    egretx.BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        };
        return SceneRotateTransition;
    }(egretx.SceneTransition));
    egretx.SceneRotateTransition = SceneRotateTransition;
    __reflect(SceneRotateTransition.prototype, "egretx.SceneRotateTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/

(function (egretx) {
    var SceneScaleTransition = (function (_super) {
        __extends(SceneScaleTransition, _super);
        function SceneScaleTransition(blockSize, duration, style) {
            if (blockSize === void 0) { blockSize = 128; }
            if (duration === void 0) { duration = 500; }
            if (style === void 0) { style = egretx.SceneMotion.RANDOM; }
            var _this = _super.call(this) || this;
            _this.blockSize = blockSize;
            _this.duration = duration;
            _this.style = style;
            return _this;
        }
        SceneScaleTransition.prototype.start = function (scene) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var layerManager = _this.uiManager.getLayerManager(egretx.UILayerID.Layer_3_SceneMask);
                var w = _this.uiManager.stage.stageWidth;
                var h = _this.uiManager.stage.stageHeight;
                var g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                var size_block = _this.blockSize;
                var w_block = size_block;
                var h_block = size_block;
                var count_cols = Math.ceil(w / w_block);
                var count_rows = Math.ceil(h / h_block);
                var count_blocks = count_cols * count_rows;
                var time_transition = _this.duration;
                var col = 0;
                var row = 0;
                for (var i = 0; i < count_blocks; i++) {
                    col = i % count_cols;
                    row = Math.floor(i / count_cols);
                    var x = i % count_cols * w_block;
                    var y = Math.floor(i / count_cols) * h_block;
                    var texture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    var bmp = egretx.BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2;
                    bmp.anchorOffsetY = h_block / 2;
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    var time_random = 0;
                    if (_this.style == egretx.SceneMotion.TOP) {
                        time_random = i * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM) {
                        time_random = (count_blocks - 1 - i) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.LEFT) {
                        time_random = col * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.RIGHT) {
                        time_random = (count_cols - col) * count_rows * 10 + row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_LEFT) {
                        time_random = col * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.TOP_RIGHT) {
                        time_random = (count_cols - col) * row * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_LEFT) {
                        time_random = col * (count_rows - row) * 10;
                    }
                    else if (_this.style == egretx.SceneMotion.BOTTOM_RIGHT) {
                        time_random = (count_cols - col) * (count_rows - row) * 10;
                    }
                    else {
                        time_random = Math.floor(Math.random() * 300);
                    }
                    var tw = egret.Tween.get(bmp);
                    tw.wait(time_random).to({ scaleX: 0, scaleY: 0, alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, _this, [bmp]);
                }
                var count_completed = 0;
                function onComplete(bmp) {
                    egretx.BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        };
        return SceneScaleTransition;
    }(egretx.SceneTransition));
    egretx.SceneScaleTransition = SceneScaleTransition;
    __reflect(SceneScaleTransition.prototype, "egretx.SceneScaleTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/

(function (egretx) {
    var SceneVShuttersTransition = (function (_super) {
        __extends(SceneVShuttersTransition, _super);
        function SceneVShuttersTransition(countBlocks, duration) {
            if (countBlocks === void 0) { countBlocks = 8; }
            if (duration === void 0) { duration = 500; }
            var _this = _super.call(this) || this;
            _this.countBlocks = countBlocks;
            _this.duration = duration;
            return _this;
        }
        SceneVShuttersTransition.prototype.start = function (scene) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var layerManager = _this.uiManager.getLayerManager(egretx.UILayerID.Layer_3_SceneMask);
                var w = _this.uiManager.stage.stageWidth;
                var h = _this.uiManager.stage.stageHeight;
                var g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                var count_blocks = _this.countBlocks;
                var count_cols = _this.countBlocks;
                var count_rows = count_blocks / count_cols;
                var w_block = w / count_cols;
                var h_block = h / count_rows;
                var time_transition = _this.duration;
                for (var i = 0; i < count_blocks; i++) {
                    var x = i % count_cols * w_block;
                    var y = Math.floor(i / count_cols) * h_block;
                    var texture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    var bmp = egretx.BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2;
                    bmp.anchorOffsetY = h_block / 2;
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, _this, [bmp]);
                }
                var count_completed = 0;
                function onComplete(bmp) {
                    bmp.$bitmapData.$dispose();
                    egretx.BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        };
        return SceneVShuttersTransition;
    }(egretx.SceneTransition));
    egretx.SceneVShuttersTransition = SceneVShuttersTransition;
    __reflect(SceneVShuttersTransition.prototype, "egretx.SceneVShuttersTransition");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/

(function (egretx) {
    var UIFadeTransition = (function (_super) {
        __extends(UIFadeTransition, _super);
        function UIFadeTransition(duration) {
            if (duration === void 0) { duration = 500; }
            var _this = _super.call(this) || this;
            _this.duration = duration;
            return _this;
        }
        UIFadeTransition.prototype.start = function (ui, fadeOut) {
            var _this = this;
            if (fadeOut === void 0) { fadeOut = false; }
            return new Promise(function (resolve, reject) {
                egret.Tween.removeTweens(ui);
                var from = 0;
                var to = 1;
                var ease = egret.Ease.cubicOut;
                if (fadeOut) {
                    from = 1;
                    to = 0;
                    ease = egret.Ease.cubicIn;
                }
                ui.alpha = from;
                var tw = egret.Tween.get(ui);
                tw.to({ alpha: to }, _this.duration, ease).call(function () {
                    resolve();
                });
            });
        };
        return UIFadeTransition;
    }(xgame.XObject));
    egretx.UIFadeTransition = UIFadeTransition;
    __reflect(UIFadeTransition.prototype, "egretx.UIFadeTransition", ["egretx.IUITransition", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/

(function (egretx) {
    var UIScaleTransition = (function (_super) {
        __extends(UIScaleTransition, _super);
        function UIScaleTransition(duration) {
            if (duration === void 0) { duration = 300; }
            var _this = _super.call(this) || this;
            _this.duration = duration;
            return _this;
        }
        UIScaleTransition.prototype.start = function (ui, fadeOut) {
            var _this = this;
            if (fadeOut === void 0) { fadeOut = false; }
            return new Promise(function (resolve, reject) {
                egret.Tween.removeTweens(ui);
                var from = 0;
                var to = ui.scaleX;
                var ease = egret.Ease.backOut;
                if (fadeOut) {
                    from = ui.scaleX;
                    to = 0;
                    ease = egret.Ease.backIn;
                }
                ui.scaleX = ui.scaleY = from;
                var tw = egret.Tween.get(ui);
                tw.to({ scaleX: to, scaleY: to }, _this.duration, ease).call(function () {
                    resolve();
                });
            });
        };
        return UIScaleTransition;
    }(xgame.XObject));
    egretx.UIScaleTransition = UIScaleTransition;
    __reflect(UIScaleTransition.prototype, "egretx.UIScaleTransition", ["egretx.IUITransition", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/

(function (egretx) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Bitmap.prototype.release = function () {
        };
        Bitmap.prototype.dispose = function () {
            if (this.$bitmapData) {
                this.$bitmapData.$dispose();
            }
            this.removeSelf();
        };
        Bitmap.prototype.removeSelf = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        Bitmap = __decorate([
            xgame.impl(xgame.IPoolable)
        ], Bitmap);
        return Bitmap;
    }(egret.Bitmap));
    egretx.Bitmap = Bitmap;
    __reflect(Bitmap.prototype, "egretx.Bitmap", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
    var BitmapPools = (function (_super) {
        __extends(BitmapPools, _super);
        function BitmapPools() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolObject(Bitmap);
            return _this;
        }
        BitmapPools.prototype.fetch = function () {
            return this.pools.fetch(function () {
                return new Bitmap();
            }, this);
        };
        BitmapPools.prototype.recycle = function (bitmap) {
            this.pools.recycle(bitmap);
        };
        return BitmapPools;
    }(xgame.Singleton));
    egretx.BitmapPools = BitmapPools;
    __reflect(BitmapPools.prototype, "egretx.BitmapPools");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
/// <reference path="../structs/UIDirection.ts" />
/// <reference path="../structs/UIAlign.ts" />

(function (egretx) {
    var hud_bounds = new egret.Rectangle();
    var tips_bounds = new egret.Rectangle();
    var TipsHelper = (function () {
        function TipsHelper() {
        }
        TipsHelper.placeTipsWithHUD = function (tips, hud, gap) {
            if (gap === void 0) { gap = 10; }
            var uiManager = xgame.that.getService(egretx.IUIManager);
            var stage = uiManager.stage;
            var direction = tips.uiDirection;
            var align = tips.uiAlign;
            var screenWidth = stage.stageWidth;
            var screenHeight = stage.stageHeight;
            tips.getBounds(tips_bounds, true);
            hud.getTransformedBounds(tips.parent, hud_bounds);
            var hw = hud.width * hud.scaleX;
            var hh = hud.height * hud.scaleY;
            var tw = tips.width;
            var th = tips.height;
            var left = hud_bounds.x;
            var top = hud_bounds.y;
            var right = left + hw;
            var bottom = top + hh;
            //尝试放置到下边
            if (tips.allowUIDirection(egretx.UIDirection.BOTTOM) && ((screenHeight - bottom - 2 * gap >= th && direction == egretx.UIDirection.ANY) || direction == egretx.UIDirection.BOTTOM)) {
                tips.y = bottom + gap;
                if (align == egretx.UIAlign.LEFT) {
                    tips.x = left;
                }
                else if (align == egretx.UIAlign.RIGHT) {
                    tips.x = right - tw;
                }
                else {
                    tips.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(egretx.UIDirection.BOTTOM);
            }
            else if (tips.allowUIDirection(egretx.UIDirection.TOP) && ((top - 2 * gap >= th && direction == egretx.UIDirection.ANY) || direction == egretx.UIDirection.TOP)) {
                tips.y = top - gap - th;
                if (align == egretx.UIAlign.LEFT) {
                    tips.x = left;
                }
                else if (align == egretx.UIAlign.RIGHT) {
                    tips.x = right - tw;
                }
                else {
                    tips.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(egretx.UIDirection.TOP);
            }
            else if (tips.allowUIDirection(egretx.UIDirection.RIGHT) && ((screenWidth - right - 2 * gap >= tw && direction == egretx.UIDirection.ANY) || direction == egretx.UIDirection.RIGHT)) {
                tips.x = right + gap;
                if (align == egretx.UIAlign.TOP) {
                    tips.y = top;
                }
                else if (align == egretx.UIAlign.BOTTOM) {
                    tips.y = top + hh - th;
                }
                else {
                    tips.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(egretx.UIDirection.RIGHT);
            }
            else if (tips.allowUIDirection(egretx.UIDirection.LEFT) && ((left - 2 * gap >= tw && direction == egretx.UIDirection.ANY) || direction == egretx.UIDirection.LEFT)) {
                tips.x = left - gap - tw;
                if (align == egretx.UIAlign.TOP) {
                    tips.y = top;
                }
                else if (align == egretx.UIAlign.BOTTOM) {
                    tips.y = top + hh - th;
                }
                else {
                    tips.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(egretx.UIDirection.LEFT);
            }
            tips.x += tips.offset.x;
            tips.y += tips.offset.y;
            tips.visible = true;
        };
        return TipsHelper;
    }());
    egretx.TipsHelper = TipsHelper;
    __reflect(TipsHelper.prototype, "egretx.TipsHelper");
})(egretx || (egretx = {}));
