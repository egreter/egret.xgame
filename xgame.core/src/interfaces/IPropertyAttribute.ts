/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
module xgame {
    export let IPropertyAttribute = Symbol.for("IPropertyAttribute");
    export interface IPropertyAttribute extends IAttribute {
        identity: Symbol;
        named?: string;
        key?: string;
    }
}