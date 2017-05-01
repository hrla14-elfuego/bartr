'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const Review = require('../db').Review;

router.post('/', (req, res, next) => {
  Review.create({
    userId: req.body.userId,
    engagementId: req.body.engagementId,
    score: req.body.score,
    review: req.body.review
  })
    .then(data => {
      console.log('Review POST successful');
      res.status(200).send(data);
    })
    .catch(next);
});

module.exports = router;