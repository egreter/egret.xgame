/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module ro {
    @xgame.impl(xgame.IServiceProvider)
    export class WebLauncherProvider implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
        }
        public priority: number = 0;
        public async onInit(game: xgame.XGame) {
            return true;
        }
        public async onStart(game: xgame.XGame) {
            return true;
        }
        onServiceRegister(game: xgame.XGame): void {
            game.singleton(ILauncher, WebLauncher).withInstance(new WebLauncher(this.main));
        }
    }
}