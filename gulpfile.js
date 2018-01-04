var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	cssNano = require('gulp-cssnano'),
	browserSync = require('browser-sync'),
	concatJs = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', function() {
	return gulp.src('app/plugins/**/*.css')
	.pipe(concatCss('libs.css'))
	.pipe(cssNano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src('app/plugins/**/*.js')
	.pipe(concatJs('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'scripts', 'css-libs', 'sass'], function() {
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);

});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['scripts', 'img', 'clean', 'css-libs', 'sass'], function() {

	var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});