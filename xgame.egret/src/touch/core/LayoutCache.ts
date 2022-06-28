/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module egretx {
    export class LayoutCache extends xgame.XObject {
        public top: number = NaN;
        public bottom: number = NaN;
        public left: number = NaN;
        public right: number = NaN;
        public horizontalCenter: number = NaN;
        public verticalCenter: number = NaN;
        public percentWidth: number = NaN;
        public percentHeight: number = NaN;
        public anchorOffsetX: number = NaN;
        public anchorOffsetY: number = NaN;

        public x: number = 0;
        public y: number = 0;
        public width: number = 0;
        public height: number = 0;
        public scaleX: number = 1;
        public scaleY: number = 1;

        public reset(): void {
            this.top = NaN;
            this.bottom = NaN;
            this.left = NaN;
            this.right = NaN;
            this.horizontalCenter = NaN;
            this.verticalCenter = NaN;
            this.percentWidth = NaN;
            this.percentHeight = NaN;
            this.anchorOffsetX = NaN;
            this.anchorOffsetY = NaN;

            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.scaleX = 1;
            this.scaleY = 1;
        }
    }
}