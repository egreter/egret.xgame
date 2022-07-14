/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

module fui {
    export interface IMenuItem {
        index?: number;
        title?: string;
        textAlign?: string;
    }
    export interface IMenuOptions {
        packageName?: string;
        comName?: string;
        baseHeight?: number;
        width?: number;
        minWidth?: number;
        height?: number;
        minHeight?: number;
        items: IMenuItem[];
        itemHeight?: number;
        itemGap?: number;
        itemRender?: any;
        itemRenderSkinName?: string;
        uiDirection?: UIDirection;
        uiAlign?: UIAlign;
        arrowPadding?: number;
        offset?: egret.Point;
        selected?: number;
        textAlign?: string;
        allowDirections?: UIDirection[];
        instance?: PopupMenu;
        callback?: xgame.Signal1<IMenuItem>;
    }
    export class PopupMenu extends Popup<fairygui.GObject> {
        public static NAME: string = "PopupMenu";

        public static defaultPackageName: string = "";
        public static defaultComName: string = "";
        public static defaultBaseHeight: number = 30;

        public static toOptions(titles: string[], selectedIndex?: number): IMenuOptions {
            let options: IMenuOptions = {
                items: [],
                selected: selectedIndex == undefined ? 0 : selectedIndex,
            };
            for (let i = 0; i < titles.length; i++) {
                options.items.push({ index: i, title: titles[i] });
            }
            return options;
        }
        @fui.fairy_ui()
        public list_item: fairygui.GList;
        public constructor(public options: IMenuOptions) {
            super(options.packageName || PopupMenu.defaultPackageName, options.comName || PopupMenu.defaultComName);
            options.instance = this;
            if (options.offset) {
                this.offset.x = options.offset.x;
                this.offset.y = options.offset.y;
            }
            if (options.arrowPadding == void 0) {
                options.arrowPadding = 20;
            }

            if (options.uiDirection == undefined) {
                options.uiDirection = UIDirection.BOTTOM;
            }
            if (options.uiAlign == undefined) {
                options.uiAlign = UIAlign.CENTER;
            }
            options.itemHeight = options.itemHeight ? options.itemHeight : 25;
            options.itemGap = options.itemGap != undefined ? options.itemGap : 2;
            if (options.allowDirections && options.allowDirections.length) {
                this.allowDirections = options.allowDirections;
            }
            this.$uiDirection = options.uiDirection;
            this.$uiAlign = options.uiAlign;
            this.arrowPadding = options.arrowPadding;
        }
        private callback_onSelect = new xgame.Signal1<IMenuItem>();
        private arrowPadding: number = 20;
        @fui.fairy_controller()
        public arrowState: fairygui.Controller;
        public onSelect(): xgame.Signal1<IMenuItem> {
            return this.options.callback || this.callback_onSelect;
        }
        public fixedUIDirection(direction: UIDirection): void {
            this.updateArrow(direction);
        }
        public onClose(): void {
            this.onSelect().dispatch(this.selectedItem);
            this.list_item.removeEventListener(fairygui.ItemEvent.CLICK, this.onItemClickHandler, this);
            if (this.options) {
                this.options.instance = undefined
            }
            super.onClose();
        }
        private selectedItem: IMenuItem;
        private onItemClickHandler(event: fairygui.ItemEvent): void {
            this.selectedItem = (event.itemObject as PopupMenuItem).itemData;
            this.close();
        }
        public onOpen(): void {
            super.onOpen();
            let options = this.options;
            if (options.width) {
                this.view.width = options.width;
            }
            if (options.height) {
                this.view.height = options.height;
            }
            let baseHeight = this.options.baseHeight || PopupMenu.defaultBaseHeight;
            if (!this.options.height) {
                this.view.height = baseHeight + (this.options.itemHeight) * this.options.items.length;
            }
            if (!this.options.width && this.options.minWidth && this.view.width < this.options.minWidth) {
                this.view.width = this.options.minWidth;
            }
            this.list_item.addEventListener(fairygui.ItemEvent.CLICK, this.onItemClickHandler, this);
            for (let i = 0; i < options.items.length; i++) {
                let item = options.items[i];
                let render = <PopupMenuItem>this.list_item.addItemFromPool();
                render.setItemData(item);
                this.list_item.addChild(render);
            }
            if (this.options.selected != undefined) {
                let selectedIndex: number = this.options.selected;
                if (selectedIndex >= 0) {
                    this.list_item.selectedIndex = selectedIndex;
                }
            }
        }
        protected updateArrow(direction: UIDirection): void {
            if (direction == UIDirection.BOTTOM) {
                this.arrowState.selectedIndex = 0;
            }
            else if (direction == UIDirection.TOP) {
                this.arrowState.selectedIndex = 1;
            }
            else if (direction == UIDirection.RIGHT) {
                this.arrowState.selectedIndex = 2;
            }
            else if (direction == UIDirection.LEFT) {
                this.arrowState.selectedIndex = 3;
            }
        }
    }
    export function showPopupMenu(target: fairygui.GObject, titles: string[]): xgame.Signal1<IMenuItem>
    export function showPopupMenu(target: fairygui.GObject, options: IMenuOptions): xgame.Signal1<IMenuItem>
    export function showPopupMenu(target: fairygui.GObject, titles_or_options: IMenuOptions | string[]): xgame.Signal1<IMenuItem> {
        let options: IMenuOptions;
        if (Array.isArray(titles_or_options)) {
            options = PopupMenu.toOptions(titles_or_options);
        }
        else {
            options = titles_or_options;
        }
        options.callback = new xgame.Signal1<fui.IMenuItem>();
        if (options.textAlign) {
            for (let item of options.items) {
                item.textAlign = options.textAlign;
            }
        }
        xgame.that.getService<fui.IUIManager>(fui.IUIManager).openPopup(PopupMenu, target, options);
        return options.callback;
    }
}