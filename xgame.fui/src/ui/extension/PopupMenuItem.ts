/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/
module fui {
    export class PopupMenuItem extends fairygui.GButton {
        public constructor() {
            super();
        }
        private lab_title: fairygui.GTextField;
        protected constructFromXML(xml: any): void {
            super.constructFromXML(xml);
            this.lab_title = this.getChild("title").asTextField;
        }
        public itemData: IMenuItem;
        public setItemData(item: IMenuItem): void {
            this.itemData = item;
            this.text = item.title;
            if (item.textAlign && this.lab_title) {
                if (item.textAlign == "center") {
                    this.lab_title.align = fairygui.AlignType.Center;
                }
                else if (item.textAlign == "left") {
                    this.lab_title.align = fairygui.AlignType.Left;
                }
                else if (item.textAlign == "right") {
                    this.lab_title.align = fairygui.AlignType.Right;
                }
            }
        }
    }
}