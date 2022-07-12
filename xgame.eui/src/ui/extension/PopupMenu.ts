/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
/// <reference path="../core/ItemRenderer.ts" />

module euix {
    export interface IMenuItem {
        index?: number;
        title?: string;
        textAlign?: string;
    }
    export interface IMenuOptions {
        skinName?: string;
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
    export class PopupMenuEvent extends egret.Event {
        public static ITEM_CLICK: string = "PopupMenuEvent_itemClick";
    }
    export class PopupMenuItem extends ItemRenderer {
        public lab_title: eui.Label;
        private get item(): IMenuItem {
            return this.data;
        }
        protected createChildren(): void {
            super.createChildren();
            this.left = this.right = 0;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.addClick(this, () => {
                if (this.item) {
                    this.dispatchEvent(new PopupMenuEvent(PopupMenuEvent.ITEM_CLICK, true, true, this.item));
                }
            }, this);
        }
        protected dataChanged(): void {
            super.dataChanged();
            if (this.item) {
                this.lab_title.textFlow = new egret.HtmlTextParser().parse("{0}".format(this.item.title));
                if (this.item.textAlign) {
                    this.lab_title.textAlign = this.item.textAlign;
                }
            }
        }
    }
    export class PopupMenu extends Popup {
        public static NAME: string = "PopupMenu";

