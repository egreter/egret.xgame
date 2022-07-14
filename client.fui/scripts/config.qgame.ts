/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, ResSplitPlugin, CleanPlugin } from 'built-in';
<<<<<<< HEAD:client.eui/scripts/config.fastgame.ts
import { FastgamePlugin } from './fastgame/fastgame';
=======
import { MiqgamePlugin } from './qgame/qgame';
>>>>>>> fgui:client.fui/scripts/config.qgame.ts
import * as defaultConfig from './config';
import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';
import { WebpackBundlePlugin } from './plugins/webpack-plugin';
//华为快游戏
const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
<<<<<<< HEAD:client.eui/scripts/config.fastgame.ts
        const outputDir = `../${projectName}_fastgame/build`;
=======
        const outputDir = `../${projectName}_qgame`;
>>>>>>> fgui:client.fui/scripts/config.qgame.ts
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
<<<<<<< HEAD:client.eui/scripts/config.fastgame.ts
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new FastgamePlugin(),
=======
                    new MiqgamePlugin(),
>>>>>>> fgui:client.fui/scripts/config.qgame.ts
                    new ManifestPlugin({ output: 'manifest.js' })
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
<<<<<<< HEAD:client.eui/scripts/config.fastgame.ts
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new FastgamePlugin(),
=======
                    new MiqgamePlugin(),
>>>>>>> fgui:client.fui/scripts/config.qgame.ts
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
                    new ManifestPlugin({ output: 'manifest.js' })
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
