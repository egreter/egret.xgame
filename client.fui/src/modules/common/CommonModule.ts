/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
import { IModule } from "../core/IModule";
import { TipsView } from "./TipsView";

export class CommonModule extends xgame.XObject implements IModule {
    onRegister(game: xgame.IXGame): void {
        console.log("注册公用模块.");
        fairygui.UIObjectFactory.setPackageItemExtension("ui://demo/PopupFrame", fui.PopupFrame);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://demo/PopupMenuItem", fui.PopupMenuItem);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://demo/TipsView", TipsView);
        let uiManager = game.getService<fui.IUIManager>(fui.IUIManager);
        //uiManager.setSceneTransition(new fui.SceneFadeTransition(128, 500));
        //全局组件皮肤设置
        fui.Alert.defaultPackageName = "demo";
        fui.Alert.defaultComName = "Alert";
        fui.PopupMenu.defaultPackageName = "demo";
        fui.PopupMenu.defaultComName = "PopupMenu";
        fui.PopupMenu.defaultBaseHeight = 30;
        fui.TipsManager.Instance().fetch = () => fairygui.UIPackage.createObject("demo", "TipsView", TipsView) as TipsView;
    }
}