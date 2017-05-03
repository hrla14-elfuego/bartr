'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;
const Message = db.Message;

const findAuth0User = require('./util').findAuth0User;

router.post('/', (req, res, next) => {
  let thisEngagement = null;
  Engagement.findByPrimary(req.body.engagement_id)
    .then((result)=>{
      thisEngagement = result;
      return findAuth0User(req)
      })
    .then((user)=>{
        // sender id comes from looking up the Auth0 user id
        // receiver id comes from grabbing the engagement and seeing who is the other party on the engagement besides the sender
        req.body['sender_id'] = user.id
        req.body['receiver_id'] = (thisEngagement.sender_id === user.id) ? thisEngagement.receiver_id : thisEngagement.sender_id;
        return Message.create(req.body)
    })
    .then(data => {
      console.log('Message POST Successful');
      res.status(200).send(data);
    })
});

module.exports = router;