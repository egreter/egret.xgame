/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-21
*************************************************/

let onDisplayListChanged = new xgame.Signal1<number>();
let onDisplayListDisposed = new xgame.Signal1<number>();

let egret_BitmapData_displayList: { [key: number]: egret.DisplayObject[] } = egret.BitmapData["_displayList"];
let egret_BitmapData_addDisplayObject = egret.BitmapData.$addDisplayObject;
let egret_BitmapData_removeDisplayObject = egret.BitmapData.$removeDisplayObject;
let egret_BitmapData_dispose = egret.BitmapData.$dispose;
egret.BitmapData.$addDisplayObject = function (displayObject: egret.DisplayObject, bitmapData: egret.BitmapData): void {
    if (!bitmapData) {
        return;
    }
    let hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    egret_BitmapData_addDisplayObject(displayObject, bitmapData);
    onDisplayListChanged.dispatch(hashCode);
}
egret.BitmapData.$removeDisplayObject = function (displayObject: egret.DisplayObject, bitmapData: egret.BitmapData): void {
    if (!bitmapData) {
        return;
    }
    let hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    if (!egret_BitmapData_displayList[hashCode]) {
        return;
    }
    egret_BitmapData_removeDisplayObject(displayObject, bitmapData);
    onDisplayListChanged.dispatch(hashCode);
}
egret.BitmapData.$dispose = function (bitmapData: egret.BitmapData): void {
    if (!bitmapData) {
        return;
    }
    let hashCode = bitmapData.hashCode;
    if (!hashCode) {
        return;
    }
    egret_BitmapData_dispose(bitmapData);
    if (!egret_BitmapData_displayList[hashCode]) {
        onDisplayListDisposed.dispatch(hashCode);
    }
}

function get_timestamp(): number {
    return Math.floor(new Date().valueOf() / 1000);
}


module egretx {
    interface ITexture {
        hashCode?: number;
        key?: string;
        timestamp?: number;
        reference?: number;
    }
    export class UIResManager extends xgame.XObject {
        private textures = new xgame.Dictionary<number, ITexture>();
        public constructor() {
            super();
            onDisplayListChanged.add(this.onDisplayListChanged, this);
            onDisplayListDisposed.add(this.onDisplayListDisposed, this);
        }
        public gc(force?: boolean): void {
            let timestamp = get_timestamp();
            this.textures.forValues((texture) => {
                if (texture.reference <= 0) {
                    if (force || timestamp - texture.timestamp >= 60) {
                        this.destroyRes(texture.key);
                        this.textures.remove(texture.hashCode);
                    }
                }
            }, this, true);
        }
        private destroyRes(key: string): void {
            if (RES.hasRes(key) && RES.getRes(key)) {
                RES.destroyRes(key);
                console.log("UIResManager:destroyRes({0})".format(key));
            }
        }
        private onDisplayListChanged(hashCode: number): void {
            if (!this.textures.containsKey(hashCode)) {
                this.textures.add(hashCode, <ITexture>{ hashCode: hashCode, reference: 0, timestamp: get_timestamp(), key: "" });
            }
            if (egret_BitmapData_displayList[hashCode]) {
                let texture = this.textures.get(hashCode);
                let list = egret_BitmapData_displayList[hashCode];
                texture.reference = list.length;
                texture.timestamp = get_timestamp();
            }
        }
        private onDisplayListDisposed(hashCode: number): void {
            if (this.textures.containsKey(hashCode)) {
                this.textures.remove(hashCode);
            }
        }
        public register(key: string, texture: egret.Texture): void {
            if (!texture) {
                return;
            }
            let bitmapData = texture.bitmapData;
            if (!bitmapData) {
                return;
            }
            let hashCode = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!this.textures.containsKey(hashCode)) {
                this.textures.add(hashCode, <ITexture>{ hashCode: hashCode, reference: 0, timestamp: get_timestamp(), key: key });
            }
            else {
                this.textures.get(hashCode).key = key;
            }
        }
    }
}