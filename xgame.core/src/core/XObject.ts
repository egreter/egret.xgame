/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../utils/getQualifiedClassName.ts" />
/// <reference path="../decorators/impl.ts" />
/// <reference path="../interfaces/IXObject.ts" />


module xgame {
    export let hashCount = 1;
    export function generateHashCode(target?: any): number {
        let hashCode = hashCount++;
        if (target && target.hashCode == undefined) {
            target.hashCode = hashCode;
        }
        return hashCode;
    }
    @impl(IXObject)
    export class XObject implements IXObject {
        private $hashCode: number = 0;
        public constructor() {
            this.$hashCode = generateHashCode();
        }
        public get hashCode(): number {
            return this.$hashCode;
        }
        public toString(): string {
            return "{0}({1})".format(getQualifiedClassName(this), this.hashCode);
        }
    }
}