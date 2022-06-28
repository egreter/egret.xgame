/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./getQualifiedClassName.ts" />

module xgame {
    /**
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     */
    export function getQualifiedSuperclassName(value: any): string {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        let prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        let superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        let superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
}