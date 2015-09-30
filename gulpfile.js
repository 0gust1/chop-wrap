'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    fs = require('fs');


gulp.task("jsDist", function() {
    return browserify('./test/index.src.js', { debug: true})
        .bundle().pipe(fs.createWriteStream('./test/index.js'));
});


//Serveur local
gulp.task('devServer', function() {
    // Lancement du serveur local
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var http = require('http');

    var app = connect();

    /*app.use(require('connect-livereload')({
     port: 35729
     }));*/
    app.use(serveStatic('./test'));

    http.createServer(app).listen(8080);

    var opn = require('opn');
    opn('http://localhost:8080/');
});


gulp.task("dev", ["devServer"], function() {

});


gulp.task('default', function() {
    // place code for your default task here
});
