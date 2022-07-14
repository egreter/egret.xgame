window.fui = {};
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

(function (fui) {
    xgame.XGame.prototype["useFGUI"] = function (main) {
        var self = this;
        self.registerServiceProvider(new fui.FGUIProvider(main));
    };
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (fui) {
    var FGUIProvider = (function (_super) {
        __extends(FGUIProvider, _super);
        function FGUIProvider(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.priority = 100;
            return _this;
        }
        FGUIProvider.prototype.onInit = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        FGUIProvider.prototype.onStart = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.getService(fui.IUIManagerInternal).initialize();
                    return [2 /*return*/, true];
                });
            });
        };
        FGUIProvider.prototype.onServiceRegister = function (game) {
            game.singleton(fui.IUIManager, fui.UIManager).withInstance(new fui.UIManager(this.main)).setAlias(fui.IUIManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(fui.UIManager)));
        };
        return FGUIProvider;
    }(xgame.XObject));
    fui.FGUIProvider = FGUIProvider;
    __reflect(FGUIProvider.prototype, "fui.FGUIProvider", ["xgame.IServiceProvider"]);
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (fui) {
    fui.event = xgame.event;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-13
*************************************************/

(function (fui) {
    function getFairyGUI(root, name, type) {
        switch (type) {
            case "1":
                return root.getController(name);
            case "2":
                return root.getTransition(name);
            default:
                return root.getChild(name);
        }
    }
    function findPath(root, path, type) {
        path = path.replace(/\./g, "/");
        var paths = path.split("/");
        if (paths.length > 1) {
            var name_1 = paths.pop();
            for (var i = 0; i < paths.length; i++) {
                var ui = root.getChild(paths[i]);
                if (!ui || !ui.asCom) {
                    return null;
                }
                root = ui.asCom;
            }
            return getFairyGUI(root, name_1, type);
        }
        return getFairyGUI(root, path, type);
    }
    function fairy_ui(name) {
        return function (target, key) {
            Object.defineProperty(target, key, {
                get: function () {
                    var ui = this.view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "0");
                }
            });
        };
    }
    fui.fairy_ui = fairy_ui;
    function fairy_controller(name) {
        return function (target, key) {
            Object.defineProperty(target, key, {
                get: function () {
                    var ui = this.view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "1");
                }
            });
        };
    }
    fui.fairy_controller = fairy_controller;
    function fairy_transition(name) {
        return function (target, key) {
            Object.defineProperty(target, key, {
                get: function () {
                    var ui = this.view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "2");
                }
            });
        };
    }
    fui.fairy_transition = fairy_transition;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (fui) {
    fui.impl = xgame.impl;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (fui) {
    fui.inject = xgame.inject;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (fui) {
    fui.injectable = xgame.injectable;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (fui) {
    fui.IUIManager = Symbol.for("fgui.IUIManager");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (fui) {
    fui.IUIManagerInternal = Symbol.for("fgui.IUIManagerInternal");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../decorators/impl.ts" />
/// <reference path="interfaces/IUIManager.ts" />
/// <reference path="interfaces/IUIManagerInternal.ts" />

(function (fui) {
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.pipelines = [];
            _this.uiMap = new xgame.Dictionary();
            _this.uiLayers = new xgame.Dictionary();
            _this.root = fairygui.GRoot.inst;
            _this.onSceneChanged = new xgame.Signal2();
            _this.onUIOpened = new xgame.Signal1();
            _this.onUIClosed = new xgame.Signal1();
            //================================================
            // fairygui
            //================================================
            _this.uiPackages = new xgame.Dictionary();
            _this.stage = main.stage;
            return _this;
        }
        Object.defineProperty(UIManager.prototype, "entityManager", {
            get: function () {
                return this.$entityManager;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.initialize = function () {
            this.$entityManager = new fui.UIEntityManager(this);
            this.pipelines.push(this.checkIsOpened.bind(this));
            this.pipelines.push(this.createUIPage.bind(this));
            this.pipelines.push(this.openUIPage.bind(this));
            this.root.displayObject.name = "FUIRoot";
            this.main.addChild(this.root.displayObject);
            for (var i = fui.UILayerID.Layer_0_Bottom; i <= fui.UILayerID.Layer_15_Top; i++) {
                var layerManager = new fui.UILayerManager(this, i);
                this.root.addChildAt(layerManager, i);
                layerManager.addRelation(this.root, fairygui.RelationType.Width);
                layerManager.addRelation(this.root, fairygui.RelationType.Height);
                this.uiLayers.add(i, layerManager);
            }
            this.register(fui.Alert.NAME, fui.Alert);
            this.register(fui.PopupMenu.NAME, fui.PopupMenu);
            fui.TipsManager.Instance().initialize();
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
                if (this.$entityManager.tryGetEntities(uiName, entities)) {
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
                            this.$entityManager.removeEntity(entity);
                            uiPage = entity.uiPage;
                            return [4 /*yield*/, uiPage.doFadeOut()];
                        case 1:
                            _a.sent();
                            if (uiPage.view.parent) {
                                entity.uiPage.view.parent.removeChild(entity.uiPage.view);
                            }
                            if (entity.mask && entity.mask.parent) {
                                entity.mask.parent.removeChild(entity.mask);
                            }
                            this.onUIClosed.dispatch(entity);
                            this.$entityManager.checkEntities();
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
                            options = new fui.UIOptions();
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
                            options = new fui.UIOptions();
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
                            options = new fui.UIOptions();
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
                            options = new fui.UIOptions();
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
                            options = new fui.UIOptions();
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
                    if (this.$entityManager.tryGetEntities(options.uiClass, results)) {
                        entity = results[0];
                        if (entity.uiPage.flags & fui.UIFlags.allowMultiple) {
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
                            entity = new fui.UIEntity();
                            entity.uiManager = this;
                            entity.name = options.name;
                            options.entity = entity;
                            uiPage_1 = new ((_a = options.uiClass).bind.apply(_a, [void 0].concat(options.openArgs)))();
                            xgame.injectInstance(uiPage_1);
                            uiPage_1.entity = entity;
                            entity.uiPage = uiPage_1;
                            this.$entityManager.addEntity(entity);
                            uiPage_1.onInit();
                            return [4 /*yield*/, uiPage_1.load()];
                        case 1:
                            _b.sent();
                            uiPage_1.view.visible = false;
                            uiPage_1.view.displayObject.name = options.name;
                            if (options.hud) {
                                uiPage_1.renderWatcher.onChanged().add(function () {
                                    egret.callLater(function () {
                                        fui.TipsHelper.placeTipsWithHUD(uiPage_1, options.hud, options.gap);
                                    }, _this);
                                }, this);
                            }
                            if (options.uiRoot) {
                                options.uiRoot.addChild(uiPage_1.view);
                            }
                            else {
                                if (options.layerID) {
                                    uiPage_1.setLayerID(options.layerID);
                                }
                                layerManager = this.uiLayers.get(uiPage_1.layerID);
                                if (uiPage_1.flags & fui.UIFlags.useMask) {
                                    entity.createMask(uiPage_1.maskColor, uiPage_1.maskAlpha, uiPage_1.flags & fui.UIFlags.closeByMask);
                                    layerManager.addChild(entity.mask);
                                }
                                if (options.hud || (uiPage_1.flags & fui.UIFlags.isPlugin) || (uiPage_1.flags & fui.UIFlags.isPopupMenu)) {
                                }
                                else if (uiPage_1.flags & fui.UIFlags.isWindow) {
                                    uiPage_1.view.x = this.stage.stageWidth - uiPage_1.view.width >> 1;
                                    uiPage_1.view.y = this.stage.stageHeight - uiPage_1.view.height >> 1;
                                    uiPage_1.view.addRelation(layerManager, fairygui.RelationType.Center_Center);
                                }
                                else {
                                    uiPage_1.view.makeFullScreen();
                                    uiPage_1.view.addRelation(layerManager, fairygui.RelationType.Size);
                                }
                                layerManager.addEntity(entity);
                                layerManager.addChild(uiPage_1.view);
                            }
                            uiPage_1.onOpen();
                            return [4 /*yield*/, xgame.waitEndFrames()];
                        case 2:
                            _b.sent();
                            if (!options.hud) {
                                uiPage_1.view.visible = true;
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
                                if (entity.uiPage && entity.uiPage.view.parent) {
                                    entity.uiPage.view.parent.removeChild(entity.uiPage.view);
                                }
                                layerManager = this.uiLayers.get(options.layerID);
                                layerManager.addEntity(entity);
                                if (entity.mask) {
                                    layerManager.addChild(entity.mask);
                                }
                                if (entity.uiPage) {
                                    entity.uiPage.setLayerID(options.layerID);
                                    layerManager.addChild(entity.uiPage.view);
                                }
                            }
                            else {
                                layerManager = this.uiLayers.get(uiPage.layerID);
                                layerManager.orderToFront(entity);
                            }
                            _b.label = 4;
                        case 4:
                            this.$entityManager.checkEntities();
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
                            if (!(uiPage.flags & fui.UIFlags.isScene)) return [3 /*break*/, 3];
                            if (!this.currentScene) return [3 /*break*/, 2];
                            this.onSceneChanged.dispatch(entity, this.currentScene);
                            return [4 /*yield*/, this._closeUI(this.$currentScene)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.$currentScene = entity;
                            _a.label = 3;
                        case 3: return [4 /*yield*/, uiPage.doFadeIn()];
                        case 4:
                            _a.sent();
                            this.onUIOpened.dispatch(entity);
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        UIManager.prototype.loadPackage = function (packageName) {
            return __awaiter(this, void 0, void 0, function () {
                var pkg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.uiPackages.containsKey(packageName)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, fairygui.UIPackage.loadPackage(packageName)];
                        case 1:
                            pkg = _a.sent();
                            this.uiPackages.set(packageName, pkg);
                            return [2 /*return*/];
                    }
                });
            });
        };
        UIManager.prototype.createObject = function (packageName, comName, userClass) {
            return __awaiter(this, void 0, void 0, function () {
                var pkg, obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pkg = this.uiPackages.get(packageName);
                            if (!!pkg) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadPackage(packageName)];
                        case 1:
                            _a.sent();
                            pkg = this.uiPackages.get(packageName);
                            _a.label = 2;
                        case 2:
                            obj = pkg.createObject(comName, userClass);
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        UIManager = __decorate([
            fui.impl(fui.IUIManager, fui.IUIManagerInternal),
            __metadata("design:paramtypes", [egret.DisplayObjectContainer])
        ], UIManager);
        return UIManager;
    }(xgame.XObject));
    fui.UIManager = UIManager;
    __reflect(UIManager.prototype, "fui.UIManager", ["fui.IUIManager", "xgame.IXObject", "fui.IUIManagerInternal"]);
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/

(function (fui) {
    var UIAlign;
    (function (UIAlign) {
        UIAlign[UIAlign["CENTER"] = 0] = "CENTER";
        UIAlign[UIAlign["TOP"] = 1] = "TOP";
        UIAlign[UIAlign["BOTTOM"] = 2] = "BOTTOM";
        UIAlign[UIAlign["LEFT"] = 3] = "LEFT";
        UIAlign[UIAlign["RIGHT"] = 4] = "RIGHT";
    })(UIAlign = fui.UIAlign || (fui.UIAlign = {}));
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/

(function (fui) {
    var UIDirection;
    (function (UIDirection) {
        UIDirection[UIDirection["ANY"] = 0] = "ANY";
        UIDirection[UIDirection["TOP"] = 1] = "TOP";
        UIDirection[UIDirection["BOTTOM"] = 2] = "BOTTOM";
        UIDirection[UIDirection["LEFT"] = 3] = "LEFT";
        UIDirection[UIDirection["RIGHT"] = 4] = "RIGHT";
    })(UIDirection = fui.UIDirection || (fui.UIDirection = {}));
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UIAlign.ts" />
/// <reference path="../structs/UIDirection.ts" />
/// <reference path="../../decorators/inject.ts" />

(function (fui) {
    var UIPage = (function (_super) {
        __extends(UIPage, _super);
        function UIPage(packageName, comName, userClass) {
            var _this = _super.call(this) || this;
            _this.packageName = packageName;
            _this.comName = comName;
            _this.userClass = userClass;
            //UI的类型参数,见UIFlags
            _this.flags = fui.UIFlags.isStack | fui.UIFlags.isFullScreen;
            _this.guideValues = new xgame.Dictionary();
            _this.onComplete = new xgame.Signal0();
            _this.$isLoaded = false;
            _this.$isLoading = false;
            _this.deferred = new xgame.Deferred();
            _this.$maskAlpha = 0.3;
            _this.$maskColor = 0x333333;
            //UI的层级ID
            _this.$layerID = fui.UILayerID.Layer_5_UI;
            return _this;
        }
        Object.defineProperty(UIPage.prototype, "view", {
            get: function () {
                return this.$view;
            },
            enumerable: true,
            configurable: true
        });
        UIPage.prototype.addClick = function (target, listener, thisObject) {
            target.addClickListener(listener, thisObject);
        };
        UIPage.prototype.injectGuideValue = function (key, value, taskID) {
            this.guideManager.injectValue(key, value, taskID);
            this.guideValues.add(key, taskID || 0);
        };
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
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.$isLoading = true;
                            if (!(this.packageName && !this.isLoaded)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.uiManager.loadPackage(this.packageName)];
                        case 1:
                            _b.sent();
                            if (!this.comName) return [3 /*break*/, 3];
                            _a = this;
                            return [4 /*yield*/, this.uiManager.createObject(this.packageName, this.comName, this.userClass)];
                        case 2:
                            _a.$view = (_b.sent());
                            this.doComplete();
                            return [3 /*break*/, 4];
                        case 3:
                            this.doComplete();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.doComplete();
                            _b.label = 6;
                        case 6: return [2 /*return*/, this.deferred.promise];
                    }
                });
            });
        };
        UIPage.prototype.doComplete = function () {
            var _this = this;
            if (!this.$view) {
                this.$view = (new fairygui.GComponent());
            }
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
            var _this = this;
            if (this.guideValues.length) {
                this.guideValues.forKeys(function (key) {
                    var taskID = _this.guideValues.get(key);
                    _this.guideManager.removeValue(key, taskID);
                }, this);
                this.guideValues.clear();
            }
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
        __decorate([
            fui.inject(fui.IUIManager),
            __metadata("design:type", Object)
        ], UIPage.prototype, "uiManager", void 0);
        __decorate([
            fui.inject(egretx.IGuideManager),
            __metadata("design:type", Object)
        ], UIPage.prototype, "guideManager", void 0);
        return UIPage;
    }(xgame.XObject));
    fui.UIPage = UIPage;
    __reflect(UIPage.prototype, "fui.UIPage");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (fui) {
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
        UIFlags[UIFlags["isScene"] = 128] = "isScene";
        UIFlags[UIFlags["isWindow"] = 256] = "isWindow";
    })(UIFlags = fui.UIFlags || (fui.UIFlags = {}));
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (fui) {
    var PluginPage = (function (_super) {
        __extends(PluginPage, _super);
        function PluginPage(packageName, comName, userClass) {
            var _this = _super.call(this, packageName, comName, userClass) || this;
            _this.flags = fui.UIFlags.isPlugin;
            return _this;
        }
        return PluginPage;
    }(fui.UIPage));
    fui.PluginPage = PluginPage;
    __reflect(PluginPage.prototype, "fui.PluginPage");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (fui) {
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(packageName, comName, userClass) {
            var _this = _super.call(this, packageName, comName, userClass) || this;
            _this.flags = fui.UIFlags.isStack | fui.UIFlags.isWindow | fui.UIFlags.useMask | fui.UIFlags.closeByMask;
            _this.setLayerID(fui.UILayerID.Layer_8_Window);
            return _this;
        }
        return Window;
    }(fui.UIPage));
    fui.Window = Window;
    __reflect(Window.prototype, "fui.Window");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/

(function (fui) {
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
        UILayerID[UILayerID["Layer_10_Popup"] = 10] = "Layer_10_Popup";
        UILayerID[UILayerID["Layer_11_Guide"] = 11] = "Layer_11_Guide";
        UILayerID[UILayerID["Layer_12_Toast"] = 12] = "Layer_12_Toast";
        UILayerID[UILayerID["Layer_13_Loading"] = 13] = "Layer_13_Loading";
        UILayerID[UILayerID["Layer_14"] = 14] = "Layer_14";
        UILayerID[UILayerID["Layer_15_Top"] = 15] = "Layer_15_Top";
    })(UILayerID = fui.UILayerID || (fui.UILayerID = {}));
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="./Window.ts" />
/// <reference path="../structs/UIFlags.ts" />
/// <reference path="../structs/UILayerID.ts" />

(function (fui) {
    var PropertyNames = ["x", "y", "width", "height", "visible", "scaleX", "scaleY"];
    var RenderWatcher = (function (_super) {
        __extends(RenderWatcher, _super);
        function RenderWatcher() {
            var views = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                views[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.views = new xgame.Dictionary();
            _this.callback_onChanged = new xgame.Signal0();
            _this.isDispatching = false;
            for (var _a = 0, views_1 = views; _a < views_1.length; _a++) {
                var view = views_1[_a];
                _this.addWatcher(view);
            }
            return _this;
        }
        RenderWatcher.prototype.addWatcher = function (view) {
            if (this.views.containsKey(view.hashCode)) {
                return;
            }
            this.views.add(view.hashCode, view);
            view.addEventListener(fairygui.GObject.SIZE_CHANGED, this.onWatcher, this);
            this.onWatcher();
        };
        RenderWatcher.prototype.removeWatcher = function (view) {
            if (!this.views.containsKey(view.hashCode)) {
                return;
            }
            view.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.onWatcher, this);
            this.views.remove(view.hashCode);
        };
        RenderWatcher.prototype.onWatcher = function () {
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
            var _this = this;
            this.callback_onChanged.removeAll();
            this.views.clear(function (view) {
                view.removeEventListener(fairygui.GObject.SIZE_CHANGED, _this.onWatcher, _this);
            });
        };
        return RenderWatcher;
    }(xgame.XObject));
    fui.RenderWatcher = RenderWatcher;
    __reflect(RenderWatcher.prototype, "fui.RenderWatcher");
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(packageName, comName, userClass) {
            var _this = _super.call(this, packageName, comName, userClass) || this;
            _this.renderWatcher = new RenderWatcher();
            _this.offset = new egret.Point();
            _this.$uiDirection = fui.UIDirection.ANY;
            _this.$uiAlign = fui.UIAlign.CENTER;
            _this.flags = fui.UIFlags.isStack | fui.UIFlags.isPopupMenu | fui.UIFlags.useMask | fui.UIFlags.closeByMask | fui.UIFlags.allowMultiple;
            _this.setLayerID(fui.UILayerID.Layer_10_Popup);
            _this.$maskAlpha = 0;
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
        Popup.prototype.onOpen = function () {
            this.renderWatcher.addWatcher(this.view);
            _super.prototype.onOpen.call(this);
        };
        Popup.prototype.onClose = function () {
            if (this.renderWatcher) {
                this.renderWatcher.dispose();
            }
            _super.prototype.onClose.call(this);
        };
        return Popup;
    }(fui.UIPage));
    fui.Popup = Popup;
    __reflect(Popup.prototype, "fui.Popup");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UILayerID.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (fui) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(packageName, comName, userClass) {
            var _this = _super.call(this, packageName, comName, userClass) || this;
            _this.flags = fui.UIFlags.isScene | fui.UIFlags.isFullScreen;
            _this.setLayerID(fui.UILayerID.Layer_2_Scene);
            return _this;
        }
        return Scene;
    }(fui.UIPage));
    fui.Scene = Scene;
    __reflect(Scene.prototype, "fui.Scene");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />

(function (fui) {
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
                this.mask = new fairygui.GGraph();
                this.mask.drawRect(0, 0x000000, 0, 0x000000, alpha);
                this.mask.makeFullScreen();
                if (closeByMask) {
                    this.mask.addClickListener(this.onMaskClose, this);
                }
            }
        };
        UIEntity.prototype.onMaskClose = function () {
            this.mask.removeClickListener(this.onMaskClose, this);
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
            if (this.uiPage && this.uiPage.view) {
                this.uiPage.view.visible = true;
            }
        };
        UIEntity.prototype.hidePage = function () {
            if (this.uiPage && this.uiPage.view) {
                this.uiPage.view.visible = false;
            }
        };
        UIEntity.prototype.dispose = function () {
            if (this.mask) {
                this.mask.removeClickListener(this.onMaskClose, this);
            }
            this.uiPage = undefined;
            this.mask = undefined;
        };
        return UIEntity;
    }(xgame.XObject));
    fui.UIEntity = UIEntity;
    __reflect(UIEntity.prototype, "fui.UIEntity", ["fui.IUIEntity", "xgame.IDisposable", "xgame.IXObject"]);
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />
/// <reference path="../structs/UIFlags.ts" />

(function (fui) {
    var UIHelper = (function () {
        function UIHelper() {
        }
        UIHelper.isFullScreenUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & fui.UIFlags.isStack)) {
                return false;
            }
            if (!(flags & fui.UIFlags.isFullScreen)) {
                return false;
            }
            return true;
        };
        UIHelper.isWindowUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & fui.UIFlags.isStack)) {
                return false;
            }
            if ((flags & fui.UIFlags.isFullScreen)) {
                return false;
            }
            return !UIHelper.isPopupMenuUI(entity);
        };
        UIHelper.isPopupMenuUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (!(flags & fui.UIFlags.isStack)) {
                return false;
            }
            if ((flags & fui.UIFlags.isFullScreen)) {
                return false;
            }
            if (flags & fui.UIFlags.isPopupMenu) {
                return true;
            }
            return false;
        };
        UIHelper.isPluginUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (flags & fui.UIFlags.isPlugin) {
                return true;
            }
            return false;
        };
        UIHelper.isSceneUI = function (entity) {
            var flags = entity.uiPage.flags;
            if (flags & fui.UIFlags.isScene) {
                return true;
            }
            return false;
        };
        return UIHelper;
    }());
    fui.UIHelper = UIHelper;
    __reflect(UIHelper.prototype, "fui.UIHelper");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
/// <reference path="./UIEntity.ts" />
/// <reference path="../utils/UIHelper.ts" />

(function (fui) {
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
                if (entity.uiPage.flags & fui.UIFlags.isStack) {
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
                    if (entity.uiPage.flags & fui.UIFlags.isFullScreen) {
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
                    if (fui.UIHelper.isWindowUI(entity)) {
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
                if (entity.uiPage.flags & fui.UIFlags.isFullScreen) {
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
                if (layerID >= fui.UILayerID.Layer_5_UI) {
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
                if (layerID >= fui.UILayerID.Layer_5_UI) {
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
                    if (entity.uiPage.flags & fui.UIFlags.isStack) {
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
    fui.UIEntityManager = UIEntityManager;
    __reflect(UIEntityManager.prototype, "fui.UIEntityManager");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UILayerID.ts" />

(function (fui) {
    var UILayerManager = (function (_super) {
        __extends(UILayerManager, _super);
        function UILayerManager(manager, layerID) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.layerID = layerID;
            _this.entities = new xgame.List();
            _this.displayObject.name = "" + fui.UILayerID[layerID];
            _this.opaque = false;
            _this.makeFullScreen();
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
                this.setChildIndex(entity.uiPage.view, index);
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
    }(fairygui.GComponent));
    fui.UILayerManager = UILayerManager;
    __reflect(UILayerManager.prototype, "fui.UILayerManager");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../core/Window.ts" />

(function (fui) {
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
        xgame.that.getService(fui.IUIManager).openUI(Alert, options);
        return options.callback;
    }
    fui.alert = alert;
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert(options) {
            var _this = _super.call(this, options.packageName || Alert.defaultPackageName, options.comName || Alert.defaultComName) || this;
            _this.options = options;
            _this.clickButtonIndex = undefined;
            if (!_this.options.closeByMask) {
                _this.flags &= ~fui.UIFlags.closeByMask;
            }
            return _this;
        }
        ;
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
            var btn = this.com_btns.getChild("btn_" + index);
            return btn;
        };
        Alert.prototype.onOpen = function () {
            var _this = this;
            _super.prototype.onOpen.call(this);
            if (this.options.width) {
                this.view.width = this.options.width;
            }
            if (this.options.height) {
                this.view.height = this.options.height;
            }
            this.addClick(this.btn_close, function () {
                _this.close();
            }, this);
            if (!this.options.showCloseButton) {
                this.btn_close.visible = false;
            }
            if (this.options.title) {
                this.com_frame.setTitle(this.options.title);
            }
            this.lab_content.text = this.options.message;
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
                buttons[i].name = i.toString();
                this.addClick(buttons[i], this.onButtonClick, this);
            }
            if (this.options.buttons && this.options.buttons.length) {
                for (var i = 0; i < this.options.buttons.length; i++) {
                    buttons[i].text = this.options.buttons[i];
                }
                this.buttonsState.selectedIndex = this.options.buttons.length - 1;
            }
            else {
                var nums = this.options.numButton || 2;
                this.buttonsState.selectedIndex = nums - 1;
            }
        };
        Alert.prototype.onButtonClick = function (event) {
            var target = event.target;
            this.clickButtonIndex = parseInt(target.name);
            this.close();
        };
        Alert.defaultPackageName = "";
        Alert.defaultComName = "";
        Alert.NAME = "Alert";
        __decorate([
            fui.fairy_ui(),
            __metadata("design:type", fui.PopupFrame)
        ], Alert.prototype, "com_frame", void 0);
        __decorate([
            fui.fairy_ui(),
            __metadata("design:type", fairygui.GRichTextField)
        ], Alert.prototype, "lab_content", void 0);
        __decorate([
            fui.fairy_ui(),
            __metadata("design:type", fairygui.GButton)
        ], Alert.prototype, "com_btns", void 0);
        __decorate([
            fui.fairy_ui(),
            __metadata("design:type", fairygui.GButton)
        ], Alert.prototype, "btn_close", void 0);
        __decorate([
            fui.fairy_controller("com_btns/buttonsState"),
            __metadata("design:type", fairygui.Controller)
        ], Alert.prototype, "buttonsState", void 0);
        __decorate([
            fui.inject(fui.IUIManager),
            __metadata("design:type", Object)
        ], Alert.prototype, "uiManager", void 0);
        return Alert;
    }(fui.Window));
    fui.Alert = Alert;
    __reflect(Alert.prototype, "fui.Alert");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/

(function (fui) {
    var PopupFrame = (function (_super) {
        __extends(PopupFrame, _super);
        function PopupFrame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopupFrame.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.lab_title = this.getChild("lab_title").asRichTextField;
        };
        PopupFrame.prototype.setTitle = function (title) {
            this.lab_title.text = title;
        };
        return PopupFrame;
    }(fairygui.GComponent));
    fui.PopupFrame = PopupFrame;
    __reflect(PopupFrame.prototype, "fui.PopupFrame");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

(function (fui) {
    var PopupMenu = (function (_super) {
        __extends(PopupMenu, _super);
        function PopupMenu(options) {
            var _this = _super.call(this, options.packageName || PopupMenu.defaultPackageName, options.comName || PopupMenu.defaultComName) || this;
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
            if (options.uiDirection == undefined) {
                options.uiDirection = fui.UIDirection.BOTTOM;
            }
            if (options.uiAlign == undefined) {
                options.uiAlign = fui.UIAlign.CENTER;
            }
            options.itemHeight = options.itemHeight ? options.itemHeight : 25;
            options.itemGap = options.itemGap != undefined ? options.itemGap : 2;
            if (options.allowDirections && options.allowDirections.length) {
                _this.allowDirections = options.allowDirections;
            }
            _this.$uiDirection = options.uiDirection;
            _this.$uiAlign = options.uiAlign;
            _this.arrowPadding = options.arrowPadding;
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
            this.list_item.removeEventListener(fairygui.ItemEvent.CLICK, this.onItemClickHandler, this);
            if (this.options) {
                this.options.instance = undefined;
            }
            _super.prototype.onClose.call(this);
        };
        PopupMenu.prototype.onItemClickHandler = function (event) {
            this.selectedItem = event.itemObject.itemData;
            this.close();
        };
        PopupMenu.prototype.onOpen = function () {
            _super.prototype.onOpen.call(this);
            var options = this.options;
            if (options.width) {
                this.view.width = options.width;
            }
            if (options.height) {
                this.view.height = options.height;
            }
            var baseHeight = this.options.baseHeight || PopupMenu.defaultBaseHeight;
            if (!this.options.height) {
                this.view.height = baseHeight + (this.options.itemHeight) * this.options.items.length;
            }
            if (!this.options.width && this.options.minWidth && this.view.width < this.options.minWidth) {
                this.view.width = this.options.minWidth;
            }
            this.list_item.addEventListener(fairygui.ItemEvent.CLICK, this.onItemClickHandler, this);
            for (var i = 0; i < options.items.length; i++) {
                var item = options.items[i];
                var render = this.list_item.addItemFromPool();
                render.setItemData(item);
                this.list_item.addChild(render);
            }
            if (this.options.selected != undefined) {
                var selectedIndex = this.options.selected;
                if (selectedIndex >= 0) {
                    this.list_item.selectedIndex = selectedIndex;
                }
            }
        };
        PopupMenu.prototype.updateArrow = function (direction) {
            if (direction == fui.UIDirection.BOTTOM) {
                this.arrowState.selectedIndex = 0;
            }
            else if (direction == fui.UIDirection.TOP) {
                this.arrowState.selectedIndex = 1;
            }
            else if (direction == fui.UIDirection.RIGHT) {
                this.arrowState.selectedIndex = 2;
            }
            else if (direction == fui.UIDirection.LEFT) {
                this.arrowState.selectedIndex = 3;
            }
        };
        PopupMenu.NAME = "PopupMenu";
        PopupMenu.defaultPackageName = "";
        PopupMenu.defaultComName = "";
        PopupMenu.defaultBaseHeight = 30;
        __decorate([
            fui.fairy_ui(),
            __metadata("design:type", fairygui.GList)
        ], PopupMenu.prototype, "list_item", void 0);
        __decorate([
            fui.fairy_controller(),
            __metadata("design:type", fairygui.Controller)
        ], PopupMenu.prototype, "arrowState", void 0);
        return PopupMenu;
    }(fui.Popup));
    fui.PopupMenu = PopupMenu;
    __reflect(PopupMenu.prototype, "fui.PopupMenu");
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
        xgame.that.getService(fui.IUIManager).openPopup(PopupMenu, target, options);
        return options.callback;
    }
    fui.showPopupMenu = showPopupMenu;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/

(function (fui) {
    var PopupMenuItem = (function (_super) {
        __extends(PopupMenuItem, _super);
        function PopupMenuItem() {
            return _super.call(this) || this;
        }
        PopupMenuItem.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.lab_title = this.getChild("title").asTextField;
        };
        PopupMenuItem.prototype.setItemData = function (item) {
            this.itemData = item;
            this.text = item.title;
            if (item.textAlign && this.lab_title) {
                if (item.textAlign == "center") {
                    this.lab_title.align = fairygui.AlignType.Center;
                }
                else if (item.textAlign == "left") {
                    this.lab_title.align = fairygui.AlignType.Left;
                }
                else if (item.textAlign == "right") {
                    this.lab_title.align = fairygui.AlignType.Right;
                }
            }
        };
        return PopupMenuItem;
    }(fairygui.GButton));
    fui.PopupMenuItem = PopupMenuItem;
    __reflect(PopupMenuItem.prototype, "fui.PopupMenuItem");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

(function (fui) {
    var TipsState;
    (function (TipsState) {
        TipsState[TipsState["FadeIn"] = 1] = "FadeIn";
        TipsState[TipsState["Stay"] = 2] = "Stay";
        TipsState[TipsState["FadeOut"] = 3] = "FadeOut";
    })(TipsState = fui.TipsState || (fui.TipsState = {}));
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
    }(fairygui.GComponent));
    fui.TipsView = TipsView;
    __reflect(TipsView.prototype, "fui.TipsView", ["fui.ITipsView", "xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
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
            this.$container = new fairygui.GComponent();
            this.container.width = this.container.height = 1;
            this.container.touchable = false;
            this.container.opaque = false;
            var parent = xgame.that.getService(fui.IUIManager).getLayerManager(fui.UILayerID.Layer_12_Toast);
            parent.addChild(this.container);
            this.container.x = parent.width >> 1;
            this.container.y = parent.height >> 1;
            this.container.addRelation(parent, fairygui.RelationType.Center_Center);
        };
        return TipsManager;
    }(xgame.Singleton));
    fui.TipsManager = TipsManager;
    __reflect(TipsManager.prototype, "fui.TipsManager");
    function tips(message) {
        TipsManager.Instance().append(message);
    }
    fui.tips = tips;
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (fui) {
    var UIOptions = (function (_super) {
        __extends(UIOptions, _super);
        function UIOptions() {
            var _this = _super.call(this) || this;
            _this.gap = 10;
            return _this;
        }
        return UIOptions;
    }(xgame.XObject));
    fui.UIOptions = UIOptions;
    __reflect(UIOptions.prototype, "fui.UIOptions");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/

(function (fui) {
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
    fui.Bitmap = Bitmap;
    __reflect(Bitmap.prototype, "fui.Bitmap", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
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
    fui.BitmapPools = BitmapPools;
    __reflect(BitmapPools.prototype, "fui.BitmapPools");
})(fui || (fui = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
/// <reference path="../structs/UIDirection.ts" />
/// <reference path="../structs/UIAlign.ts" />

(function (fui) {
    var hud_bounds = new egret.Rectangle();
    var tips_bounds = new egret.Rectangle();
    var TipsHelper = (function () {
        function TipsHelper() {
        }
        TipsHelper.placeTipsWithHUD = function (tips, hud, gap) {
            if (gap === void 0) { gap = 10; }
            var uiManager = xgame.that.getService(fui.IUIManager);
            var stage = uiManager.stage;
            var direction = tips.uiDirection;
            var align = tips.uiAlign;
            var screenWidth = stage.stageWidth;
            var screenHeight = stage.stageHeight;
            tips.view.displayObject.getBounds(tips_bounds, true);
            hud.displayObject.getTransformedBounds(tips.view.parent.displayObject, hud_bounds);
            var hw = hud.width * hud.scaleX;
            var hh = hud.height * hud.scaleY;
            var tw = tips.view.width;
            var th = tips.view.height;
            var left = hud_bounds.x;
            var top = hud_bounds.y;
            var right = left + hw;
            var bottom = top + hh;
            //尝试放置到下边
            if (tips.allowUIDirection(fui.UIDirection.BOTTOM) && ((screenHeight - bottom - 2 * gap >= th && direction == fui.UIDirection.ANY) || direction == fui.UIDirection.BOTTOM)) {
                tips.view.y = bottom + gap;
                if (align == fui.UIAlign.LEFT) {
                    tips.view.x = left;
                }
                else if (align == fui.UIAlign.RIGHT) {
                    tips.view.x = right - tw;
                }
                else {
                    tips.view.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(fui.UIDirection.BOTTOM);
            }
            else if (tips.allowUIDirection(fui.UIDirection.TOP) && ((top - 2 * gap >= th && direction == fui.UIDirection.ANY) || direction == fui.UIDirection.TOP)) {
                tips.view.y = top - gap - th;
                if (align == fui.UIAlign.LEFT) {
                    tips.view.x = left;
                }
                else if (align == fui.UIAlign.RIGHT) {
                    tips.view.x = right - tw;
                }
                else {
                    tips.view.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(fui.UIDirection.TOP);
            }
            else if (tips.allowUIDirection(fui.UIDirection.RIGHT) && ((screenWidth - right - 2 * gap >= tw && direction == fui.UIDirection.ANY) || direction == fui.UIDirection.RIGHT)) {
                tips.view.x = right + gap;
                if (align == fui.UIAlign.TOP) {
                    tips.view.y = top;
                }
                else if (align == fui.UIAlign.BOTTOM) {
                    tips.view.y = top + hh - th;
                }
                else {
                    tips.view.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(fui.UIDirection.RIGHT);
            }
            else if (tips.allowUIDirection(fui.UIDirection.LEFT) && ((left - 2 * gap >= tw && direction == fui.UIDirection.ANY) || direction == fui.UIDirection.LEFT)) {
                tips.view.x = left - gap - tw;
                if (align == fui.UIAlign.TOP) {
                    tips.view.y = top;
                }
                else if (align == fui.UIAlign.BOTTOM) {
                    tips.view.y = top + hh - th;
                }
                else {
                    tips.view.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(fui.UIDirection.LEFT);
            }
            tips.view.x += tips.offset.x;
            tips.view.y += tips.offset.y;
            tips.view.visible = true;
        };
        return TipsHelper;
    }());
    fui.TipsHelper = TipsHelper;
    __reflect(TipsHelper.prototype, "fui.TipsHelper");
})(fui || (fui = {}));
