/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UIAlign.ts" />
/// <reference path="../structs/UIDirection.ts" />
/// <reference path="../../decorators/inject.ts" />



module fui {
    export class UIPage<T extends fairygui.GObject> extends xgame.XObject {
        @inject(fui.IUIManager)
        public uiManager: fui.IUIManager;
        @inject(egretx.IGuideManager)
        public guideManager: egretx.IGuideManager;
        //UI的类型参数,见UIFlags
        public flags: number = UIFlags.isStack | UIFlags.isFullScreen;
        public entity: IUIEntity;
        private $view: T;
        public get view(): T {
            return this.$view;
        }
        public constructor(public packageName?: string, public comName?: string, public userClass?: xgame.TClass<T>) {
            super();
        }
        public addClick(target: fairygui.GObject, listener: Function, thisObject?: any): void {
            target.addClickListener(listener, thisObject);
        }
        private guideValues = new xgame.Dictionary<keyof egretx.IGuideInjectValue, number>();
        public injectGuideValue<T extends keyof egretx.IGuideInjectValue>(key: T, value: egretx.IGuideInjectValue[T], taskID?: number): void {
            this.guideManager.injectValue(key, value, taskID);
            this.guideValues.add(key, taskID || 0);
        }
        public readonly onComplete = new xgame.Signal0();
        private $isLoaded: boolean = false;
        public get isLoaded(): boolean {
            return this.$isLoaded;
        }
        private $isLoading: boolean = false;
        public get isLoading(): boolean {
            return this.$isLoading;
        }
        private deferred = new xgame.Deferred<void>();
        public async load(): Promise<void> {
            this.$isLoading = true;
            if (this.packageName && !this.isLoaded) {
                await this.uiManager.loadPackage(this.packageName);
                if (this.comName) {
                    this.$view = <T>await this.uiManager.createObject(this.packageName, this.comName, this.userClass);
                    this.doComplete();
                }
                else {
                    this.doComplete();
                }
            }
            else {
                this.doComplete();
            }
            return this.deferred.promise;
        }
        private doComplete(): void {
            if (!this.$view) {
                this.$view = <any>(new fairygui.GComponent());
            }
            egret.callLater(() => {
                this.$isLoaded = true;
                this.onComplete.dispatch();
                this.deferred.resolve();
            }, this);
        }

        protected $maskAlpha: number = 0.3;
        public get maskAlpha(): number {
            return this.$maskAlpha;
        }
        protected $maskColor: number = 0x333333;
        public get maskColor(): number {
            return this.$maskColor;
        }
        //UI的层级ID
        private $layerID: UILayerID = UILayerID.Layer_5_UI;
        public get layerID(): UILayerID {
            return this.$layerID;
        }
        public setLayerID(layerID: UILayerID): void {
            this.$layerID = layerID;
        }
        public onInit(): void {
            let self: UIPage<fairygui.GObject> & xgame.IEventSubject = this;
            if (self.addEventObserves) {
                self.addEventObserves();
            }
        }
        public onOpen(): void {

        }
        public onSceneChanging(): void {

        }
        public onClose(): void {
            if (this.guideValues.length) {
                this.guideValues.forKeys((key) => {
                    let taskID: number = this.guideValues.get(key);
                    this.guideManager.removeValue(key, taskID);
                }, this);
                this.guideValues.clear();
            }
            let self: UIPage<fairygui.GObject> & xgame.IEventSubject = this;
            if (self.removeEventObserves) {
                self.removeEventObserves();
            }
            this.entity = undefined;
        }
        public onShow(): void {

        }
        public onHide(): void {

        }
        public close(): void {
            if (this.entity) {
                this.entity.closePage();
            }
        }
        //================================================
        // Fade
        //================================================
        public async doFadeIn(): Promise<void> {

        }
        public async doFadeOut(): Promise<void> {

        }
    }
}