/*
 * @Author: rontian i@ronpad.com
 * @Date: 2022-07-13 09:30:47
 * @LastEditors: rontian i@ronpad.com
 * @LastEditTime: 2022-07-13 10:40:47
 * @FilePath: /xgame.core/Users/rontian/Documents/Spaces/Egret/XGamePackage/egret.xgame/client.fui/src/modules/main/MainPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class MainPage extends fui.UIPage<fairygui.GObject> {
    public static NAME: string = "MainPage";
    @fui.fairy_ui()
    public btn_back: fairygui.GButton;
    public constructor() {
        super("demo", "MainPage");
    }
    public onOpen(): void {
        super.onOpen();
        this.addClick(this.btn_back, () => {
            fui.alert("确定要返回场景吗？", "提示", 2, false).addOnce((button) => {
                if (button == 0) {
                    this.close();
                }
            }, this);
        }, this);
    }
}