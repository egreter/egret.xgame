/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />


module fui {
    export class UIEntity extends xgame.XObject implements IUIEntity, xgame.IDisposable {
        public uiManager: IUIManager;
        public name: string;
        public constructor() {
            super();
        }
        public uiPage: UIPage<fairygui.GObject>;
        private $isClosed: boolean;
        public get isClosed(): boolean {
            return this.$isClosed;
        }
        public mask: fairygui.GGraph;
        public groupName: string;
        public createMask(color: number, alpha: number, closeByMask: number): void {
            if (!this.mask) {
                this.mask = new fairygui.GGraph();
                this.mask.drawRect(0, 0x000000, 0, 0x000000, alpha);
                this.mask.makeFullScreen();
                if (closeByMask) {
                    this.mask.addClickListener(this.onMaskClose, this);
                }
            }
        }
        private onMaskClose(): void {
            this.mask.removeClickListener(this.onMaskClose, this);
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
            if (this.uiPage && this.uiPage.view) {
                this.uiPage.view.visible = true;
            }
        }
        public hidePage(): void {
            if (this.uiPage && this.uiPage.view) {
                this.uiPage.view.visible = false;
            }
        }

        public dispose(): void {
            if (this.mask) {
                this.mask.removeClickListener(this.onMaskClose, this);
            }
            this.uiPage = undefined;
            this.mask = undefined;
        }
    }
}