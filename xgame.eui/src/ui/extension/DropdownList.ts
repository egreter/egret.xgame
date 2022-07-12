/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
module euix {
    import sys = egret.sys;
    export function get_measure_width(text: string, instance: any): number {
        return sys.measureText(text, instance.fontFamily, instance.size, instance.bold, instance.italic);
    }
    let bits = 1;
    enum InvalidateFlags {
        Any = 1,
        Source = 1 << bits++,
        TextColor = 1 << bits++,
        Align = 1 << bits++,
        Value = 1 << bits++,
        Dispatch = 1 << bits++,
        ItemRenderSkinName = 1 << bits++,
    }
    export interface ISourceItem {
        label?: string;
    }

    export class DropdownList extends UIComponent implements xgame.IPoolable {
        public static defaultItemRenderSkinName: string = "";
        public static toSource(labels: string[]): ISourceItem[] {
            let source: ISourceItem[] = [];
            for (let v of labels) {
                source.push({ label: v });
            }
            return source;
        }
        public static itemToLabel(item: ISourceItem): string {
            if (item.label) {
                return item.label;
            }
            return item.toString();
        }
       
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public lab_title: eui.Label;
        public itemToLabel: (item: ISourceItem) => string;
        protected invalidateFlags: number = InvalidateFlags.Any;
        public constructor() {
            super();
        }
        private callback_onSelectChanged = new xgame.Signal3<number, ISourceItem, DropdownList>();
        public onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, T, DropdownList> {
            return <any>this.callback_onSelectChanged;
        }
        public $onRemoveFromStage(): void {
            this.callback_onSelectChanged.removeAll();
            super.$onRemoveFromStage();
        }
        public dispose(): void {
            this.callback_onSelectChanged.removeAll();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.touchChildren = false;
            this.lab_title.multiline = false;
            this.lab_title.wordWrap = false;
            this.addClick(this, () => {
                if (!this.source || this.source.length == 0) {
                    return;
                }
                this.openPopup();
            }, this);
        }
        private $isOpened: boolean = false;
        public get isOpened(): boolean {
            return this.$isOpened;
        }
        private options: IMenuOptions;
        public openPopup(): void {
            if (this.isOpened) {
                return;
            }
            this.$isOpened = true;
            let items: IMenuItem[] = [];
            for (let i = 0; i < this.source.length; i++) {
                items.push(this.getMenuItem(i));
            }
            this.options = <IMenuOptions>{
                enableClick: true,
                items: items,
                itemGap: this.itemRenderGap ? this.itemRenderGap : 2,
                itemHeight: this.popupItemHeight,
                selected: this.selectedIndex,
                allowDirections: [UIDirection.BOTTOM, UIDirection.TOP],
                uiDirection: UIDirection.ANY,
                minWidth: this.width,
                textAlign: this.popupTextAlign,
                itemRender: this.popupItemRender,
                itemRenderSkinName: this.popupItemRenderSkinName || DropdownList.defaultItemRenderSkinName,
                arrowPadding: this.popupArrowPadding,
                offset: this.popupOffset,
            }
            this.img_icon.scaleY = -1;
            showPopupMenu(this, this.options).addOnce((item) => {
                if (item) {
                    this.setSelectedIndex(item.index, true);
                }
                this.img_icon.scaleY = 1;
                this.$isOpened = false;
                this.options.instance = undefined;
                this.options = undefined;
            }, this);
        }
        public closePopup(): void {
            if (!this.isOpened) {
                return;
            }
            this.img_icon.scaleY = 1;
            this.$isOpened = false;
            if (this.options && this.options.instance) {
                this.options.instance.close();
                this.options.instance = undefined;
            }
            this.options = undefined;
        }
        private $textColor: number = 0x606DA1;
        public get textColor(): number {
            return this.$textColor;
        }
        public set textColor(value: number) {
            this.$textColor = value;
            this.invalidateFlags |= InvalidateFlags.TextColor;
            this.lateUpdate();
        }
        private $popupItemHeight: number = 46;
        public get popupItemHeight(): number {
            return this.$popupItemHeight;
        }
        public set popupItemHeight(value: number) {
            this.$popupItemHeight = value;
        }
        private $popupTextAlign: string = egret.HorizontalAlign.CENTER;
        public get popupTextAlign(): string {
            return this.$popupTextAlign;
        }
        public set popupTextAlign(value: string) {
            this.$popupTextAlign = value;
        }
        private $textAlign: string = egret.HorizontalAlign.CENTER;
        public get textAlign(): string {
            return this.$textAlign;
        }
        public set textAlign(value: string) {
            this.$textAlign = value;
            this.invalidateFlags |= InvalidateFlags.Align;
            this.lateUpdate();
        }
        private $selectedIndex: number = -1;
        public get selectedIndex(): number {
            return this.$selectedIndex;
        }
        public set selectedIndex(value: number) {
            if (value < 0 || value == this.selectedIndex) {
                return;
            }
            this.setSelectedIndex(value);
        }
        protected setSelectedIndex(value: number, dispatch?: boolean): void {
            this.$selectedIndex = value;
            this.invalidateFlags |= InvalidateFlags.Value;
            if (dispatch) {
                this.callback_onSelectChanged.dispatch(value, this.source[value], this);
            }
            this.lateUpdate();
        }
        public get selectedItem(): ISourceItem {
            if (this.selectedIndex >= 0 && this.source.length) {
                return this.source[this.selectedIndex];
            }
            return undefined;
        }
        private $source: ISourceItem[];
        public get source(): ISourceItem[] {
            return this.$source;
        }
        public set source(value: ISourceItem[]) {
            this.$source = value;
            this.invalidateFlags |= InvalidateFlags.Source;
            this.minWidth = 0;
            for (let item of value) {
                let w = get_measure_width(this.getTitle(item), this.lab_title) + 75;
                if (this.minWidth < w) {
                    this.minWidth = w;
                }
            }
            this.lateUpdate();
        }
        private $itemRenderGap: number = 0;
        public get itemRenderGap(): number {
            return this.$itemRenderGap;
        }
        public set itemRenderGap(value: number) {
            this.$itemRenderGap = value;
        }
        private $popupItemRenderSkinName: string;
        public get popupItemRenderSkinName(): string {
            return this.$popupItemRenderSkinName;
        }
        public set popupItemRenderSkinName(value: string) {
            this.$popupItemRenderSkinName = value;
        }
        private $popupItemRender: any;
        public get popupItemRender(): any {
            return this.$popupItemRender;
        }
        public set popupItemRender(value: any) {
            this.$popupItemRender = value;
        }
        private $popupArrowPadding: number;
        public get popupArrowPadding(): number {
            return this.$popupArrowPadding;
        }
        public set popupArrowPadding(value: number) {
            this.$popupArrowPadding = value;
        }
        private $popupOffset: egret.Point;
        public get popupOffset(): egret.Point {
            return this.$popupOffset;
        }
        public set popupOffset(value: egret.Point) {
            this.$popupOffset = value;
        }
        private isLate: boolean = false;
        protected lateUpdate(): void {
            if (this.isLate) {
                return;
            }
            this.isLate = true;
            egret.callLater(() => {
                this.onDrawComponent();
                this.isLate = false;
            }, this);
        }
        protected getMenuItem(index: number): IMenuItem {
            let item = <IMenuItem>{ index: index };
            let data = this.source[index];
            item.title = this.getTitle(data);
            return item;
        }
        protected getTitle(item: ISourceItem): string {
            return this.itemToLabel ? this.itemToLabel(item) : DropdownList.itemToLabel(item);
        }
        protected onDrawComponent(): void {
            if (this.selectedIndex == -1) {
                this.selectedIndex = 0;
            }
            let item = this.source && this.source.length ? this.source[this.selectedIndex] : undefined;
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Source) {
                this.invalidateFlags |= InvalidateFlags.Value;
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Value) {
                if (item) {
                    this.lab_title.text = this.getTitle(item);
                }
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.TextColor) {
                this.lab_title.textColor = this.textColor;
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Align) {
                this.lab_title.textAlign = this.textAlign;
            }
            this.invalidateFlags = 0;
        }
    }
}