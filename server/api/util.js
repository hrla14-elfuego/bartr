'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;
const Message = db.Message;

module.exports.findAuth0User = function(req){
  return User.find({
    where: {auth0_id: req.user.sub}
  })
};
