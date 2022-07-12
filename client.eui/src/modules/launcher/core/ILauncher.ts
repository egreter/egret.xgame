/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
export let ILauncher = Symbol.for("ILauncher");
export interface ILauncher extends egret.IHashObject {
    init(): Promise<void>;
    showLoading(): void;
    hideLoading(): void;
    //加载皮肤
    loadTheme(): Promise<boolean>;
    //加载配置
    loadConfig(): Promise<boolean>;
    //加载资源
    loadResource(): Promise<boolean>;
    //加载扩展资源
    loadExtensionResource(): Promise<boolean>;
    //完成收尾
    startGame(): Promise<void>;
}