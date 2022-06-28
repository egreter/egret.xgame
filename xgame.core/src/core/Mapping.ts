/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../interfaces/IMapping.ts" />

module xgame {
    export class Mapping extends XObject implements IMapping {
        public identity: Symbol;
        public service: { new(...args: any[]): any };
        private aliases: Map<Symbol, Symbol>;
        private instance: any;
        private namedInstances = new Map<string, any>();
        public constructor(aliases: Map<Symbol, Symbol>, identity: Symbol, service: { new(...args: any[]): any }) {
            super();
            this.identity = identity;
            this.service = service;
            this.aliases = aliases;
        }
        public withInstance(instance: any, named?: string): IMapping {
            if (!named) {
                this.instance = instance;
            }
            else {
                this.namedInstances.set(named, instance);
            }
            return this;
        }
        public setAlias(identity: Symbol): IMapping {
            this.aliases.set(identity, this.identity);
            return this;
        }
        public create(named?: string): any {
            if (!named) {
                if (!this.instance) {
                    this.instance = new this.service();
                }
                return this.instance;
            }
            if (this.namedInstances.has(named)) {
                return this.namedInstances.get(named);
            }
            let instance = new this.service();
            this.namedInstances.set(named, instance);
            return instance;
        }
    }
}