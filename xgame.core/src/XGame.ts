/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

/// <reference path="./core/XObject.ts" />
/// <reference path="./interfaces/IXGame.ts" />
/// <reference path="./interfaces/IXObject.ts" />
/// <reference path="./interfaces/IXBootstrap.ts" />
/// <reference path="./interfaces/IServiceProvider.ts" />
/// <reference path="./XGameExtensions.ts" />

/// <reference path="./scheduler/ISchedulerManager.ts" />
/// <reference path="./scheduler/SchedulerManager.ts" />

module xgame {
    export let that: XGame = null;
    @impl(IXGame)
    export class XGame extends XObject implements IXGame {
        private container: ServiceContainer;
        private $inited: boolean = false;
        public constructor(private bootstrap: IXBootstrap) {
            super();
            if (that) {
                throw new Error("引擎只能实例化一个对象");
            }
            that = this;
            this.container = ServiceContainer.Instance();
        }
        public async init(): Promise<void> {
            if (this.$inited) {
                return;
            }
            console.log("[XGame]: 框架初始化...");
            //注册自己
            //this.container.singleton(IXGame, XGame).withInstance(this);
            this.registerServiceProvider(new XProvider());
            //排序IServiceProvider
            this.providers.sort((a, b) => {
                if (a.priority > b.priority) {
                    return -1;
                }
                else if (a.priority < b.priority) {
                    return 1;
                }
                return 0;
            });
            //初始化IServiceProvider
            for (let i = 0; i < this.providers.length; i++) {
                let provider = this.providers[i];
                let rets = await provider.onInit(this);
                if (!rets) {
                    throw new Error("[IServiceProvider]: 初始化" + getQualifiedClassName(provider) + "发生错误.");
                }
                else {
                    console.log("[IServiceProvider]: " + getQualifiedClassName(provider) + "初始化.");
                }
            }
            //IServiceProvider注册服务
            for (let i = 0; i < this.providers.length; i++) {
                let provider = this.providers[i];
                provider.onServiceRegister(this);
            }
            //初始化IXBootstrap
            this.bootstrap.onInit(this);
            console.log("[IXBootstrap]: {0}初始化.".format(getQualifiedClassName(this.bootstrap)));
            //启动IServiceProvider
            for (let i = 0; i < this.providers.length; i++) {
                let provider = this.providers[i];
                let rets = await provider.onStart(this);
                if (!rets) {
                    throw new Error("[IServiceProvider]: 启动{0}错误.".format(getQualifiedClassName(provider)));
                }
                else {
                    console.log("[IServiceProvider]: {0}已启动.".format(getQualifiedClassName(provider)));
                }
            }
            //启动IXBootstrap
            this.bootstrap.onStart(this);
            console.log("[IXBootstrap]: {0}已启动.".format(getQualifiedClassName(this.bootstrap)));
            //完成
            this.$inited = true;
            console.log("[XGame]: 框架启动完成.");
        }
        public tick(deltaTime: number): void {
            SchedulerManager.Instance().tick(deltaTime);
        }
        //================================================
        //Container
        //================================================
        public singleton(identity: Symbol, service: { new(...args: any[]): any }): IMapping {
            return this.container.singleton(identity, service);
        }
        public getService<T>(identity: Symbol): T {
            return this.container.getService<T>(identity);
        }
        //================================================
        //ServiceProvider
        //================================================
        private providers: IServiceProvider[] = [];
        public registerServiceProvider(provider: IServiceProvider): IXGame {
            this.providers.push(provider);
            return this;
        }
    }
}