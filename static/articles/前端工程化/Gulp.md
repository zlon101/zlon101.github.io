# 介绍

[前端利器 Gulp 介绍](https://octman.com/blog/2015-09-30-gulp-introduction/)

[前端构建工具gulpjs的使用介绍及技巧](https://www.cnblogs.com/2050/p/4198792.html)

[基于gulp的前端自动化方案](https://juejin.im/post/5bd04bdf6fb9a05d1c14d11a)

- demo

  ```js
  'use strict';
  let gulp = require('gulp')
  let util = require('util')
  let plugins = require('gulp-load-plugins')()
  let livereload = require('gulp-livereload')
  
  const globs = {
    script: 'app/script/app.es6',
    html: 'app/view/**/*.jade',
    less: 'app/less/*.less'
  }
  
  gulp.task('less', function() {
    return gulp.src(globs.less)
      .pipe(plugins.less())
      .pipe(gulp.dest('dist'))
      .pipe(livereload());
  });
  
  gulp.task('script', function () {
    return gulp.src(globs.script)
      .pipe(plugins.browserify({
        debug: true,
        transform: ['babelify'],
        extensions: ['.es6']
      }))
      .pipe(plugins.rename('bundle.js'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload());
  });
  
  gulp.task('html', function () {
    return gulp.src(globs.html)
      .pipe(plugins.jade({
        pretty: true
      }))
      .pipe(gulp.dest('dist'))
      .pipe(livereload())
  })
  
  gulp.task('server', function () {
    var exec = require('child_process').exec;
    exec('python -m SimpleHTTPServer 8080', function (error, stdout, stderr) {
      if (error) {
        console.log('stderr: ' + stdout);
      }
    });
  })
  
  gulp.task('watch', ['script', 'less', 'html'], function() {
    livereload.listen();
    ['less', 'script', 'html'].forEach(function (task) {
      gulp.watch(globs[task], [task]);
    });
  });
  gulp.task('default', ['server', 'watch']);
  ```

- Gulp 是基于**文件流**的构建系统(与 Grunt 的不同之处)，Gulp 存在的意义是因为 Grunt 的不足之处：

  1. 配置过于复杂；
  2. 糟糕的流程控制导致的临时文件/目录；

  Gulp 配置简单，API 也很少，

- 在介绍这个API之前我们首先来说一下Grunt.js和Gulp.js工作方式的一个区别。Grunt主要是以文件为媒介来运行它的工作流的，比如在Grunt中执行完一项任务后，会把结果写入到一个临时文件中，然后可以在这个临时文件内容的基础上执行其它任务，执行完成后又把结果写入到临时文件中，然后又以这个为基础继续执行其它任务...就这样反复下去。而在Gulp中，使用的是Nodejs中的[stream](http://nodejs.org/api/stream.html)(流)，首先获取到需要的stream，然后可以通过stream的`pipe()`方法把流导入到你想要的地方，比如Gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以Gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是Gulp的速度比Grunt快的一个原因。再回到正题上来，`gulp.src()`方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流([Vinyl files](https://github.com/wearefractal/vinyl-fs))，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息，这个我们暂时不用去深入理解，你只需简单的理解可以用这个方法来读取你需要操作的文件就行了。其语法为：

# 使用

Gulp 的使用关键在于 `gulpfile.js` 文件的配置。