'use strict';
var del = require('del');
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

// フォルダ削除。
gulp.task('clean', del.bind(null, ['tmp', 'build']));

// 簡易サーバーの起動。
gulp.task("server", function () {
    browser({
        server: {
            baseDir: "./build"
        }
    });
});

// ファイル結合。
gulp.task("concat", function () {
    var files = ['src/js/*.js'];
    gulp.src(files)
        .pipe(plumber())
        .pipe(concat('sample-diagram.js'))
        .pipe(gulp.dest('./temp/js'))
        .pipe(browser.reload({stream: true}));
});

// jsを最小化。
gulp.task("js", function () {
    gulp.src(["js/**/*.js", "!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream: true}));
});

// ファイルコピー
gulp.task('copy', function () {
    return gulp.src(
        ['src/*.html', 'src/css/**', 'src/js/*.js'],
        {base: 'src'}
    )
        .pipe(gulp.dest('dest'));
});

// defaultのタスク。
gulp.task("default", ['server'], function () {
//    gulp.watch(["js/**/*.js", "!js/min/**/*.js"], ["js"]);
});