let gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	include = require('gulp-file-include'),
	webp = require('gulp-webp'),
	imagemin = require('gulp-imagemin'),
	recompress = require('imagemin-jpeg-recompress');


gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions']
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({ stream: true }))
});


gulp.task('style', function () {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
	])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('build/css'))
});


gulp.task('script', function () {
	return gulp.src([
		'node_modules/slick-carousel/slick/slick.js',
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
});


gulp.task('html', function () {
	return gulp.src('app/*.html', '!app/blocks/**/*.html')
		.pipe(include({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({ stream: true }));
});


gulp.task('js', function () {
	return gulp.src('app/js/*.js')
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest('build/js'))
});


gulp.task('images', () => {
	return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(imagemin([
			recompress({
				loops: 4,
				min: 70,
				max: 80,
				quality: 'high'
			}),
			imagemin.gifsicle(),
			imagemin.optipng(),
			imagemin.svgo()
		]))
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({ stream: true }));
});


gulp.task('webp', () => {
	return gulp.src('app/img/**/*.+(png|jpg|jpeg)')
		.pipe(webp({
			quality: 80,
			preset: 'photo',
			method: 6
			// lossless: true
		}))
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "build/"
		},
		// tunnel: "mydev",
		// host: "192.168.0.103"
	});
});


gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
	gulp.watch('app/**/*.html', gulp.parallel('html'))
	gulp.watch('app/js/*.js', gulp.parallel('js'))
	gulp.watch('app/img/**/*.*', gulp.parallel('images'))
	gulp.watch('app/img/**/*.*', gulp.parallel('webp'))
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync', 'images', 'webp', 'html'))