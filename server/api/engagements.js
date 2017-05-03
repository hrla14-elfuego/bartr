'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Engagement = require('../db').Engagement;
const Message = require('../db').Message;

router.get('/', (req, res, next) => {
  Engagement.findAll({
    // where: {
    //   sender_id: req.params.sender_id,
    //   receiver_id: req.params.receiver_id
    // },
    include: [Message]
  }).then(data => {
    console.log('Engagement GET Request Successful');
    res.status(200).send(data);
  }).catch(next)
})

router.post('/', (req, res, next) => {
  Engagement.create({
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id
  }).then(data => {
    console.log('Engagement POST Request Sucessful');
    res.status(201).send(data);
  }).catch(next)
})

router.put('/:id', (req, res, next) => {
  Engagement.find({
    where:{
      id: req.params.id,
      complete: false
    }
  }).then(data => {
    data.updateAttributes({
      complete: req.body.complete
    })
    res.status(202).send(data);
  }).catch(next)
})

module.exports = router;