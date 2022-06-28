/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

module xgame {
    export class StateMachine<T> extends XObject {
        public onStateChanged: Function;
        public get currentState(): State<T> {
            return this.$currentState;
        }
        public previousState: State<T>;
        public elapsedTimeInState: number = 0;
        protected $currentState: State<T>;
        protected $context: T;
        private $states: Map<any, State<T>> = new Map<any, State<T>>();

        constructor(context: T, initialStateType: any, initialState: State<T>) {
            super();
            this.$context = context;
            this.addState(initialStateType, initialState);
            this.$currentState = initialState;
            this.$currentState.onEnter();
        }

        /**
         * 将状态添加到状态机
         * @param stateType
         * @param state
         */
        public addState(stateType: any, state: State<T>): void {
            state.setMachineAndContext(this, this.$context);
            this.$states.set(stateType, state);
        }

        /**
         * 使用提供的增量时间为状态机计时
         * @param deltaTime
         */
        public update(deltaTime: number): void {
            this.elapsedTimeInState += deltaTime;
            this.$currentState.onPrepare();
            this.$currentState.onUpdate(deltaTime);
        }

        /**
         * 从机器获取特定状态，而不必对其进行更改。
         * @param type
         */
        public getState<R extends State<T>>(type: any): R {
            if (!this.$states.has(type)) {
                console.error(`状态${type}不存在。你是不是在调用addState的时候忘记添加了?`);
                return null;
            }

            return this.$states.get(type) as R;
        }


        /**
         * 更改当前状态
         * @param newType
         */
        public changeState<R extends State<T>>(newType: any): R {
            if (this.$currentState instanceof newType) {
                return this.$currentState as R;
            }
            if (this.currentState) {
                this.$currentState.onExit();
            }
            if (!this.$states.has(newType)) {
                console.error(`状态${newType}不存在。你是不是在调用addState的时候忘记添加了?`);
                return;
            }
            this.elapsedTimeInState = 0;
            this.previousState = this.$currentState;
            this.$currentState = this.$states.get(newType);
            this.$currentState.onEnter();

            if (this.onStateChanged) {
                this.onStateChanged();
            }
            return this.$currentState as R;
        }
    }
}