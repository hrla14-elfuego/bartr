var Sequelize = require('sequelize');

module.exports.Engagements = Sequelize.define('Engagements', {
		customerId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		providerId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		complete: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'Engagements'
	});
k
module.exports.Messages = Sequelize.define('Messages', {
		engagementId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fromId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		toId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'Messages'
	});
 
module.exports.Reviews = Sequelize.define('Reviews', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		engagementId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		review: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'Review'
	});

 
 module.exports.Services = Sequelize.define('Services', {
		type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Services'
	});


 module.exports.Users = Sequelize.define('Users', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
      validate: { isEmail: true }
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.JSON,
			allowNull: true
		},
		serviceId: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'Users'
	});
 