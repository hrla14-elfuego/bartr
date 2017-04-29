const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
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
