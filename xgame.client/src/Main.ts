class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();
        this.runGame().catch(e => {
            console.log(e);
        });
    }
    private async runGame() {
        let game = new xgame.XGame(new ro.GameBootstrap());
        game.useEgret(this);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            game.useWeGame(this);
        }
        else {
            game.useWeb(this);
        }
        //调度帧频
        let lastStamp: number = egret.getTimer();
        egret.startTick((timeStamp: number) => {
            let delta = timeStamp - lastStamp;
            lastStamp = timeStamp;
            game.tick(delta);
            return true;
        }, this);
        //初始化
        await game.init();
    }
}
