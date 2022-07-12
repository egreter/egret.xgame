/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
const AH: number = 55;
export class GuideArrow extends eui.Component {
    public g_tips: eui.Group;
    public lab_tips: eui.Label;
    public g_arrow: eui.Group;
    public img_arrow: eui.Image;
    public constructor() {
        super();
        this.touchChildren = false;
        this.touchEnabled = false;
    }
    $onRemoveFromStage(): void {
        egret.Tween.removeTweens(this.img_arrow);
        super.$onRemoveFromStage();
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.g_arrow.visible = false;
    }
    private tipWidth: number = 0;
    private tipHeight: number = 0;
    public setTips(tips: string): void {
        this.g_arrow.visible = true;
        this.lab_tips.textFlow = new egret.HtmlTextParser().parse(tips);
        this.lab_tips.validateNow();
        let tw = this.lab_tips.textWidth;
        tw += 40;
        tw = Math.max(300, tw);
        let th = this.lab_tips.textHeight;
        th += 40;
        this.lab_tips.width = tw - 40;
        this.lab_tips.height = th - 40;
        this.tipWidth = tw;
        this.tipHeight = th;
    }
    public setDirection(direction: euix.UIDirection, offset?: number): void {
        egret.Tween.removeTweens(this.img_arrow);
        egret.Tween.get(this.img_arrow, { loop: true }).to({ x: -10 }, 100).to({ x: 10 }, 200).to({ x: 0 }, 100);
        if (direction == euix.UIDirection.BOTTOM) {
            this.width = this.tipWidth;
            this.height = this.tipHeight + AH;
            this.g_arrow.horizontalCenter = offset || 0;
            this.g_arrow.top = 0;
            this.g_arrow.rotation = -90;
            this.g_arrow.left = this.g_arrow.right = this.g_arrow.bottom = NaN;
            this.g_tips.top = AH;
            this.g_tips.bottom = 0;
        }
        else if (direction == euix.UIDirection.TOP) {
            this.width = this.tipWidth;
            this.g_arrow.horizontalCenter = offset || 0;
            this.g_arrow.bottom = 0;
            this.g_arrow.rotation = 90;
            this.g_arrow.left = this.g_arrow.right = this.g_arrow.top = NaN;
            this.g_tips.top = 150 - (this.tipHeight + AH);
            this.g_tips.bottom = AH;
        }
    }
}
egret.registerClass(GuideArrow, "GuideArrow");