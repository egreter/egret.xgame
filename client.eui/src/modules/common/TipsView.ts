/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class TipsView extends euix.TipsView {
    private lab_message: eui.Label;
    private g_play: eui.Group;
    private tw: egret.tween.TweenGroup;
    public constructor() {
        super();
    }
    public dispose(): void {
        this.lab_message.width = NaN;
        super.dispose();
    }
    public setMessage(message: string): void {
        this.lab_message.textFlow = new egret.HtmlTextParser().parser(message);
        //console.log(this.lab_message.textWidth);
        this.g_play.width = Math.max(80 + this.lab_message.textWidth, 400);
        //console.log(this.g_play.width);
        this.lab_message.width = this.g_play.width - 80;
        this.x = -this.g_play.width / 2;
        super.setMessage(message);
    }
}