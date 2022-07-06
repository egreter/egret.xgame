/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-06
*************************************************/
module egretx {
    export class Armature extends xgame.XObject implements xgame.IPoolable {
        public constructor(public key: string, public armatureName: string, public texture?: string) {
            super();
        }
        public get id(): string {
            let value = this.key + ":" + this.armatureName;
            if (this.texture) {
                value = this.key + ":" + this.texture;
            }
            return value;
        }
        public setParent(parent: egret.DisplayObjectContainer): void {
            if (this.armature && this.armature.display) {
                parent.addChild(this.armature.display);
            }
        }
        public removeSelf(): void {
            if (this.armature.display && this.armature.display.parent) {
                this.armature.display.parent.removeChild(this.armature.display);
            }
        }
        public fromPoolHashCode: number;
        public release(): void {
            this.dispose();
            if (this.armature) {
                this.armature.dispose();
            }
            this.$armature = undefined;
        }
        public dispose(): void {
            if (this.armature) {
                this.armature.animation.stop();
                DragonBonesManager.Instance().removeClock(this);
            }
            this.removeSelf();
        }
        protected $armature: dragonBones.Armature;
        public get armature(): dragonBones.Armature {
            return this.$armature;
        }
        public get display(): egret.DisplayObject {
            return this.armature && this.armature.display;
        }
        public async createArmature(): Promise<void> {
            if (!this.armature) {
                await ResourceManager.Instance().getOrCreateGroup(ResourceType.DragonBones).load(this.key, this.texture);
                DragonBonesManager.Instance().parseDragonBones(this.key, this.texture);
                this.$armature = DragonBonesManager.Instance().buildArmature(this.key, this.armatureName);
            }
            if (this.armature) {
                DragonBonesManager.Instance().addClock(this);
            }
        }
    }
}