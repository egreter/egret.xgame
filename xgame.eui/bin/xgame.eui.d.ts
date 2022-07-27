/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare namespace xgame {
    interface XGame {
        useEUI(main: egret.DisplayObjectContainer): void;
    }
}
declare module euix {
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module euix {
    let IUIManager: symbol;
    interface IUIManager extends xgame.IXObject {
        readonly entityManager: UIEntityManager;
        readonly stage: egret.Stage;
        readonly RES: UIResManager;
        readonly currentScene: IUIEntity;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly onStackChanged: xgame.Signal2<IUIEntity, boolean>;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        register(uiName: string, uiClass: xgame.TClass<UIPage>): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        lockScreen(): void;
        unlockScreen(force?: boolean): void;
        readonly sceneTransition: ISceneTransition;
        setSceneTransition(transition: ISceneTransition): void;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        clearScene(): void;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        closeUI(uiName: string): void;
        closeUI(entity: IUIEntity): void;
        popUI(): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module euix {
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
declare module euix {
    class EUIProvider extends xgame.XObject implements xgame.IServiceProvider {
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
declare module euix {
    const event: typeof xgame.event;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module euix {
    const impl: typeof xgame.impl;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module euix {
    const inject: typeof xgame.inject;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module euix {
    const injectable: typeof xgame.injectable;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
    let ITouchManager: symbol;
    interface ITouchManager extends xgame.IDisposable {
        removeTouchEvents(target: egret.DisplayObject | number): void;
        addTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
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
declare module euix {
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
        removeTouchEvents(target: egret.DisplayObject | number): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
    class LayoutCache extends xgame.XObject {
        top: number;
        bottom: number;
        left: number;
        right: number;
        horizontalCenter: number;
        verticalCenter: number;
        percentWidth: number;
        percentHeight: number;
        anchorOffsetX: number;
        anchorOffsetY: number;
        x: number;
        y: number;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        reset(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
    class TouchBehaviours {
        private disposableGroup;
        setTouchManager(target: egret.DisplayObject): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
    class TouchDelegate extends xgame.XObject implements xgame.IDisposable {
        private inited;
        private target;
        private clickScaleEnable;
        private cache;
        private longPressTimeDelta;
        private repeatPressTimeDelta;
        private clickHandler;
        private releaseOutsideHandler;
        private longPressHandler;
        private repeatPressHandler;
        private beginHandler;
        private moveHandler;
        private endHandler;
        constructor(target: egret.DisplayObject, scale?: boolean);
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
        protected cacheLayout(): void;
        protected updateLayout(isUp?: boolean): void;
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
declare module euix {
    class TouchDisposableGroup extends xgame.XObject implements xgame.IDisposable {
        private displayObject;
        private touches;
        manager: TouchManager;
        constructor(displayObject?: egret.DisplayObject);
        private onRemovedFromStage();
        dispose(): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module euix {
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
declare module euix {
    class UIManager extends xgame.XObject implements IUIManager, IUIManagerInternal {
        private main;
        private pipelines;
        readonly uiMap: xgame.Dictionary<string, xgame.TClass<UIPage>>;
        readonly uiLayers: xgame.Dictionary<number, UILayerManager>;
        readonly root: eui.UILayer;
        private $entityManager;
        readonly entityManager: UIEntityManager;
        stage: egret.Stage;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        readonly onStackChanged: xgame.Signal2<IUIEntity, boolean>;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly RES: UIResManager;
        constructor(main: egret.DisplayObjectContainer);
        initialize(): void;
        private lockReference;
        /**
         * 锁定屏幕操作
         */
        lockScreen(): void;
        /**
         * 解锁屏幕操作
         * @param force 是否强制解锁
         */
        unlockScreen(force?: boolean): void;
        private $sceneTransition;
        readonly sceneTransition: ISceneTransition;
        setSceneTransition(value: ISceneTransition): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        register(uiName: string, uiClass: xgame.TClass<UIPage>): void;
        popUI(): boolean;
        clearScene(): void;
        closeUI(uiName: string): void;
        closeUI(entity: UIEntity): void;
        private _closeUI(entity);
        private $currentScene;
        readonly currentScene: IUIEntity;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
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
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-30
*************************************************/
declare module euix {
    class Group extends eui.Group implements xgame.IXObject {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module euix {
    class ItemRenderer extends eui.ItemRenderer {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module euix {
    class UIComponent extends eui.Component implements xgame.IXObject, eui.UIComponent {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module euix {
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
declare module euix {
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
declare module euix {
    class UIPage extends UIComponent {
        skinPath: string;
        uiManager: IUIManager;
        guideManager: egretx.IGuideManager;
        animationManager: egretx.IAnimationManager;
        audioManager: egretx.IAudioManager;
        flags: number;
        entity: IUIEntity;
        constructor(skinPath?: string);
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
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module euix {
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
declare module euix {
    class PluginPage extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
declare module euix {
    class Window extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module euix {
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
declare module euix {
    class RenderWatcher extends xgame.XObject {
        private views;
        private watchers;
        private dict;
        private callback_onChanged;
        constructor(...views: egret.DisplayObject[]);
        addWatcher(view: egret.DisplayObject): void;
        removeWatcher(view: egret.DisplayObject): void;
        private onWatcher(value);
        private isDispatching;
        private lateDispatch();
        onChanged(): xgame.Signal0;
        dispose(): void;
    }
    class Popup extends UIPage {
        readonly renderWatcher: RenderWatcher;
        readonly offset: egret.Point;
        constructor(skinPath?: string);
        protected $uiDirection: UIDirection;
        readonly uiDirection: UIDirection;
        protected $uiAlign: UIAlign;
        readonly uiAlign: UIAlign;
        protected allowDirections: UIDirection[];
        allowUIDirection(direction: UIDirection): boolean;
        fixedUIDirection(direction: UIDirection): void;
        onClose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module euix {
    class Scene extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module euix {
    interface IUIEntity {
        name: string;
        uiPage: UIPage;
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
declare module euix {
    class UIEntity extends xgame.XObject implements IUIEntity, xgame.IDisposable {
        uiManager: IUIManager;
        name: string;
        constructor();
        uiPage: UIPage;
        private $isClosed;
        readonly isClosed: boolean;
        mask: eui.Rect;
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
declare module euix {
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
declare module euix {
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
        tryGetEntities(uiClass: xgame.TClass<UIPage>, results?: UIEntity[]): boolean;
        tryGetEntities(uiName: string, results?: UIEntity[]): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module euix {
    class UILayerManager extends eui.UILayer {
        readonly manager: UIManager;
        readonly id: number;
        readonly entities: xgame.List<UIEntity>;
        constructor(manager: UIManager, id: number);
        readonly count: number;
        addEntity(entity: UIEntity): void;
        removeEntity(entity: UIEntity): void;
        orderToFront(entity: UIEntity): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-21
*************************************************/
declare let onDisplayListChanged: xgame.Signal1<number>;
declare let onDisplayListDisposed: xgame.Signal1<number>;
declare let egret_BitmapData_displayList: {
    [key: number]: egret.DisplayObject[];
};
declare let egret_BitmapData_addDisplayObject: typeof egret.BitmapData.$addDisplayObject;
declare let egret_BitmapData_removeDisplayObject: typeof egret.BitmapData.$removeDisplayObject;
declare let egret_BitmapData_dispose: typeof egret.BitmapData.$dispose;
declare function get_timestamp(): number;
declare module euix {
    class UIResManager extends xgame.XObject {
        private textures;
        constructor();
        gc(force?: boolean): void;
        private destroyRes(key);
        private onDisplayListChanged(hashCode);
        private onDisplayListDisposed(hashCode);
        register(key: string, texture: egret.Texture): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module euix {
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
        skinName?: string;
        named?: string;
    }
    function alert(message: string, title?: string, closeByMask?: boolean, named?: string): xgame.Signal1<number>;
    function alert(message: string, title?: string, buttons?: string[], closeByMask?: boolean, named?: string): xgame.Signal1<number>;
    function alert(message: string, title?: string, nums?: number, closeByMask?: boolean, named?: string): xgame.Signal1<number>;
    function alert(options: IAlertOptions): xgame.Signal1<number>;
    class Alert extends Window {
        options: IAlertOptions;
        static defaultSkinName: string;
        static NAME: string;
        lab_title: eui.Label;
        lab_content: eui.Label;
        btn_close: eui.Button;
        uiManager: IUIManager;
        protected clickButtonIndex: number;
        constructor(options: IAlertOptions);
        close(): void;
        onClose(): void;
        protected getButton(index: number): eui.Button;
        onOpen(): void;
        private onButtonClick(event);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
declare module euix {
    function get_measure_width(text: string, instance: any): number;
    interface ISourceItem {
        label?: string;
    }
    class DropdownList extends UIComponent implements xgame.IPoolable {
        static defaultItemRenderSkinName: string;
        static toSource(labels: string[]): ISourceItem[];
        static itemToLabel(item: ISourceItem): string;
        img_bg: eui.Image;
        img_icon: eui.Image;
        lab_title: eui.Label;
        itemToLabel: (item: ISourceItem) => string;
        protected invalidateFlags: number;
        constructor();
        private callback_onSelectChanged;
        onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, T, DropdownList>;
        $onRemoveFromStage(): void;
        dispose(): void;
        protected childrenCreated(): void;
        private $isOpened;
        readonly isOpened: boolean;
        private options;
        openPopup(): void;
        closePopup(): void;
        private $textColor;
        textColor: number;
        private $popupItemHeight;
        popupItemHeight: number;
        private $popupTextAlign;
        popupTextAlign: string;
        private $textAlign;
        textAlign: string;
        private $selectedIndex;
        selectedIndex: number;
        protected setSelectedIndex(value: number, dispatch?: boolean): void;
        readonly selectedItem: ISourceItem;
        private $source;
        source: ISourceItem[];
        private $itemRenderGap;
        itemRenderGap: number;
        private $popupItemRenderSkinName;
        popupItemRenderSkinName: string;
        private $popupItemRender;
        popupItemRender: any;
        private $popupArrowPadding;
        popupArrowPadding: number;
        private $popupOffset;
        popupOffset: egret.Point;
        private isLate;
        protected lateUpdate(): void;
        protected getMenuItem(index: number): IMenuItem;
        protected getTitle(item: ISourceItem): string;
        protected onDrawComponent(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
declare module euix {
    interface IDropdownSource {
        selectedIndex?: number;
        source?: ISourceItem[];
        itemToLabel?: (item: ISourceItem) => string;
    }
    class DropdownListGroup extends Group {
        static defaultDropdownSkinName: string;
        static defaultFetchDropdownList: () => DropdownList;
        static defaultPopupItemHeight: number;
        fetchDropdownList: () => DropdownList;
        protected invalidateFlags: number;
        constructor();
        destroy(): void;
        private callback_onSelectChanged;
        onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, number[], T[]>;
        private $dropdownSkinName;
        dropdownSkinName: string;
        private $popupItemRenderSkinName;
        popupItemRenderSkinName: string;
        private $textColor;
        textColor: number;
        private $popupItemHeight;
        popupItemHeight: number;
        private $popupTextAlign;
        popupTextAlign: string;
        private $textAlign;
        textAlign: string;
        private $source;
        source: IDropdownSource[];
        getSelectedIndexes(): number[];
        getSelectedIndex(index: number): number;
        setSelectedIndexes(selectedIndexes: number[]): void;
        setSelectedIndex(index: number, selectedIndex: number): void;
        private isLate;
        protected lateUpdate(): void;
        protected onDrawComponent(): void;
        protected clearItems(): void;
        private selectedIndexes;
        protected initItems(): void;
        protected items: DropdownList[];
        protected getItemAt(index: number): DropdownList;
        protected indexOf(dropdown: DropdownList): number;
        private onSelectChangeHandler(selectedIndex, value, dropdown);
        private pools;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module euix {
    interface IMenuItem {
        index?: number;
        title?: string;
        textAlign?: string;
    }
    interface IMenuOptions {
        skinName?: string;
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
    class PopupMenuEvent extends egret.Event {
        static ITEM_CLICK: string;
    }
    class PopupMenuItem extends ItemRenderer {
        lab_title: eui.Label;
        private readonly item;
        protected createChildren(): void;
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
    class PopupMenu extends Popup {
        options: IMenuOptions;
        static NAME: string;
        static defaultSkinName: string;
        static defaultBaseHeight: number;
        static toOptions(titles: string[], selectedIndex?: number): IMenuOptions;
        list_item: eui.List;
        constructor(options: IMenuOptions);
        private callback_onSelect;
        private arrow_down;
        private arrow_up;
        private arrow_right;
        private arrow_left;
        private arrowPadding;
        onSelect(): xgame.Signal1<IMenuItem>;
        fixedUIDirection(direction: UIDirection): void;
        onClose(): void;
        private selectedItem;
        private onItemClickHandler(event);
        onOpen(): void;
        protected updateArrow(direction: UIDirection): void;
    }
    function showPopupMenu(target: egret.DisplayObject, titles: string[]): xgame.Signal1<IMenuItem>;
    function showPopupMenu(target: egret.DisplayObject, options: IMenuOptions): xgame.Signal1<IMenuItem>;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module euix {
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
    class TipsView extends eui.Component implements ITipsView {
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
        readonly container: eui.Group;
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
declare module euix {
    class UIOptions extends xgame.XObject {
        name: string;
        uiClass: xgame.TClass<UIPage>;
        groupName: string;
        uiRoot: egret.DisplayObjectContainer;
        layerID: number;
        openArgs: any[];
        hud: egret.DisplayObject;
        gap: number;
        errorMessage: string;
        entity: UIEntity;
        constructor();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module euix {
    let ISceneTransition: symbol;
    interface ISceneTransition extends xgame.IXObject {
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module euix {
    interface IUITransition extends xgame.IXObject {
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-27
*************************************************/
declare module euix {
    class SceneTransition extends xgame.XObject implements ISceneTransition {
        uiManager: IUIManager;
        constructor();
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module euix {
    class SceneFadeTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module euix {
    class SceneHShuttersTransition extends SceneTransition {
        protected countBlocks: number;
        protected duration: number;
        constructor(countBlocks?: number, duration?: number);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-20
*************************************************/
declare module euix {
    enum SceneMotion {
        TOP = 0,
        BOTTOM = 1,
        LEFT = 2,
        RIGHT = 3,
        RANDOM = 4,
        TOP_LEFT = 5,
        TOP_RIGHT = 6,
        BOTTOM_LEFT = 7,
        BOTTOM_RIGHT = 8,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module euix {
    class SceneRotateTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module euix {
    class SceneScaleTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module euix {
    class SceneVShuttersTransition extends SceneTransition {
        protected countBlocks: number;
        protected duration: number;
        constructor(countBlocks?: number, duration?: number);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module euix {
    class UIFadeTransition extends xgame.XObject implements IUITransition {
        protected duration: number;
        constructor(duration?: number);
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module euix {
    class UIScaleTransition extends xgame.XObject implements IUITransition {
        protected duration: number;
        constructor(duration?: number);
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module euix {
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
declare module euix {
    class TipsHelper {
        static placeTipsWithHUD(tips: Popup, hud: egret.DisplayObject, gap?: number): void;
    }
}
