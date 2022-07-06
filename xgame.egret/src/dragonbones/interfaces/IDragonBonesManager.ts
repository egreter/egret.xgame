/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let IDragonBonesManager = Symbol.for("IDragonBonesManager");
    export interface IDragonBonesManager extends xgame.IXObject {
        fetch(key: string, armatureName: string, texture?: string): Armature;
        recycle(armature: Armature): void;
        release(key: string): void;
        releases(): void;
    }
}