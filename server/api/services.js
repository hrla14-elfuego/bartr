'use strict';

const Sequelize = require('sequelize');
const Service = require('../db').Service;
const User = require('../db').User;
const router = require('express').Router();

router.get('/:address', (req, res, next) => {
    User.findAll(
      {
        where: {
          address: req.params.address
        },
        include: [Service]
      }).then(data => {
        console.log('Services GET Request Successful');
        res.status(200).send(data);
      }).catch(next)
    })

router.get('/:type/:address', (req, res, next) => {
    User.findAll({
      where: {
        address: req.params.address
      },
      include: [Service]
    })
})

module.exports = router;