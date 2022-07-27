/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module euix {
    export let IUIManager = Symbol.for("euix.IUIManager");
    export interface IUIManager extends xgame.IXObject {
        readonly entityManager: UIEntityManager
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
        replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>
        clearScene(): void;

        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>

        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>

        openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>

        openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>

        closeUI(uiName: string): void;
        closeUI(entity: IUIEntity): void;
        popUI(): boolean;
    }
}