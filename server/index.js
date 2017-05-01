const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan());
app.use(expressSession({secret: 'bigboost'}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.static(path.join(__dirname, '../client')));

const router = require('./router');

app.use('/', router);

app.set('port', (process.env.PORT));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
