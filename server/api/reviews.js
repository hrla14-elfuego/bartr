'use strict';

// const Sequelize = require('sequelize');
// const router = require('express').Router();
// const Review = require('../db').Review;
//
// router.post('/', (req, res, next) => {
//   Review.create({
//     userId: req.body.userId,
//     engagementId: req.body.engagementId,
//     score: req.body.score,
//     review: req.body.review
//   })
//     .then(data => {
//       console.log('Review POST successful');
//       res.status(200).send(data);
//     })
//     .catch(next);
// });
//
// module.exports = router;

'use strict';

const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../db');

const Engagement = db.Engagement;
const User = db.User;
const Message = db.Message;

const findAuth0User = require('./util').findAuth0User;

router.post('/', (req, res, next) => {
  let current_user, current_engagement;
  findAuth0User(req)
    .then((user)=>{
      current_user = user;
      req.body['sender_id'] = user.id
      return db.Engagement.findByPrimary(req.body.engagement_id)
    })
    .then((engagement)=>{
      current_engagement = engagement;
      req.body['receiver_id'] = (current_engagement.sender_id === current_user.id) ? current_engagement.receiver_id : current_engagement.sender_id;
      return db.Review.create(req.body)
    })
    .then(data => {
      console.log('Review POST Successful');
      res.status(200).send(data);
    })
});

module.exports = router;