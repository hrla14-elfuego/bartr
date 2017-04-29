var path = require('path');
var express = require('express');
var expressSession = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan());
app.use(express.static(path.join(__dirname, '../client')));
app.use(expressSession({secret: 'bigboost'}));
app.use(bodyParser.json());

// var router = require('./routes.js');
// app.use('/api', router);

app.get('/hello', function(req,res){res.end('hello world')})

app.set('port', (process.env.PORT));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
