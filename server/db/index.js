const Sequelize = require('sequelize');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  const sql = new Sequelize('bartrDB', null, null, {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'bartr.sqlite3'),
    define: {
      underscored: true
    }
  });
} else {
	var cls = require('continuation-local-storage');
	var namespace = cls.createNamespace('my-namespace');
	Sequelize.cls = namespace;
  const sql= new Sequelize(process.env.DATABASE_URL);
}

const Engagement = sql.define('engagement', {
		complete: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
      defaultValue: false
		}
});

const Message = sql.define('message', {
		message: {
			type: Sequelize.TEXT,
			allowNull: false
		}
});
 
const Review = sql.define('review', {
		score: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		review: {
			type: Sequelize.TEXT,
			allowNull: false
		}
});

const User = sql.define('user', {
		email: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
      validate: { isEmail: true }
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		address: {
			type: Sequelize.STRING,
			allowNull: true
		},
		geo_lat: {
			type: Sequelize.FLOAT(10,6),
			allowNull: true
		},
		geo_long: {
			type: Sequelize.FLOAT(10,6),
			allowNull: true
		},
		auth0_id: {
			type: Sequelize.STRING,
			allowNull: false,
      unique: true
		}
}, {
	indexes: [
		{fields: ['geo_long', 'geo_lat']}
	]
});

const Service = sql.define('service', {
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
