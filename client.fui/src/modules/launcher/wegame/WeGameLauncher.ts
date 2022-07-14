/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

import { AssetAdapter } from "../../../AssetAdapter";
import { LoadingUI } from "../../../LoadingUI";
import { ThemeAdapter } from "../../../ThemeAdapter";
import { ILauncher } from "../core/ILauncher";

export class WeGameLauncher extends egret.HashObject implements ILauncher {
    private stage: egret.Stage;
    public constructor(private main: egret.DisplayObjectContainer) {
        super();
        this.stage = main.stage;
    }
    public async init(): Promise<void> {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
    }
    public async loadTheme(): Promise<boolean> {
        return true;
    }
    public async loadConfig(): Promise<boolean> {
        return true;
    }
    public async loadResource(): Promise<boolean> {
        return true;
    }
    public async loadExtensionResource(): Promise<boolean> {
        return true;
    }
    public async startGame(): Promise<void> {

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
}