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
            this.addClick(this.btn_back, () => {
                egretx.alert("确定要返回场景吗？", "提示", 2, false).addOnce((button) => {
                    if (button == 0) {
                        this.close();
                    }
                }, this);
            }, this);
        }
    }
}