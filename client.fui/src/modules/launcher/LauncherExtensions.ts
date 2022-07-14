/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

import { WebLauncherProvider } from "./web/WebLauncherProvider";
import { WeGameLauncherProvider } from "./wegame/WeGameLauncherProvider";

xgame.XGame.prototype["useWeb"] = function (main: egret.DisplayObjectContainer): void {
    var self = <xgame.XGame>this;
    self.registerServiceProvider(new WebLauncherProvider(main));
}
xgame.XGame.prototype["useWeGame"] = function (main: egret.DisplayObjectContainer): void {
    var self = <xgame.XGame>this;
    self.registerServiceProvider(new WeGameLauncherProvider(main));
}