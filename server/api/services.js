'use strict';

const Sequelize = require('sequelize');
const db = require('../db');
const router = require('express').Router();

const getBoundingBox = require('./util').getBoundingBox;

router.get('/', (req, res) => {
  db.Service.findAll()
    .then((result)=>{
      res.json(result)
    })
});

router.get('/find', (req, res) => {
  let provided_long = Number(req.query.long);
  let provided_lat = Number(req.query.lat);
  let requested_services = req.query.services;
  let provided_distance = req.query.distance;
  let boundingBox = getBoundingBox([provided_lat, provided_long], provided_distance)
  console.log('location', provided_lat, provided_long)
  console.log('box', boundingBox)
  let buildWhere = {};
  if (requested_services){
    buildWhere = {id: requested_services}
  }
    db.User.findAll({
      where: {
        geo_long: {$gte: boundingBox[0], $lte: boundingBox[2]},
        geo_lat: {$gte: boundingBox[1], $lte: boundingBox[3]}
      },
      include: [
        {
        model: db.Service,
        where: buildWhere
        },
        // {
        //   model: db.Review,
        //   as: 'received_reviews',
        //   attributes: ['score']
        // }
      ],
      // attributes: Object.keys(db.User.attributes).concat([[Sequelize.fn('AVG', Sequelize.col('received_reviews.score')), 'avgscore']]),
      // group:['user.id']
    })
      .then((results)=>{
        res.json(results)
      })
});

router.post('/', (req, res, next) => {
  db.Service.findOne({
    where:{
      type: req.body.type
    }
  })
    .then(data => {
      if(!data) {
        db.Service.create({
          type: req.body.type
        })
          .then(data => {
            res.status(201).send(data);
            console.log('POST REQ for Services successful: ', data);
          })
          .catch(next);
      }
    })
    .catch(next);
})

module.exports = router;
