'use strict';
const gulp = require("gulp");
const minify = require('gulp-minify');
const inject = require("gulp-inject-string");
const ts = require('gulp-typescript');
const compile = require("gulp-typescript");
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json', { typescript: require("typescript-plus") });

gulp.task('buildJs', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(inject.replace('var egretx;', ''))
        .pipe(inject.prepend('window.egretx = {};\n'))
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

gulp.task("copy", ["buildDts"], () => {
    return gulp.src('typings/xgame.core.d.ts').pipe(gulp.dest('./bin'));
});

gulp.task("build", ["buildDts"], () => {
    return merge([
        gulp.src('bin/**/*')
            .pipe(gulp.dest('../client.eui/libs/xgame.egret/')),
        gulp.src('bin/*.ts')
            .pipe(gulp.dest('../xgame.eui/libs')),
        gulp.src('bin/*.ts')
            .pipe(gulp.dest('../xgame.fui/libs'))
    ]);
});
gulp.task('default', ['build'])