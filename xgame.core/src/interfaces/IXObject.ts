/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
module xgame {
    export let IXObject = Symbol.for("IXObject");
    export interface IXObject {
        hashCode: number;
    }
}