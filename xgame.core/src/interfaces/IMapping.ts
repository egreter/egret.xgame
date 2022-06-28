/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export let IMapping = Symbol.for("IMapping");
    export interface IMapping {
        setAlias(identity: Symbol): IMapping;
        withInstance(instance: any, named?: string): IMapping;
    }
}