const Sequelize = require('sequelize');
const path = require('path');
// var cls = require('continuation-local-storage');

// namespace = cls.createNamespace('my-namespace');
// Sequelize.cls = namespace;

const sql = new Sequelize('bartrDB', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'bartr.sqlite3'),
  define: {
    underscored: true
  }
});

const Engagement = sql.define('Engagement', {
		complete: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
      defaultValue: false
		}
});

const Message = sql.define('Message', {
		message: {
			type: Sequelize.TEXT,
			allowNull: false
		}
});
 
const Review = sql.define('Review', {
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
		}
});

const Service = sql.define('Service', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(Service);
Service.hasMany(User);

Engagement.belongsTo(User,  { as: 'sender', foreignKey: { name: 'sender_id', allowNull: false }, onDelete: 'CASCADE' });
Engagement.belongsTo(User, { as: 'receiver', foreignKey: { name: 'receiver_id', allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Engagement, { as: 'sent_engagements', foreignKey: 'sender_id'});
User.hasMany(Engagement, { as: 'received_engagements', foreignKey: 'receiver_id'});

Message.belongsTo(Engagement);
Engagement.hasMany(Message);
Message.belongsTo(User,  { as: 'sender', foreignKey: { name: 'sender_id', allowNull: false }, onDelete: 'CASCADE' });
Message.belongsTo(User,  { as: 'receiver', foreignKey: { name: 'receiver_id', allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Message, { as: 'sent_messages', foreignKey: 'sender_id'});
User.hasMany(Message, { as: 'received_messages', foreignKey: 'receiver_id'});

Review.belongsTo(Engagement);
Engagement.hasMany(Review);
Review.belongsTo(User,  { as: 'sender', foreignKey: { name: 'sender_id', allowNull: false }, onDelete: 'CASCADE' });
Review.belongsTo(User,  { as: 'receiver', foreignKey: { name: 'receiver_id', allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Review, { as: 'sent_reviews', foreignKey: 'sender_id'});
User.hasMany(Review, { as: 'received_reviews',foreignKey: 'receiver_id'});

module.exports.User = User;
module.exports.Service = Service;
module.exports.Review = Review;
module.exports.Message = Message;
module.exports.Engagement = Engagement;
