/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export interface IPacket extends xgame.IPoolable {
        //唯一标识
        guid?: number;
        //命令编号
        cmd?: number;
        //回包的原始数据
        buffer?: egret.ByteArray;
        //是否放置到发送队列头部
        first?: boolean;
        //回包的proto Type
        type?: string;
        //反序列化后的回包结构
        message?: any;
        //连接关闭或错误时，中止发送包
        abort(): void;
        //回包处理
        onResponse(): void;
    }
}