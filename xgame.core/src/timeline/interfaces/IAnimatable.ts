/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module xgame {
    /**
     * 播放动画接口
     */
    export interface IAnimatable extends xgame.IXObject {
        advanceTime(time: number): void;
    }
}