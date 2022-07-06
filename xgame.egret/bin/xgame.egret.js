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
                    game.getService(egretx.IDragonBonesManagerInternal).initialize();
                    game.getService(egretx.IAnimationManagerInternal).initialize();
                    game.getService(egretx.ITimelineManagerInternal).initialize();
                    game.getService(egretx.IAudioManagerInternal).initialize();
                    game.getService(egretx.IResourceManagerInternal).initialize();
                    game.getService(egretx.IHttpManagerInternal).initialize();
                    game.getService(egretx.ISocketManagerInternal).initialize();
                    game.getService(egretx.IUIManagerInternal).initialize();
                    game.getService(egretx.ITouchManagerInternal).initialize();
                    return [2 /*return*/, true];
                });
            });
        };
        EgretProvider.prototype.onServiceRegister = function (game) {
            game.singleton(egretx.IDragonBonesManager, egretx.DragonBonesManager).withInstance(egretx.DragonBonesManager.Instance()).setAlias(egretx.IDragonBonesManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.DragonBonesManager)));
            game.singleton(egretx.IAnimationManager, egretx.AnimationManager).withInstance(egretx.AnimationManager.Instance()).setAlias(egretx.IAnimationManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.AnimationManager)));
            game.singleton(egretx.ITimelineManager, egretx.TimelineManager).withInstance(egretx.TimelineManager.Instance()).setAlias(egretx.ITimelineManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.TimelineManager)));
            game.singleton(egretx.IAudioManager, egretx.AudioManager).withInstance(egretx.AudioManager.Instance()).setAlias(egretx.IAudioManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.AudioManager)));
            game.singleton(egretx.IResourceManager, egretx.ResourceManager).withInstance(egretx.ResourceManager.Instance()).setAlias(egretx.IResourceManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.ResourceManager)));
            game.singleton(egretx.IHttpManager, egretx.HttpManager).withInstance(egretx.HttpManager.Instance()).setAlias(egretx.IHttpManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.HttpManager)));
            game.singleton(egretx.ISocketManager, egretx.SocketManager).withInstance(egretx.SocketManager.Instance()).setAlias(egretx.ISocketManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.SocketManager)));
            game.singleton(egretx.IUIManager, egretx.UIManager).withInstance(new egretx.UIManager(this.main)).setAlias(egretx.IUIManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.UIManager)));
            game.singleton(egretx.ITouchManager, egretx.TouchManager).withInstance(new egretx.TouchManager(this.main)).setAlias(egretx.ITouchManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(egretx.TouchManager)));
        };
        return EgretProvider;
    }(xgame.XObject));
    egretx.EgretProvider = EgretProvider;
    __reflect(EgretProvider.prototype, "egretx.EgretProvider", ["xgame.IServiceProvider"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * 帧动画管理器
     */
    var AnimationManager = (function (_super) {
        __extends(AnimationManager, _super);
        function AnimationManager() {
            var _this = _super.call(this) || this;
            //当前正在播放的动画对象集
            _this.playingClips = new xgame.Dictionary();
            _this.pools = new xgame.PoolGroup("AnimationClip");
            _this.factories = new xgame.Dictionary();
            return _this;
        }
        AnimationManager.prototype.initialize = function () {
        };
        /**
         * 从对象池中取出一个动画
         * @param key
         * @param movieClipName
         */
        AnimationManager.prototype.fetch = function (key, movieClipName) {
            movieClipName = movieClipName || key;
            var id = "{0}:{1}".format(key, movieClipName);
            var clip = this.pools.fetch(id, egretx.AnimationClip, function () { return new egretx.AnimationClip(key, movieClipName); }, this);
            this.playingClips.add(clip.hashCode, clip);
            return clip;
        };
        /**
         * 回收动画对象
         * @param clip
         */
        AnimationManager.prototype.recycle = function (clip) {
            this.playingClips.remove(clip.hashCode);
            var id = "{0}:{1}".format(clip.key, clip.movieClipname);
            this.pools.recycle(id, egretx.AnimationClip, clip);
        };
        /**
         * 释放指定的动画对象及资源
         * @param key
         */
        AnimationManager.prototype.release = function (key) {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                var id_list = id.split(":");
                if (id_list[0] == key) {
                    _this._release(id);
                }
            }, this, true);
        };
        AnimationManager.prototype._release = function (id) {
            if (this.pools.getPool(id, egretx.AnimationClip).expired) {
                this.pools.release(id, egretx.AnimationClip);
                var key = id.split(":")[0];
                if (this.factories.containsKey(key)) {
                    this.factories.remove(key);
                    console.log("AnimationManager.clearMovieClipDataFactory({0})".format(key));
                }
                egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.MovieClip).release(key);
            }
        };
        /**
         * 释放全部可以释放的动画对象及资源
         */
        AnimationManager.prototype.releases = function () {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                _this._release(id);
            }, this, true);
        };
        /**
         * 根据key获取动画相关资源，默认动画文件前缀相同
         * @param key
         * @returns
         */
        AnimationManager.prototype.getRes = function (key) {
            var res = {};
            res.json = key + "_json";
            res.texture = key + "_png";
            return res;
        };
        /**
         * 构建动画帧数据
         * @param key
         * @param movieClipName
         * @returns
         */
        AnimationManager.prototype.generateMovieClipData = function (key, movieClipName) {
            movieClipName = movieClipName || key;
            var res = this.getRes(key);
            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                console.warn("动画{0}的资源没有加载".format(key));
                return null;
            }
            var factory = this.factories.get(key);
            if (!factory) {
                factory = new egret.MovieClipDataFactory(RES.getRes(res.json), RES.getRes(res.texture));
                this.factories.add(key, factory);
            }
            movieClipName = movieClipName || key;
            return factory.generateMovieClipData(movieClipName);
        };
        return AnimationManager;
    }(xgame.Singleton));
    egretx.AnimationManager = AnimationManager;
    __reflect(AnimationManager.prototype, "egretx.AnimationManager", ["egretx.IAnimationManager", "xgame.IXObject", "egretx.IAnimationManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * 帧动画剪辑
     */
    var AnimationClip = (function (_super) {
        __extends(AnimationClip, _super);
        function AnimationClip(key, movieClipname, actionName) {
            if (actionName === void 0) { actionName = "mc"; }
            var _this = _super.call(this) || this;
            _this.frameActions = [];
            _this.$timeline = egretx.Timeline.MAIN;
            _this.fromPoolHashCode = 0;
            _this.$timeScale = 1.0;
            _this.$scale = 1;
            _this.$mc_scaleX = 1;
            _this.$mc_scaleY = 1;
            _this.callback_preload = new xgame.Signal0();
            _this.$playTimes = 0;
            movieClipname = movieClipname || key;
            _this.name = "{0}:{1}".format(key, movieClipname);
            _this.key = key;
            _this.movieClipname = movieClipname;
            _this.actionName = actionName;
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        Object.defineProperty(AnimationClip.prototype, "mc", {
            get: function () {
                return this.$mc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "timeline", {
            get: function () {
                return this.$timeline;
            },
            enumerable: true,
            configurable: true
        });
        AnimationClip.prototype.setTimeline = function (value) {
            this.$timeline = value;
        };
        AnimationClip.prototype.release = function () {
            this.dispose();
            this.data = undefined;
            this.$mc = undefined;
            this.frameActions.length = 0;
        };
        AnimationClip.prototype.dispose = function () {
            this.removeSelf();
        };
        Object.defineProperty(AnimationClip.prototype, "frameRate", {
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                this.$frameRate = value;
                if (this.mc) {
                    this.mc.frameRate = this.frameRate;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "timeScale", {
            get: function () {
                return this.$timeScale;
            },
            set: function (value) {
                this.$timeScale = value;
                if (this.$mc) {
                    this.$mc.timeScale = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "scale", {
            get: function () {
                return this.$scale;
            },
            set: function (value) {
                this.$scale = value;
                this.mc_scaleX = value;
                this.mc_scaleY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "mc_scaleX", {
            get: function () {
                return this.$mc_scaleX;
            },
            set: function (value) {
                this.$mc_scaleX = value;
                if (this.$mc) {
                    this.$mc.scaleX = this.$mc_scaleX;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "mc_scaleY", {
            get: function () {
                return this.$mc_scaleY;
            },
            set: function (value) {
                this.$mc_scaleY = value;
                if (this.$mc) {
                    this.$mc.scaleY = this.$mc_scaleY;
                }
            },
            enumerable: true,
            configurable: true
        });
        AnimationClip.prototype.addFrameAction = function (action, thisObject, frame) {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.addFrameAction(frame, action, thisObject);
            }
            else {
                this.frameActions.push(new egretx.FrameActionItem(action, thisObject, frame));
            }
        };
        AnimationClip.prototype.removeFrameActions = function (frame) {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.removeFrameActions(frame);
            }
        };
        AnimationClip.prototype.preload = function () {
            var self = this;
            if (this.$mc) {
                this.callback_preload.dispatch();
            }
            else {
                this.loadMC(true).then(function () {
                    self.callback_preload.dispatch();
                });
            }
            return this.callback_preload;
        };
        AnimationClip.prototype.playWithAutoRemove = function (actionName) {
            var _this = this;
            this.addFrameAction(function () {
                egretx.AnimationManager.Instance().recycle(_this);
            }, this);
            this.play(1, actionName);
        };
        AnimationClip.prototype.play = function (playTimes, actionName) {
            if (actionName != undefined) {
                this.actionName = actionName;
            }
            if (isNaN(playTimes)) {
                this.$playTimes = 0;
            }
            else {
                this.$playTimes = playTimes;
            }
            if (this.mc) {
                this._play();
            }
            else {
                if (this.data) {
                    this.initMC(this.data);
                }
                else {
                    this.loadMC();
                }
            }
        };
        AnimationClip.prototype.loadMC = function (is_preload) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceGroup, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resourceGroup = egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.MovieClip);
                            resourceGroup.load(this.key);
                            res = egretx.AnimationManager.Instance().getRes(this.key);
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 2:
                            _a.sent();
                            this.data = egretx.AnimationManager.Instance().generateMovieClipData(this.key, this.movieClipname);
                            this.initMC(this.data, is_preload);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AnimationClip.prototype.onFrameLabelEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.onLoopCompleteEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.onCompleteEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.initMC = function (mcData, is_preload) {
            var res = egretx.AnimationManager.Instance().getRes(this.key);
            if (!RES.getRes(res.json)) {
                return;
            }
            ;
            for (var _i = 0, _a = this.frameActions; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.frame == -1) {
                    item.frame = mcData.numFrames;
                }
            }
            this.$mc = new egretx.MovieClip(mcData, this.frameActions);
            this.mc.timeScale = this.timeScale;
            this.mc.setTimeline(this.timeline);
            this.mc.scaleX = this.mc_scaleX;
            this.mc.scaleY = this.mc_scaleY;
            if (egretx.MovieClip.DISPATCH_ENABLE) {
                this.mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (!isNaN(this.frameRate) && this.frameRate > 0) {
                this.mc.frameRate = this.frameRate;
            }
            this.frameActions.length = 0;
            this.addChild(this.$mc);
            if (!is_preload) {
                this._play();
            }
        };
        AnimationClip.prototype._play = function () {
            if (this.mc) {
                if (this.actionName) {
                    this.mc.gotoAndPlay(this.actionName, this.$playTimes);
                }
                else {
                    this.mc.play(this.$playTimes);
                }
            }
        };
        AnimationClip.prototype.stop = function () {
            if (this.mc) {
                this.mc.stop();
            }
        };
        AnimationClip.prototype.reset = function () {
            if (this.mc) {
                this.mc.removeFrameActions();
            }
        };
        AnimationClip.prototype.removeSelf = function () {
            this.stop();
            if (this.mc) {
                this.mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AnimationClip;
    }(eui.Component));
    egretx.AnimationClip = AnimationClip;
    __reflect(AnimationClip.prototype, "egretx.AnimationClip", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    var FrameAction = (function () {
        function FrameAction(frame) {
            this.name = "FrameAction";
            this.frame = frame;
        }
        Object.defineProperty(FrameAction.prototype, "frame", {
            get: function () {
                return this.$frame;
            },
            set: function (value) {
                if (isNaN(value)) {
                    this.$frame = -1;
                }
                else {
                    this.$frame = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        FrameAction.prototype.hasAction = function (action, thisObject) {
            if (this.$items == null) {
                return -1;
            }
            for (var i = 0; i < this.$items.length; i++) {
                var item = this.$items[i];
                if (item.action == action && item.thisObject == thisObject) {
                    return i;
                }
            }
            return -1;
        };
        FrameAction.prototype.addAction = function (action, thisObject) {
            if (this.$items == null) {
                this.$items = [];
            }
            if (this.hasAction(action, thisObject) == -1) {
                this.$items[this.$items.length] = new egretx.FrameActionItem(action, thisObject, this.frame);
            }
        };
        FrameAction.prototype.removeAction = function (action, thisObject) {
            if (this.$items) {
                var index = this.hasAction(action, thisObject);
                if (index >= 0) {
                    this.$items.splice(index, 1);
                }
            }
        };
        FrameAction.prototype.removeActions = function () {
            if (this.$items) {
                this.$items.length = 0;
            }
        };
        FrameAction.prototype.executeActions = function (target, frameID) {
            if (this.$items) {
                var list = this.$items.slice();
                for (var i = 0, len = list.length; i < len; ++i) {
                    var item = list[i];
                    var action = item.action;
                    var numArgs = action.length;
                    if (numArgs == 0) {
                        action.call(item.thisObject);
                    }
                    else if (numArgs == 1) {
                        action.call(item.thisObject, target);
                    }
                    else if (numArgs == 2) {
                        action.call(item.thisObject, target, frameID);
                    }
                }
            }
        };
        Object.defineProperty(FrameAction.prototype, "numActions", {
            get: function () {
                return this.$items ? this.$items.length : 0;
            },
            enumerable: true,
            configurable: true
        });
        return FrameAction;
    }());
    egretx.FrameAction = FrameAction;
    __reflect(FrameAction.prototype, "egretx.FrameAction");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    var FrameActionItem = (function () {
        function FrameActionItem(action, thisObject, frame) {
            this.action = action;
            this.thisObject = thisObject;
            if (isNaN(frame) || frame == 0) {
                this.frame = -1;
            }
            else {
                this.frame = frame;
            }
        }
        return FrameActionItem;
    }());
    egretx.FrameActionItem = FrameActionItem;
    __reflect(FrameActionItem.prototype, "egretx.FrameActionItem");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * 从egret.MoveClip修改而来
     */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        //Construct Function
        /**
         * 创建新的 MovieClip 实例。创建 MovieClip 之后，调用舞台上的显示对象容器的addElement方法。
         * @param movieClipData {movieClipData} 被引用的 movieClipData 对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        function MovieClip(movieClipData, invokeActions) {
            var _this = _super.call(this) || this;
            _this.$actions = new xgame.Dictionary();
            _this.$timeline = egretx.Timeline.MAIN;
            //Render Property
            _this.$texture = null;
            //Render Property
            // private offsetPoint: egret.Point = egret.Point.create(0, 0);
            _this.offsetPoint = new egret.Point(0, 0);
            //Data Property
            _this.$movieClipData = null;
            /**
             * @private
             */
            _this.frames = null;
            /**
             * @private
             */
            _this.$totalFrames = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameLabels = null;
            /**
             * @private
             */
            _this.$frameLabelStart = 0;
            /**
             * @private
             */
            _this.$frameLabelEnd = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameEvents = null;
            /**
             * @private
             */
            _this.frameIntervalTime = 0;
            /**
             * @private
             */
            _this.$eventPool = null;
            //Animation Property
            _this.$isPlaying = false;
            /**
             * @private
             */
            _this.isStopped = true;
            /**
             * @private
             */
            _this.playTimes = 0;
            /**
             * @private
             */
            _this.$currentFrameNum = 0;
            /**
             * @private
             */
            _this.$nextFrameNum = 1;
            /**
             * @private
             */
            _this.displayedKeyFrameNum = 0;
            /**
             * @private
             */
            _this.passedTime = 0;
            /**
             * @private
             */
            _this.$frameRate = NaN;
            _this.$timeScale = 1.0;
            /**
             * @private
             */
            _this.lastTime = 0;
            _this.invokeActions = invokeActions;
            _this.$smoothing = egret.Bitmap.defaultSmoothing;
            _this.setMovieClipData(movieClipData);
            if (!egret.nativeRender) {
                _this.$renderNode = new egret.sys.NormalBitmapNode();
            }
            return _this;
        }
        Object.defineProperty(MovieClip.prototype, "timeline", {
            get: function () {
                return this.$timeline;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.setTimeline = function (value) {
            this.$timeline = value;
        };
        MovieClip.prototype.setData = function (movieClipData, invokeActions) {
            this.setInvokeActions(invokeActions);
            this.setMovieClipData(movieClipData, true);
        };
        MovieClip.prototype.setInvokeActions = function (invokeActions) {
            this.invokeActions = invokeActions;
        };
        Object.defineProperty(MovieClip.prototype, "timeScale", {
            get: function () {
                return this.$timeScale;
            },
            set: function (value) {
                this.$timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.createNativeDisplayObject = function () {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(11 /* BITMAP_TEXT */);
        };
        Object.defineProperty(MovieClip.prototype, "smoothing", {
            /**
             * Whether or not is smoothed when scaled.
             * @version Egret 3.0
             * @platform Web
             * @language en_US
             */
            /**
             * 控制在缩放时是否进行平滑处理。
             * @version Egret 3.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$smoothing;
            },
            set: function (value) {
                if (value == this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         */
        MovieClip.prototype.$init = function () {
            this.$reset();
            var movieClipData = this.$movieClipData;
            if (movieClipData && movieClipData.$isDataValid()) {
                this.frames = movieClipData.frames;
                this.$totalFrames = movieClipData.numFrames;
                this.frameLabels = movieClipData.labels;
                this.frameEvents = movieClipData.events;
                this.$frameRate = movieClipData.frameRate;
                this.frameIntervalTime = 1000 / this.$frameRate;
                this.fillMovieFrames();
                this._initFrame();
            }
        };
        MovieClip.prototype.fillMovieFrames = function () {
            var len = this.movieClipData.frames.length;
            this.$actions.add(len, new egretx.FrameAction(len));
            if (this.invokeActions && this.invokeActions.length > 0) {
                for (var _i = 0, _a = this.invokeActions; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.frame == -1) {
                        item.frame = this.movieClipData.numFrames;
                    }
                    var action = this.getActionAt(item.frame);
                    if (action) {
                        action.addAction(item.action, item.thisObject);
                    }
                    else {
                        //this.logger.logDebug(LogChannel.RONTIAN,"frame not found=>" + item.frame + "=>" + this.frames.length + "=>" + this.movieClipData.numFrames);
                    }
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$reset = function () {
            this.frames = null;
            this.playTimes = 0;
            this.$isPlaying = false;
            this.setIsStopped(true);
            this.$currentFrameNum = 0;
            this.$nextFrameNum = 1;
            this.displayedKeyFrameNum = 0;
            this.passedTime = 0;
            this.$eventPool = [];
            this.$actions.clear();
        };
        /**
         * @private
         *
         */
        MovieClip.prototype._initFrame = function () {
            if (this.$movieClipData.$isTextureValid()) {
                this.advanceFrame();
                this.constructFrame();
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$updateRenderNode = function () {
            var texture = this.$texture;
            if (texture) {
                var offsetX = Math.round(this.offsetPoint.x);
                var offsetY = Math.round(this.offsetPoint.y);
                var bitmapWidth = texture.$bitmapWidth;
                var bitmapHeight = texture.$bitmapHeight;
                var textureWidth = texture.$getTextureWidth();
                var textureHeight = texture.$getTextureHeight();
                //this.logger.logDebug(LogChannel.RONTIAN, textureWidth, textureHeight, this.width, this.height);
                var destW = Math.round(texture.$getScaleBitmapWidth());
                var destH = Math.round(texture.$getScaleBitmapHeight());
                var sourceWidth = texture.$sourceWidth;
                var sourceHeight = texture.$sourceHeight;
                egret.sys.BitmapNode.$updateTextureData(this.$renderNode, texture.$bitmapData, texture.$bitmapX, texture.$bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, egret.BitmapFillMode.SCALE, this.$smoothing);
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$measureContentBounds = function (bounds) {
            var texture = this.$texture;
            if (texture) {
                var x = this.offsetPoint.x;
                var y = this.offsetPoint.y;
                var w = texture.$getTextureWidth();
                var h = texture.$getTextureHeight();
                bounds.setTo(x, y, w, h);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this.$isPlaying && this.$totalFrames > 1) {
                this.setIsStopped(false);
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$onRemoveFromStage = function () {
            this.setIsStopped(true);
            _super.prototype.$onRemoveFromStage.call(this);
        };
        //Data Function
        /**
         * @private
         * 返回帧标签为指定字符串的FrameLabel对象
         * @param labelName {string} 帧标签名
         * @param ignoreCase {boolean} 是否忽略大小写，可选参数，默认false
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelByName = function (labelName, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (ignoreCase) {
                labelName = labelName.toLowerCase();
            }
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (ignoreCase ? outputFramelabel.name.toLowerCase() == labelName : outputFramelabel.name == labelName) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * 根据帧标签，设置开始和结束的帧数
         * @param labelName {string} 帧标签名
         */
        MovieClip.prototype.getFrameStartEnd = function (labelName) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (labelName == outputFramelabel.name) {
                        this.$frameLabelStart = outputFramelabel.frame;
                        this.$frameLabelEnd = outputFramelabel.end;
                        break;
                    }
                }
            }
        };
        /**
         * @private
         * 返回指定序号的帧的FrameLabel对象
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelByFrame = function (frame) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (outputFramelabel.frame == frame) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * 返回指定序号的帧对应的FrameLabel对象，如果当前帧没有标签，则返回前面最近的有标签的帧的FrameLabel对象
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelForFrame = function (frame) {
            var outputFrameLabel = null;
            var tempFrameLabel = null;
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                for (var i = 0; i < frameLabels.length; i++) {
                    tempFrameLabel = frameLabels[i];
                    if (tempFrameLabel.frame > frame) {
                        return outputFrameLabel;
                    }
                    outputFrameLabel = tempFrameLabel;
                }
            }
            return outputFrameLabel;
        };
        //Animation Function
        /**
         * 继续播放当前动画
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.play = function (playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            this.lastTime = egret.getTimer();
            this.passedTime = 0;
            this.$isPlaying = true;
            this.setPlayTimes(playTimes);
            if (this.$totalFrames > 1 && this.$stage) {
                this.setIsStopped(false);
            }
        };
        /**
         * 暂停播放动画
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.stop = function () {
            this.$isPlaying = false;
            this.setIsStopped(true);
        };
        /**
         * 将播放头移到前一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.prevFrame = function () {
            this.gotoAndStop(this.$currentFrameNum - 1);
        };
        /**
         * 跳到后一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.nextFrame = function () {
            this.gotoAndStop(this.$currentFrameNum + 1);
        };
        /**
         * 将播放头移到指定帧并播放
         * @param frame {any} 指定帧的帧号或帧标签
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数，
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            if (arguments.length == 0 || arguments.length > 2) {
                egret.$error(1022, "MovieClip.gotoAndPlay()");
            }
            if (typeof frame === "string") {
                this.getFrameStartEnd(frame);
            }
            else {
                this.$frameLabelStart = 0;
                this.$frameLabelEnd = 0;
            }
            this.play(playTimes);
            this.gotoFrame(frame);
        };
        /**
         * 将播放头移到指定帧并停止
         * @param frame {any} 指定帧的帧号或帧标签
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndStop = function (frame) {
            if (arguments.length != 1) {
                egret.$error(1022, "MovieClip.gotoAndStop()");
            }
            this.stop();
            this.gotoFrame(frame);
        };
        /**
         * @private
         *
         * @param frame
         */
        MovieClip.prototype.gotoFrame = function (frame) {
            var frameNum;
            if (typeof frame === "string") {
                var fb = this.getFrameLabelByName(frame);
                if (!fb) {
                    return;
                }
                frameNum = fb.frame;
            }
            else {
                frameNum = parseInt(frame + '', 10);
                if (frameNum != frame) {
                    egret.$error(1022, "Frame Label Not Found");
                }
            }
            //this.logger.logDebug(LogChannel.RONTIAN,"gotoFrame=>{0}", frameNum);
            if (frameNum < 1) {
                frameNum = 1;
            }
            else if (frameNum > this.$totalFrames) {
                frameNum = this.$totalFrames;
            }
            // if (frameNum == this.$nextFrameNum) {
            //     return;
            // }
            this.$nextFrameNum = frameNum;
            this.advanceFrame();
            this.constructFrame();
            this.handlePendingEvent();
        };
        MovieClip.prototype.advanceTime = function (time) {
            var self = this;
            var deltaTime = time * this.timeScale;
            var frameIntervalTime = self.frameIntervalTime;
            var currentTime = self.passedTime + deltaTime;
            self.passedTime = currentTime % frameIntervalTime;
            var num = currentTime / frameIntervalTime;
            if (num < 1) {
                return;
            }
            while (num >= 1) {
                num--;
                self.$nextFrameNum++;
                if (self.$nextFrameNum > self.$totalFrames || (self.$frameLabelStart > 0 && self.$nextFrameNum > self.$frameLabelEnd)) {
                    if (self.playTimes == -1) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    }
                    else {
                        self.playTimes--;
                        if (self.playTimes > 0) {
                            self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                            self.$nextFrameNum = 1;
                        }
                        else {
                            self.$nextFrameNum = self.$totalFrames;
                            self.$eventPool.push(egret.Event.COMPLETE);
                            self.stop();
                            break;
                        }
                    }
                }
                if (self.$currentFrameNum == self.$frameLabelEnd) {
                    self.$nextFrameNum = self.$frameLabelStart;
                }
                self.advanceFrame();
            }
            self.constructFrame();
            self.handlePendingEvent();
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.advanceFrame = function () {
            this.$currentFrameNum = this.$nextFrameNum;
            var event = this.frameEvents[this.$nextFrameNum];
            if (event && event != "") {
                if (MovieClip.DISPATCH_ENABLE) {
                    egret.MovieClipEvent.dispatchMovieClipEvent(this, egret.MovieClipEvent.FRAME_LABEL, event);
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.constructFrame = function () {
            var self = this;
            var currentFrameNum = self.$currentFrameNum;
            if (self.displayedKeyFrameNum == currentFrameNum) {
                return;
            }
            var texture = self.$movieClipData.getTextureByFrame(currentFrameNum);
            self.$texture = texture;
            self.$movieClipData.$getOffsetByFrame(currentFrameNum, self.offsetPoint);
            self.displayedKeyFrameNum = currentFrameNum;
            self.$renderDirty = true;
            if (egret.nativeRender) {
                self.$nativeDisplayObject.setDataToBitmapNode(self.$nativeDisplayObject.id, texture, [texture.$bitmapX, texture.$bitmapY, texture.$bitmapWidth, texture.$bitmapHeight,
                    self.offsetPoint.x, self.offsetPoint.y, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight(),
                    texture.$sourceWidth, texture.$sourceHeight]);
                //todo 负数offsetPoint
                self.$nativeDisplayObject.setWidth(texture.$getTextureWidth() + self.offsetPoint.x);
                self.$nativeDisplayObject.setHeight(texture.$getTextureHeight() + self.offsetPoint.y);
            }
            else {
                var p = self.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                var maskedObject = self.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
            if (this.$actions.containsKey(this.currentFrame)) {
                var action = this.$actions.get(this.currentFrame);
                if (action && action.numActions > 0) {
                    action.executeActions(this, currentFrameNum);
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$renderFrame = function () {
            var self = this;
            self.$texture = self.$movieClipData.getTextureByFrame(self.$currentFrameNum);
            self.$renderDirty = true;
            var p = self.$parent;
            if (p && !p.$cacheDirty) {
                p.$cacheDirty = true;
                p.$cacheDirtyUp();
            }
            var maskedObject = self.$maskedObject;
            if (maskedObject && !maskedObject.$cacheDirty) {
                maskedObject.$cacheDirty = true;
                maskedObject.$cacheDirtyUp();
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.handlePendingEvent = function () {
            if (this.$eventPool.length != 0) {
                this.$eventPool.reverse();
                var eventPool = this.$eventPool;
                var length_1 = eventPool.length;
                var isComplete = false;
                var isLoopComplete = false;
                for (var i = 0; i < length_1; i++) {
                    var event_1 = eventPool.pop();
                    if (event_1 == egret.Event.LOOP_COMPLETE) {
                        isLoopComplete = true;
                    }
                    else if (event_1 == egret.Event.COMPLETE) {
                        isComplete = true;
                    }
                    else {
                        if (MovieClip.DISPATCH_ENABLE) {
                            this.dispatchEventWith(event_1);
                        }
                    }
                }
                if (isLoopComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
                    }
                }
                if (isComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        };
        Object.defineProperty(MovieClip.prototype, "totalFrames", {
            //Properties
            /**
             * MovieClip 实例中帧的总数
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrame", {
            /**
             * MovieClip 实例当前播放的帧的序号
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$currentFrameNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrameLabel", {
            /**
             * MovieClip 实例当前播放的帧的标签。如果当前帧没有标签，则 currentFrameLabel返回null。
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelByFrame(this.$currentFrameNum);
                return label && label.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentLabel", {
            /**
             * 当前播放的帧对应的标签，如果当前帧没有标签，则currentLabel返回包含标签的先前帧的标签。如果当前帧和先前帧都不包含标签，currentLabel返回null。
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelForFrame(this.$currentFrameNum);
                return label ? label.name : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frameRate", {
            /**
             * MovieClip 实例的帧频
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                if (value == this.$frameRate) {
                    return;
                }
                this.$frameRate = value;
                this.frameIntervalTime = 1000 / this.$frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "isPlaying", {
            /**
             * MovieClip 实例当前是否正在播放
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "movieClipData", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$movieClipData;
            },
            /**
             * MovieClip数据源
             */
            set: function (value) {
                this.setMovieClipData(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setMovieClipData = function (value, force) {
            if (this.$movieClipData == value && !force) {
                return;
            }
            this.$movieClipData = value;
            this.$init();
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setPlayTimes = function (value) {
            if (value < 0 || value >= 1) {
                this.playTimes = value < 0 ? -1 : Math.floor(value);
            }
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setIsStopped = function (value) {
            if (this.isStopped == value) {
                return;
            }
            this.isStopped = value;
            if (value) {
                egretx.TimelineManager.Instance().getOrCreateTimeline(this.timeline).remove(this);
            }
            else {
                this.playTimes = this.playTimes == 0 ? 1 : this.playTimes;
                this.lastTime = egret.getTimer();
                egretx.TimelineManager.Instance().getOrCreateTimeline(this.timeline).add(this);
            }
        };
        MovieClip.prototype.getActionAt = function (frame) {
            if (frame < 1 || frame > this.totalFrames) {
                return null;
            }
            if (!this.$actions.containsKey(frame)) {
                this.$actions.add(frame, new egretx.FrameAction(frame));
            }
            return this.$actions.get(frame);
        };
        MovieClip.prototype.addFrameAction = function (frame, action, thisObject) {
            this.getActionAt(frame).addAction(action, thisObject);
        };
        MovieClip.prototype.removeFrameAction = function (frame, action, thisObject) {
            this.getActionAt(frame).removeAction(action, thisObject);
        };
        MovieClip.prototype.removeFrameActions = function (frame) {
            if (isNaN(frame)) {
                this.$actions.forValues(function (v) {
                    v.removeActions();
                }, this);
            }
            else {
                this.getActionAt(frame).removeActions();
            }
        };
        MovieClip.DISPATCH_ENABLE = false;
        return MovieClip;
    }(egret.DisplayObject));
    egretx.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "egretx.MovieClip", ["egretx.IAnimatable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IAnimationManager = Symbol.for("IAnimationManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IAnimationManagerInternal = Symbol.for("IAnimationManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * 音频管理器
     */
    var AudioManager = (function (_super) {
        __extends(AudioManager, _super);
        function AudioManager() {
            return _super.call(this) || this;
        }
        AudioManager.prototype.initialize = function () {
            this.background = new egretx.MusicAudioChannel();
            this.ui = new egretx.MusicAudioChannel();
            this.effect = new egretx.EffectAudioChannel();
        };
        return AudioManager;
    }(xgame.Singleton));
    egretx.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "egretx.AudioManager", ["egretx.IAudioManager", "xgame.IXObject", "egretx.IAudioManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var AudioToggleState;
    (function (AudioToggleState) {
        AudioToggleState[AudioToggleState["OFF"] = 0] = "OFF";
        AudioToggleState[AudioToggleState["ON"] = 1] = "ON";
    })(AudioToggleState = egretx.AudioToggleState || (egretx.AudioToggleState = {}));
    /**
     * 音频频道
     */
    var AudioChannel = (function (_super) {
        __extends(AudioChannel, _super);
        function AudioChannel(channelType) {
            var _this = _super.call(this) || this;
            _this.channelType = channelType;
            _this.callback_onPlayCompleted = new xgame.Signal1();
            _this.$toggleState = AudioToggleState.ON;
            _this.$volume = 0.5;
            _this.playTimes = 1;
            return _this;
        }
        AudioChannel.prototype.onPlayCompleted = function () {
            return this.callback_onPlayCompleted;
        };
        Object.defineProperty(AudioChannel.prototype, "toggleState", {
            get: function () {
                return this.$toggleState;
            },
            enumerable: true,
            configurable: true
        });
        AudioChannel.prototype.toggleOn = function () {
            if (this.toggleState == AudioToggleState.ON) {
                return;
            }
            this.$toggleState = AudioToggleState.ON;
            this.resume();
        };
        AudioChannel.prototype.toggleOff = function () {
            if (this.toggleState == AudioToggleState.OFF) {
                return;
            }
            this.$toggleState = AudioToggleState.OFF;
            this.stop();
        };
        Object.defineProperty(AudioChannel.prototype, "volume", {
            get: function () {
                return this.$volume;
            },
            enumerable: true,
            configurable: true
        });
        AudioChannel.prototype.setVolume = function (volume) {
            this.$volume = volume;
        };
        AudioChannel.prototype.play = function (key, playTimes) {
            if (playTimes === void 0) { playTimes = 1; }
        };
        AudioChannel.prototype.pause = function () {
        };
        AudioChannel.prototype.resume = function () {
        };
        AudioChannel.prototype.stop = function () {
        };
        return AudioChannel;
    }(xgame.XObject));
    egretx.AudioChannel = AudioChannel;
    __reflect(AudioChannel.prototype, "egretx.AudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />

(function (egretx) {
    var EffectAudioChannel = (function (_super) {
        __extends(EffectAudioChannel, _super);
        function EffectAudioChannel() {
            var _this = _super.call(this, egretx.AudioChannelType.EFFECT) || this;
            _this.freeAudioes = [];
            _this.playAudioes = [];
            for (var i = 0; i < EffectAudioChannel.instanceMax; i++) {
                if (egretx.AudioManager.Instance().createAudioInstance) {
                    _this.freeAudioes.push(egretx.AudioManager.Instance().createAudioInstance("effect"));
                }
                else {
                    _this.freeAudioes.push(new egretx.WebAudio("effect"));
                }
            }
            return _this;
        }
        EffectAudioChannel.prototype.play = function (key, playTimes) {
            var _this = this;
            if (!this.freeAudioes.length) {
                console.log("没有可用的播放器了，放弃播放音效:" + key);
                return;
            }
            var audio = this.freeAudioes.shift();
            this.playAudioes.push(audio);
            audio.play(key, 0, playTimes).then(function () {
                _this.releaseAudio(audio);
            });
        };
        EffectAudioChannel.prototype.pause = function () {
            for (var i = this.playAudioes.length - 1; i >= 0; i--) {
                var audio = this.playAudioes[i];
                audio.pause();
            }
        };
        EffectAudioChannel.prototype.resume = function () {
            for (var i = this.playAudioes.length - 1; i >= 0; i--) {
                var audio = this.playAudioes[i];
                audio.resume();
            }
        };
        EffectAudioChannel.prototype.stop = function () {
            while (this.playAudioes.length) {
                var audio = this.playAudioes.pop();
                audio.stop();
                this.freeAudioes.unshift(audio);
            }
        };
        EffectAudioChannel.prototype.releaseAudio = function (audio) {
            var indexOf = this.playAudioes.indexOf(audio);
            if (indexOf >= 0) {
                this.playAudioes.splice(indexOf, 1);
            }
            if (this.freeAudioes.indexOf(audio) == -1) {
                this.freeAudioes.unshift(audio);
            }
        };
        EffectAudioChannel.instanceMax = 3;
        return EffectAudioChannel;
    }(egretx.AudioChannel));
    egretx.EffectAudioChannel = EffectAudioChannel;
    __reflect(EffectAudioChannel.prototype, "egretx.EffectAudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />

(function (egretx) {
    var MusicAudioChannel = (function (_super) {
        __extends(MusicAudioChannel, _super);
        function MusicAudioChannel() {
            var _this = _super.call(this, egretx.AudioChannelType.BACKGORUND) || this;
            if (egretx.AudioManager.Instance().createAudioInstance) {
                _this.main = egretx.AudioManager.Instance().createAudioInstance("music");
            }
            else {
                _this.main = new egretx.WebAudio("music");
            }
            return _this;
        }
        MusicAudioChannel.prototype.play = function (key, playTimes) {
            this.key = key;
            this.playTimes = playTimes;
            this.main.play(key, 0, playTimes);
        };
        MusicAudioChannel.prototype.pause = function () {
            this.main.pause();
        };
        MusicAudioChannel.prototype.resume = function () {
            this.main.resume();
        };
        MusicAudioChannel.prototype.stop = function () {
            this.main.stop();
        };
        return MusicAudioChannel;
    }(egretx.AudioChannel));
    egretx.MusicAudioChannel = MusicAudioChannel;
    __reflect(MusicAudioChannel.prototype, "egretx.MusicAudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var Audio = (function (_super) {
        __extends(Audio, _super);
        function Audio(type) {
            if (type === void 0) { type = "EFFECT"; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.$volume = 0.5;
            return _this;
        }
        Object.defineProperty(Audio.prototype, "info", {
            get: function () {
                return this.key && RES.getResourceInfo(this.key);
            },
            enumerable: true,
            configurable: true
        });
        Audio.prototype.load = function () {
            return null;
        };
        Audio.prototype.play = function (key, startTime, playTimes) {
            if (startTime === void 0) { startTime = 0; }
            if (playTimes === void 0) { playTimes = 0; }
            return null;
        };
        Audio.prototype.pause = function () {
        };
        Audio.prototype.resume = function () {
        };
        Audio.prototype.stop = function () {
        };
        Object.defineProperty(Audio.prototype, "volume", {
            get: function () {
                return this.$volume;
            },
            enumerable: true,
            configurable: true
        });
        Audio.prototype.setVolume = function (volume) {
            this.$volume = volume;
        };
        Audio.prototype.destroy = function () {
        };
        return Audio;
    }(xgame.XObject));
    egretx.Audio = Audio;
    __reflect(Audio.prototype, "egretx.Audio");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var AudioChannelType;
    (function (AudioChannelType) {
        AudioChannelType[AudioChannelType["BACKGORUND"] = 0] = "BACKGORUND";
        AudioChannelType[AudioChannelType["EFFECT"] = 1] = "EFFECT";
    })(AudioChannelType = egretx.AudioChannelType || (egretx.AudioChannelType = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * 默认的音频播放器
     */
    var WebAudio = (function (_super) {
        __extends(WebAudio, _super);
        function WebAudio(type) {
            var _this = _super.call(this, type) || this;
            _this.position = 0;
            _this.$isPaused = false;
            return _this;
        }
        WebAudio.prototype.load = function () {
            this.sound = new egret.Sound();
            this.sound.type = this.type;
            this.sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred = new xgame.Deferred();
            var url = this.info.root + this.info.url;
            if (egretx.AudioManager.Instance().redirectURL) {
                url = egretx.AudioManager.Instance().redirectURL(url);
            }
            this.sound.load(url);
            return this.loadDeferred.promise;
        };
        WebAudio.prototype.onIOError = function (event) {
            console.warn("WebAudio=>onIOError", event);
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(false);
        };
        WebAudio.prototype.onLoadComplete = function (event) {
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(true);
        };
        WebAudio.prototype.play = function (key, startTime, playTimes) {
            var _this = this;
            if (startTime === void 0) { startTime = 0; }
            if (playTimes === void 0) { playTimes = 0; }
            this.stop();
            this.key = key;
            this.playTimes = playTimes;
            this.playDeferred = new xgame.Deferred();
            this.load().then(function (success) {
                if (success) {
                    _this._play(startTime);
                }
                else {
                    _this.playDeferred.resolve();
                }
            });
            return this.playDeferred.promise;
        };
        WebAudio.prototype._play = function (position) {
            this.$isPaused = false;
            this.soundChannel = this.sound.play(position, this.playTimes);
            this.soundChannel.volume = this.volume;
            this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        };
        WebAudio.prototype.onSoundComplete = function () {
            if (this.playTimes > 0) {
                this.playTimes--;
                if (this.playTimes <= 0) {
                    if (this.playDeferred) {
                        this.playDeferred.resolve();
                    }
                    this.stop();
                }
            }
        };
        Object.defineProperty(WebAudio.prototype, "isPaused", {
            get: function () {
                return this.$isPaused;
            },
            enumerable: true,
            configurable: true
        });
        WebAudio.prototype.pause = function () {
            if (!this.isPaused && this.soundChannel) {
                this.$isPaused = true;
                this.position = this.soundChannel.position;
                this.clearChannel();
            }
        };
        WebAudio.prototype.resume = function () {
            if (this.isPaused) {
                this.$isPaused = false;
                this._play(this.position);
            }
        };
        WebAudio.prototype.clearChannel = function () {
            if (this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                this.soundChannel = null;
            }
        };
        WebAudio.prototype.stop = function () {
            this.playDeferred = undefined;
            this.$isPaused = false;
            this.position = 0;
            this.clearChannel();
            if (this.sound) {
                this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                try {
                    this.sound.close();
                }
                catch (err) {
                }
            }
        };
        return WebAudio;
    }(egretx.Audio));
    egretx.WebAudio = WebAudio;
    __reflect(WebAudio.prototype, "egretx.WebAudio");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IAudioManager = Symbol.for("IAudioManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IAudioManagerInternal = Symbol.for("IAudioManagerInternal");
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
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * 龙骨动画管理器
     */
    var DragonBonesManager = (function (_super) {
        __extends(DragonBonesManager, _super);
        function DragonBonesManager() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolGroup("Armature");
            return _this;
        }
        DragonBonesManager.prototype.advanceTime = function (time) {
            if (!this.factory) {
                return;
            }
            this.factory.clock.advanceTime(time / 1000);
        };
        DragonBonesManager.prototype.initialize = function () {
            egretx.TimelineManager.Instance().getOrCreateTimeline().add(this);
        };
        DragonBonesManager.prototype.fetch = function (key, armatureName, texture) {
            var id = "{0}:{1}".format(key, armatureName);
            if (texture) {
                id = "{0}:{1}".format(key, texture);
            }
            var armature = this.pools.fetch(id, egretx.Armature, function () { return new egretx.Armature(key, armatureName, texture); }, this);
            return armature;
        };
        DragonBonesManager.prototype.recycle = function (armature) {
            this.pools.recycle(armature.id, egretx.Armature, armature);
        };
        DragonBonesManager.prototype.release = function (key) {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                var id_list = id.split(":");
                if (id_list[0] == key) {
                    _this._release(id);
                }
            }, this, true);
        };
        DragonBonesManager.prototype._release = function (id) {
            if (this.pools.getPool(id, egretx.Armature).expired) {
                this.pools.release(id, egretx.Armature);
                var params = id.split(":");
                var key = params[0];
                var texture = params[2] || key;
                this.clearDragonBones(key, texture);
                egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.DragonBones).release(key);
            }
        };
        DragonBonesManager.prototype.releases = function () {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                _this._release(id);
            }, this, true);
        };
        DragonBonesManager.prototype.addClock = function (armture) {
            if (armture.armature) {
                this.factory.clock.add(armture.armature);
            }
        };
        DragonBonesManager.prototype.removeClock = function (armture) {
            if (armture.armature) {
                this.factory.clock.remove(armture.armature);
            }
        };
        DragonBonesManager.prototype.parseDragonBones = function (key, texture) {
            texture = texture || key;
            if (!this.factory) {
                this.factory = new dragonBones.EgretFactory();
            }
            var res = this.getRes(key, texture);
            if (!this.factory.getDragonBonesData(key)) {
                this.factory.parseDragonBonesData(RES.getRes(res.skeleton), key);
            }
            if (!this.factory.getTextureAtlasData(texture)) {
                this.factory.parseTextureAtlasData(RES.getRes(res.json), RES.getRes(res.texture), texture);
            }
        };
        DragonBonesManager.prototype.clearDragonBones = function (key, texture) {
            texture = texture || key;
            var res = this.getRes(key, texture);
            if (this.factory.getDragonBonesData(key)) {
                this.factory.removeDragonBonesData(key);
                console.log("DragonBonesManager.removeDragonBonesData({0})".format(key));
            }
            if (this.factory.getTextureAtlasData(texture)) {
                this.factory.removeTextureAtlasData(texture);
                console.log("DragonBonesManager.removeTextureAtlasData({0})".format(texture));
            }
        };
        DragonBonesManager.prototype.buildArmature = function (key, armtureName) {
            return this.factory.buildArmature(armtureName, key);
        };
        DragonBonesManager.prototype.getRes = function (key, texture) {
            var res = {};
            res.skeleton = "{0}_ske_json".format(key);
            if (texture) {
                res.json = "{0}_tex_json".format(texture);
                res.texture = "{0}_tex_png".format(texture);
            }
            else {
                res.json = "{0}_tex_json".format(key);
                res.texture = "{0}_tex_png".format(key);
            }
            return res;
        };
        return DragonBonesManager;
    }(xgame.Singleton));
    egretx.DragonBonesManager = DragonBonesManager;
    __reflect(DragonBonesManager.prototype, "egretx.DragonBonesManager", ["egretx.IDragonBonesManager", "xgame.IXObject", "egretx.IDragonBonesManagerInternal", "egretx.IAnimatable"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-06
*************************************************/

(function (egretx) {
    var Armature = (function (_super) {
        __extends(Armature, _super);
        function Armature(key, armatureName, texture) {
            var _this = _super.call(this) || this;
            _this.key = key;
            _this.armatureName = armatureName;
            _this.texture = texture;
            return _this;
        }
        Object.defineProperty(Armature.prototype, "id", {
            get: function () {
                var value = this.key + ":" + this.armatureName;
                if (this.texture) {
                    value = this.key + ":" + this.texture;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Armature.prototype.setParent = function (parent) {
            if (this.armature && this.armature.display) {
                parent.addChild(this.armature.display);
            }
        };
        Armature.prototype.removeSelf = function () {
            if (this.armature.display && this.armature.display.parent) {
                this.armature.display.parent.removeChild(this.armature.display);
            }
        };
        Armature.prototype.release = function () {
            this.dispose();
            if (this.armature) {
                this.armature.dispose();
            }
            this.$armature = undefined;
        };
        Armature.prototype.dispose = function () {
            if (this.armature) {
                this.armature.animation.stop();
                egretx.DragonBonesManager.Instance().removeClock(this);
            }
            this.removeSelf();
        };
        Object.defineProperty(Armature.prototype, "armature", {
            get: function () {
                return this.$armature;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Armature.prototype, "display", {
            get: function () {
                return this.armature && this.armature.display;
            },
            enumerable: true,
            configurable: true
        });
        Armature.prototype.createArmature = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.armature) return [3 /*break*/, 2];
                            return [4 /*yield*/, egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.DragonBones).load(this.key, this.texture)];
                        case 1:
                            _a.sent();
                            egretx.DragonBonesManager.Instance().parseDragonBones(this.key, this.texture);
                            this.$armature = egretx.DragonBonesManager.Instance().buildArmature(this.key, this.armatureName);
                            _a.label = 2;
                        case 2:
                            if (this.armature) {
                                egretx.DragonBonesManager.Instance().addClock(this);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Armature;
    }(xgame.XObject));
    egretx.Armature = Armature;
    __reflect(Armature.prototype, "egretx.Armature", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IDragonBonesManager = Symbol.for("IDragonBonesManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IDragonBonesManagerInternal = Symbol.for("IDragonBonesManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    egretx.IHttpManager = Symbol.for("IHttpManager");
    egretx.IHttpManagerInternal = Symbol.for("IHttpManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/IHttpManager.ts" />

(function (egretx) {
    var HttpManager = (function (_super) {
        __extends(HttpManager, _super);
        function HttpManager() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolObject(egretx.HttpRequest);
            return _this;
        }
        HttpManager.prototype.initialize = function () {
        };
        HttpManager.prototype.sendRequest = function (uri_or_options, method, values, isJSON) {
            return __awaiter(this, void 0, void 0, function () {
                var options, httpRequest, i, i, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof (uri_or_options) == "string") {
                                options = {
                                    uri: uri_or_options,
                                    method: method,
                                    values: values,
                                    isJSON: isJSON
                                };
                            }
                            else {
                                options = uri_or_options;
                            }
                            httpRequest = this.pools.fetch(function () { return new egretx.HttpRequest(options.uri, options.method); }, this);
                            if (options.headers) {
                                for (i = 0; i < options.headers.length; i++) {
                                    httpRequest.setHeader(options.headers[i][0], options.headers[i][1]);
                                }
                            }
                            if (options.values) {
                                for (i = 0; i < options.values.length; i++) {
                                    httpRequest.setValue(options.values[i][0], options.values[i][1]);
                                }
                            }
                            return [4 /*yield*/, httpRequest.send(options.isJSON)];
                        case 1:
                            response = _a.sent();
                            this.pools.recycle(httpRequest);
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        HttpManager = __decorate([
            egretx.impl(egretx.IHttpManager),
            __metadata("design:paramtypes", [])
        ], HttpManager);
        return HttpManager;
    }(xgame.Singleton));
    egretx.HttpManager = HttpManager;
    __reflect(HttpManager.prototype, "egretx.HttpManager", ["egretx.IHttpManager", "xgame.IXObject", "egretx.IHttpManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    egretx.ISocketManager = Symbol.for("ISocketManager");
    egretx.ISocketManagerInternal = Symbol.for("ISocketManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/ISocketManager.ts" />

(function (egretx) {
    var SocketManager = (function (_super) {
        __extends(SocketManager, _super);
        function SocketManager() {
            var _this = _super.call(this) || this;
            _this.defaultInstanceName = "main";
            //失败尝试重连次数
            _this.retryMaxTiems = 3;
            //失败重连间隔(毫秒)
            _this.retryDelayTime = 5000;
            //回包超时检测(毫秒)
            _this.sendTimeout = 10000;
            //心跳探针间隔(毫秒)
            _this.heartBeatCheckTimeout = 10000;
            _this.instances = new xgame.Dictionary();
            return _this;
        }
        SocketManager.prototype.initialize = function () {
        };
        SocketManager.prototype.getOrCreateInstance = function (name, helper) {
            name = name || this.defaultInstanceName;
            if (!this.instances.containsKey(name)) {
                var instance = new egretx.SocketInstance(this, name, helper || this.defaultSocketHelper);
                this.instances.push(name, instance);
            }
            return this.instances.get(name);
        };
        SocketManager = __decorate([
            egretx.impl(egretx.ISocketManager),
            __metadata("design:paramtypes", [])
        ], SocketManager);
        return SocketManager;
    }(xgame.Singleton));
    egretx.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "egretx.SocketManager", ["egretx.ISocketManager", "xgame.IXObject", "egretx.ISocketManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    var HttpRequest = (function (_super) {
        __extends(HttpRequest, _super);
        function HttpRequest(uri, method) {
            var _this = _super.call(this) || this;
            _this.uri = uri;
            _this.method = method;
            _this.reconnectTimes = 5;
            _this.headers = new xgame.Dictionary();
            _this.values = new xgame.Dictionary();
            return _this;
        }
        HttpRequest.prototype.release = function () {
        };
        HttpRequest.prototype.dispose = function () {
            this.headers.clear();
            this.values.clear();
            this.uri = undefined;
            this.method = undefined;
        };
        HttpRequest.prototype.setUri = function (uri) {
            this.uri = uri;
        };
        HttpRequest.prototype.setMethod = function (method) {
            if (method === void 0) { method = egret.HttpMethod.GET; }
            this.method = method;
        };
        HttpRequest.prototype.setHeader = function (key, value) {
            this.headers.set(key, value);
        };
        HttpRequest.prototype.setValue = function (key, value) {
            this.values.set(key, value);
        };
        HttpRequest.prototype.send = function (isJSON) {
            return __awaiter(this, void 0, void 0, function () {
                var response, times, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            times = this.reconnectTimes;
                            _a.label = 1;
                        case 1:
                            if (!times) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.request()];
                        case 2:
                            response = _a.sent();
                            if (!(typeof (response) === "boolean")) return [3 /*break*/, 4];
                            times--;
                            return [4 /*yield*/, xgame.waitMilliseconds(500)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4: return [3 /*break*/, 6];
                        case 5: return [3 /*break*/, 1];
                        case 6:
                            if (typeof (response) === "boolean") {
                                return [2 /*return*/, undefined];
                            }
                            if (!isJSON) {
                                return [2 /*return*/, response];
                            }
                            try {
                                resp = JSON.parse(response);
                                return [2 /*return*/, resp];
                            }
                            catch (err) {
                            }
                            return [2 /*return*/, undefined];
                    }
                });
            });
        };
        HttpRequest.prototype.request = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.method = this.method || egret.HttpMethod.GET;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var req = new egret.HttpRequest();
                            req.open(_this.uri, _this.method);
                            if (_this.method == egret.HttpMethod.GET || _this.values.length == 0) {
                                req.send();
                            }
                            else {
                                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                var sendData_1 = "";
                                _this.headers.forKeys(function (key) {
                                    req.setRequestHeader(key, _this.headers.get(key));
                                }, _this);
                                _this.values.forKeys(function (key) {
                                    sendData_1 += key + "=" + _this.values.get(key) + "&";
                                }, _this);
                                req.send(sendData_1);
                            }
                            req.addEventListener(egret.Event.COMPLETE, function () {
                                resolve(req.response);
                            }, _this);
                            req.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                                resolve(false);
                            }, _this);
                        })];
                });
            });
        };
        return HttpRequest;
    }(xgame.XObject));
    egretx.HttpRequest = HttpRequest;
    __reflect(HttpRequest.prototype, "egretx.HttpRequest", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    var SocketState;
    (function (SocketState) {
        SocketState[SocketState["Closed"] = 0] = "Closed";
        SocketState[SocketState["Connecting"] = 1] = "Connecting";
        SocketState[SocketState["Connected"] = 2] = "Connected";
    })(SocketState = egretx.SocketState || (egretx.SocketState = {}));
    var SocketCloseCode;
    (function (SocketCloseCode) {
        SocketCloseCode[SocketCloseCode["Close"] = 0] = "Close";
        SocketCloseCode[SocketCloseCode["IOError"] = 1] = "IOError";
        SocketCloseCode[SocketCloseCode["Failed"] = 2] = "Failed";
    })(SocketCloseCode = egretx.SocketCloseCode || (egretx.SocketCloseCode = {}));
    /**
     * 网络连接实例的实现类
     */
    var SocketInstance = (function (_super) {
        __extends(SocketInstance, _super);
        function SocketInstance(manager, name, socketHelper) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.name = name;
            _this.socketHelper = socketHelper;
            _this.guidCount = 0;
            _this.isInited = false;
            _this.happendConnected = false;
            _this.isReconnect = false;
            _this.disposableGroup = new xgame.DisposableGroup();
            _this.recvQueues = [];
            _this.sendTimeoutStamp = 0;
            _this.lastestRecvStamp = 0;
            _this.checkHeartBeat = false;
            _this.sendQueues = [];
            _this.callback_onConnected = new xgame.Signal0();
            _this.callback_onKickOut = new xgame.Signal0();
            _this.callback_onClosed = new xgame.Signal1();
            _this.reconnectTimerID = 0;
            _this.callback_onConnecting = new xgame.Signal1();
            _this.retryCount = 0;
            _this.callback_onShutdown = new xgame.Signal0();
            return _this;
        }
        SocketInstance.prototype.generateGUID = function () {
            return ++this.guidCount;
        };
        Object.defineProperty(SocketInstance.prototype, "state", {
            get: function () {
                return this.$state;
            },
            enumerable: true,
            configurable: true
        });
        SocketInstance.prototype.onAdvanceTime = function () {
            while (this.recvQueues.length) {
                var packet = this.recvQueues.shift();
                //是当前请求的回应
                if (packet.guid && this.current && this.current.guid == packet.guid) {
                    if (this.socketHelper.needSendLoginPacket() && this.socketHelper.isLoginRespPacket(packet)) {
                        if (this.socketHelper.isLoginSuccess(packet)) {
                            this.isReconnect = true;
                        }
                    }
                    this.current = null;
                    this.sendQueues.shift();
                }
                this.socketHelper.receivePacket(packet);
            }
            if (this.state == SocketState.Connected) {
                //检查是否可以发送数据包
                if (!this.current && this.sendQueues.length) {
                    this.current = this.sendQueues[0];
                    this._sendPacket(this.current);
                    this.sendTimeoutStamp = xgame.Time.Instance().passedTime + this.manager.sendTimeout;
                }
                //检查超时
                if (this.current && this.sendTimeoutStamp < xgame.Time.Instance().passedTime) {
                    this._close();
                    this.connect();
                }
                //检查心跳
                if (this.socketHelper.enableHeartBeatCheck()) {
                    if (!this.checkHeartBeat && xgame.Time.Instance().getTimeStamp() - this.lastestRecvStamp > this.manager.heartBeatCheckTimeout) {
                        this.checkHeartBeat = true;
                        this.socketHelper.sendHeartBeatPacket();
                    }
                }
            }
        };
        SocketInstance.prototype._sendPacket = function (packet) {
            this.socketHelper.showAnimation();
            var buffer = this.socketHelper.encodePacket(packet);
            if (buffer && buffer.length) {
                this.socket.writeBytes(buffer);
            }
        };
        SocketInstance.prototype.sendPacket = function (packet) {
            packet.guid = this.generateGUID();
            if (packet.first) {
                for (var i = this.sendQueues.length - 1; i >= 0; i++) {
                    if (this.socketHelper.isLoginRespPacket(this.sendQueues[i])) {
                        this.sendQueues.splice(i, 1);
                    }
                }
                this.sendQueues.unshift(packet);
            }
            else {
                this.sendQueues.push(packet);
            }
        };
        SocketInstance.prototype.setURI = function (host_or_uri, port, wss) {
            if (port) {
                this.uri = wss ? "wss://" : "ws://" + host_or_uri + ":" + port;
            }
            else {
                this.uri = host_or_uri;
            }
        };
        SocketInstance.prototype.init = function () {
            if (this.isInited) {
                return;
            }
            this.isInited = true;
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            this.cleanQueues();
            this.disposableGroup.registerUpdate(this.onAdvanceTime, this);
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            this.$state = SocketState.Closed;
        };
        SocketInstance.prototype.onConnected = function () {
            return this.callback_onConnected;
        };
        SocketInstance.prototype.onConnectHandler = function (event) {
            this.$state = SocketState.Connected;
            this.socketHelper.hideAnimation();
            this.callback_onConnected.dispatch();
            this.happendConnected = true;
            if (this.socketHelper.needSendLoginPacket()) {
                this.sendLoginPacket();
            }
        };
        SocketInstance.prototype.sendLoginPacket = function () {
            var packet = this.socketHelper.generateLoginPacket(this.isReconnect);
            if (packet) {
                packet.first = true;
                this.sendPacket(packet);
            }
        };
        SocketInstance.prototype.onKickOut = function () {
            return this.callback_onKickOut;
        };
        SocketInstance.prototype.onReceiveHandler = function (event) {
            var _this = this;
            this.socketHelper.hideAnimation();
            this.lastestRecvStamp = xgame.Time.Instance().getTimeStamp();
            var buffer = new egret.ByteArray();
            this.socket.readBytes(buffer);
            var packets = this.socketHelper.decodePackets(buffer);
            if (packets && packets.length) {
                var packet = packets[0];
                if (this.socketHelper.isDataLocked(packet)) {
                    egret.setTimeout(function () {
                        _this.current = null;
                    }, this, 100);
                }
                else if (this.socketHelper.isKickOutPacket(packet)) {
                    this.callback_onKickOut.dispatch();
                }
                else {
                    this.recvQueues.push(packet);
                    if (this.socketHelper.isHeartBeatPacket(packet)) {
                        this.checkHeartBeat = false;
                    }
                }
                if (packets.length > 1) {
                    for (var i = 1; i < packets.length; i++) {
                        this.recvQueues.push(packets[i]);
                    }
                }
            }
        };
        SocketInstance.prototype.onClosed = function () {
            return this.callback_onClosed;
        };
        SocketInstance.prototype.onCloseHandler = function (event) {
            var _this = this;
            this.callback_onClosed.dispatch(SocketCloseCode.Close);
            if (this.state == SocketState.Connecting) {
                // 1.链接失败/出错
                // 2.超时
                // 暂停一定时间后重试
                this.reconnectTimerID = egret.setTimeout(function () {
                    _this._connect();
                }, this, this.manager.retryDelayTime);
            }
            else if (this.state == SocketState.Connected) {
                // 1.中途掉线
                // 2.服务器踢下线
                // 3.数据包异常
                this.$state = SocketState.Closed;
                this.connect();
            }
        };
        SocketInstance.prototype.onIOErrorHandler = function (event) {
            this.socketHelper.hideAnimation();
            this.cleanQueues(true);
            this.$state = SocketState.Closed;
            this.callback_onClosed.dispatch(SocketCloseCode.IOError);
        };
        SocketInstance.prototype.onConnecting = function () {
            return this.callback_onConnecting;
        };
        SocketInstance.prototype.connect = function () {
            if (!this.socketHelper) {
                throw new Error("没有实现网络助手ISocketHelper");
            }
            if (!this.isInited) {
                this.init();
            }
            if (this.state != SocketState.Closed) {
                return;
            }
            this.socketHelper.showAnimation();
            this.retryCount = 0;
            this.$state = SocketState.Connecting;
            this._connect();
        };
        SocketInstance.prototype._connect = function () {
            if (this.state != SocketState.Connecting) {
                return;
            }
            if (this.retryCount < this.manager.retryMaxTiems) {
                if (this.happendConnected) {
                    this.callback_onConnecting.dispatch(this.retryCount + 1);
                }
                this.socket.connectByUrl(this.uri);
                this.retryCount++;
            }
            else {
                this.cleanQueues();
                this.$state = SocketState.Closed;
                this.socketHelper.hideAnimation();
                this.callback_onClosed.dispatch(SocketCloseCode.Failed);
            }
        };
        SocketInstance.prototype.cleanQueues = function (revc) {
            while (this.sendQueues.length > 0) {
                var packet = this.sendQueues.pop();
                packet.abort();
            }
            if (revc) {
                this.recvQueues.length = 0;
            }
        };
        SocketInstance.prototype.close = function () {
            if (this.state != SocketState.Closed) {
                this._close();
            }
        };
        SocketInstance.prototype._close = function () {
            if (this.state != SocketState.Closed) {
                this.$state = SocketState.Closed;
                if (this.socket) {
                    this.socket.close();
                }
            }
            if (this.reconnectTimerID) {
                egret.clearTimeout(this.reconnectTimerID);
                this.reconnectTimerID = 0;
            }
        };
        SocketInstance.prototype.onShutdown = function () {
            return this.callback_onShutdown;
        };
        SocketInstance.prototype.shutdown = function () {
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            if (this.socket) {
                this.socket.removeEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
                this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
                this.socket.removeEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
                this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            }
            this.close();
            this.cleanQueues(true);
            this.isInited = false;
            this.happendConnected = false;
            this.isReconnect = false;
            this.socket = null;
            this.$state = SocketState.Closed;
            this.callback_onShutdown.dispatch();
        };
        return SocketInstance;
    }(xgame.XObject));
    egretx.SocketInstance = SocketInstance;
    __reflect(SocketInstance.prototype, "egretx.SocketInstance");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * 资源管理器
     */
    var ResourceManager = (function (_super) {
        __extends(ResourceManager, _super);
        function ResourceManager() {
            var _this = _super.call(this) || this;
            _this.groups = new xgame.Dictionary();
            _this.loadQueues = new xgame.Dictionary();
            return _this;
        }
        ResourceManager.prototype.initialize = function () {
            this.groups.add(egretx.ResourceType.MovieClip, new egretx.MovieClipResourceGroup(this));
            this.groups.add(egretx.ResourceType.DragonBones, new egretx.DragonBonesResourceGroup(this));
        };
        ResourceManager.prototype.getOrCreateGroup = function (name, factory) {
            var group = this.groups.get(name);
            if (!group && factory) {
                group = factory();
                this.groups.add(name, group);
            }
            return group;
        };
        ResourceManager.prototype.loadResAsync = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var loader;
                return __generator(this, function (_a) {
                    if (!RES.hasRes(key)) {
                        throw new Error("资源配置:{0}找不到".format(key));
                    }
                    if (RES.getRes(key)) {
                        return [2 /*return*/, RES.getRes(key)];
                    }
                    if (!this.loadQueues.containsKey(key)) {
                        loader = { key: key, deferred: new xgame.Deferred() };
                        this.loadQueues.add(key, loader);
                        RES.getResAsync(key).then(function () {
                            loader = _this.loadQueues.remove(key);
                            loader.deferred.resolve(RES.getRes(key));
                        });
                    }
                    else {
                        loader = this.loadQueues.get(key);
                    }
                    return [2 /*return*/, loader.deferred.promise];
                });
            });
        };
        ResourceManager.prototype.destroyRes = function (key) {
            if (RES.getRes(key)) {
                if (ResourceManager.DEBUG) {
                    console.log("ResourceManager.destroyRes({0})".format(key));
                }
                return RES.destroyRes(key, true);
            }
            return false;
        };
        ResourceManager.DEBUG = true;
        return ResourceManager;
    }(xgame.Singleton));
    egretx.ResourceManager = ResourceManager;
    __reflect(ResourceManager.prototype, "egretx.ResourceManager", ["egretx.IResourceManager", "xgame.IXObject", "egretx.IResourceManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * 资源组
     */
    var ResourceGroup = (function (_super) {
        __extends(ResourceGroup, _super);
        function ResourceGroup(manager, resourceType) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.resourceType = resourceType;
            _this.keys = new xgame.Dictionary();
            _this.statistics = {};
            _this.$memory = 0;
            return _this;
        }
        ResourceGroup.prototype.createInstance = function (key) {
            return null;
        };
        ResourceGroup.prototype.load = function (key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ResourceGroup.prototype.release = function (key) {
            if (this.keys.containsKey(key)) {
                var list = this.keys.get(key);
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var res = list_1[_i];
                    egretx.ResourceManager.Instance().destroyRes(res);
                }
            }
        };
        Object.defineProperty(ResourceGroup.prototype, "memory", {
            get: function () {
                return this.$memory;
            },
            enumerable: true,
            configurable: true
        });
        ResourceGroup.prototype.addMemory = function (key, w, h) {
            if (this.statistics[key] == undefined) {
                var m = w * h * 4;
                this.statistics[key] = m;
                this.$memory += m;
            }
        };
        ResourceGroup.prototype.removeMemory = function (key) {
            if (this.statistics[key] != undefined) {
                var m = this.statistics[key];
                this.$memory -= m;
                delete this.statistics[key];
            }
        };
        return ResourceGroup;
    }(xgame.XObject));
    egretx.ResourceGroup = ResourceGroup;
    __reflect(ResourceGroup.prototype, "egretx.ResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />

(function (egretx) {
    var DragonBonesResourceGroup = (function (_super) {
        __extends(DragonBonesResourceGroup, _super);
        function DragonBonesResourceGroup(manager) {
            return _super.call(this, manager, egretx.ResourceType.DragonBones) || this;
        }
        DragonBonesResourceGroup.prototype.load = function (key, skeleton) {
            return __awaiter(this, void 0, void 0, function () {
                var res, texture, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = egretx.DragonBonesManager.Instance().getRes(key, skeleton);
                            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture) || !RES.hasRes(res.skeleton)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.skeleton)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 3:
                            texture = _a.sent();
                            if (texture) {
                                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
                            }
                            if (!this.keys.containsKey(key)) {
                                list = [res.json, res.texture, res.skeleton];
                                this.keys.add(key, list);
                            }
                            else {
                                list = this.keys.get(key);
                                if (list.indexOf(res.json) == -1) {
                                    list.push(res.json);
                                }
                                if (list.indexOf(res.texture) == -1) {
                                    list.push(res.texture);
                                }
                                if (list.indexOf(res.skeleton) == -1) {
                                    list.push(res.skeleton);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DragonBonesResourceGroup;
    }(egretx.ResourceGroup));
    egretx.DragonBonesResourceGroup = DragonBonesResourceGroup;
    __reflect(DragonBonesResourceGroup.prototype, "egretx.DragonBonesResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />

(function (egretx) {
    var MovieClipResourceGroup = (function (_super) {
        __extends(MovieClipResourceGroup, _super);
        function MovieClipResourceGroup(manager) {
            return _super.call(this, manager, egretx.ResourceType.MovieClip) || this;
        }
        MovieClipResourceGroup.prototype.load = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var res, texture, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = egretx.AnimationManager.Instance().getRes(key);
                            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 2:
                            texture = _a.sent();
                            if (texture) {
                                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
                            }
                            if (!this.keys.containsKey(key)) {
                                list = [res.json, res.texture];
                                this.keys.add(key, list);
                            }
                            else {
                                list = this.keys.get(key);
                                if (list.indexOf(res.json) == -1) {
                                    list.push(res.json);
                                }
                                if (list.indexOf(res.texture) == -1) {
                                    list.push(res.texture);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MovieClipResourceGroup;
    }(egretx.ResourceGroup));
    egretx.MovieClipResourceGroup = MovieClipResourceGroup;
    __reflect(MovieClipResourceGroup.prototype, "egretx.MovieClipResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * 资源组类型，可以扩展自己的资源组
     */
    var ResourceType;
    (function (ResourceType) {
        ResourceType["UI"] = "UI";
        ResourceType["MovieClip"] = "MovieClip";
        ResourceType["DragonBones"] = "DragonBones";
    })(ResourceType = egretx.ResourceType || (egretx.ResourceType = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IResourceManager = Symbol.for("IResourceManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IResourceManagerInternal = Symbol.for("IResourceManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * 时间轴管理器
     */
    var TimelineManager = (function (_super) {
        __extends(TimelineManager, _super);
        function TimelineManager() {
            var _this = _super.call(this) || this;
            _this.timelines = new xgame.Dictionary();
            return _this;
        }
        TimelineManager.prototype.initialize = function () {
            xgame.SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
        };
        TimelineManager.prototype.advanceTime = function () {
            var deltaTime = xgame.Time.Instance().deltaTime;
            this.timelines.forValues(function (timeline) {
                timeline.advanceTime(deltaTime);
            }, this);
        };
        TimelineManager.prototype.getOrCreateTimeline = function (name) {
            if (name === void 0) { name = egretx.Timeline.MAIN; }
            if (!this.timelines.containsKey(name)) {
                this.timelines.add(name, new egretx.Timeline(name));
            }
            return this.timelines.get(name);
        };
        return TimelineManager;
    }(xgame.Singleton));
    egretx.TimelineManager = TimelineManager;
    __reflect(TimelineManager.prototype, "egretx.TimelineManager", ["egretx.ITimelineManager", "egretx.ITimelineManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    var Timeline = (function (_super) {
        __extends(Timeline, _super);
        function Timeline(name) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.animatables = new xgame.Dictionary();
            _this.$timeScale = 1;
            _this.$passedTime = 0;
            _this.$isPaused = false;
            return _this;
        }
        Object.defineProperty(Timeline.prototype, "timeScale", {
            get: function () {
                return this.$timeScale;
            },
            set: function (value) {
                this.$timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "passedTime", {
            get: function () {
                return this.$passedTime;
            },
            enumerable: true,
            configurable: true
        });
        Timeline.prototype.advanceTime = function (time) {
            var _this = this;
            var deltaTime = this.timeScale * time;
            this.$passedTime += deltaTime;
            if (this.isPaused) {
                return;
            }
            this.simple(function () {
                _this.animatables.forValues(function (item) {
                    item.advanceTime(deltaTime);
                }, _this);
            }, this);
        };
        Timeline.prototype.add = function (animatable) {
            var _this = this;
            this.simple(function () {
                _this.animatables.add(animatable.hashCode, animatable);
            }, this);
        };
        Timeline.prototype.remove = function (animatable) {
            var _this = this;
            this.simple(function () {
                _this.animatables.remove(animatable.hashCode);
            }, this);
        };
        Object.defineProperty(Timeline.prototype, "isPaused", {
            get: function () {
                return this.$isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Timeline.prototype.pause = function () {
            if (this.isPaused) {
                return;
            }
            this.$isPaused = true;
        };
        Timeline.prototype.resume = function () {
            if (!this.isPaused) {
                return;
            }
            this.$isPaused = false;
        };
        Timeline.MAIN = "MAIN";
        return Timeline;
    }(xgame.Locker));
    egretx.Timeline = Timeline;
    __reflect(Timeline.prototype, "egretx.Timeline");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.ITimelineManager = Symbol.for("ITimelineManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.ITimelineManagerInternal = Symbol.for("ITimelineManagerInternal");
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
            var self = this;
            if (self.addEventObserves) {
                self.addEventObserves();
            }
        };
        UIPage.prototype.onOpen = function () {
        };
        UIPage.prototype.onSceneChanging = function () {
        };
        UIPage.prototype.onClose = function () {
            var self = this;
            if (self.removeEventObserves) {
                self.removeEventObserves();
            }
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
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var watcher = list_2[_i];
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
    function tips(message) {
        TipsManager.Instance().append(message);
    }
    egretx.tips = tips;
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
