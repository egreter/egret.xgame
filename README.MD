# Egret.XGame游戏框架
> 以前空闲时间写的一个基于egret的游戏框架，抽时间整理了出来，完成了一些基础的功能封装。

> EgretEngien版本: 5.2.33 (其他版本未测试)

> 简单实现依赖注入，框架部分参考TinaX框架

> 所有模块源码都已经提供，如果对基础库有特殊需求，修改对应库源码进行gulp编译即可。

> 后续会慢慢把一些常用的功能模块整理出来，让框架变得更完整，致力方便能轻松上手专注于游戏逻辑开发。

## 在线查看演示项目
[https://demo.ronpad.com/index.html](https://demo.ronpad.com/index.html)

## 相关库gulp编译说明
> 为了能顺利使用gulp编译相关库代码，请使用以下环境配置

> node版本11.15.0

> npm 7.22.0

> gulp 4.0.2

> ts使用typescript-plus编译器


## xgame.core 框架核心

> 提供框架基础服务的注册及启动流程，包括一些实用功能。

### 主要功能列表
- decorators
    - injectable
    - inject
    - impl
    - event
- 数据绑定
- 全局事件管理器

```typescript
@inject(xgame.IEventManager)
public eventManager: xgame.IEventManager;

this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.BAG_OPENED, "BagWindow");

//全局事件侦听2种写法
//标准
this.eventManager.addEventListener(EventModule.MAIN, MainEvent.BAG_OPENED, this.onBagOpened, this);
//UIPage
@event(MainEvent.BAG_OPENED, EventModule.MAIN)
public onBagOpened(event: MainEvent): void {
    console.log("=======================>", event.data);
}

```

- 帧调度管理器

```typescript
xgame.SchedulerManager.Instance().registerUpdate(this.advanceTime, this);

this.disposableGroup = new xgame.DisposableGroup();
this.disposableGroup.registerUpdate(this.onAdvanceTime, this);
this.disposableGroup.dispose();
```

- 对象池管理器

```typescript
this.pools = new xgame.PoolGroup<AnimationClip>("AnimationClip");
let clip = this.pools.fetch(id, AnimationClip, () => new AnimationClip(key, movieClipName), this);
this.pools.recycle(id, AnimationClip, clip);
this.pools.release(id, AnimationClip);
this.pools.releases();
```

- Signals

```typescript
let callback = new xgame.Singals<number>();
callback.addOnce((value)=>console.log(value);this);
callback.dispatch(100);
```
- 日期和时间管理器(xgame.IDateTimeManager)
- 多任务链流程驱动
- 简易状态机
- 其他一些实用类

### 主要API
```typescript
let game = new xgame.XGame(new ro.GameBootstrap());
await game.init();

//获得注入的服务或对象,所有注入对象都需要接口化

game.getService<T>(T);

xgame.that.getService<T>(T);
//手动依赖注入
xgame.injectInstance(o);
//创建对象并依赖注入
xgame.createInstance<T>(Clazz: new (...args: any[]) => T, ...args: any[]): T;
```

## xgame.egret 基于egret的扩展
> 提供egret引擎的一些基本功能

### 主要功能列表
- 网络管理器
    - HttpManager

    ```typescript
    this.http.sendRequest("http://10.10.0.88/serverlist/",
        egret.HttpMethod.POST,
        [["platform", "sandbox"],
        ["notice", "1"],
        ["uid", "0"],
        ["packtype", "2"],
        ["version", "94"]], true).then((ret) => {
            console.log(ret);
        });
    ```

    - SocketManager

    ```typescript
    NetManager.Instance().main.setURI("ws://10.10.0.88:83/s99130/{0}".format(this.user.platUsername));
    NetManager.Instance().on("CMD_LOGIN").addOnce((resp) => {
        if (resp.result != ro3.LoginResp.LoginRet.FAIL) {
            egretx.tips("登录成功");
            this.uiManager.replaceScene(MainScene);
        }
    }, this);
    //使用主网络实例进行连接，连接成功后，会自动发送登录请求(由SocketHelper决定)
    NetManager.Instance().main.connect();
    ```

- 触摸点击管理器
    - addTouchBegin
    - addTouchEnd
    - addClick

    ```typescript
    this.addClick(this.btn_11, () => {
        this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.PLAY_ANIMATION, "stand");
    }, this);
    ```

    - addLongPress
    - addRepeatPress
- 基于eui的界面管理器
    - 场景

    ```typescript
    xgame.inject(egretx.IUIManager)
    public uiManager: egretx.IUIManager;
    this.uiManager.replaceScene(MainScene);
    ```

    - 全屏UI界面

    ```typescript
    this.uiManager.openUI(MainPage);
    ```

    - 弹出窗口

    ```typescript
    this.uiManager.openUI(BagWindow);
    ```

    - PopupMenu

    ```typescript
    egretx.showPopupMenu(this.btn_1, egretx.PopupMenu.toOptions(["第一级", "第二级", "第三级"], this.selectedIndex)).addOnce((v) => {
        if (v) {
            this.selectedIndex = v.index;
        }
    }, this);
    ```

    - (包括Alert,DropdownList,DropdownListGroup,TipsManager等实用扩展)

    ```typescript
    egretx.alert("确定要返回场景吗？", "提示", 2, false).addOnce((button) => {
        if (button == 0) {
            this.close();
        }
    }, this);

    egretx.tips("UI音频只能同时播放一个声音，多个播放后者会替换前者！");
    ```
- TimelineManager

```typescript
export interface IAnimatable extends xgame.IXObject {
    advanceTime(time: number): void;
}
TimelineManager.Instance().getOrCreateTimeline().add(this);
TimelineManager.Instance().getOrCreateTimeline().remove(this);
//2倍整播放动画
TimelineManager.Instance().getOrCreateTimeline().timeScale = 2;

```

- AudioManager

```typescript
 //循环播放背景音乐
this.audioManager.background.play("music_mp3", 0);

this.audioManager.ui.play("refine_mp3", 1);

this.audioManager.effect.play("effect_mp3", 1);
```

- AnimationManager

```typescript
let mc = this.animationManager.fetch("chunli", "test");
mc.horizontalCenter = 0;
mc.verticalCenter = 0;
this.addChild(mc);
mc.play(-1, "attack");

this.animationManager.recycle(mc);
this.animationManager.release("888888");
```

- DragonBonesManager

```typescript
 private async createDragonBones(): Promise<void> {
    this.dragonBody = this.dragonBonesManager.fetch("dragon_boy", "DragonBoy");
    await this.dragonBody.createArmature();
    if (this.dragonBody.display) {
        this.dragonBody.display.x = this.dragonBody.display.y = 480;
        this.dragonBody.setParent(this);
        this.dragonBody.armature.animation.play("walk");
    }
}
```

- 引导任务管理器(egretx.IGuideManager)

## xgame.client 示例项目

> 提供框架基础功能的使用案例，可运行后查看代码详情。

### tools
> 一个基于Commander.js的工具库，用于生成protobuf-bundles.js,导出excel成json文件等

> 可以根据自己的需求修改或扩展此目录下的代码文件

```
cd tools
npm install
```

> 命令列表
- npm run proto     编译proto文件生成protobuf-bundles.js
- npm run config    将Excel转换为json文件并生成接口声明

### 框架启动
```typescript
///Main.ts
class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();
        this.runGame().catch(e => {
            console.log(e);
        });
    }
    private async runGame() {
        let game = new xgame.XGame(new ro.GameBootstrap());
        game.useEgret(this);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            game.useWeGame(this);
        }
        else {
            game.useWeb(this);
        }
        //调度帧频
        let lastStamp: number = egret.getTimer();
        egret.startTick((timeStamp: number) => {
            let delta = timeStamp - lastStamp;
            lastStamp = timeStamp;
            game.tick(delta);
            return true;
        }, this);
        //初始化
        await game.init();
    }
}
```
```typescript
///GameBootstrap.ts 框架启动文件
module ro {
    @xgame.impl(xgame.IXBootstrap)
    export class GameBootstrap implements xgame.IXBootstrap {
        public constructor() {
        }
        public onInit(game: xgame.IXGame): void {
            console.log("游戏初始化.");
            //模块注册
            new CommonModule().onRegister(game);
            new LoginModule().onRegister(game);
            new MainModule().onRegister(game);
        }

        public onStart(game: xgame.IXGame): void {
            console.log("游戏已启动.");
            //启动游戏流程
            this.startLauncher(game);
        }

        private async startLauncher(game: xgame.IXGame): Promise<void> {
            let launcher = game.getService<ILauncher>(ILauncher);
            await launcher.init();
            launcher.showLoading();
            await launcher.loadConfig();
            await launcher.loadTheme();
            await launcher.loadResource();
            await launcher.loadExtensionResource();
            await launcher.startGame();
            launcher.hideLoading();
        }

        public onQuit(): void {
            console.log("游戏已退出.");
        }
    }
}
```

```typescript
///WebLauncher.ts Web端启动流程
module ro {
    export class WebLauncher extends egret.HashObject implements ILauncher {
        private stage: egret.Stage;
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
            //依赖注入
            xgame.injectInstance(this);
            this.stage = main.stage;
        }
        public async init(): Promise<void> {
            egret.lifecycle.addLifecycleListener((context) => {
                // custom lifecycle plugin
            })
            egret.lifecycle.onPause = () => {
                //egret.ticker.pause();
            }
            egret.lifecycle.onResume = () => {
                //egret.ticker.resume();
            }
            //注入自定义的素材解析器
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            await RES.loadConfig("resource/default.res.json", "resource/");
        }
        public async loadTheme(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                let theme = new eui.Theme("resource/default.thm.json", this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve(true);
                    console.log("皮肤加载完成")
                }, this);
            })
        }
        public async loadConfig(): Promise<boolean> {
            console.log("配置加载完成")
            return true;
        }
        public async loadResource(): Promise<boolean> {
            await RES.loadGroup("preload", 0, this.loadingView);
            console.log("资源加载完成")
            return true;
        }
        public async loadExtensionResource(): Promise<boolean> {
            return true;
        }
        private loadingView: LoadingUI;
        public showLoading(): void {
            if (!this.loadingView) {
                this.loadingView = new LoadingUI();
                this.stage.addChild(this.loadingView);
            }
        }

        public hideLoading(): void {
            if (this.loadingView) {
                this.stage.removeChild(this.loadingView);
                this.loadingView = undefined;
            }
        }

        @xgame.inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public async startGame(): Promise<void> {
            console.log("启动游戏");
            //加载登录场景
            this.uiManager.replaceScene(LoginScene);
        }
    }
}

```