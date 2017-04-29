const Sequelize = require('sequelize');
const path = require('path');
// var cls = require('continuation-local-storage');

// namespace = cls.createNamespace('my-namespace');
// Sequelize.cls = namespace;

const sql = new Sequelize('bartrDB', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'bartr.sqlite3')
});

const Engagement = sql.define('Engagement', {
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
});

const Message = sql.define('Message', {
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
});
 
const Review = sql.define('Review', {
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
});

const User = sql.define('User', {
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
});

const Service = sql.define('Service', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(Service);
Service.hasMany(User);

module.exports.User = User;
module.exports.Service = Service;
module.exports.Review = Review;
module.exports.Message = Message;
module.exports.Engagement = Engagement;
