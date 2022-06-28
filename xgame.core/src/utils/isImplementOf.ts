/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="./getImplements.ts" />

module xgame {
    export function isImplementOf(target: any, api: Symbol): boolean {
        let apis = getImplements(target);
        return apis.indexOf(api) >= 0;
    }
}