'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Review = require('../db').Review;

router.get('/', (req, res, next) => {
    Review.findAll()
      .then(data => {
        console.log('Services GET Request Successful');
        res.status(200).send(data);
      }).catch(next)
    })

router.post('/', (req, res, next) => {
  Review.create({
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    engagement_id: req.body.engagement_id,
    score: req.body.score,
    review: req.body.review
  }).then(data => {
    console.log('Review POST successful');
    res.status(200).send(data);
  }).catch(next);
});

module.exports = router;