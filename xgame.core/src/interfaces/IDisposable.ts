/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export let IDisposable = Symbol.for("IDisposable");
    export interface IDisposable extends IXObject {
        dispose(): void;
    }
}