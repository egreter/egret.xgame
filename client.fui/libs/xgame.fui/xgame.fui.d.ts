/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare namespace xgame {
    interface XGame {
        useFGUI(main: egret.DisplayObjectContainer): void;
    }
}
declare module fui {
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module fui {
    class FGUIProvider extends xgame.XObject implements xgame.IServiceProvider {
        private main;
        constructor(main: egret.DisplayObjectContainer);
        priority: number;
        onInit(game: xgame.IXGame): Promise<boolean>;
        onStart(game: xgame.IXGame): Promise<boolean>;
        onServiceRegister(game: xgame.IXGame): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module fui {
    const event: typeof xgame.event;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-13
*************************************************/
declare module fui {
    function fairy_ui(name?: string): (target: any, key: string) => void;
    function fairy_controller(name?: string): (target: any, key: string) => void;
    function fairy_transition(name?: string): (target: any, key: string) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module fui {
    const impl: typeof xgame.impl;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module fui {
    const inject: typeof xgame.inject;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module fui {
    const injectable: typeof xgame.injectable;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    let ITouchManager: symbol;
    interface ITouchManager extends xgame.IDisposable {
        removeTouchEvents(target: fairygui.GObject | number): void;
        addTouchBegin(target: fairygui.GObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addTouchMove(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeTouchMove(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addTouchEnd(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeTouchEnd(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addReleaseOutSide(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeReleaseOutSide(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addClick(target: fairygui.GObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeClick(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addLongPress(target: fairygui.GObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addRepeatPress(target: fairygui.GObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: fairygui.GObject, listener: Function, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    let ITouchManagerInternal: symbol;
    interface ITouchManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    const TOUCH_TAP_BETWEEN_TIME: number;
    const TOUCH_LONG_PRESS_TIME: number;
    const TOUCH_SCALE_RADIO: number;
    let touchClickLastTime: number;
    class TouchManager extends xgame.XObject implements xgame.IDisposable, ITouchManager, ITouchManagerInternal {
        main: egret.DisplayObjectContainer;
        stage: egret.Stage;
        private delegates;
        constructor(main: egret.DisplayObjectContainer);
        dispose(): void;
        initialize(): void;
        private onLeaveStage(event);
        removeTouchEvents(target: fairygui.GObject | number): void;
        addTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    class TouchBehaviours {
        private disposableGroup;
        setTouchManager(target: fairygui.GObject): void;
        addTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    class TouchDelegate extends xgame.XObject implements xgame.IDisposable {
        private inited;
        private target;
        private longPressTimeDelta;
        private repeatPressTimeDelta;
        private clickHandler;
        private releaseOutsideHandler;
        private longPressHandler;
        private repeatPressHandler;
        private beginHandler;
        private moveHandler;
        private endHandler;
        constructor(target: fairygui.GObject);
        onLeaveStage(event: egret.TouchEvent): void;
        addTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        initTouchEvents(): void;
        private repeat_timer_id;
        protected setRepeatTimer(): void;
        protected clearRepeatTimer(): void;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected onTouchMove(event: egret.TouchEvent): void;
        protected onTouchEnd(event: egret.TouchEvent): void;
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    class TouchDisposableGroup extends xgame.XObject implements xgame.IDisposable {
        private displayObject;
        private touches;
        manager: TouchManager;
        constructor(displayObject?: fairygui.GObject);
        private onRemovedFromStage();
        dispose(): void;
        addTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module fui {
    interface ITouchHandler {
        listeners: xgame.Signal1<egret.TouchEvent>;
        happend?: boolean;
        identifier?: number;
        time?: number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module fui {
    let IUIManager: symbol;
    interface IUIManager extends xgame.IXObject {
        readonly entityManager: UIEntityManager;
        readonly stage: egret.Stage;
        readonly currentScene: IUIEntity;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        register(uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>;
        clearScene(): void;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        closeUI(uiName: string): void;
        closeUI(entity: IUIEntity): void;
        popUI(): boolean;
        loadPackage(packageName: string): Promise<void>;
        createObject(packageName: string, comName: string, userClass?: xgame.TClass<fairygui.GObject>): Promise<fairygui.GObject>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module fui {
    let IUIManagerInternal: symbol;
    interface IUIManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module fui {
    class UIManager extends xgame.XObject implements IUIManager, IUIManagerInternal {
        private main;
        private pipelines;
        readonly uiMap: xgame.Dictionary<string, xgame.TClass<UIPage<fairygui.GObject>>>;
        readonly uiLayers: xgame.Dictionary<number, UILayerManager>;
        readonly root: fairygui.GRoot;
        private $entityManager;
        readonly entityManager: UIEntityManager;
        stage: egret.Stage;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        constructor(main: egret.DisplayObjectContainer);
        initialize(): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        register(uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>): void;
        popUI(): boolean;
        clearScene(): void;
        closeUI(uiName: string): void;
        closeUI(entity: UIEntity): void;
        private _closeUI(entity);
        private $currentScene;
        readonly currentScene: IUIEntity;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        private startPipelines(options);
        /**
         * 检查UIPage是否存在或可以多开
         * @param options
         * @returns
         */
        private checkIsOpened(options);
        /**
         * 如果没有存在就创建UIPage
         * @param options
         * @returns
         */
        private createUIPage(options);
        /**
         * 如果UIPage创建成功就打开并传递参数
         * @param options
         * @returns
         */
        private openUIPage(options);
        private uiPackages;
        loadPackage(packageName: string): Promise<void>;
        createObject(packageName: string, comName: string, userClass?: xgame.TClass<fairygui.GObject>): Promise<fairygui.GObject>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module fui {
    enum UIAlign {
        CENTER = 0,
        TOP = 1,
        BOTTOM = 2,
        LEFT = 3,
        RIGHT = 4,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module fui {
    enum UIDirection {
        ANY = 0,
        TOP = 1,
        BOTTOM = 2,
        LEFT = 3,
        RIGHT = 4,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module fui {
    class UIPage<T extends fairygui.GObject> extends xgame.XObject {
        packageName: string;
        comName: string;
        userClass: xgame.TClass<T>;
        uiManager: fui.IUIManager;
        guideManager: egretx.IGuideManager;
        flags: number;
        entity: IUIEntity;
        private $view;
        readonly view: T;
        constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>);
        private guideValues;
        injectGuideValue<T extends keyof egretx.IGuideInjectValue>(key: T, value: egretx.IGuideInjectValue[T], taskID?: number): void;
        readonly onComplete: xgame.Signal0;
        private $isLoaded;
        readonly isLoaded: boolean;
        private $isLoading;
        readonly isLoading: boolean;
        private deferred;
        load(): Promise<void>;
        private doComplete();
        protected $maskAlpha: number;
        readonly maskAlpha: number;
        protected $maskColor: number;
        readonly maskColor: number;
        private $layerID;
        readonly layerID: UILayerID;
        setLayerID(layerID: UILayerID): void;
        onInit(): void;
        onOpen(): void;
        onSceneChanging(): void;
        onClose(): void;
        onShow(): void;
        onHide(): void;
        close(): void;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        setTouchManager: (target: fairygui.GObject) => void;
        removeTouchEvents: (target: fairygui.GObject | number) => void;
        addTouchBegin: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        removeTouchBegin: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addClick: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        removeClick: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: fairygui.GObject, listener: Function, thisObject?: any, time?: number) => void;
        removeLongPress: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: fairygui.GObject, listener: Function, thisObject?: any, time?: number) => void;
        removeRepeatPress: (target: fairygui.GObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module fui {
    enum UIFlags {
        None = 0,
        useMask = 1,
        isStack = 2,
        isFullScreen = 4,
        allowMultiple = 8,
        closeByMask = 16,
        isPopupMenu = 32,
        isPlugin = 64,
        isScene = 128,
        isWindow = 256,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
declare module fui {
    class PluginPage<T extends fairygui.GObject> extends UIPage<T> {
        constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
declare module fui {
    class Window<T extends fairygui.GObject> extends UIPage<T> {
        constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module fui {
    enum UILayerID {
        Layer_0_Bottom = 0,
        Layer_1 = 1,
        Layer_2_Scene = 2,
        Layer_3_SceneMask = 3,
        Layer_4_SceneFrame = 4,
        Layer_5_UI = 5,
        Layer_6_UIMask = 6,
        Layer_7_UIFrame = 7,
        Layer_8_Window = 8,
        Layer_9 = 9,
        Layer_10_Popup = 10,
        Layer_11_Guide = 11,
        Layer_12_Toast = 12,
        Layer_13_Loading = 13,
        Layer_14 = 14,
        Layer_15_Top = 15,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
declare module fui {
    class RenderWatcher extends xgame.XObject {
        private views;
        private callback_onChanged;
        constructor(...views: fairygui.GObject[]);
        addWatcher(view: fairygui.GObject): void;
        removeWatcher(view: fairygui.GObject): void;
        private onWatcher();
        private isDispatching;
        private lateDispatch();
        onChanged(): xgame.Signal0;
        dispose(): void;
    }
    class Popup<T extends fairygui.GObject> extends UIPage<T> {
        readonly renderWatcher: RenderWatcher;
        readonly offset: egret.Point;
        constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>);
        protected $uiDirection: UIDirection;
        readonly uiDirection: UIDirection;
        protected $uiAlign: UIAlign;
        readonly uiAlign: UIAlign;
        protected allowDirections: UIDirection[];
        allowUIDirection(direction: UIDirection): boolean;
        fixedUIDirection(direction: UIDirection): void;
        onOpen(): void;
        onClose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module fui {
    class Scene<T extends fairygui.GObject> extends UIPage<T> {
        constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module fui {
    interface IUIEntity {
        name: string;
        uiPage: UIPage<fairygui.GObject>;
        readonly isClosed: boolean;
        groupName: string;
        closePage(): void;
        showPage(): void;
        hidePage(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module fui {
    class UIEntity extends xgame.XObject implements IUIEntity, xgame.IDisposable {
        uiManager: IUIManager;
        name: string;
        constructor();
        uiPage: UIPage<fairygui.GObject>;
        private $isClosed;
        readonly isClosed: boolean;
        mask: fairygui.GGraph;
        groupName: string;
        createMask(color: number, alpha: number, closeByMask: number): void;
        private onMaskClose();
        onSceneChanging(): void;
        onClose(): void;
        closePage(): void;
        showPage(): void;
        hidePage(): void;
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
declare module fui {
    class UIHelper {
        static isFullScreenUI(entity: IUIEntity): boolean;
        static isWindowUI(entity: IUIEntity): boolean;
        static isPopupMenuUI(entity: IUIEntity): boolean;
        static isPluginUI(entity: IUIEntity): boolean;
        static isSceneUI(entity: IUIEntity): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module fui {
    class UIEntityManager extends xgame.XObject {
        readonly manager: UIManager;
        readonly entityMap: xgame.Dictionary<string, UIEntity[]>;
        readonly stackList: xgame.List<UIEntity>;
        constructor(manager: UIManager);
        addEntity(entity: UIEntity): void;
        readonly stackCount: number;
        readonly topUI: IUIEntity;
        readonly topFullScreenUI: IUIEntity;
        readonly hasPopUp: boolean;
        checkEntities(): void;
        /**
         * 隐藏UI之下的显示层级
         */
        hideUIUnderLayers(): void;
        /**
         * 显示UI之下的显示层级
         */
        showUIUnderLayers(): void;
        removeEntity(entity: UIEntity): void;
        tryGetEntities(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, results?: UIEntity[]): boolean;
        tryGetEntities(uiName: string, results?: UIEntity[]): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module fui {
    class UILayerManager extends fairygui.GComponent {
        readonly manager: UIManager;
        readonly layerID: number;
        readonly entities: xgame.List<UIEntity>;
        constructor(manager: UIManager, layerID: number);
        readonly count: number;
        addEntity(entity: UIEntity): void;
        removeEntity(entity: UIEntity): void;
        orderToFront(entity: UIEntity): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module fui {
    interface IAlertOptions {
        showCloseButton?: boolean;
        closeByMask?: boolean;
        buttons?: string[];
        numButton?: number;
        width?: number;
        height?: number;
        title?: string;
        message?: string;
        callback?: xgame.Signal1<number>;
        packageName?: string;
        comName?: string;
    }
    function alert(message: string, title?: string, closeByMask?: boolean): xgame.Signal1<number>;
    function alert(message: string, title?: string, buttons?: string[], closeByMask?: boolean): xgame.Signal1<number>;
    function alert(message: string, title?: string, nums?: number, closeByMask?: boolean): xgame.Signal1<number>;
    function alert(options: IAlertOptions): xgame.Signal1<number>;
    class Alert extends Window<fairygui.GObject> {
        options: IAlertOptions;
        static defaultPackageName: string;
        static defaultComName: string;
        static NAME: string;
        com_frame: PopupFrame;
        lab_content: fairygui.GRichTextField;
        com_btns: fairygui.GButton;
        btn_close: fairygui.GButton;
        buttonsState: fairygui.Controller;
        uiManager: fui.IUIManager;
        protected clickButtonIndex: number;
        constructor(options: IAlertOptions);
        close(): void;
        onClose(): void;
        protected getButton(index: number): fairygui.GButton;
        onOpen(): void;
        private onButtonClick(event);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/
declare module fui {
    class PopupFrame extends fairygui.GComponent {
        lab_title: fairygui.GRichTextField;
        protected constructFromXML(xml: any): void;
        setTitle(title: string): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module fui {
    interface IMenuItem {
        index?: number;
        title?: string;
        textAlign?: string;
    }
    interface IMenuOptions {
        packageName?: string;
        comName?: string;
        baseHeight?: number;
        width?: number;
        minWidth?: number;
        height?: number;
        minHeight?: number;
        items: IMenuItem[];
        itemHeight?: number;
        itemGap?: number;
        itemRender?: any;
        itemRenderSkinName?: string;
        uiDirection?: UIDirection;
        uiAlign?: UIAlign;
        arrowPadding?: number;
        offset?: egret.Point;
        selected?: number;
        textAlign?: string;
        allowDirections?: UIDirection[];
        instance?: PopupMenu;
        callback?: xgame.Signal1<IMenuItem>;
    }
    class PopupMenu extends Popup<fairygui.GObject> {
        options: IMenuOptions;
        static NAME: string;
        static defaultPackageName: string;
        static defaultComName: string;
        static defaultBaseHeight: number;
        static toOptions(titles: string[], selectedIndex?: number): IMenuOptions;
        list_item: fairygui.GList;
        constructor(options: IMenuOptions);
        private callback_onSelect;
        private arrowPadding;
        arrowState: fairygui.Controller;
        onSelect(): xgame.Signal1<IMenuItem>;
        fixedUIDirection(direction: UIDirection): void;
        onClose(): void;
        private selectedItem;
        private onItemClickHandler(event);
        onOpen(): void;
        protected updateArrow(direction: UIDirection): void;
    }
    function showPopupMenu(target: fairygui.GObject, titles: string[]): xgame.Signal1<IMenuItem>;
    function showPopupMenu(target: fairygui.GObject, options: IMenuOptions): xgame.Signal1<IMenuItem>;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/
declare module fui {
    class PopupMenuItem extends fairygui.GButton {
        constructor();
        private lab_title;
        protected constructFromXML(xml: any): void;
        itemData: IMenuItem;
        setItemData(item: IMenuItem): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module fui {
    interface ITipsView extends xgame.IPoolable {
        setMessage(message: string): void;
        playAnimation(): Promise<void>;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        doStay(): Promise<void>;
    }
    enum TipsState {
        FadeIn = 1,
        Stay = 2,
        FadeOut = 3,
    }
    class TipsView extends fairygui.GComponent implements ITipsView {
        fromPoolHashCode: number;
        private $state;
        state: TipsState;
        durationFadeIn: number;
        durationStay: number;
        durationFadeOut: number;
        durationPosition: number;
        time: number;
        index: number;
        release(): void;
        dispose(): void;
        setMessage(message: string): void;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        doStay(): Promise<void>;
        playAnimation(): Promise<void>;
    }
    class TipsManager extends xgame.Singleton {
        private pools;
        parallelMax: number;
        private $container;
        fetch: () => TipsView;
        readonly container: fairygui.GComponent;
        constructor();
        protected waitQueues: string[];
        append(message: string): void;
        private play(message);
        private endView(view);
        clear(): void;
        initialize(): void;
    }
    function tips(message: string): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module fui {
    class UIOptions extends xgame.XObject {
        name: string;
        uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
        groupName: string;
        uiRoot: fairygui.GComponent;
        layerID: number;
        openArgs: any[];
        hud: fairygui.GObject;
        gap: number;
        errorMessage: string;
        entity: UIEntity;
        constructor();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module fui {
    class Bitmap extends egret.Bitmap implements xgame.IPoolable {
        fromPoolHashCode: number;
        release(): void;
        dispose(): void;
        removeSelf(): void;
    }
    class BitmapPools extends xgame.Singleton {
        private pools;
        constructor();
        fetch(): Bitmap;
        recycle(bitmap: Bitmap): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module fui {
    class TipsHelper {
        static placeTipsWithHUD(tips: Popup<fairygui.GObject>, hud: fairygui.GObject, gap?: number): void;
    }
}
