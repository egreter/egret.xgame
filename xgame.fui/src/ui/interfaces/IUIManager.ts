/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module fui {
    export let IUIManager = Symbol.for("fgui.IUIManager");
    export interface IUIManager extends xgame.IXObject {
        readonly entityManager: UIEntityManager
        readonly stage: egret.Stage;
        readonly currentScene: IUIEntity;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        register(uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>): void;
        getLayerManager(layerID: UILayerID): UILayerManager;

        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>
        clearScene(): void;

        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>

        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>

        openUIWithRoot(uiName: string, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>

        openPopup(uiName: string, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>

        closeUI(uiName: string): void;
        closeUI(entity: IUIEntity): void;
        popUI(): boolean;

        loadPackage(packageName: string): Promise<void>;
        createObject(packageName: string, comName: string, userClass?: xgame.TClass<fairygui.GObject>): Promise<fairygui.GObject>;
    }
}