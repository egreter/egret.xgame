/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../core/Window.ts" />

module euix {
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
        skinName?: string;
        named?: string;
    }
    export function alert(message: string, title?: string, closeByMask?: boolean, named?: string): xgame.Signal1<number>
    export function alert(message: string, title?: string, buttons?: string[], closeByMask?: boolean, named?: string): xgame.Signal1<number>
    export function alert(message: string, title?: string, nums?: number, closeByMask?: boolean, named?: string): xgame.Signal1<number>
    export function alert(options: IAlertOptions): xgame.Signal1<number>
    export function alert(message_or_options: string | IAlertOptions, title?: string, buttons_or_nums_or_closeByMask?: string[] | number | boolean, closeByMask_or_named?: boolean | string, named?: string): xgame.Signal1<number> {
        let options: IAlertOptions;
        if (typeof (message_or_options) === "string") {
            options = { message: message_or_options, title: title, showCloseButton: true, closeByMask: true };
            if (buttons_or_nums_or_closeByMask != undefined) {
                if (typeof (buttons_or_nums_or_closeByMask) === "boolean") {
                    options.closeByMask = buttons_or_nums_or_closeByMask;
                    options.named = named;
                }
                else {
                    if (Array.isArray(buttons_or_nums_or_closeByMask)) {
                        options.buttons = buttons_or_nums_or_closeByMask;
                    }
                    else if (typeof (buttons_or_nums_or_closeByMask) === "number") {
                        options.numButton = buttons_or_nums_or_closeByMask;
                    }
                    if (closeByMask_or_named != undefined) {
                        if (typeof closeByMask_or_named === "boolean") {
                            options.closeByMask = closeByMask_or_named;
                            options.named = named;
                        }
                        else {
                            options.closeByMask = true;
                            options.named = closeByMask_or_named;
                        }
                    }
                    else {
                        options.closeByMask = true;
                        options.named = named;
                    }
                }
            }
        }
        else {
            options = message_or_options;
        }
        options.callback = new xgame.Signal1<number>();
        xgame.that.getService<IUIManager>(IUIManager).openUI(Alert, options);
        return options.callback;
    }
    export class Alert extends Window {
        public static defaultSkinName: string = "";
        public static NAME: string = "Alert";
        public lab_title: eui.Label;
        public lab_content: eui.Label;
        public btn_close: eui.Button;
        @inject(IUIManager)
        public uiManager: IUIManager;
        protected clickButtonIndex: number = undefined;
        public constructor(public options: IAlertOptions) {
            super(options.skinName || Alert.defaultSkinName);
            if (!this.options.closeByMask) {
                this.flags &= ~UIFlags.closeByMask;
            }
            if (this.options.width) {
                this.width = this.options.width;
            }
            if (this.options.height) {
                this.height = this.options.height;
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
        protected getButton(index: number): eui.Button {
            let btn: eui.Button = this["btn_{0}".format(index)];
            return btn;
        }
        public onOpen(): void {
            super.onOpen();
            this.injectGuideValue("alert_name", this.options.named);
            this.addClick(this.btn_close, () => {
                this.close();
            }, this);
            if (!this.options.showCloseButton) {
                this.btn_close.visible = false;
            }
            if (this.options.title) {
                this.lab_title.textFlow = new egret.HtmlTextParser().parse(this.options.title);
            }
            this.lab_content.textFlow = new egret.HtmlTextParser().parse(this.options.message);
            let buttons: eui.Button[] = [];
            let index = 0;
            while (true) {
                let btn = this.getButton(index);
                if (btn) {
                    buttons.push(btn);
                    if (index == 0) {
                        this.injectGuideValue("alert_button_0", btn);
                    }
                    else if (index == 1) {
                        this.injectGuideValue("alert_button_1", btn);
                    }
                    else if (index == 2) {
                        this.injectGuideValue("alert_button_2", btn);
                    }
                }
                else {
                    break;
                }
                index++;
            }
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].visible = false;
                buttons[i].name = i.toString();
                buttons[i].includeInLayout = false;
                this.addClick(buttons[i], this.onButtonClick, this);
            }
            if (this.options.buttons && this.options.buttons.length) {
                for (let i = 0; i < this.options.buttons.length; i++) {
                    buttons[i].label = this.options.buttons[i];
                    buttons[i].visible = true;
                    buttons[i].includeInLayout = true;
                }
            }
            else {
                let nums = this.options.numButton || 2;
                for (let i = 0; i < nums; i++) {
                    buttons[i].visible = true;
                    buttons[i].includeInLayout = true;
                }
            }
        }
        private onButtonClick(event: egret.TouchEvent): void {
            let target: eui.Button = event.target;
            this.clickButtonIndex = parseInt(target.name);
            this.close();
        }
    }
}