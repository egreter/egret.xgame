/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module ro {
    export class NetModule extends xgame.XObject implements IModule {
        onRegister(game: xgame.IXGame): void {
            console.log("注册网络模块.");
            NetManager.Instance().initialize();
        }
    }
}