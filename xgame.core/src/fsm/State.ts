/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./StateMachine.ts" />


module xgame {
    export abstract class State<T> extends XObject{
        protected $machine: StateMachine<T>;
        protected $context: T;

        public setMachineAndContext(machine: StateMachine<T>, context: T) {
            this.$machine = machine;
            this.$context = context;
            this.onInitialize();
        }

        /**
         * 在设置machine和context之后直接调用，允许状态执行任何所需的设置
         *
         * @memberof State
         */
        public onInitialize(): void { }

        /**
         * 当状态变为活动状态时调用
         *
         * @memberof State
         */
        public onEnter(): void { }

        /**
         * 在更新之前调用，允许状态最后一次机会改变状态
         *
         * @memberof State
         */
        public onPrepare(): void { }

        /**
         * 每个帧调用此状态为活动状态
         *
         * @abstract
         * @param {number} deltaTime
         * @memberof State
         */
        public abstract onUpdate(deltaTime: number): void;

        /**
         * 此状态不再是活动状态时调用
         *
         * @memberof State
         */
        public onExit(): void { }
    }
}
