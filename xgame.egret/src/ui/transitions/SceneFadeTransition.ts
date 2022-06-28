/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
/// <reference path="./SceneTransition.ts" />

module egretx {
    export class SceneFadeTransition extends SceneTransition {
        public constructor(protected blockSize: number = 128, protected duration: number = 500, protected style: SceneMotion = SceneMotion.RANDOM) {
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
                let size_block: number = this.blockSize;
                let w_block = size_block;
                let h_block = size_block;
                let count_cols: number = Math.ceil(w / w_block);
                let count_rows = Math.ceil(h / h_block);
                let count_blocks: number = count_cols * count_rows;
                let time_transition: number = this.duration;
                let col: number = 0;
                let row: number = 0;
                for (let i = 0; i < count_blocks; i++) {
                    col = i % count_cols;
                    row = Math.floor(i / count_cols);
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
                    let time_random: number = 0;
                    if (this.style == SceneMotion.TOP) {
                        time_random = i * 10;
                    }
                    else if (this.style == SceneMotion.BOTTOM) {
                        time_random = (count_blocks - 1 - i) * 10;
                    }
                    else if (this.style == SceneMotion.LEFT) {
                        time_random = col * count_rows * 10 + row * 10;
                    }
                    else if (this.style == SceneMotion.RIGHT) {
                        time_random = (count_cols - col) * count_rows * 10 + row * 10;
                    }
                    else if (this.style == SceneMotion.TOP_LEFT) {
                        time_random = col * row * 10;
                    }
                    else if (this.style == SceneMotion.TOP_RIGHT) {
                        time_random = (count_cols - col) * row * 10;
                    }
                    else if (this.style == SceneMotion.BOTTOM_LEFT) {
                        time_random = col * (count_rows - row) * 10;
                    }
                    else if (this.style == SceneMotion.BOTTOM_RIGHT) {
                        time_random = (count_cols - col) * (count_rows - row) * 10;
                    }
                    else {
                        time_random = Math.floor(Math.random() * 300);
                    }
                    let tw = egret.Tween.get(bmp);
                    tw.wait(time_random).to({ alpha: 0 }, time_transition, egret.Ease.circIn).call(onComplete, this, [bmp]);
                }
                let count_completed: number = 0;
                function onComplete(bmp: Bitmap) {
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