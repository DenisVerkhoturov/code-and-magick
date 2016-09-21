'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

gulp.task('scripts', () => {
        const bundler = browserify('src/js/index.js', {debug: true})
            .transform(babelify, {presets: ['es2015', 'react'], sourceMaps: true});

        bundler.bundle()
            .pipe(source('scripts.js'))
            .pipe(buffer())
            .pipe(gulp.dest('build/js'));
    });

gulp.task('build', ['scripts']);

gulp.task('connect', () => {
    connect.server({
        root: ['build'],
        livereload: true
    });
});

gulp.task('watch', ['connect'], () => {
    gulp.watch(
        ['src/**/*.js'],
        event => {
            return gulp.src(event.path).pipe(connect.reload());
        });

    gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('default', ['build']);
