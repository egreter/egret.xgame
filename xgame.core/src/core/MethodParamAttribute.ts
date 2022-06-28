/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../core/Attribute.ts" />

/// <reference path="../interfaces/IMethodParamAttribute.ts" />

module xgame {
    @impl(IMethodParamAttribute)
    export class MethodParamAttribute extends Attribute implements IMethodParamAttribute {
        public identity: Symbol;
        public named: string;
        public key: string;
        public index: number;
        public constructor(identity: Symbol, key: string, index: number, named?: string) {
            super();
            this.identity = identity;
            this.key = key;
            this.index = index;
            this.named = named;
        }
    }
}