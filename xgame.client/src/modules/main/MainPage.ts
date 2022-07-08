/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
module ro {
    export class MainPage extends egretx.UIPage {
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
                egretx.alert("确定要返回场景吗？", "提示", 2, false).addOnce((button) => {
                    if (button == 0) {
                        this.guideManager.injectValue("flag_main_alert_clicked", true);
                        this.close();
                    }
                }, this);
            }, this);
        }
    }
}