/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../core/ServiceContainer.ts" />

module xgame {
    export function injectInstance<T>(instance: T): T {
        let type = typeof instance;
        if (!instance || (type != "object")) {
            throw new Error("对象依赖注入失败:" + instance);
        }
        let attributes = ServiceContainer.Instance().getAttributes<IPropertyAttribute>(instance, IPropertyAttribute);
        if (attributes && attributes.length) {
            for (let attr of attributes) {
                if (ServiceContainer.Instance().isMapping(attr.identity)) {
                    instance[attr.key] = ServiceContainer.Instance().getService(attr.identity, attr.named);
                }
            }
        }
        return instance;
    }
}