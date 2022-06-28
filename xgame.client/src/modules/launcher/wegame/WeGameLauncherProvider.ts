/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module ro {
    @xgame.impl(xgame.IServiceProvider)
    export class WeGameLauncherProvider extends egret.HashObject implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
        }
        public priority: number = 100;
        public async onInit(game: xgame.XGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: xgame.XGame): Promise<boolean> {
            return true;
        }
        public onServiceRegister(game: xgame.XGame): void {
            game.singleton(ILauncher, WeGameLauncher).withInstance(new WeGameLauncher(this.main));
        }
    }
}