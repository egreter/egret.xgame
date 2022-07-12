/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
import { IModule } from "../core/IModule";
import { GuideArrow } from "../guide/GuideArrow";
import { DropdownList } from "./DropdownList";
import { DropdownListGroup } from "./DropdownListGroup";
import { TipsView } from "./TipsView";

export class CommonModule extends xgame.XObject implements IModule {
    onRegister(game: xgame.IXGame): void {
        console.log("注册公用模块.");
        DropdownListGroup;
        GuideArrow;

        let uiManager = game.getService<euix.IUIManager>(euix.IUIManager);
        uiManager.setSceneTransition(new euix.SceneFadeTransition(128, 500));
        //全局组件皮肤设置
        euix.Alert.defaultSkinName = "resource/skins/common/AlertPageSkin.exml";
        euix.PopupMenu.defaultSkinName = "resource/skins/common/PopupMenuSkin.exml";
        euix.PopupMenu.defaultBaseHeight = 40;
        euix.TipsManager.Instance().fetch = () => new TipsView();
        euix.DropdownList.defaultItemRenderSkinName = "skins.PopupMenuItemSkin";
        euix.DropdownListGroup.defaultFetchDropdownList = () => new DropdownList();
        euix.DropdownListGroup.defaultPopupItemHeight = 30;
        euix.DropdownListGroup.defaultDropdownSkinName = "resource/skins/common/DropdownListSkin.exml";
    }
}