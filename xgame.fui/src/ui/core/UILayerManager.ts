/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UILayerID.ts" />

module fui {
    export class UILayerManager extends fairygui.GComponent {
        public readonly entities = new xgame.List<UIEntity>();
        public constructor(public readonly manager: UIManager, public readonly layerID: number) {
            super();
            this.displayObject.name = "" + UILayerID[layerID];
            this.opaque = false;
            this.makeFullScreen();
        }
        public get count(): number {
            return this.entities.count();
        }
        public addEntity(entity: UIEntity): void {
            if (!this.entities.contains(entity)) {
                this.entities.add(entity);
            }
        }
        public removeEntity(entity: UIEntity): void {
            if (this.entities.contains(entity)) {
                this.entities.remove(entity);
            }
        }
        public orderToFront(entity: UIEntity): void {
            if (this.entities.contains(entity)) {
                this.entities.remove(entity);
                let index = this.numChildren - 1;
                if (index < 0) {
                    index = 0;
                }
                this.setChildIndex(entity.uiPage.view, index);
                if (entity.mask) {
                    index = this.numChildren - 2;
                    if (index < 0) {
                        index = 0;
                    }
                    this.setChildIndex(entity.mask, index);
                }
                this.entities.add(entity);
            }
        }
    }
}