'use strict';

const Sequelize = require('sequelize');
const Service = require('../db').Service;
const User = require('../db').User;
const router = require('express').Router();

router.get('/:address', (req, res) => {
    User.findAll({
      where: {
        address: req.params.address
      },
      include: [Service]
    })
})

router.get('/:type/:address', (req, res) => {
    User.findAll({
      where: {
        address: req.params.address
      },
      include: [Service]
    })
})

module.exports = router;