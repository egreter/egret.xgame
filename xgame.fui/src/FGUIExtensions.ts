/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

declare namespace xgame {
    interface XGame {
        useFGUI(main: egret.DisplayObjectContainer): void;
    }
}
module fui {

    xgame.XGame.prototype["useFGUI"] = function (main: egret.DisplayObjectContainer): void {
        let self = <xgame.XGame>this;
        self.registerServiceProvider(new FGUIProvider(main));
    }
    
}