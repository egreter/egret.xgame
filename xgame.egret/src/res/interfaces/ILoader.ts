/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export interface ILoader {
        key: string;
        deferred: xgame.Deferred<any>;
    }
}