/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
module xgame {
    export function impl(...implements: Symbol[]) {
        return function (target: any) {
            let prototype = target.prototype ? target.prototype : Object.getPrototypeOf(target);
            Object.defineProperty(prototype, "__implements__", {
                value: implements,
                enumerable: false,
                writable: false
            });
        }
    }
}