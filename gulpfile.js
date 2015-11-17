'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');
var express = require('express');
var serveStatic = require('serve-static');
// 文字色変更
var black = '\u001b[30m';
var red = '\u001b[31m';
var green = '\u001b[32m';
var yellow = '\u001b[33m';
var blue = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan = '\u001b[36m';
var white = '\u001b[37m';
var reset = '\u001b[0m';
// 文字色変更 ここまで

// 変数定義
var SRC_DIR = 'src/';
var DEST_DIR = 'build/';
var TEMP_DIR = 'tmp/';
// フォルダ削除。
gulp.task('clean', del.bind(null, [TEMP_DIR, DEST_DIR]));

// ファイル結合。
gulp.task('concat', ['clean'], function () {
    return gulp.src([SRC_DIR + 'js/*.js'])
        .pipe(plumber())
        .pipe(concat('sample-diagram.js'))
        .pipe(gulp.dest(TEMP_DIR + 'js'))
        ;
});
// jsを最小化。
gulp.task('js', ['concat'], function () {
    return gulp.src([TEMP_DIR + '/js/sample-diagram.js'])
        .pipe(plumber())
//        .pipe(uglify())
        .pipe(rename('sample-diagram.min.js'))
        .pipe(gulp.dest(TEMP_DIR + 'js'))
        ;
});
// ファイルコピー
gulp.task('copy', ['js'], function () {
    return gulp.src([SRC_DIR + '**/*.html', SRC_DIR + 'css/**', SRC_DIR + '**/*.json'], {base: SRC_DIR})
        .pipe(plumber())
        .pipe(gulp.dest(DEST_DIR))
        ;
});
// jsのコピー
gulp.task('copy-js', ['copy'], function () {
    return gulp.src([TEMP_DIR + 'js/**/*.min.js'], {base: TEMP_DIR})
        .pipe(plumber())
        .pipe(gulp.dest(DEST_DIR))
        ;
});

// サーバーの起動。
gulp.task('server', ['copy-js'], function () {
    console.log(__dirname + '/' + DEST_DIR);
    console.log();
    console.log(red + 'http://localhost:3000' + reset);
    console.log();
    console.log('で起動します。');
    var app = express();
    app.use(serveStatic(__dirname + '/' + DEST_DIR));
    app.listen(3000);
});

// defaultのタスク。
gulp.task('default', ['server'], function () {
    // ファイル監視
    gulp.watch([SRC_DIR + 'js/**/*.js', SRC_DIR + '**/*.html', SRC_DIR + '**/*.json'], ['copy-js']);
});