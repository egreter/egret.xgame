/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class TipsPage extends euix.Popup {
    public static NAME: string = "TipsPage";
    public constructor() {
        super("resource/skins/main/TipsPageSkin.exml");
        this.$uiDirection = euix.UIDirection.BOTTOM;
        this.$uiAlign = euix.UIAlign.LEFT;
    }
    public onClose(): void {
        super.onClose();
        this.guideManager.injectValue("flag_main_tips_closed", true);
    }
}