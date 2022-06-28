/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
module ro {
    export class MainScene extends egretx.Scene {
        @xgame.inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public com_options: DropdownListGroup;
        public constructor() {
            super("resource/skins/main/MainSceneSkin.exml");
        }
        public onOpen(): void {
            super.onOpen();
            this.uiManager.openUIWithLayer(MainMenuPluginUI, egretx.UILayerID.Layer_4_SceneFrame);
            this.com_options.popupItemHeight = 30;
            this.com_options.source = [
                { selectedIndex: 0, source: DropdownList.toSource(["学校一", "学校二", "学校三"]) },
                { selectedIndex: 1, source: DropdownList.toSource(["六年级", "七年级", "八年级", "九年级"]) },
                { selectedIndex: 2, source: DropdownList.toSource(["学号1号", "学号2号", "学号3号", "学号4号", "学号5号"]) },
            ];
        }
        public onSceneChanging(): void {
            super.onSceneChanging();
        }
    }
}