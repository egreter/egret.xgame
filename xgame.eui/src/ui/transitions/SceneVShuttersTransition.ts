/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
module euix {
    export class SceneVShuttersTransition extends SceneTransition {
        public constructor(protected countBlocks: number = 8, protected duration: number = 500) {
            super();
        }
        public start(scene: egret.DisplayObject): Promise<void> {
            return new Promise((resolve, reject) => {
                let layerManager = this.uiManager.getLayerManager(UILayerID.Layer_3_SceneMask);
                let w: number = this.uiManager.stage.stageWidth;
                let h: number = this.uiManager.stage.stageHeight;
                let g_bitmap = new eui.Group();
                g_bitmap.top = g_bitmap.bottom = g_bitmap.left = g_bitmap.right = 0;
                layerManager.addChild(g_bitmap);
                let count_blocks: number = this.countBlocks;
                let count_cols: number = this.countBlocks;
                let count_rows = count_blocks / count_cols;
                let w_block = w / count_cols;
                let h_block = h / count_rows;
                let time_transition: number = this.duration;
                for (let i = 0; i < count_blocks; i++) {
                    let x = i % count_cols * w_block;
                    let y = Math.floor(i / count_cols) * h_block;
                    let texture: egret.RenderTexture = new egret.RenderTexture();
                    texture.drawToTexture(scene, new egret.Rectangle(x, y, w_block, h_block));
                    let bmp = BitmapPools.Instance().fetch();
                    bmp.alpha = 1;
                    bmp.scaleX = bmp.scaleY = 1;
                    bmp.rotation = 0;
                    bmp.texture = texture;
                    bmp.anchorOffsetX = w_block / 2
                    bmp.anchorOffsetY = h_block / 2
                    bmp.x = x + w_block / 2;
                    bmp.y = y + h_block / 2;
                    g_bitmap.addChild(bmp);
                    let tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, this, [bmp]);
                }
                let count_completed: number = 0;
                function onComplete(bmp: Bitmap) {
                    bmp.$bitmapData.$dispose();
                    BitmapPools.Instance().recycle(bmp);
                    count_completed++;
                    if (count_completed == count_blocks) {
                        layerManager.removeChild(g_bitmap);
                        resolve();
                    }
                }
            });
        }
    }
}