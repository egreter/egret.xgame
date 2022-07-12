/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
module euix {
    @xgame.impl(xgame.IPoolable)
    export class Bitmap extends egret.Bitmap implements xgame.IPoolable {
        public fromPoolHashCode: number;
        public release(): void {
        }
        public dispose(): void {
            if (this.$bitmapData) {
                this.$bitmapData.$dispose();
            }
            this.removeSelf();
        }
        public removeSelf(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
    export class BitmapPools extends xgame.Singleton {
        private pools = new xgame.PoolObject<Bitmap>(Bitmap);
        public constructor() {
            super();
        }
        public fetch(): Bitmap {
            return this.pools.fetch(() => {
                return new Bitmap();
            }, this);
        }
        public recycle(bitmap: Bitmap): void {
            this.pools.recycle(bitmap);
        }
    }
}