/*
 * @Author: rontian i@ronpad.com
 * @Date: 2022-07-13 09:30:47
 * @LastEditors: rontian i@ronpad.com
 * @LastEditTime: 2022-07-13 10:21:23
 * @FilePath: /xgame.core/Users/rontian/Documents/Spaces/Egret/XGamePackage/egret.xgame/xgame.fui/gulpfile.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';
const gulp = require("gulp");
const minify = require('gulp-minify');
const inject = require("gulp-inject-string");
const ts = require('gulp-typescript');
const plus = require('typescript-plus');
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json', { typescript: plus });

gulp.task('buildJs', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(inject.replace('var fui;', ''))
        .pipe(inject.prepend('window.fui = {};\n'))
        .pipe(inject.replace('var __extends =', 'window.__extends ='))
        .pipe(minify({ ext: { min: ".min.js" } }))
        .pipe(gulp.dest('./bin'));
});

gulp.task("buildDts", ["buildJs"], () => {
    return tsProject.src()
        .pipe(tsProject())
        .dts
        .pipe(gulp.dest('./bin'));
});

gulp.task("build", ["buildDts"], () => {
    return merge([ 
        gulp.src('bin/**/*')
            .pipe(gulp.dest('../client.fui/libs/xgame.fui/')),
    ]);
});
gulp.task('default', ['build'])