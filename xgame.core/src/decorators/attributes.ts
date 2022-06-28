/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../interfaces/IAttribute.ts" />

module xgame {
    export function attributes(...args: IAttribute[]): any {
        return function (target: any) {
            for (let attribute of args) {
                ServiceContainer.Instance().addAttributes(target, attribute);
            }
        }
    }
}