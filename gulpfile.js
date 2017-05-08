const gulp = require('gulp');
var gutil = require("gulp-util");
const nodemon = require('gulp-nodemon');
const Promise = require('bluebird');
const sequelize_fixtures = require('sequelize-fixtures');
const env = require('gulp-env');
const webpack = require ('webpack')
const webpackDevConfig = require('./webpack.config.dev');
const WebpackDevServer = require("webpack-dev-server");

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
  db.Service.sync({force: true})
    .then(()=>{
      return Promise.all([db.User.sync({force: true})])
    })
    .then(()=>{
      return Promise.all([db.Engagement.sync({force: true})])
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
  const stream = nodemon({
    script: 'server/index.js',
    watch: ["server/**"],
    ignore: ["client/**"]
  });
});

gulp.task('watch', function() {
  gulp.watch(['server/db/index.js', 'server/db/seedData/*.json'], ['seed']);
});

gulp.task("webpackhot", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpackDevConfig);

  new WebpackDevServer(compiler, {
    contentBase: "./client/static",
    publicPath: "/",
    hot: true,
    inline: true,
    stats: true
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    // gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    //  callback();
  });
});

gulp.task('default', ['nodemon', 'watch', 'webpackhot']);