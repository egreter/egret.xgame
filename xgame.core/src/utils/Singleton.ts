/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

module xgame {
    export class Singleton extends XObject {
        public static Instance<T extends {}>(this: new () => T): T {
            if (!(<any>this).instance) {
                (<any>this).instance = new this();
            }
            return (<any>this).instance;
        }
    }
}