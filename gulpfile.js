//引入gulp组件
var gulp = require('gulp');
//js语法检查
var jshint = require('gulp-jshint');
//less预处理
var less = require('gulp-less');
//文件合并
var concat = require('gulp-concat');
//js压缩
var uglify = require('gulp-uglify');
//server服务
browserSync = require('browser-sync').create();

var jsFiles = [
  './node_modules/angular/angular.js'
];

//检查脚本
gulp.task('lint', function() {
  gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

})

gulp.task('html',function(){
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
})

//编译less
gulp.task('less', function() {
  gulp.src('./src/style/*.less')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'));
})

//合并、压缩js文件
gulp.task('scripts', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
//合并、压缩来自npm的js资源文件
gulp.task('npmscripts', function() {
  return gulp.src(jsFiles)
  .pipe(concat('npm.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
})

//使用connect启动一个Web服务器
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

//默认任务
gulp.task('default',['lint','less','scripts','npmscripts','html','browserSync'], function() {

  gulp.watch('./src/**/*.js', ['lint', 'scripts']);

  gulp.watch('./src/**/*.less', ['less']);

  gulp.watch('./src/**/*.html',['html']);

  gulp.watch('./src/**', function() {
    browserSync.reload();
  });

})