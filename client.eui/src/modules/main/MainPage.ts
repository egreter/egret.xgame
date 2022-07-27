/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class MainPage extends euix.UIPage {
    public static NAME: string = "MainPage";
    public btn_back: eui.Button;
    public constructor() {
        super("resource/skins/main/MainPageSkin.exml")
    }
    public onOpen(): void {
        super.onOpen();
        this.injectGuideValue("mainPage", this);
        this.injectGuideValue("main_btn_back", this.btn_back);
        this.addClick(this.btn_back, () => {
            this.injectGuideValue("flag_main_btn_back_clicked", true);
            euix.alert("确定要返回场景吗？", "提示", 2, false, "main_alert").addOnce((button) => {
                if (button == 0) {
                    this.guideManager.injectValue("flag_main_alert_clicked", true);
                    this.close();
                }
            }, this);
        }, this);
    }
}