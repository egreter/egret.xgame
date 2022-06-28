/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module egretx {
    export interface IUIEntity {
        name: string;
        uiPage: UIPage;
        readonly isClosed: boolean;
        groupName: string;
        closePage(): void;
        showPage(): void;
        hidePage(): void;
    }
}