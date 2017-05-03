'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Message = require('../db').Message;

/////////////////////// Test Get //////////////////////
// router.get('/', (req, res, next) => {
//     Message.findAll()
//       .then(data => {
//         console.log('Services GET Request Successful');
//         res.status(200).send(data);
//       }).catch(next)
//     })

router.post('/', (req, res, next) => {
  Message.create({
    engagementId: req.body.engagementId,
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    message: req.body.message
  }).then(data => {
    console.log('Message POST Successful');
    res.status(200).send(data);
  }).catch(next)
})

module.exports = router;