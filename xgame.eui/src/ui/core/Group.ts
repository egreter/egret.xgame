/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-30
*************************************************/
module euix {
    @xgame.mixin(TouchBehaviours)
    export class Group extends eui.Group implements xgame.IXObject {
        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.setTouchManager(this);
        }
        //================================================
        //Mixin TouchBehaviours
        //================================================
        public setTouchManager: (target: egret.DisplayObject) => void;
        public removeTouchEvents: (target: egret.DisplayObject | number) => void;
        public addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        public removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        public removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        public removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        public addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        public removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}