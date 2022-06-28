/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./getPrototype.ts" />
/// <reference path="./getQualifiedClassName.ts" />

module xgame {
    export function getQualifiedClassChainNames(value: any): string[] {
        let names: string[] = [];
        names.push(getQualifiedClassName(value));
        let prototype = getPrototype(value);
        while (prototype) {
            let name = getQualifiedClassName(prototype);
            if (name && names.indexOf(name) == -1) {
                names.push(name);
            }
            prototype = getPrototype(prototype);
        }
        return names;
    }
}