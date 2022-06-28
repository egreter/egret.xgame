/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module ro {
    @xgame.impl(xgame.IXBootstrap)
    export class GameBootstrap implements xgame.IXBootstrap {
        public constructor() {
        }
        public onInit(game: xgame.IXGame): void {
            console.log("游戏初始化.");
            new CommonModule().onRegister(game);
            new LoginModule().onRegister(game);
            new MainModule().onRegister(game);
        }

        public onStart(game: xgame.IXGame): void {
            console.log("游戏已启动.");
            this.startLauncher(game);
        }

        private async startLauncher(game: xgame.IXGame): Promise<void> {
            let launcher = game.getService<ILauncher>(ILauncher);
            await launcher.init();
            launcher.showLoading();
            await launcher.loadConfig();
            await launcher.loadTheme();
            await launcher.loadResource();
            await launcher.loadExtensionResource();
            await launcher.startGame();
            launcher.hideLoading();
        }

        public onQuit(): void {
            console.log("游戏已退出.");
        }
    }
}