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
  let current_user, current_recipient;
  findAuth0User(req)
    .then((user)=>{
      current_user = user;

    })
    .then(data => {
      console.log('Message POST Successful');
      res.status(200).send(data);
    })
});

module.exports = router;