        public static defaultSkinName: string = "";
        public static defaultBaseHeight: number = 40;

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
        public list_item: eui.List;
        public constructor(public options: IMenuOptions) {
            super(options.skinName || PopupMenu.defaultSkinName);
            options.instance = this;
            if (options.offset) {
                this.offset.x = options.offset.x;
                this.offset.y = options.offset.y;
            }
            if (options.arrowPadding == void 0) {
                options.arrowPadding = 20;
            }
            if (options.width) {
                this.width = options.width;
            }
            if (options.height) {
                this.height = options.height;
            }
            if (options.uiDirection == undefined) {
                options.uiDirection = UIDirection.BOTTOM;
            }
            if (options.uiAlign == undefined) {
                options.uiAlign = UIAlign.CENTER;
            }
            options.itemHeight = options.itemHeight ? options.itemHeight : 30;
            options.itemGap = options.itemGap != undefined ? options.itemGap : 2;
            if (options.allowDirections && options.allowDirections.length) {
                this.allowDirections = options.allowDirections;
            }
            this.$uiDirection = options.uiDirection;
            this.$uiAlign = options.uiAlign;
            this.arrowPadding = options.arrowPadding;
            let baseHeight = this.options.baseHeight || PopupMenu.defaultBaseHeight;
            if (!this.options.height) {
                this.height = baseHeight + (this.options.itemHeight + this.options.itemGap) * this.options.items.length - this.options.itemGap;
            }
            if (!this.options.width && this.options.minWidth && this.width < this.options.minWidth) {
                this.width = this.options.minWidth;
            }
        }
        private callback_onSelect = new xgame.Signal1<IMenuItem>();
        private arrow_down: eui.Image;
        private arrow_up: eui.Image;
        private arrow_right: eui.Image;
        private arrow_left: eui.Image;
        private arrowPadding: number = 20;
        public onSelect(): xgame.Signal1<IMenuItem> {
            return this.options.callback || this.callback_onSelect;
        }
        public fixedUIDirection(direction: UIDirection): void {
            this.updateArrow(direction);
        }
        public onClose(): void {
            this.onSelect().dispatch(this.selectedItem);
            this.list_item.removeEventListener(PopupMenuEvent.ITEM_CLICK, this.onItemClickHandler, this);
            if (this.options) {
                this.options.instance = undefined
            }
            super.onClose();
        }
        private selectedItem: IMenuItem;
        private onItemClickHandler(event: PopupMenuEvent): void {
            event.stopPropagation();
            this.selectedItem = event.data;
            this.close();
        }
        public onOpen(): void {
            super.onOpen();
            this.list_item.itemRenderer = this.options.itemRender;
            (<eui.VerticalLayout>this.list_item.layout).gap = this.options.itemGap;
            if (this.options.itemRenderSkinName) {
                this.list_item.itemRendererSkinName = this.options.itemRenderSkinName;
            }
            if (this.options.itemRender) {
                this.list_item.itemRenderer = this.options.itemRender;
            }
            else {
                this.list_item.itemRenderer = PopupMenuItem;
            }

            this.list_item.addEventListener(PopupMenuEvent.ITEM_CLICK, this.onItemClickHandler, this);
            this.list_item.replaceAll(this.options.items);
            if (this.options.selected != undefined) {
                let selectedIndex: number = this.options.selected;
                if (selectedIndex >= 0) {
                    this.list_item.selectedIndex = selectedIndex;
                }
            }
        }
        protected updateArrow(direction: UIDirection): void {
            this.arrow_down.visible = false;
            this.arrow_up.visible = false;
            this.arrow_left.visible = false;
            this.arrow_right.visible = false;
            if (direction == UIDirection.BOTTOM) {
                this.arrow_down.visible = true;
                if (this.uiAlign == UIAlign.LEFT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = this.arrowPadding;
                    this.arrow_down.right = NaN;
                }
                else if (this.uiAlign == UIAlign.RIGHT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = this.arrowPadding;
                }
                else {
                    this.arrow_down.horizontalCenter = 0;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = NaN;
                }
            }
            else if (direction == UIDirection.TOP) {
                this.arrow_up.visible = true;
                if (this.uiAlign == UIAlign.LEFT) {
                    this.arrow_up.horizontalCenter = NaN;
                    this.arrow_up.left = this.arrowPadding;
                    this.arrow_up.right = NaN;
                }
                else if (this.uiAlign == UIAlign.RIGHT) {
                    this.arrow_up.horizontalCenter = NaN;
                    this.arrow_up.left = NaN;
                    this.arrow_up.right = this.arrowPadding;
                }
                else {
                    this.arrow_up.horizontalCenter = 0;
                    this.arrow_up.left = NaN;
                    this.arrow_up.right = NaN;
                }
            }
            else if (direction == UIDirection.RIGHT) {
                this.arrow_right.visible = true;
                if (this.uiAlign == UIAlign.TOP) {
                    this.arrow_right.verticalCenter = NaN;
                    this.arrow_right.top = this.arrowPadding;
                    this.arrow_right.bottom = NaN;
                }
                else if (this.uiAlign == UIAlign.BOTTOM) {
                    this.arrow_right.verticalCenter = NaN;
                    this.arrow_right.top = NaN;
                    this.arrow_right.bottom = this.arrowPadding;
                }
                else {
                    this.arrow_right.verticalCenter = 0;
                    this.arrow_right.top = NaN;
                    this.arrow_right.bottom = NaN;
                }
            }
            else if (direction == UIDirection.LEFT) {
                this.arrow_left.visible = true;
                if (this.uiAlign == UIAlign.TOP) {
                    this.arrow_left.verticalCenter = NaN;
                    this.arrow_left.top = this.arrowPadding;
                    this.arrow_left.bottom = NaN;
                }
                else if (this.uiAlign == UIAlign.BOTTOM) {
                    this.arrow_left.verticalCenter = NaN;
                    this.arrow_left.top = NaN;
                    this.arrow_left.bottom = this.arrowPadding;
                }
                else {
                    this.arrow_left.verticalCenter = 0;
                    this.arrow_left.top = NaN;
                    this.arrow_left.bottom = NaN;
                }
            }
            else {
                this.arrow_down.visible = true;
                if (this.uiAlign == UIAlign.LEFT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = this.arrowPadding;
                    this.arrow_down.right = NaN;
                }
                else if (this.uiAlign == UIAlign.RIGHT) {
                    this.arrow_down.horizontalCenter = NaN;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = this.arrowPadding;
                }
                else {
                    this.arrow_down.horizontalCenter = 0;
                    this.arrow_down.left = NaN;
                    this.arrow_down.right = NaN;
                }
            }
        }
    }
    export function showPopupMenu(target: egret.DisplayObject, titles: string[]): xgame.Signal1<IMenuItem>
    export function showPopupMenu(target: egret.DisplayObject, options: IMenuOptions): xgame.Signal1<IMenuItem>
    export function showPopupMenu(target: egret.DisplayObject, titles_or_options: IMenuOptions | string[]): xgame.Signal1<IMenuItem> {
        let options: IMenuOptions;
        if (Array.isArray(titles_or_options)) {
            options = PopupMenu.toOptions(titles_or_options);
        }
        else {
            options = titles_or_options;
        }
        options.callback = new xgame.Signal1<IMenuItem>();
        if (options.textAlign) {
            for (let item of options.items) {
                item.textAlign = options.textAlign;
            }
        }
        xgame.that.getService<IUIManager>(IUIManager).openPopup(PopupMenu, target, options);
        return options.callback;
    }
}