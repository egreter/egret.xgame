/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module xgame {
    const EXCLUDES: string[] = ["__meta__", "__class__", "__types__", "__xgame_attributes__", "__ns__", "__implements__", "__xlisteners__", "__xbindables__"];
    function isEmptyFunction(prototype: any, key: string): boolean {
        if (typeof prototype[key] != "function") {
            return false;
        }
        let body = prototype[key].toString();
        let index = body.indexOf("{");
        let lastIndex = body.lastIndexOf("}");
        body = body.substring(index + 1, lastIndex);
        return body.trim() == "";
    }
    export function mixin(...templates: any[]) {
        return function (target: any) {
            for (let template of templates) {
                __mixin__(target, template);
            }
        }
    }
    export function __mixin__(target: any, template: any): void {
        for (let property in template) {
            if (property != "prototype" && template.hasOwnProperty(property)) {
                target[property] = template[property];
            }
        }
        let prototype = target.prototype;
        let protoBase = template.prototype;
        let keys = Object.keys(protoBase);
        let length = keys.length;
        for (let i = 0; i < length; i++) {
            let key = keys[i];
            if (EXCLUDES.indexOf(key) >= 0) {
                continue;
            }
            if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                let value = Object.getOwnPropertyDescriptor(protoBase, key);
                Object.defineProperty(prototype, key, value);
            }
        }
    }
}