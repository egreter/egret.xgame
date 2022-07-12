/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare namespace xgame {
    interface XGame {
        useEgret(main: egret.DisplayObjectContainer): void;
    }
}

module egretx {

    xgame.XGame.prototype["useEgret"] = function (main: egret.DisplayObjectContainer): void {
        let self = <xgame.XGame>this;
        self.registerServiceProvider(new EgretProvider(main));
    }
    //================================================
    // Group
    //================================================
    export enum SBState {
        INVALID = 0,
        H_HEAD = 1,
        H_MID = 2,
        H_TAIL = 4,
        V_HEAD = 8,
        V_MID = 16,
        V_TAIL = 32
    }
    interface IGroup {
        __callback_onResize__: xgame.Signal0;
        __callback_onHS__: xgame.Signal1<SBState>;
        __callback_onVS__: xgame.Signal1<SBState>;
        __h_1_wacther__: eui.Watcher;
        __h_2_wacther__: eui.Watcher;
        __v_1_wacther__: eui.Watcher;
        __v_2_wacther__: eui.Watcher;
        __onHScrollChanged__(): void;
        __onVScrollChanged__(): void;
    }
    eui.Group.prototype["onResizeChanged"] = function (): xgame.Signal0 {
        let self: eui.Group & IGroup = this;
        let listener = self.__callback_onResize__;
        if (!listener) {
            listener = new xgame.Signal0();
            self.__callback_onResize__ = listener;
        }
        return listener;
    }
    let group_setContentSize: (width: number, height: number) => void = eui.Group.prototype.setContentSize;
    eui.Group.prototype.setContentSize = function (width: number, height: number): void {
        group_setContentSize.call(this, width, height);
        let self: eui.Group & IGroup = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.dispatch();
        }
    }
    eui.Group.prototype["__onHScrollChanged__"] = function (): void {
        let self: eui.Group & IGroup = this;
        let v = self.scrollV;
        let max = self.contentHeight;
        let sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onHS__.dispatch(SBState.H_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_TAIL);
            }
        }
        else {
            self.__callback_onHS__.dispatch(SBState.INVALID);
        }
    }
    eui.Group.prototype["onHS"] = function (): xgame.Signal1<SBState> {
        let self: eui.Group & IGroup = this;
        if (!self.__callback_onHS__) {
            self.__callback_onHS__ = new xgame.Signal1<SBState>();
            self.__h_1_wacther__ = eui.Binding.bindHandler(self, ["contentWidth"], self.__onHScrollChanged__, this);
            self.__h_2_wacther__ = eui.Binding.bindHandler(self, ["scrollH"], self.__onHScrollChanged__, this);
        }
        return self.__callback_onHS__;
    }
    eui.Group.prototype["__onVScrollChanged__"] = function (): void {
        let self: eui.Group & IGroup = this;
        let v = self.scrollV;
        let max = self.contentHeight;
        let sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onVS__.dispatch(SBState.V_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_TAIL);
            }
        }
        else {
            self.__callback_onVS__.dispatch(SBState.INVALID);
        }
    }
    eui.Group.prototype["onVS"] = function (): xgame.Signal1<SBState> {
        let self: eui.Group & IGroup = this;
        if (!self.__callback_onVS__) {
            self.__callback_onVS__ = new xgame.Signal1<SBState>();
            self.__v_1_wacther__ = eui.Binding.bindHandler(self, ["contentHeight"], self.__onVScrollChanged__, this);
            self.__v_2_wacther__ = eui.Binding.bindHandler(self, ["scrollV"], self.__onVScrollChanged__, this);
        }
        return self.__callback_onVS__;
    }
    let group_onRemoveFromStage: () => void = eui.Group.prototype["$onRemoveFromStage"];
    eui.Group.prototype["$onRemoveFromStage"] = function (): void {
        group_onRemoveFromStage.apply(this);
        let self: eui.Group & IGroup = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.removeAll();
        }
        if (self.__callback_onHS__) {
            self.__callback_onHS__.removeAll();
            self.__h_1_wacther__.unwatch();
            self.__h_2_wacther__.unwatch();
            self.__callback_onHS__ = undefined;
            self.__h_1_wacther__ = undefined;
            self.__h_2_wacther__ = undefined;
        }
        if (self.__callback_onVS__) {
            self.__callback_onVS__.removeAll();
            self.__v_1_wacther__.unwatch();
            self.__v_2_wacther__.unwatch();
            self.__callback_onVS__ = undefined;
            self.__v_1_wacther__ = undefined;
            self.__v_2_wacther__ = undefined;
        }
    }
    //================================================
    // DataGroup
    //================================================
    interface IDataGroup {
        __dataSource__: eui.ArrayCollection;
        __itemWidth__: number;
        __itemHeight__: number;
    }
    eui.DataGroup.prototype["getScroller"] = function (): eui.Scroller {
        let self: eui.DataGroup & IDataGroup = this;
        if (self.parent && egret.is(self.parent, "eui.Scroller")) {
            return <eui.Scroller>self.parent;
        }
    }
    eui.DataGroup.prototype["setItemWidth"] = function (width: number): void {
        let self: eui.DataGroup & IDataGroup = this;
        self.__itemWidth__ = width;
    }
    eui.DataGroup.prototype["setItemHeight"] = function (height: number): void {
        let self: eui.DataGroup & IDataGroup = this;
        self.__itemHeight__ = height;
    }
    eui.DataGroup.prototype["scrollToIndex"] = function (index: number): void {
        let self: eui.DataGroup & IDataGroup = this;
        let scroller: eui.Scroller = self.getScroller();
        if (!scroller) {
            return;
        }
        let size: number = 0;
        let gap: number = 0;
        let max_size: number = 0;
        if (egret.is(self.layout, "eui.LinearLayoutBase")) {
            gap = (<eui.VerticalLayout>self.layout).gap;
        }
        if (self.__itemWidth__) {
            max_size = self.contentWidth - scroller.width;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemWidth__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollH = size;
        }
        else if (self.__itemHeight__) {
            max_size = self.contentHeight - scroller.height;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemHeight__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollV = size;
        }
    }
    eui.DataGroup.prototype["replaceAll"] = function (items: any[], reset?: boolean | number): void {
        let self: eui.DataGroup & IDataGroup = this;
        let index: number = 0;
        if (typeof (reset) === "number") {
            index = reset;
            self.onResizeChanged().addOnce(() => {
                self.scrollToIndex(index);
            }, this);
        }
        let dataSource = self.__dataSource__;
        if (dataSource == undefined || typeof (reset) === "boolean" && reset) {
            dataSource = new eui.ArrayCollection(items);
            self.__dataSource__ = dataSource;
            self.dataProvider = dataSource;
        }
        else {
            dataSource.replaceAll(items);
        }
    }
}
declare namespace eui {
    interface Group {
        //尺寸变化事件
        onResizeChanged(): xgame.Signal0;
        //横向滚动事件
        onHS(): xgame.Signal1<egretx.SBState>;
        //纵向滚动事件
        onVS(): xgame.Signal1<egretx.SBState>;
    }
    interface DataGroup {
        replaceAll(items: any[], reset?: boolean | number): void;
        scrollToIndex(index: number): void;
        setItemWidth(width: number): void;
        setItemHeight(height: number): void;
        getScroller(): eui.Scroller;
    }
}