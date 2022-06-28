/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
/// <reference path="./TipsView.ts" />

module ro {
    export class CommonModule extends xgame.XObject implements IModule {
        onRegister(game: xgame.IXGame): void {
            console.log("注册公用模块.");
            let uiManager = game.getService<egretx.IUIManager>(egretx.IUIManager);
            uiManager.setSceneTransition(new egretx.SceneFadeTransition(128, 500));
            //全局组件皮肤设置
            egretx.Alert.defaultSkinName = "resource/skins/common/AlertPageSkin.exml";
            egretx.PopupMenu.defaultSkinName = "resource/skins/common/PopupMenuSkin.exml";
            egretx.PopupMenu.defaultBaseHeight = 40;
            egretx.TipsManager.Instance().fetch = () => new TipsView();
            egretx.DropdownList.defaultItemRenderSkinName = "skins.PopupMenuItemSkin";
            egretx.DropdownListGroup.defaultFetchDropdownList = () => new DropdownList();
            egretx.DropdownListGroup.defaultPopupItemHeight = 30;
            egretx.DropdownListGroup.defaultDropdownSkinName = "resource/skins/common/DropdownListSkin.exml";
        }
    }
}