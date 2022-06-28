/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module xgame {
    export function superConstructor(constructor: any, args: any[]): any {
        const clazz: any = function () {
            return constructor.apply(this, args);
        }
        clazz.prototype = constructor.prototype;
        return new clazz();
    }
}