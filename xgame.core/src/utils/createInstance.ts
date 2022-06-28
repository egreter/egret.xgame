/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./injectInstance.ts" />

module xgame {
    export function createInstance<T>(Clazz: new (...args: any[]) => T, ...args: any[]): T {
        let instance = new Clazz(...args);
        return injectInstance(instance);
    }
}