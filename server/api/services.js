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
      include: [{
        model: db.Service,
        where: buildWhere
      }]
    })
      .then((results)=>{
        res.json(results)
      })
});

// router.get('/:type/:address', (req, res) => {
//     db.User.findAll({
//       where: {
//         address: req.params.address
//       },
//       include: [db.Service]
//     })
// });

module.exports = router;
