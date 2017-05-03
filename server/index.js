const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//for dev testing
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});

app.use(morgan());
// app.use(expressSession({secret: 'bigboost'}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const router = require('./router');

app.use('/', router);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.set('port', (process.env.PORT));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
