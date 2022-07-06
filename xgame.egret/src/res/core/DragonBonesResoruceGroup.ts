/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />


module egretx {
    export class DragonBonesResourceGroup extends ResourceGroup<dragonBones.Armature> {
        public constructor(manager: ResourceManager) {
            super(manager, ResourceType.DragonBones);
        }
        public async load(key: string, skeleton?: string): Promise<any> {
            let res = DragonBonesManager.Instance().getRes(key, skeleton);
            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture) || !RES.hasRes(res.skeleton)) {
                return;
            }
            await ResourceManager.Instance().loadResAsync(res.skeleton);
            await ResourceManager.Instance().loadResAsync(res.json);
            let texture: egret.Texture = await ResourceManager.Instance().loadResAsync(res.texture);
            if (texture) {
                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
            }
            let list: string[];
            if (!this.keys.containsKey(key)) {
                list = [res.json, res.texture, res.skeleton];
                this.keys.add(key, list);
            }
            else {
                list = this.keys.get(key);
                if (list.indexOf(res.json) == -1) {
                    list.push(res.json);
                }
                if (list.indexOf(res.texture) == -1) {
                    list.push(res.texture);
                }
                if (list.indexOf(res.skeleton) == -1) {
                    list.push(res.skeleton);
                }
            }
        }
    }
}