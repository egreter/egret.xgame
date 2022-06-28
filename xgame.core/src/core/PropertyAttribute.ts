/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../core/Attribute.ts" />

/// <reference path="../interfaces/IPropertyAttribute.ts" />
module xgame {
    @impl(IPropertyAttribute)
    export class PropertyAttribute extends Attribute implements IPropertyAttribute {
        public identity: Symbol;
        public named: string;
        public key: string;
        public constructor(identity: Symbol, key: string, named?: string) {
            super();
            this.identity = identity;
            this.key = key;
            this.named = named;
        }
    }
}