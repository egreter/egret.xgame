/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface IPlatUser {
    username: string;
    nickname?: string;
}
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<IPlatUser>

}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    private deferred = new xgame.Deferred<IPlatUser>();
    public async login(): Promise<IPlatUser> {
        let uiManager = xgame.that.getService<egretx.IUIManager>(egretx.IUIManager);
        uiManager.openUI(ro.LoginWindow, this.deferred);
        return this.deferred.promise;
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





