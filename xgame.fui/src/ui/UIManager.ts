/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../decorators/impl.ts" />
/// <reference path="interfaces/IUIManager.ts" />
/// <reference path="interfaces/IUIManagerInternal.ts" />

module fui {
    type TPipeline = (options: UIOptions) => Promise<boolean>;
    @impl(IUIManager, IUIManagerInternal)
    export class UIManager extends xgame.XObject implements IUIManager, IUIManagerInternal {
        private pipelines: TPipeline[] = [];
        public readonly uiMap = new xgame.Dictionary<string, xgame.TClass<UIPage<fairygui.GObject>>>();
        public readonly uiLayers = new xgame.Dictionary<number, UILayerManager>();
        public readonly root: fairygui.GRoot = fairygui.GRoot.inst;
        private $entityManager: UIEntityManager;
        public get entityManager(): UIEntityManager {
            return this.$entityManager;
        }
        public stage: egret.Stage;
        public readonly onSceneChanged = new xgame.Signal2<IUIEntity, IUIEntity>();
        public readonly onUIOpened = new xgame.Signal1<IUIEntity>();
        public readonly onUIClosed = new xgame.Signal1<IUIEntity>();
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
            this.stage = main.stage;
        }
        public initialize(): void {
            this.$entityManager = new UIEntityManager(this);
            this.pipelines.push(this.checkIsOpened.bind(this));
            this.pipelines.push(this.createUIPage.bind(this));
            this.pipelines.push(this.openUIPage.bind(this));
            this.root.displayObject.name = "FUIRoot";
            this.main.addChild(this.root.displayObject);
            for (let i = UILayerID.Layer_0_Bottom; i <= UILayerID.Layer_15_Top; i++) {
                let layerManager = new UILayerManager(this, i);
                this.root.addChildAt(layerManager, i);
                layerManager.addRelation(this.root, fairygui.RelationType.Width);
                layerManager.addRelation(this.root, fairygui.RelationType.Height);
                this.uiLayers.add(i, layerManager);
            }
            this.register(Alert.NAME, Alert);
            this.register(PopupMenu.NAME, PopupMenu);
            TipsManager.Instance().initialize();
        }
        public getLayerManager(layerID: UILayerID): UILayerManager {
            return this.uiLayers.get(layerID);
        }
        public register(uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>): void {
            this.uiMap.add(uiName, uiClass);
        }
        public popUI(): boolean {
            return false;
        }
        public clearScene(): void {
            if (this.currentScene) {
                this._closeUI(this.$currentScene);
                this.$currentScene = undefined;
            }
        }

