/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class TipsPage extends fui.Popup<fairygui.GObject> {
    public static NAME: string = "TipsPage";
    public constructor() {
        super("demo", "TipsPage");
        this.$uiDirection = fui.UIDirection.BOTTOM;
        this.$uiAlign = fui.UIAlign.LEFT;
    }
}