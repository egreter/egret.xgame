/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../core/Window.ts" />

module fui {
    export interface IAlertOptions {
        showCloseButton?: boolean;
        closeByMask?: boolean;
        buttons?: string[];
        numButton?: number;
        width?: number;
        height?: number;
        title?: string;
        message?: string;
        callback?: xgame.Signal1<number>;
        packageName?: string;
        comName?: string;
    }
    export function alert(message: string, title?: string, closeByMask?: boolean): xgame.Signal1<number>
    export function alert(message: string, title?: string, buttons?: string[], closeByMask?: boolean): xgame.Signal1<number>
    export function alert(message: string, title?: string, nums?: number, closeByMask?: boolean): xgame.Signal1<number>
    export function alert(options: IAlertOptions): xgame.Signal1<number>
    export function alert(message_or_options: string | IAlertOptions, title?: string, buttons_or_nums_or_closeByMask?: string[] | number | boolean, closeByMask: boolean = true): xgame.Signal1<number> {
        let options: IAlertOptions;
        if (typeof (message_or_options) === "string") {
            options = { message: message_or_options, title: title, showCloseButton: true, closeByMask: true };
            if (buttons_or_nums_or_closeByMask != undefined) {
                if (Array.isArray(buttons_or_nums_or_closeByMask)) {
                    options.buttons = buttons_or_nums_or_closeByMask;
                    options.closeByMask = closeByMask;
                }
                else if (typeof (buttons_or_nums_or_closeByMask) === "number") {
                    options.numButton = buttons_or_nums_or_closeByMask;
                    options.closeByMask = closeByMask;
                }
                else if (typeof (buttons_or_nums_or_closeByMask) === "boolean") {
                    options.closeByMask = buttons_or_nums_or_closeByMask;
                }
            }
        }
        else {
            options = message_or_options;
        }
        options.callback = new xgame.Signal1<number>();
        xgame.that.getService<fui.IUIManager>(fui.IUIManager).openUI(Alert, options);
        return options.callback;
    }
    export class Alert extends Window<fairygui.GObject> {
        public static defaultPackageName: string = "";
        public static defaultComName: string = "";
        public static NAME: string = "Alert";
        @fui.fairy_ui()
        public com_frame: PopupFrame;
        @fui.fairy_ui()
        public lab_content: fairygui.GRichTextField;
        @fui.fairy_ui()
        public com_btns: fairygui.GButton;
        @fui.fairy_ui()
        public btn_close: fairygui.GButton;;
        @fui.fairy_controller("com_btns/buttonsState")
        public buttonsState: fairygui.Controller;
        @inject(fui.IUIManager)
        public uiManager: fui.IUIManager;
        protected clickButtonIndex: number = undefined;
        public constructor(public options: IAlertOptions) {
            super(options.packageName || Alert.defaultPackageName, options.comName || Alert.defaultComName);
            if (!this.options.closeByMask) {
                this.flags &= ~fui.UIFlags.closeByMask;
            }

        }
        public close(): void {
            if (this.options.callback) {
                this.options.callback.dispatch(this.clickButtonIndex);
            }
            super.close();
        }
        public onClose(): void {
            if (this.options.callback) {
                this.options.callback.removeAll();
            }
            this.options.callback = undefined;
            this.options.buttons = undefined;
            super.onClose();
        }
        protected getButton(index: number): fairygui.GButton {
            let btn: fairygui.GButton = this.com_btns.getChild("btn_" + index) as fairygui.GButton;
            return btn;
        }
        public onOpen(): void {
            super.onOpen();
            if (this.options.width) {
                this.view.width = this.options.width;
            }
            if (this.options.height) {
                this.view.height = this.options.height;
            }
            this.addClick(this.btn_close, () => {
                this.close();
            }, this);
            if (!this.options.showCloseButton) {
                this.btn_close.visible = false;
            }
            if (this.options.title) {
                this.com_frame.setTitle(this.options.title);
            }
            this.lab_content.text = this.options.message;
            let buttons: fairygui.GButton[] = [];
            let index = 0;
            while (true) {
                let btn = this.getButton(index);
                if (btn) {
                    buttons.push(btn);
                }
                else {
                    break;
                }
                index++;
            }
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].name = i.toString();
                this.addClick(buttons[i], this.onButtonClick, this);
            }
            if (this.options.buttons && this.options.buttons.length) {
                for (let i = 0; i < this.options.buttons.length; i++) {
                    buttons[i].text = this.options.buttons[i];
                }
                this.buttonsState.selectedIndex = this.options.buttons.length - 1;
            }
            else {
                let nums = this.options.numButton || 2;
                this.buttonsState.selectedIndex = nums - 1;
            }
        }
        private onButtonClick(event: egret.TouchEvent): void {
            let target: fairygui.GButton = event.target;
            this.clickButtonIndex = parseInt(target.name);
            this.close();
        }
    }
}