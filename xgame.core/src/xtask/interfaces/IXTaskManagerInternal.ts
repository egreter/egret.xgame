/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
module xgame {
    export let IXTaskManagerInternal = Symbol.for("IXTaskManagerInternal");
    export interface IXTaskManagerInternal {
        initialize(): void;
    }
}