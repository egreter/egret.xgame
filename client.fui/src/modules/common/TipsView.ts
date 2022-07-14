/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
export class TipsView extends fui.TipsView {
    private lab_message: fairygui.GRichTextField;
    private com_tips: fairygui.GComponent;
    private tw: egret.tween.TweenGroup;
    public constructor() {
        super();
    }
    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.com_tips = this.getChild("com_tips").asCom;
        this.lab_message = this.com_tips.getChild("lab_message").asRichTextField;
    }
    public dispose(): void {
        this.lab_message.width = 50;
        super.dispose();
    }
    public setMessage(message: string): void {
        this.lab_message.text = message;
        this.com_tips.width = Math.max(80 + this.lab_message.textWidth, 400);
        this.lab_message.width = this.com_tips.width - 80;
        this.x = -this.com_tips.width / 2;
        super.setMessage(message);
    }
}