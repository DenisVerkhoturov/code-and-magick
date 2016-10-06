'use strict';

import del from 'del';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
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
 * Data task
 */
gulp.task('data', () => {
    return gulp.src('src/data/**/*.json')
        .pipe(gulp.dest('build/data'));
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
        'src/**/*.js',
        'data/*.json'],
        (event) => gulp.src(event.path).pipe(connect.reload())
    );

    gulp.watch('src/html/*.html', ['html']);
    gulp.watch('src/sass/**/*.sass', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/data/**/*.json', ['data']);
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
gulp.task('build', ['html', 'fonts', 'images', 'styles', 'scripts', 'data']);

/**
 * Lint js
 */
gulp.task('lint_js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Lint sass
 */
gulp.task('lint_sass', () => {
    return gulp.src('src/sass/**/*.s+(a|c)ss')
        .pipe(sassLint({
            configFile: '.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

/**
 * Lint task
 */
gulp.task('lint', ['lint_js', 'lint_sass']);

/**
 * Test task
 */
gulp.task('test', ['lint'], () => {
    return true;
});

gulp.task('default', ['build']);
