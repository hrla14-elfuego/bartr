'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Message = require('../db').Message;

router.post('/', (req, res, next) => {
  Message.create({
    engagementId: req.body.engagementId,
    fromId: req.body.fromId,
    toId: req.body.toId,
    message: req.body.message
  })
    .then(data => {
      console.log('Message POST Successful');
      res.status(200).send(data);
    })
    .catch(next);
})

module.exports = router;