/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
/// <reference path="./UIEntity.ts" />
/// <reference path="../utils/UIHelper.ts" />


module fui {
    export class UIEntityManager extends xgame.XObject {
        public readonly entityMap = new xgame.Dictionary<string, UIEntity[]>();
        public readonly stackList = new xgame.List<UIEntity>();
        public constructor(public readonly manager: UIManager) {
            super();
        }
        public addEntity(entity: UIEntity) {
            let entities = this.entityMap.get(entity.name);
            if (!entities) {
                entities = [];
                this.entityMap.add(entity.name, entities);
            }
            if (entities.indexOf(entity) == -1) {
                entities.push(entity);
                if (entity.uiPage.flags & UIFlags.isStack) {
                    this.stackList.add(entity);
                }
            }
        }
        public get stackCount(): number {
            return this.stackList.count();
        }
        public get topUI(): IUIEntity {
            if (this.stackCount > 0) {
                return this.stackList.last();
            }
        }
        public get topFullScreenUI(): IUIEntity {
            let index = this.stackCount - 1;
            while (index >= 0) {
                let entity = this.stackList.elementAt(index);
                if (entity.uiPage.flags & UIFlags.isFullScreen) {
                    return entity;
                }
                index--;
            }
        }
        public get hasPopUp(): boolean {
            let index = this.stackCount - 1;
            while (index >= 0) {
                let entity = this.stackList.elementAt(index);
                if (UIHelper.isWindowUI(entity)) {
                    return true;
                }
                index--;
            }
            return false;
        }
        public checkEntities(): void {
            let visible = true;
            let hasFullScreenPage: boolean = false;
            let index = this.stackCount - 1;
            while (index >= 0) {
                let entity = this.stackList.elementAt(index);
                if (visible) {
                    entity.showPage();
                }
                else {
                    entity.hidePage();
                }
                if (entity.uiPage.flags & UIFlags.isFullScreen) {
                    hasFullScreenPage = true;
                    visible = false;
                }
                index--;
            }
            if (hasFullScreenPage) {
                this.hideUIUnderLayers();
            }
            else {
                this.showUIUnderLayers();
            }
        }
        /**
         * 隐藏UI之下的显示层级
         */
        public hideUIUnderLayers(): void {
            this.manager.uiLayers.forKeys((layerID) => {
                if (layerID >= UILayerID.Layer_5_UI) {
                    return true;
                }
                let layerManager = this.manager.uiLayers.get(layerID);
                layerManager.visible = false;
            }, this);
        }
        /**
         * 显示UI之下的显示层级
         */
        public showUIUnderLayers(): void {
            this.manager.uiLayers.forKeys((layerID) => {
                if (layerID >= UILayerID.Layer_5_UI) {
                    return true;
                }
                let layerManager = this.manager.uiLayers.get(layerID);
                layerManager.visible = true;
            }, this);
        }
        public removeEntity(entity: UIEntity): void {
            if (this.entityMap.containsKey(entity.name)) {
                let entities = this.entityMap.get(entity.name);
                let indexOf = entities.indexOf(entity);
                if (indexOf >= 0) {
                    entities.splice(indexOf, 1);
                    if (entity.uiPage.flags & UIFlags.isStack) {
                        this.stackList.remove(entity);
                    }
                }
            }
        }
        public tryGetEntities(uiClass: xgame.TClass<UIPage<fairygui.GObject>>, results?: UIEntity[]): boolean
        public tryGetEntities(uiName: string, results?: UIEntity[]): boolean
        public tryGetEntities(target: any, results?: UIEntity[]): boolean {
            let uiName: string, uiClass: xgame.TClass<UIPage<fairygui.GObject>>, name: string;
            if (typeof (target) == "string") {
                uiName = target;
                if (!this.manager.uiMap.containsKey(uiName)) {
                    throw new Error("此UI没有注册:{0}".format(uiName));
                }
                uiClass = this.manager.uiMap.get(uiName);
            }
            else {
                uiClass = target;
            }
            name = xgame.getQualifiedClassName(uiClass);
            if (this.entityMap.containsKey(name)) {
                let entities = this.entityMap.get(name);
                if (entities && entities.length) {
                    if (results) {
                        results.length = 0;
                        results.push(...entities);
                    }
                    return true;
                }
            }
            return false;
        }
    }
}