/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
module ro {
    export interface IModule extends xgame.IXObject {
        onRegister(game: xgame.IXGame): void;
    }
}