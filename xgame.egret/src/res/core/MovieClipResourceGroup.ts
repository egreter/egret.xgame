/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />

module egretx {
    export class MovieClipResourceGroup extends ResourceGroup<egret.MovieClip> {
        public constructor(manager: ResourceManager) {
            super(manager, ResourceType.MovieClip);
        }
        public async load(key: string): Promise<void> {
            let res = AnimationManager.Instance().getRes(key);
            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                return;
            }
            await ResourceManager.Instance().loadResAsync(res.json);
            let texture: egret.Texture = await ResourceManager.Instance().loadResAsync(res.texture);
            if (texture) {
                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
            }
            let list: string[];
            if (!this.keys.containsKey(key)) {
                list = [res.json, res.texture];
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
            }
        }
    }
}