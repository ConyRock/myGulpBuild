import gulp from 'gulp'
import less from 'gulp-less'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import { deleteAsync } from 'del'


const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}


function clean() {
    return deleteAsync(['dist'])
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}


const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)


export {clean}
export {styles}
export {scripts}
export {watch}
export {build}
export default build



// const less = require('less')     // CommonJS
// const del = require('del')       // CommonJS

// exports.clean = clean            // CommonJS
// export default clean             // ECMAScript