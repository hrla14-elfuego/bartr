var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var Promise = require('bluebird');

env({
  file: './.env',
  type: 'ini'
});

var db = require('./server/db');

gulp.task('seed:wipe', function(cb){
  db.Users.sync({force: true})
    .then(()=>{
      return Promise.all([db.Services.sync({force: true}), db.Engagements.sync({force: true})])
    })
    .then(()=>{
      return Promise.all([db.Messages.sync({force: true}), db.Reviews.sync({force: true})])
    })
    .then(()=>{cb()})
    .catch((err)=>{cb(err)})
});

gulp.task('seed', ['seed:wipe']);

gulp.task('nodemon', function () {
  var stream = nodemon({script: 'server/index.js'});
});

gulp.task('watch', function() {
  gulp.watch('server/db/*.js', ['seed']);
});

gulp.task('default', ['nodemon', 'watch']);