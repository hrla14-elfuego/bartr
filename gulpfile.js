const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const Promise = require('bluebird');
const sequelize_fixtures = require('sequelize-fixtures');
const env = require('gulp-env');

env({
  file: './.env',
  type: 'ini'
});

//put this after .env file load as db needs some of those env variables
const db = require('./server/db');

const models = {
  'User': db.User,
  'Service': db.Service,
  'Engagement': db.Engagement,
  'Review': db.Review,
  'Message': db.Message
};

gulp.task('seed:wipe', function(cb){
  db.User.sync({force: true})
    .then(()=>{
      return Promise.all([db.Service.sync({force: true}), db.Engagement.sync({force: true})])
    })
    .then(()=>{
      return Promise.all([db.Message.sync({force: true}), db.Review.sync({force: true})])
    })
    .then(()=>{cb()})
    .catch((err)=>{cb(err)})
});

gulp.task('seed:seed', ['seed:wipe'], function(cb){
  sequelize_fixtures.loadFile('./server/db/seedData/seedData.json', models)
    .then(() => {
      return sequelize_fixtures.loadFile('./server/db/seedData/engagement*.json', models)
    })
    .then(() => {
      cb()
    })
    .catch((err)=>{cb(err)})
});

gulp.task('seed', ['seed:wipe', 'seed:seed']);

gulp.task('nodemon', function () {
  const stream = nodemon({script: 'server/index.js'});
});

gulp.task('watch', function() {
  gulp.watch('server/db/*.js', ['seed']);
});

gulp.task('default', ['nodemon', 'watch']);