/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module euix {
    export class TouchDelegate extends xgame.XObject implements xgame.IDisposable {
        private inited: boolean;
        private target: egret.DisplayObject;
        private clickScaleEnable: boolean = false;
        private cache: LayoutCache;

        private longPressTimeDelta: number = TOUCH_LONG_PRESS_TIME;
        private repeatPressTimeDelta: number = TOUCH_LONG_PRESS_TIME;

        private clickHandler: ITouchHandler;
        private releaseOutsideHandler: ITouchHandler;
        private longPressHandler: ITouchHandler;
        private repeatPressHandler: ITouchHandler;

        private beginHandler: ITouchHandler;
        private moveHandler: ITouchHandler;
        private endHandler: ITouchHandler;

        public constructor(target: egret.DisplayObject, scale: boolean = false) {
            super();
            this.target = target;
            this.clickScaleEnable = scale;
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
            this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
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
            if (this.clickScaleEnable) {
                this.cacheLayout();
                this.updateLayout();
            }
            this.beginHandler.happend = true;
            this.beginHandler.time = egret.getTimer();
            this.beginHandler.identifier = event.touchPointID;
            this.beginHandler.listeners.dispatch(event);
            if (this.repeatPressHandler.listeners.numListeners) {
                this.setRepeatTimer();
            }
        }
        protected cacheLayout(): void {
            if (!this.cache) {
                this.cache = new LayoutCache();
            }
            this.cache.x = this.target.x;
            this.cache.y = this.target.y;
            this.cache.width = this.target.width;
            this.cache.height = this.target.height;
            this.cache.scaleX = this.target.scaleX;
            this.cache.scaleY = this.target.scaleY;
            this.cache.anchorOffsetX = this.target.anchorOffsetX;
            this.cache.anchorOffsetY = this.target.anchorOffsetY;
            if (this.target instanceof eui.Component) {
                this.cache.top = this.target.top;
                this.cache.bottom = this.target.bottom;
                this.cache.left = this.target.left;
                this.cache.right = this.target.right;
                this.cache.horizontalCenter = this.target.horizontalCenter;
                this.cache.verticalCenter = this.target.verticalCenter;
                this.cache.percentWidth = this.target.percentWidth;
                this.cache.percentHeight = this.target.percentHeight;
            }
        }
        protected updateLayout(isUp?: boolean): void {
            if (!this.cache) {
                return;
            }
            if (isUp) {
                this.target.x = this.cache.x;
                this.target.y = this.cache.y;
                this.target.width = this.cache.width;
                this.target.height = this.cache.height;
                this.target.scaleX = this.cache.scaleX;
                this.target.scaleY = this.cache.scaleY;
                this.target.anchorOffsetX = this.cache.anchorOffsetX;
                this.target.anchorOffsetY = this.cache.anchorOffsetY;
                if (this.target instanceof eui.Component) {
                    this.target.top = this.cache.top;
                    this.target.bottom = this.cache.bottom;
                    this.target.left = this.cache.left;
                    this.target.right = this.cache.right;
                    this.target.horizontalCenter = this.cache.horizontalCenter;
                    this.target.verticalCenter = this.cache.verticalCenter;
                    this.target.percentWidth = this.cache.percentWidth;
                    this.target.percentHeight = this.cache.percentHeight;
                }
            }
            else {
                this.target.width = this.cache.width;
                this.target.height = this.cache.height;
                this.target.anchorOffsetX = this.cache.width / 2;
                this.target.anchorOffsetY = this.cache.height / 2;
                this.target.x += this.cache.width * this.cache.scaleX / 2;
                this.target.y += this.cache.height * this.cache.scaleY / 2;
                this.target.scaleX = this.cache.scaleX * TOUCH_SCALE_RADIO;
                this.target.scaleY = this.cache.scaleY * TOUCH_SCALE_RADIO;
                if (this.target instanceof eui.Component) {
                    this.target.top = NaN;
                    this.target.bottom = NaN;
                    this.target.left = NaN;
                    this.target.right = NaN;
                    this.target.horizontalCenter = NaN;
                    this.target.verticalCenter = NaN;
                    this.target.percentWidth = NaN;
                    this.target.percentHeight = NaN;
                }
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
            if (this.clickScaleEnable) {
                this.updateLayout(true);
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
            this.cache = undefined;
            if (this.target) {
                this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
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