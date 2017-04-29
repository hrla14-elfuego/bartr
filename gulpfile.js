const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const Promise = require('bluebird');

env({
  file: './.env',
  type: 'ini'
});

const db = require('./server/db');

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
  const stream = nodemon({script: 'server/index.js'});
});

gulp.task('watch', function() {
  gulp.watch('server/db/*.js', ['seed']);
});

gulp.task('default', ['nodemon', 'watch']);