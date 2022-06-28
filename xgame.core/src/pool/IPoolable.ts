/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export let IPoolable = Symbol.for("IPoolable");
    export interface IPoolable extends IDisposable {
        fromPoolHashCode?: number;
        release?(): void;
    }
}