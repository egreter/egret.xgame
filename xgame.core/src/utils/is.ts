/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./isImplementOf.ts" />
/// <reference path="./getQualifiedClassName.ts" />
/// <reference path="./getTypes.ts" />


module xgame {
    export function is(instance: any, value: Symbol): boolean
    export function is(instance: any, value: string): boolean
    export function is(instance: any, value: any): boolean {
        if (!instance || typeof instance != "object") {
            return false;
        }
        let type = typeof (value);
        if (type == "symbol") {
            return isImplementOf(instance, value);
        }
        else if (type == "string") {
            return _is(instance, value);
        }
        else {
            return _is(instance, getQualifiedClassName(value));
        }
    }
    function _is(instance: any, typeName: string): boolean {
        let types = getTypes(instance);
        if (!types) {
            return false;
        }
        return (types.indexOf(typeName) !== -1);
    }
}