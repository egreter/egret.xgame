/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../core/ServiceContainer.ts" />

module xgame {

    export function inject(identity: any, named?: string) {
        return (target: any, key: string, indexOrDescriptor?: number | TypedPropertyDescriptor<Function>) => {
            if (indexOrDescriptor != undefined) {
                let index: number, descriptor: TypedPropertyDescriptor<Function>;
                //方法参数注入
                if (typeof (indexOrDescriptor) == "number") {
                    index = indexOrDescriptor;
                    let attribute = new MethodParamAttribute(identity, key, <number>indexOrDescriptor, named);
                    ServiceContainer.Instance().addAttributes(target, attribute);
                }
                else {//方法注入
                    descriptor = indexOrDescriptor;
                }
            }
            else {
                //属性依赖注入
                let attribute = new PropertyAttribute(identity, key, named);
                ServiceContainer.Instance().addAttributes(target, attribute);
            }
        }
    }
}