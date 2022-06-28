/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-26
*************************************************/


class LoadingUI extends eui.UILayer implements RES.PromiseTaskReporter {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        let img = new eui.Image("bg_jpg");
        img.left = img.right = img.top = img.bottom = 0;
        this.addChild(img);
        img = new eui.Image("egret_icon_png");
        img.left = img.top = 30;
        this.addChild(img);
        img = new eui.Image("track_pb_png");
        img.bottom = 50;
        img.left = img.right = 50;
        img.height = 20;
        this.addChild(img);
        this.com_progress = new eui.Image("thumb_pb_png");
        this.com_progress.left = this.com_progress.right = 52;
        this.com_progress.height = 16;
        this.com_progress.bottom = 51;
        this.com_progress.scaleX = 0;
        this.addChild(this.com_progress);
        this.lab_tips = new eui.Label("正在加载游戏资源...");
        this.lab_tips.size = 22;
        this.lab_tips.stroke = 2;
        this.lab_tips.strokeColor = 0x3B3B3B;
        this.lab_tips.horizontalCenter = 0;
        this.lab_tips.bottom = 75;
        this.addChild(this.lab_tips);
    }
    private lab_tips: eui.Label;
    public setMessage(msg: string): void {
        this.lab_tips.textFlow = new egret.HtmlTextParser().parse(msg);
    }
    private com_progress: eui.Image;
    public onProgress(current: number, total: number): void {
        this.com_progress.scaleX = current / total;
    }
}
