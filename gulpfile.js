'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var del = require('del');
var runSequence = require('run-sequence');

// 変数定義
var SRC_DIR = 'src/';
var DEST_DIR = 'build/';
var TEMP_DIR = 'tmp/';
// フォルダ削除。
//gulp.task('clean', function () {
//    return del.bind(null, [TEMP_DIR, DEST_DIR]);
//});
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
    return gulp.src([SRC_DIR + '**/*.html', SRC_DIR + 'css/**'], {base: SRC_DIR})
        .pipe(plumber())
        .pipe(gulp.dest(DEST_DIR))
        ;
});
// jsのコピー
gulp.task('copy-js', ['copy'], function () {
    return gulp.src([TEMP_DIR + 'js/**/*.min.js'], {base: TEMP_DIR})
        .pipe(plumber())
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browser.reload({stream: true}))
        ;
});

// 簡易サーバーの起動。
gulp.task('server', ['copy-js'], function () {
    return browser({
        server: {
            baseDir: DEST_DIR
        }
    });
});

// defaultのタスク。
gulp.task('default', ['server'], function () {
    // ファイル監視
    gulp.watch([SRC_DIR + 'js/**/*.js', SRC_DIR + '**/*.html'], ['copy-js']);
});