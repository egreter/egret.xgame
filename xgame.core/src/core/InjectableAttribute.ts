/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="./Attribute.ts" />
/// <reference path="../interfaces/IAttribute.ts" />
/// <reference path="../interfaces/IInjectableAttribute.ts" />
module xgame {
    @impl(IInjectableAttribute)
    export class InjectableAttribute extends Attribute implements IInjectableAttribute {
        public injectable: boolean;
        public constructor() {
            super();
            this.injectable = true;
        }
    }
}