'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;


router.get('/', (req, res, next) => {
  db.User.find({
    where: {auth0_id: req.user.sub}
    })
    .then((user)=>{
      return db.Engagement.findAll({
        where:{ $or: [{sender_id: user.id}, {receiver_id: user.id}] },
      })
    })
    .then(data => {
      // console.log('Engagement GET Request Successful');
      res.status(200).json(data);
    })
});

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