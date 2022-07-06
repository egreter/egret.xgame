/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    /**
     * 龙骨动画管理器
     */
    export class DragonBonesManager extends xgame.Singleton implements IDragonBonesManager, IDragonBonesManagerInternal, IAnimatable {
        public factory: dragonBones.EgretFactory;
        public constructor() {
            super();
        }
        public advanceTime(time: number): void {
            if (!this.factory) {
                return;
            }
            this.factory.clock.advanceTime(time / 1000);
        }
        public initialize(): void {
            TimelineManager.Instance().getOrCreateTimeline().add(this);
        }
        public readonly pools = new xgame.PoolGroup<Armature>("Armature");
        public fetch(key: string, armatureName: string, texture?: string): Armature {
            let id = "{0}:{1}".format(key, armatureName);
            if (texture) {
                id = "{0}:{1}".format(key, texture);
            }
            let armature = this.pools.fetch(id, Armature, () => new Armature(key, armatureName, texture), this);
            return armature;
        }
        public recycle(armature: Armature): void {
            this.pools.recycle(armature.id, Armature, armature);
        }
        public release(key: string): void {
            let pools = this.pools.pools;
            pools.forKeys((id: string) => {
                let id_list: string[] = id.split(":");
                if (id_list[0] == key) {
                    this._release(id);
                }
            }, this, true);
        }
        private _release(id: string): void {
            if (this.pools.getPool(id, Armature).expired) {
                this.pools.release(id, Armature);
                let params = id.split(":");
                let key = params[0];
                let texture: string = params[2] || key;
                this.clearDragonBones(key, texture);
                ResourceManager.Instance().getOrCreateGroup(ResourceType.DragonBones).release(key);
            }
        }
        public releases(): void {
            let pools = this.pools.pools;
            pools.forKeys((id: string) => {
                this._release(id);
            }, this, true);
        }

        public addClock(armture: Armature): void {
            if (armture.armature) {
                this.factory.clock.add(armture.armature);
            }
        }
        public removeClock(armture: Armature): void {
            if (armture.armature) {
                this.factory.clock.remove(armture.armature);
            }
        }

        public parseDragonBones(key: string, texture?: string): void {
            texture = texture || key;
            if (!this.factory) {
                this.factory = new dragonBones.EgretFactory();
            }
            let res = this.getRes(key, texture);
            if (!this.factory.getDragonBonesData(key)) {
                this.factory.parseDragonBonesData(RES.getRes(res.skeleton), key);
            }
            if (!this.factory.getTextureAtlasData(texture)) {
                this.factory.parseTextureAtlasData(RES.getRes(res.json), RES.getRes(res.texture), texture);
            }
        }

        public clearDragonBones(key: string, texture?: string): void {
            texture = texture || key;
            let res = this.getRes(key, texture);
            if (this.factory.getDragonBonesData(key)) {
                this.factory.removeDragonBonesData(key);
                console.log("DragonBonesManager.removeDragonBonesData({0})".format(key));
            }
            if (this.factory.getTextureAtlasData(texture)) {
                this.factory.removeTextureAtlasData(texture);
                console.log("DragonBonesManager.removeTextureAtlasData({0})".format(texture));
            }
        }

        public buildArmature(key: string, armtureName: string): dragonBones.Armature {
            return this.factory.buildArmature(armtureName, key);
        }

        public getRes(key: string, texture?: string): IRes {
            let res = <IRes>{};
            res.skeleton = "{0}_ske_json".format(key);
            if (texture) {
                res.json = "{0}_tex_json".format(texture);
                res.texture = "{0}_tex_png".format(texture);
            }
            else {
                res.json = "{0}_tex_json".format(key);
                res.texture = "{0}_tex_png".format(key);
            }
            return res;
        }
    }
}