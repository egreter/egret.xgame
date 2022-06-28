/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module ro {
    export class WebLauncher extends egret.HashObject implements ILauncher {
        private stage: egret.Stage;
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
            xgame.injectInstance(this);
            this.stage = main.stage;
        }
        public async init(): Promise<void> {
            egret.lifecycle.addLifecycleListener((context) => {
                // custom lifecycle plugin
            })
            egret.lifecycle.onPause = () => {
                //egret.ticker.pause();
            }
            egret.lifecycle.onResume = () => {
                //egret.ticker.resume();
            }
            //注入自定义的素材解析器
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            await RES.loadConfig("resource/default.res.json", "resource/");
        }
        public async loadTheme(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                let theme = new eui.Theme("resource/default.thm.json", this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve(true);
                    console.log("皮肤加载完成")
                }, this);
            })
        }
        public async loadConfig(): Promise<boolean> {
            console.log("配置加载完成")
            return true;
        }
        public async loadResource(): Promise<boolean> {
            await RES.loadGroup("preload", 0, this.loadingView);
            console.log("资源加载完成")
            return true;
        }
        public async loadExtensionResource(): Promise<boolean> {
            return true;
        }
        private loadingView: LoadingUI;
        public showLoading(): void {
            if (!this.loadingView) {
                this.loadingView = new LoadingUI();
                this.stage.addChild(this.loadingView);
            }
        }

        public hideLoading(): void {
            if (this.loadingView) {
                this.stage.removeChild(this.loadingView);
                this.loadingView = undefined;
            }
        }

        @xgame.inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public async startGame(): Promise<void> {
            console.log("启动游戏");
            this.uiManager.replaceScene(LoginScene);
        }
    }
}
