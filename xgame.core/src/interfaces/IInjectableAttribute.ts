/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
module xgame {
    export let IInjectableAttribute = Symbol.for("IInjectableAttribute");
    export interface IInjectableAttribute extends IAttribute {
        injectable: boolean;
    }
}