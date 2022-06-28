/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="./getPrototype.ts" />

module xgame {
    export function getTypes(target: any): string[] {
        let types: string[] = [];
        let prototype = getPrototype(target);
        while (prototype) {
            let list: string[] = prototype.__types__;
            if (list && list.length) {
                for (let type of list) {
                    if (types.indexOf(type) == -1) {
                        types.push(type);
                    }
                }
            }
            prototype = getPrototype(prototype);
        }
        return types;
    }
}