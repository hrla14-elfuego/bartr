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
  Engagement.findOrCreate({
    where:{
      createdAt: req.body.createdAt
    }
  })
    .then(data => {
      console.log('Engagement POST Request Sucessful')
      res.status(201).send(data);
    })
    .catch(next)
})

router.put('/', (req, res, next) => {
  Engagement.find({
    where:{
      complete: false
    }
  })
    .on('success', data => {
      if(data){
        data.updateAttributes({
          complete: req.body.compelte
        })
      }
    })
    .catch(next)
})

module.exports = router;