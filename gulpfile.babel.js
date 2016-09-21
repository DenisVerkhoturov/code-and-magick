'use strict';

import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import connect from 'gulp-connect';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

/**
 * HTML task
 */
gulp.task('html', () => {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('build'));
});

/**
 * Fonts task
 */
gulp.task('fonts', () => {
    return gulp.src(['src/fonts/*-webfont.*'])
        .pipe(gulp.dest('build/fonts'));
});

/**
 * Images task
 */
gulp.task('images', () => {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'));
});

/**
 * Styles task
 */
gulp.task('styles', () => {
    return gulp.src('src/sass/index.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('build/css/'));
});

/**
 * Scripts task
 */
gulp.task('scripts', () => {
    const bundler = browserify('src/js/index.js', { debug: true })
        .transform(babelify, { presets: ['es2015', 'react'], sourceMaps: true });

    bundler.bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/js'));
});

/**
 * Connect task
 */
gulp.task('connect', () => {
    connect.server({
        root: ['build'],
        livereload: true
    });
});

/**
 * Watch task
 */
gulp.task('watch', ['connect'], () => {
    gulp.watch(
        ['src/html/*.html',
        'src/sass/**/*.sass',
        'src/**/*.js'],
        (event) => gulp.src(event.path).pipe(connect.reload())
    );

    gulp.watch('src/html/*.html', ['html']);
    gulp.watch('src/sass/**/*.sass', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
});

/**
 * Clean build task
 */
gulp.task('clean', () => {
    del(['build']);
});

/**
 * Build task
 */
gulp.task('build', ['html', 'fonts', 'images', 'styles', 'scripts']);

gulp.task('default', ['build']);
