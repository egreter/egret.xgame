/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare namespace xgame {
    interface XGame {
        useEUI(main: egret.DisplayObjectContainer): void;
    }
}

module euix {

    xgame.XGame.prototype["useEUI"] = function (main: egret.DisplayObjectContainer): void {
        let self = <xgame.XGame>this;
        self.registerServiceProvider(new EUIProvider(main));
    }
}