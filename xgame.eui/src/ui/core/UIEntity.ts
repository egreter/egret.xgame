/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />


module euix {
    export class UIEntity extends xgame.XObject implements IUIEntity, xgame.IDisposable {
        public uiManager: IUIManager;
        public name: string;
        public constructor() {
            super();
        }
        public uiPage: UIPage;
        private $isClosed: boolean;
        public get isClosed(): boolean {
            return this.$isClosed;
        }
        public mask: eui.Rect;
        public groupName: string;
        public createMask(color: number, alpha: number, closeByMask: number): void {
            if (!this.mask) {
                this.mask = new eui.Rect(100, 100, color);
                this.mask.alpha = alpha;
                this.mask.left = this.mask.right = this.mask.top = this.mask.bottom = 0;
                if (closeByMask) {
                    this.mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
                }
            }
        }
        private onMaskClose(): void {
            this.mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
            this.closePage();
        }
        public onSceneChanging(): void {
            if (this.uiPage) {
                this.uiPage.onSceneChanging();
            }
        }
        public onClose(): void {
            this.$isClosed = true;
            if (this.uiPage) {
                this.uiPage.onClose();
            }
        }
        public closePage(): void {
            if (this.uiManager) {
                this.uiManager.closeUI(this);
            }
        }
        public showPage(): void {
            if (this.uiPage) {
                this.uiPage.visible = true;
            }
        }
        public hidePage(): void {
            if (this.uiPage) {
                this.uiPage.visible = false;
            }
        }

        public dispose(): void {
            if (this.mask) {
                this.mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClose, this);
            }
            this.uiPage = undefined;
            this.mask = undefined;
        }
    }
}