        public closeUI(uiName: string): void
        public closeUI(entity: UIEntity): void
        public closeUI(value: any): void {
            if (typeof (value) == "string") {
                let uiName: string = value;
                let entities: UIEntity[] = [];
                if (this.$entityManager.tryGetEntities(uiName, entities)) {
                    for (let entity of entities) {
                        this._closeUI(entity);
                    }
                }
            }
            else {
                this._closeUI(value);
            }
        }
        private async _closeUI(entity: UIEntity): Promise<void> {
            if (entity.isClosed) {
                return;
            }
            let layerManager = this.uiLayers.get(entity.uiPage.layerID);
            layerManager.removeEntity(entity);
            this.$entityManager.removeEntity(entity);
            let uiPage = entity.uiPage;
            await uiPage.doFadeOut();
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
        }
        private $currentScene: UIEntity;
        public get currentScene(): IUIEntity {
            return this.$currentScene;
        }
        public replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        public replaceScene(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>
        public async replaceScene(nameOrClass: any, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
            let options = new UIOptions();
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
            return await this.startPipelines(options);
        }

        public async openUI(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, ...args: any[]): Promise<IUIEntity>
        public async openUI(uiName: string, ...args: any[]): Promise<IUIEntity>
        public async openUI(nameOrClass: any, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
            let options = new UIOptions();
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
            return await this.startPipelines(options);
        }
        public async openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        public async openUIWithLayer(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>
        public async openUIWithLayer(nameOrClass: any, layerID: UILayerID, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
            let options = new UIOptions();
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
            return await this.startPipelines(options);
        }

        public async openUIWithRoot(uiName: string, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>;
        public async openUIWithRoot(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity>
        public async openUIWithRoot(nameOrClass: any, uiRoot: fairygui.GComponent, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
            let options = new UIOptions();
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
            return await this.startPipelines(options);
        }

        public async openPopup(uiName: string, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>;
        public async openPopup(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity>
        public async openPopup(nameOrClass: any, hud: fairygui.GObject, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
            let options = new UIOptions();
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
            return await this.startPipelines(options);
        }

        private async startPipelines(options: UIOptions): Promise<IUIEntity> {
            for (let pipeline of this.pipelines) {
                if (!await pipeline(options)) {
                    if (options.errorMessage) {
                        console.error(options.errorMessage);
                    }
                    return null;
                }
            }
            return options.entity;
        }
        //================================================
        //Pipelines
        //================================================
        /**
         * 检查UIPage是否存在或可以多开
         * @param options 
         * @returns 
         */
        private async checkIsOpened(options: UIOptions): Promise<boolean> {
            let results: UIEntity[] = [];
            if (this.$entityManager.tryGetEntities(options.uiClass, results)) {
                let entity = results[0];
                if (entity.uiPage.flags & UIFlags.allowMultiple) {

                }
                else {
                    options.entity = entity;
                }
            }
            return true;
        }
        /**
         * 如果没有存在就创建UIPage
         * @param options 
         * @returns 
         */
        private async createUIPage(options: UIOptions): Promise<boolean> {
            let entity = options.entity;
            if (!entity) {
                entity = new UIEntity();
                entity.uiManager = this;
                entity.name = options.name;
                options.entity = entity;
                let uiPage = new options.uiClass(...options.openArgs);
                xgame.injectInstance(uiPage);
                uiPage.entity = entity;
                entity.uiPage = uiPage;
                this.$entityManager.addEntity(entity);
                uiPage.onInit();
                await uiPage.load();
                uiPage.view.visible = false;
                uiPage.view.displayObject.name = options.name;
                if (options.hud) {
                    (<Popup<fairygui.GObject>>uiPage).renderWatcher.onChanged().add(() => {
                        egret.callLater(() => {
                            TipsHelper.placeTipsWithHUD(<Popup<fairygui.GObject>>uiPage, options.hud, options.gap);
                        }, this);
                    }, this);
                }
                if (options.uiRoot) {
                    options.uiRoot.addChild(uiPage.view);
                }
                else {
                    if (options.layerID) {
                        uiPage.setLayerID(options.layerID);
                    }
                    let layerManager = this.uiLayers.get(uiPage.layerID);
                    if (uiPage.flags & UIFlags.useMask) {
                        entity.createMask(uiPage.maskColor, uiPage.maskAlpha, uiPage.flags & UIFlags.closeByMask);
                        entity.mask.addRelation(layerManager, fairygui.RelationType.Size);
                        layerManager.addChild(entity.mask);
                    }
                    if (options.hud || (uiPage.flags & UIFlags.isPlugin) || (uiPage.flags & UIFlags.isPopupMenu)) {

                    }
                    else if (uiPage.flags & UIFlags.isWindow) {
                        uiPage.view.x = this.stage.stageWidth - uiPage.view.width >> 1;
                        uiPage.view.y = this.stage.stageHeight - uiPage.view.height >> 1;
                        uiPage.view.addRelation(layerManager, fairygui.RelationType.Center_Center);
                    }
                    else {
                        uiPage.view.makeFullScreen();
                        uiPage.view.addRelation(layerManager, fairygui.RelationType.Size);
                    }
                    layerManager.addEntity(entity);
                    layerManager.addChild(uiPage.view);
                }
                uiPage.onOpen();
                await xgame.waitEndFrames();
                if (!options.hud) {
                    uiPage.view.visible = true;
                }
            }
            else {
                let uiPage = entity.uiPage;
                if (options.layerID != undefined && options.layerID != uiPage.layerID) {
                    let layerManager = this.uiLayers.get(uiPage.layerID);
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
                    let layerManager = this.uiLayers.get(uiPage.layerID);
                    layerManager.orderToFront(entity);
                }
            }
            this.$entityManager.checkEntities();
            return true;
        }
        /**
         * 如果UIPage创建成功就打开并传递参数
         * @param options 
         * @returns 
         */
        private async openUIPage(options: UIOptions): Promise<boolean> {
            let entity = options.entity;
            if (!entity) {
                options.errorMessage = "UIEntity:{0}不能为空".format(options.name);
                return false;
            }
            let uiPage = entity.uiPage;
            if (!uiPage.isLoaded) {
                options.errorMessage = "UIPage:{0}还没有加载完成".format(options.name);
                return false;
            }
            if (uiPage.flags & UIFlags.isScene) {
                if (this.currentScene) {
                    this.onSceneChanged.dispatch(entity, this.currentScene);
                    await this._closeUI(this.$currentScene);
                }
                this.$currentScene = entity;
            }
            await uiPage.doFadeIn();
            this.onUIOpened.dispatch(entity);
            return true;
        }
        //================================================
        // fairygui
        //================================================
        private uiPackages = new xgame.Dictionary<string, fairygui.UIPackage>();
        public async loadPackage(packageName: string): Promise<void> {
            if (this.uiPackages.containsKey(packageName)) {
                return;
            }
            let pkg = await fairygui.UIPackage.loadPackage(packageName);
            this.uiPackages.set(packageName, pkg);
        }
        public async createObject(packageName: string, comName: string, userClass?: xgame.TClass<fairygui.GObject>): Promise<fairygui.GObject> {
            let pkg = this.uiPackages.get(packageName);
            if (!pkg) {
                await this.loadPackage(packageName);
                pkg = this.uiPackages.get(packageName);
            }
            let obj = pkg.createObject(comName, userClass);
            return obj;
        }
    }
}