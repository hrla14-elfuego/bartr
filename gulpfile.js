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

gulp.task('nodemon', function () {

  var stream = nodemon({script: 'server/index.js'});

  stream
    .on('restart', function () {
      console.log('restarted!')
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10)  // restart the server in 10 seconds
    })
});

gulp.task('seed', ['seed:wipe']);

gulp.task('watch', function() {
  gulp.watch('server/model/*.js', ['seed']);
});


gulp.task('default', ['nodemon', 'watch']);