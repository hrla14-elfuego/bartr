db = require('./server/db');
User=db.User;
Service=db.Service;

var z = User.findAll({ include: Service }).then(res=>{foundUsers2=res});

