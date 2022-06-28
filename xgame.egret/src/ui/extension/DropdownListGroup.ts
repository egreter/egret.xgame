/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
/// <reference path="../core/Group.ts" />

module egretx {
    export interface IDropdownSource {
        selectedIndex?: number;
        source?: ISourceItem[];
        itemToLabel?: (item: ISourceItem) => string;
    }
    let bits = 1;
    enum InvalidateFlags {
        Any = 1,
        Source = 1 << bits++,
        TextColor = 1 << bits++,
        Align = 1 << bits++,
        Value = 1 << bits++,
        SelectedIndex = 1 << bits++,
        ItemSkinName = 1 << bits++,
    }
    export class DropdownListGroup extends Group {
        public static defaultDropdownSkinName: string = "";
        public static defaultFetchDropdownList: () => DropdownList;
        public static defaultPopupItemHeight: number = 30;
        public fetchDropdownList: () => DropdownList;
        protected invalidateFlags: number = InvalidateFlags.Any;
        public constructor() {
            super();
        }
        public destroy(): void {
            this.pools.release();
        }
        private callback_onSelectChanged = new xgame.Signal3<number, number[], ISourceItem[]>();
        public onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, number[], T[]> {
            return <any>this.callback_onSelectChanged;
        }
        private $dropdownSkinName: string;
        public get dropdownSkinName(): string {
            return this.$dropdownSkinName;
        }
        public set dropdownSkinName(value: string) {
            this.$dropdownSkinName = value;
            this.invalidateFlags |= InvalidateFlags.ItemSkinName;
            this.lateUpdate();
        }
        private $popupItemRenderSkinName: string;
        public get popupItemRenderSkinName(): string {
            return this.$popupItemRenderSkinName;
        }
        public set popupItemRenderSkinName(value: string) {
            this.$popupItemRenderSkinName = value;
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
        private $popupItemHeight: number = 0;
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
        private $source: IDropdownSource[];
        public get source(): IDropdownSource[] {
            return this.$source;
        }
        public set source(value: IDropdownSource[]) {
            this.$source = value;
            this.invalidateFlags |= InvalidateFlags.Source;
            this.selectedIndexes.length = 0;
            for (let item of value) {
                this.selectedIndexes.push(item.selectedIndex != undefined ? item.selectedIndex : 0);
            }
            this.lateUpdate();
        }
        public getSelectedIndexes(): number[] {
            return this.selectedIndexes;
        }
        public getSelectedIndex(index: number): number {
            if (index < this.selectedIndexes.length) {
                return this.selectedIndexes[index];
            }
            return -1;
        }
        public setSelectedIndexes(selectedIndexes: number[]): void {
            let len = selectedIndexes.length;
            len = Math.min(len, this.source.length);
            for (let i = 0; i < len; i++) {
                this.selectedIndexes[i] = selectedIndexes[i];
            }
            this.invalidateFlags |= InvalidateFlags.SelectedIndex;
            this.lateUpdate();
        }
        public setSelectedIndex(index: number, selectedIndex: number): void {
            if (index < this.items.length) {
                this.selectedIndexes[index] = selectedIndex;
                this.invalidateFlags |= InvalidateFlags.SelectedIndex;
                this.lateUpdate();
            }
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
        protected onDrawComponent(): void {
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Source) {
                this.clearItems();
                this.initItems();
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.Align) {
                for (let item of this.items) {
                    item.textAlign = this.textAlign;
                    item.popupTextAlign = this.popupTextAlign;
                }
            }
            if (this.invalidateFlags == InvalidateFlags.Any || this.invalidateFlags & InvalidateFlags.SelectedIndex) {
                for (let i = 0; i < this.selectedIndexes.length; i++) {
                    this.getItemAt(i).selectedIndex = this.selectedIndexes[i];
                }
            }
            this.invalidateFlags = 0;
        }
        protected clearItems(): void {
            while (this.items.length) {
                let dropdown = this.items.pop();
                this.removeChild(dropdown);
                this.pools.recycle(dropdown);
            }
        }
        private selectedIndexes: number[] = [];
        protected initItems(): void {
            if (!this.source || this.source.length == 0) {
                return;
            }
            for (let i = 0; i < this.source.length; i++) {
                let data = this.source[i];
                let dropdown = this.getItemAt(i);
                dropdown.selectedIndex = this.selectedIndexes[i]
                dropdown.textAlign = this.textAlign;
                dropdown.popupTextAlign = this.popupTextAlign;
                dropdown.popupItemHeight = this.popupItemHeight ? this.popupItemHeight : DropdownListGroup.defaultPopupItemHeight;
                dropdown.source = data.source;
                dropdown.skinName = this.dropdownSkinName || DropdownListGroup.defaultDropdownSkinName;
                dropdown.popupItemRenderSkinName = this.popupItemRenderSkinName;
            }
        }
        protected items: DropdownList[] = [];
        protected getItemAt(index: number): DropdownList {
            if (!this.items[index]) {
                let item = this.pools.fetch(() => this.fetchDropdownList ? this.fetchDropdownList() : DropdownListGroup.defaultFetchDropdownList(), this);
                item.onSelectChanged().add(this.onSelectChangeHandler, this);
                this.items[index] = item;
                this.addChildAt(item, index);
            }
            return this.items[index];
        }
        protected indexOf(dropdown: DropdownList): number {
            return this.items.indexOf(dropdown);
        }
        private onSelectChangeHandler(selectedIndex: number, value: ISourceItem, dropdown: DropdownList): void {
            let index = this.indexOf(dropdown);
            this.selectedIndexes[index] = selectedIndex;
            let selectedIndexes = this.selectedIndexes.slice();
            let selectedValues: ISourceItem[] = [];
            for (let i = 0; i < this.selectedIndexes.length; i++) {
                selectedValues.push(this.getItemAt(i).source[this.selectedIndexes[i]]);
            }
            this.callback_onSelectChanged.dispatch(index, selectedIndexes, selectedValues);
        }
        private pools: xgame.PoolObject<DropdownList> = new xgame.PoolObject<DropdownList>(DropdownList);
    }
}