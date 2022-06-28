/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
module xgame {
    export function getImplements(target: any): Symbol[] {
        let types: Symbol[] = [];
        let prototype = getPrototype(target);
        while (prototype) {
            let list: Symbol[] = prototype.__implements__;
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