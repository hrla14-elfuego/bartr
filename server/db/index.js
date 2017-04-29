var Sequelize = require('sequelize');
var path = require('path');
// var cls = require('continuation-local-storage');

// namespace = cls.createNamespace('my-namespace');
// Sequelize.cls = namespace;

var sql = new Sequelize('bartrDB', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'bartr.sqlite3')
});

module.exports.Engagements = sql.define('Engagements', {
		customerId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		providerId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		complete: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'Engagements'
	});

module.exports.Messages = sql.define('Messages', {
		engagementId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		fromId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		toId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		message: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'Messages'
	});
 
module.exports.Reviews = sql.define('Reviews', {
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		engagementId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		score: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		review: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'Review'
	});

 
 module.exports.Services = sql.define('Services', {
		type: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Services'
	});


 module.exports.Users = sql.define('Users', {
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
      validate: { isEmail: true }
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		address: {
			type: Sequelize.JSON,
			allowNull: true
		},
		serviceId: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'Users'
	});
 