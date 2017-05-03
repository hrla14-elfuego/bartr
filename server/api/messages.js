'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;
const Message = db.Message;

const findAuth0User = require('./util').findAuth0User;

router.post('/', (req, res, next) => {
  findAuth0User(req)
    .then((user)=>{
        req.body['sender_id'] = user.id
      return Message.create(req.body)
    })
    .then(data => {
      console.log('Message POST Successful');
      res.status(200).send(data);
    })
});

module.exports = router;