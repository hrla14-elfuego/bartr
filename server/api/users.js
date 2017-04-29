'use strict';

const Sequelize = require('sequelize');
const Users = require('../db').Users;

module.exports = {
  get: (req, res) => {
    Users.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        console.log('Users GET Request Successful');
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Error with Users GET REQ: ', err);
        res.status(404);
      })
  },
  getServices: (req, res) => {
    Users.findAll({
      where: {
        serviceId: 
      }
    })
  },
  post: (req, res) => {
    Users.findOrCreate({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        console.log('Users POST Request Successful')
        res.status(201);
        res.json(data);
      })
      .catch(err => {
        console.log('Error with Users POST REQ: ', err);
        res.status(404);
      })
  },
  put: (req, res) => {
    Users.find({
      where: {
        email: req.body.email
      }
    })
        .on('success', result => {
          if(result) {
            result.updateAttributes({
              email: req.body.email,
              name: req.body.name,
              address: req.body.address,
              serviceId: req.body.serviceId
            })
          }
        })
        .catch(err => {
          console.log('Error with Users PUT REQ: ', err);
          res.status(404);
        })
  }
  // delete: (req, res) => {
  //   Users.destroy({
  //     where:{
  //       email: req.body.email
  //     }
  //   })
  //       .then(() => {
  //         res.redirect('/');
  //       })
  //       .catch(err => {
  //         console.log('Error with Users DELETE REQ: ', err);
  //         res.status(404);
  //       })
  // }
}