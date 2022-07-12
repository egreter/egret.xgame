/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../structs/UILayerID.ts" />

module euix {
    export class UILayerManager extends eui.UILayer {
        public readonly entities = new xgame.List<UIEntity>();
        public constructor(public readonly manager: UIManager, public readonly id: number) {
            super();
            this.name = "" + UILayerID[id];
            this.touchEnabled = false;
            this.touchThrough = true;
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
                this.setChildIndex(entity.uiPage, index);
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