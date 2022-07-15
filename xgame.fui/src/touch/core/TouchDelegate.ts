/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module fui {
    export class TouchDelegate extends xgame.XObject implements xgame.IDisposable {
        private inited: boolean;
        private target: fairygui.GObject;

        private longPressTimeDelta: number = TOUCH_LONG_PRESS_TIME;
        private repeatPressTimeDelta: number = TOUCH_LONG_PRESS_TIME;

        private clickHandler: ITouchHandler;
        private releaseOutsideHandler: ITouchHandler;
        private longPressHandler: ITouchHandler;
        private repeatPressHandler: ITouchHandler;

        private beginHandler: ITouchHandler;
        private moveHandler: ITouchHandler;
        private endHandler: ITouchHandler;

        public constructor(target: fairygui.GObject) {
            super();
            this.target = target;
            this.initTouchEvents();
        }
        public onLeaveStage(event: egret.TouchEvent): void {
            this.onTouchEnd(event);
        }
        public addTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.beginHandler.listeners.add(listener, thisObject);
        }
        public removeTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.beginHandler.listeners.remove(listener);
        }
        public addTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.moveHandler.listeners.add(listener, thisObject);
        }
        public removeTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.moveHandler.listeners.remove(listener);
        }
        public addTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.endHandler.listeners.add(listener, thisObject);
        }
        public removeTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.endHandler.listeners.remove(listener);
        }
        public addReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.releaseOutsideHandler.listeners.add(listener, thisObject);
        }
        public removeReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.releaseOutsideHandler.listeners.remove(listener);
        }
        public addClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.clickHandler.listeners.add(listener, thisObject);
        }
        public removeClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.clickHandler.listeners.remove(listener);
        }
        public addLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time: number = 300): void {
            this.longPressTimeDelta = time;
            this.longPressHandler.listeners.add(listener, thisObject);
        }
        public removeLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.longPressHandler.listeners.remove(listener);
        }
        public addRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time: number = 300): void {
            this.repeatPressTimeDelta = time;
            this.repeatPressHandler.listeners.add(listener, thisObject);
        }
        public removeRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.repeatPressHandler.listeners.remove(listener);
        }
        public initTouchEvents(): void {
            this.inited = true;
            this.clickHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.longPressHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.repeatPressHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.releaseOutsideHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.beginHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.moveHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.endHandler = <ITouchHandler>{ listeners: new xgame.Signal1<egret.TouchEvent>(), happend: false };
            this.target.displayObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.target.displayObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.target.displayObject.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.target.displayObject.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
        private repeat_timer_id: number = 0;
        protected setRepeatTimer(): void {
            this.clearRepeatTimer();
            this.repeat_timer_id = egret.setInterval(() => {
                this.repeatPressHandler.happend = true;
                this.repeatPressHandler.listeners.dispatch(null);
            }, this, this.repeatPressTimeDelta);
        }
        protected clearRepeatTimer(): void {
            if (this.repeat_timer_id) {
                egret.clearInterval(this.repeat_timer_id);
            }
            this.repeat_timer_id = 0;
        }
        protected onTouchBegin(event: egret.TouchEvent): void {
            this.beginHandler.happend = true;
            this.beginHandler.time = egret.getTimer();
            this.beginHandler.identifier = event.touchPointID;
            this.beginHandler.listeners.dispatch(event);
            if (this.repeatPressHandler.listeners.numListeners) {
                this.setRepeatTimer();
            }
        }
        protected onTouchMove(event: egret.TouchEvent): void {
            if (!this.beginHandler.happend) {
                return;
            }
            this.moveHandler.listeners.dispatch(event);
        }
        protected onTouchEnd(event: egret.TouchEvent): void {
            if (!this.beginHandler.happend) {
                return;
            }
            if (event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
                this.releaseOutsideHandler.listeners.dispatch(event);
            }
            else {
                this.endHandler.listeners.dispatch(event);
                let end_time = egret.getTimer();
                if (!this.repeatPressHandler.happend && this.longPressHandler.listeners.numListeners && end_time - this.beginHandler.time >= this.longPressTimeDelta) {
                    this.longPressHandler.happend = true;
                    this.longPressHandler.listeners.dispatch(event);
                }
                if (!this.longPressHandler.happend && !this.repeatPressHandler.happend) {
                    if (end_time - touchClickLastTime > TOUCH_TAP_BETWEEN_TIME) {
                        touchClickLastTime = end_time;
                        this.clickHandler.listeners.dispatch(event);
                    }
                }
            }
            this.clearRepeatTimer();
            this.beginHandler.happend = false;
            this.endHandler.happend = false;
            this.moveHandler.happend = false;
            this.releaseOutsideHandler.happend = false;
            this.longPressHandler.happend = false;
            this.repeatPressHandler.happend = false;
        }

        public dispose(): void {
            if (this.target) {
                this.target.displayObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.target.displayObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.target.displayObject.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.target.displayObject.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            this.clickHandler.listeners.removeAll();
            this.clickHandler.happend = false;
            this.longPressHandler.listeners.removeAll();
            this.longPressHandler.happend = false;
            this.repeatPressHandler.listeners.removeAll();
            this.repeatPressHandler.happend = false;
            this.releaseOutsideHandler.listeners.removeAll();
            this.releaseOutsideHandler.happend = false;
            this.beginHandler.listeners.removeAll();
            this.beginHandler.happend = false;
            this.moveHandler.listeners.removeAll();
            this.moveHandler.happend = false;
            this.endHandler.listeners.removeAll();
            this.endHandler.happend = false;
            this.target = undefined;
            this.inited = false;
        }

    }
}