/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
/// <reference path="../interfaces/IUIEntity.ts" />
/// <reference path="../structs/UIFlags.ts" />


module euix {
    export class UIHelper {
        public static isFullScreenUI(entity: IUIEntity): boolean {
            let flags = entity.uiPage.flags;
            if (!(flags & UIFlags.isStack)) {
                return false;
            }
            if (!(flags & UIFlags.isFullScreen)) {
                return false;
            }
            return true;
        }
        public static isWindowUI(entity: IUIEntity): boolean {
            let flags = entity.uiPage.flags;
            if (!(flags & UIFlags.isStack)) {
                return false;
            }
            if ((flags & UIFlags.isFullScreen)) {
                return false;
            }
            return !UIHelper.isPopupMenuUI(entity);
        }
        public static isPopupMenuUI(entity: IUIEntity): boolean {
            let flags = entity.uiPage.flags;
            if (!(flags & UIFlags.isStack)) {
                return false;
            }
            if ((flags & UIFlags.isFullScreen)) {
                return false;
            }
            if (flags & UIFlags.isPopupMenu) {
                return true;
            }
            return false;
        }
        public static isPluginUI(entity: IUIEntity): boolean {
            let flags = entity.uiPage.flags;
            if (flags & UIFlags.isPlugin) {
                return true;
            }
            return false;
        }
        public static isSceneUI(entity: IUIEntity): boolean {
            let flags = entity.uiPage.flags;
            if (flags & UIFlags.isScene) {
                return true;
            }
            return false;
        }
    }
}