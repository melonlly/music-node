var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

var args = process.argv.splice(2) // 命令参数

gulp.task('clean', function () {
	return del('dist')
})

gulp.task('scripts', function () {
	return gulp.src('src/**/*.ts')
		.pipe(tsProject())
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-data', function () {
	return gulp.src('src/data/**/*.json')
			.pipe(gulp.dest('dist/data/'))
})

gulp.task('watch-ts', gulp.series('scripts', function () {
	gulp.watch('src/**/*.ts', gulp.series('scripts'));
}));
gulp.task('watch-data', gulp.series('copy-data', function () {
	gulp.watch('src/data/**/*.json', gulp.series('copy-data'));
}))

gulp.task('watch', gulp.series('clean', gulp.parallel('watch-ts', 'watch-data')))
gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'copy-data')))

gulp.task('default', gulp.series(args.indexOf('-w') > -1 ? 'watch' : 'build'))