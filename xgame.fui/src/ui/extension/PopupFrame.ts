/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-14
*************************************************/
module fui {
    export class PopupFrame extends fairygui.GComponent {
        public lab_title: fairygui.GRichTextField;
        protected constructFromXML(xml: any): void {
            super.constructFromXML(xml);
            this.lab_title = this.getChild("lab_title").asRichTextField;
        }
        public setTitle(title: string): void {
            this.lab_title.text = title;
        }
    }
}