/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
module xgame {
    export let IMethodParamAttribute = Symbol.for("IMethodParamAttribute");
    export interface IMethodParamAttribute extends IAttribute {
        identity: Symbol;
        named?: string;
        key: string;
        index: number;
    }
}