
/*引入各种插件*/
var gulp = require('gulp'),//基础插件
    //css文件预处理：
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    //http服务器，且具有浏览器同步执行操作功能(全端：pc端&移动端)
    browserSync = require('browser-sync').create();//create()：创建唯一的实例并允许创建多个服务器或代理。
/*各种函数*/

/*----------------开发环境---------------------*/
//浏览器同步函数：小服务器
gulp.task('browserSync',function(){
    browserSync.init({//启动服务器
        server: {baseDir: "./"}
    });
    gulp.watch('lib/sass/sass/*', ['sass']);
    gulp.watch(['js/*.js','css/*.css','*.html','img/*']).on('change', browserSync.reload);
});
//css预处理函数：如执行时文件报错运行可解>npm rebuild node-sass
gulp.task('sass', function() {
    gulp.src(['lib/sass/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});
gulp.task('compass', function() {
    gulp.src('lib/sass/sass/*.scss')
        .pipe(compass({
            config_file:'lib/sass/config.rb',
            css:'css',
            sass:'lib/sass/sass'
        }))
        .pipe(gulp.dest('css'));
});