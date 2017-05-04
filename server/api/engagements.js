'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;
const Message = db.Message;

const findAuth0User = require('./util').findAuth0User;

router.get('/', (req, res, next) => {
  let showComplete = req.query.completed === 'true';
  findAuth0User(req)
    .then((user)=>{
      return Engagement.findAll({
        where:{ $or: [{sender_id: user.id}, {receiver_id: user.id}], complete: showComplete },
        include: [
          { model: db.Message },
          { model: db.User, as: 'sender' },
          { model: db.User, as: 'receiver' },
          { model: db.Review },
      ],
        order: [
          [ 'created_at', 'DESC' ],
          [ db.Message, 'created_at', 'DESC' ]
        ]
      })
    })
    .then(data => {
      // console.log('Engagement GET Request Successful');
      res.status(200).json(data);
    })
});

router.get('/:engagement_id', (req, res, next) => {
    Engagement.find({
      where: {id: req.params.engagement_id},
      include: [ Message ]
    })
    .then(data => {
      // console.log('Engagement GET Request Successful');
      res.status(200).json(data);
    })
});

router.post('/', (req, res, next) => {
  findAuth0User(req)
  .then((user)=>{
    req.body['sender_id'] = user.id;
    return Engagement.create(req.body)
  })
  .then(data => {
    console.log('Engagement POST Request Sucessful')
    res.status(201).json(data);
  })
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