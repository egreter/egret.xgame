/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module egretx {
    type TPipeline = (options: UIOptions) => Promise<boolean>;
    @xgame.impl(IUIManager, IUIManagerInternal)
    export class UIManager extends xgame.XObject implements IUIManager, IUIManagerInternal {
        private pipelines: TPipeline[] = [];
        public readonly uiMap = new xgame.Dictionary<string, xgame.TClass<UIPage>>();
        public readonly uiLayers = new xgame.Dictionary<number, UILayerManager>();
        public readonly root = new eui.UILayer();
        private $entityManager: UIEntityManager;
        public get entityManager(): UIEntityManager {
            return this.$entityManager;
        }
        public stage: egret.Stage;
        public readonly onSceneChanged = new xgame.Signal2<IUIEntity, IUIEntity>();
        public readonly onUIOpened = new xgame.Signal1<IUIEntity>();
        public readonly onUIClosed = new xgame.Signal1<IUIEntity>();
        public readonly RES = new UIResManager();
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
            this.stage = main.stage;
        }
        public initialize(): void {
            this.$entityManager = new UIEntityManager(this);
            this.pipelines.push(this.checkIsOpened.bind(this));
            this.pipelines.push(this.createUIPage.bind(this));
            this.pipelines.push(this.openUIPage.bind(this));
            this.root.name = "UIRoot";
            this.main.addChild(this.root);
            for (let i = UILayerID.Layer_0_Bottom; i <= UILayerID.Layer_15_Top; i++) {
                let layerManager = new UILayerManager(this, i);
                this.root.addChildAt(layerManager, i);
                this.uiLayers.add(i, layerManager);
            }
            this.register(Alert.NAME, Alert);
            this.register(PopupMenu.NAME, PopupMenu);
            TipsManager.Instance().initialize();
        }
        private $sceneTransition: ISceneTransition;
        public get sceneTransition(): ISceneTransition {
            return this.$sceneTransition;
        }
        public setSceneTransition(value: ISceneTransition): void {
            this.$sceneTransition = value;
        }
        public getLayerManager(layerID: UILayerID): UILayerManager {
            return this.uiLayers.get(layerID);
        }
        public register(uiName: string, uiClass: xgame.TClass<UIPage>): void {
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
            if (uiPage.parent) {
                entity.uiPage.parent.removeChild(entity.uiPage);
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
        public replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>
        public async replaceScene(nameOrClass: any, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage>;
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

        public async openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>
        public async openUI(uiName: string, ...args: any[]): Promise<IUIEntity>
        public async openUI(nameOrClass: any, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage>;
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
        public async openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>
        public async openUIWithLayer(nameOrClass: any, layerID: UILayerID, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage>;
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

        public async openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        public async openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>
        public async openUIWithRoot(nameOrClass: any, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage>;
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

        public async openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        public async openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>
        public async openPopup(nameOrClass: any, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity> {
            let uiName: string, uiClass: xgame.TClass<UIPage>;
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
                uiPage.visible = false;
                if (options.hud) {
                    (<Popup>uiPage).renderWatcher.onChanged().add(() => {
                        egret.callLater(() => {
                            TipsHelper.placeTipsWithHUD(<Popup>uiPage, options.hud, options.gap);
                        }, this);
                    }, this);
                }
                if (options.uiRoot) {
                    options.uiRoot.addChild(uiPage);
                }
                else {
                    if (options.layerID) {
                        uiPage.setLayerID(options.layerID);
                    }
                    let layerManager = this.uiLayers.get(uiPage.layerID);
                    if (uiPage.flags & UIFlags.useMask) {
                        entity.createMask(uiPage.maskColor, uiPage.maskAlpha, uiPage.flags & UIFlags.closeByMask);
                        layerManager.addChild(entity.mask);
                    }
                    if (options.hud || (uiPage.flags & UIFlags.isPlugin)) {

                    }
                    else {
                        uiPage.left = uiPage.right = uiPage.top = uiPage.bottom = 0;
                    }
                    layerManager.addEntity(entity);
                    layerManager.addChild(uiPage);
                }
                await uiPage.load();
                uiPage.onOpen();
                await xgame.waitEndFrames();
                if (!options.hud) {
                    uiPage.visible = true;
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
            if (uiPage.flags & UIFlags.Scene) {
                if (this.currentScene) {
                    if (this.sceneTransition) {
                        await this.sceneTransition.start(this.currentScene.uiPage);
                    }
                    this.onSceneChanged.dispatch(entity, this.currentScene);
                    await this._closeUI(this.$currentScene);
                }
                this.$currentScene = entity;
            }
            await uiPage.doFadeIn();
            this.onUIOpened.dispatch(entity);
            return true;
        }
    }
}