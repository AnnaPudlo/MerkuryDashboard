var gulp = require('gulp');
var rename = require('gulp-rename');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var pngquant = require('imagemin-pngquant');
var webp = require('gulp-webp');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var swig = require('gulp-swig');
var path = require('path');
var data = require('gulp-data');
var fs = require('fs');

// variable for path to files
const paths = {
    src:{
        scss: './app/scss/app.scss',
        js: './app/js/app.js',
        img: './app/images/**/*.*',
    },
    dist:{
        css: './build/css',
        js: './build/js',
        img: './build/images',
    },
    js: {
        wow: './node_modules/wowjs/dist/wow.min.js'
    }
}


function sync(cb) {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    })

    cb();
}

gulp.task('sync', sync);

function compileStyle(cb) {

    gulp.src(paths.src.scss)
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .on('error', notify.onError(
            {
                message: "<%= error.message %> 😱",
                title: "Sass Error!"
            }
        ))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.css))
        .pipe(notify({ message: 'Styles task complete 😉', sound: false, onLast: true }))
        .pipe(browserSync.stream());

    cb();
}
gulp.task('compileStyle', compileStyle);

function buildHtml(cb) {
    let pugJson = JSON.parse( fs.readFileSync('./app/helpers/data/main.json', { encoding: 'utf8' }));
    gulp.src('app/*.pug')
    .pipe(data(function (file) {
        return JSON.parse(fs.readFileSync('./app/helpers/data/' + path.basename(file.path) + '.json'))
	}))
    .pipe(pug({
        pretty: true,
        locals: pugJson
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({ stream: true }));
    cb();
}

gulp.task('buildHtml', buildHtml);


function buildJs(cb) {


    gulp.src(paths.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.reload({ stream: true }));

        gulp.src(['app/js/*.js', '!app/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

gulp.task('buildJs', buildJs);

function imageBuild(cb) {
    gulp.src(paths.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(paths.dist.img));

        gulp.src('app/images/**/**.*')
        .pipe(webp())
        .pipe(gulp.dest(paths.dist.img))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

gulp.task('imageBuild', imageBuild);


function watchFiles(cb) {
    gulp.watch('./**/*.scss', compileStyle);
    gulp.watch(['app/**/*.pug', 'app/helpers/data/*.json'], buildHtml);
    gulp.watch('app/**/*.js', buildJs);

    cb();
}

function copyScripts(cb){
    
    gulp.src(paths.js.wow)
        .pipe(gulp.dest(paths.dist.js));

    cb();
}


function build(cb) {
    copyScripts(cb)
    buildHtml(cb);
    buildJs(cb);
    compileStyle(cb);
    imageBuild(cb);

    cb();
}

gulp.task('build', build);


gulp.task('default', gulp.parallel(build, sync, watchFiles))