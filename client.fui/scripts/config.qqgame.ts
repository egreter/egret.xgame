/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
<<<<<<< HEAD:client.eui/scripts/config.tbcreativeapp.ts
import { TbgamePlugin } from './tbcreativeapp/tbcreativeapp';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
// import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';
// import { WebpackBundlePlugin } from './plugins/webpack-plugin';

=======
import { QQgamePlugin } from './qqgame/qqgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
//是否使用QQ小游戏引擎插件
const useQQPlugin: boolean = false;
let pluginList: string[] = []
>>>>>>> fgui:client.fui/scripts/config.qqgame.ts
const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
<<<<<<< HEAD:client.eui/scripts/config.tbcreativeapp.ts
        const outputDir = `../${projectName}_tbcreativeapp`;
=======
        const outputDir = `../${projectName}_qqgame`;
>>>>>>> fgui:client.fui/scripts/config.qqgame.ts
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
<<<<<<< HEAD:client.eui/scripts/config.tbcreativeapp.ts
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new TbgamePlugin(),
                    new ManifestPlugin({ output: 'manifest.js' })
=======
                    new QQgamePlugin(useQQPlugin, pluginList),
                    new ManifestPlugin({ output: 'manifest.js', qqPlugin: { use: useQQPlugin, pluginList: pluginList } })
>>>>>>> fgui:client.fui/scripts/config.qqgame.ts
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    // new WebpackBundlePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),//新的 Webpack 编译器
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
<<<<<<< HEAD:client.eui/scripts/config.tbcreativeapp.ts
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new TbgamePlugin(),
=======
                    new QQgamePlugin(useQQPlugin, pluginList),
>>>>>>> fgui:client.fui/scripts/config.qqgame.ts
                    new UglifyPlugin([
                        // 使用 EUI 项目，要压缩皮肤文件，可以开启这个压缩配置
                        // {
                        //     sources: ["resource/default.thm.js"],
                        //     target: "default.thm.min.js"
                        // },
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        }
                    ]),
<<<<<<< HEAD:client.eui/scripts/config.tbcreativeapp.ts
                    new ManifestPlugin({ output: 'manifest.js' })
=======
                    new ManifestPlugin({ output: 'manifest.js', qqPlugin: { use: useQQPlugin, pluginList: pluginList } })
>>>>>>> fgui:client.fui/scripts/config.qqgame.ts
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
