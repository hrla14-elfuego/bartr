'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Engagement = require('../db').Engagement;
const Message = require('../db').Message;


router.get('/', (req, res, next) => {
  Engagement.findAll({
    where: {
      customerID: req.body.customerID,
      providerID: req.body.providerID
    },
    include:[Message]
  })
    .then(data => {
      console.log('Engagement GET Request Successful');
      res.status(200).send(data);
    })
    .catch(next)
})

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