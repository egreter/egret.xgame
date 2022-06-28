/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
/// <reference path="./BagWindow.ts" />
/// <reference path="./TipsPage.ts" />

module ro {
    export class MainMenuPluginUI extends egretx.PluginPage {
        public static NAME: string = "MainMenuPluginUI";
        @inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public btn_0: eui.Button;
        public btn_1: eui.Button;
        public btn_2: eui.Button;
        public btn_3: eui.Button;
        public constructor() {
            super("resource/skins/main/MainMenuPluginSkin.exml")
        }
        private selectedIndex: number = 0;
        public onOpen(): void {
            super.onOpen();
            this.addClick(this.btn_0, () => {
                this.uiManager.openPopup(TipsPage, this.btn_0);
            }, this);
            this.addClick(this.btn_1, () => {
                //egretx.showPopupMenu(this.btn_1, ["第一级", "第二级", "第三级"]).addOnce((v) => {
                egretx.showPopupMenu(this.btn_1, egretx.PopupMenu.toOptions(["第一级", "第二级", "第三级"], this.selectedIndex)).addOnce((v) => {
                    if (v) {
                        this.selectedIndex = v.index;
                    }
                }, this);
            }, this);
            this.addClick(this.btn_2, () => {
                this.uiManager.openUI(BagWindow);
            }, this);
            this.addClick(this.btn_3, () => {
                this.uiManager.openUI(MainPage);
            }, this);
        }
    }
}