/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../core/Attribute.ts" />
/// <reference path="../core/Mapping.ts" />
/// <reference path="../utils/is.ts" />
/// <reference path="../utils/Singleton.ts" />
/// <reference path="../interfaces/IMapping.ts" />
/// <reference path="../interfaces/IAttribute.ts" />
/// <reference path="../interfaces/IInjectableAttribute.ts" />
/// <reference path="../interfaces/IPropertyAttribute.ts" />


module xgame {
    export const METADATA_ATTRIBUTES_KEY: string = "xgame:attributes";


    export class ServiceContainer extends Singleton {
        private mappings = new Map<Symbol, Mapping>();
        private aliases = new Map<Symbol, Symbol>();
        public constructor() {
            super();
        }
        public addAttributes(target: any, attribute: IAttribute, metadataKey?: string): ServiceContainer {
            metadataKey = metadataKey ? metadataKey : METADATA_ATTRIBUTES_KEY;
            let attributes = this.getOrCreateMetadata(metadataKey, target);
            attributes.push(attribute);
            return this;
        }
        private getOrCreateMetadata(metadataKey: string, target: any): IAttribute[] {
            let attributes: IAttribute[] = [];
            if (Reflect.hasOwnMetadata(metadataKey, target)) {
                attributes = Reflect.getMetadata(metadataKey, target);
            }
            else {
                Reflect.defineMetadata(metadataKey, attributes, target);
            }
            return attributes;
        }
        public hasAttribute<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): boolean {
            if (this.getAttribute<T>(target, identity, metadataKey)) {
                return true;
            }
            return false;
        }
        public getAttributes<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): T[] {
            let results: IAttribute[] = [
                ...this.getOwnAttributes(target, identity, metadataKey)
            ];
            return <T[]>results;
        }
        private getOwnAttributes<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): T[] {
            metadataKey = metadataKey ? metadataKey : METADATA_ATTRIBUTES_KEY;
            let results: IAttribute[] = [];
            let attributes: IAttribute[] = Reflect.getMetadata(metadataKey, target) || [];
            if (attributes && attributes.length) {
                for (let attr of attributes) {
                    if (is(attr, identity)) {
                        results.push(attr);
                    }
                }
            }
            let prototype = target.prototype;
            if (prototype) {
                prototype = Object.getPrototypeOf(prototype);
                if (prototype) {
                    let superConstructor = Object.getPrototypeOf(prototype).constructor;
                    if (superConstructor !== Object) {
                        let superResults = this.getOwnAttributes(superConstructor, identity, metadataKey);
                        results = [
                            ...results,
                            ...superResults
                        ];
                    }
                }
            }
            return <T[]>results;
        }
        public getAttribute<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): T {
            let attributes = this.getAttributes<T>(target, identity, metadataKey);
            if (attributes && attributes.length) {
                return attributes[0];
            }
            return null;
        }

        public isMapping(identity: Symbol): boolean {
            if (this.aliases.has(identity)) {
                identity = this.aliases.get(identity);
            }
            return this.mappings.has(identity);
        }
        public bind(identity: Symbol, service: { new(...args: any[]): any }): IMapping {
            return this.getOrCreate(identity, service);
        }
        public singleton(identity: Symbol, service: { new(...args: any[]): any }): IMapping {
            return this.getOrCreate(identity, service);
        }
        private getOrCreate(identity: Symbol, service: { new(...args: any[]): any }): IMapping {
            if (this.mappings.has(identity)) {
                return this.mappings.get(identity);
            }
            let binding = new Mapping(this.aliases, identity, service);
            this.mappings.set(identity, binding);
            return binding;
        }
        public getService<T>(identity: Symbol, named?: string): T {
            if (this.aliases.has(identity)) {
                identity = this.aliases.get(identity);
            }
            if (!this.mappings.has(identity)) {
                throw new Error("xgame.Container [" + identity.toString() + "] 此类型没有还没有注册.");
            }
            var binding = this.mappings.get(identity);
            return binding.create(named);
        }
    }
}