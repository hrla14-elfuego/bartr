'use strict';

const Sequelize = require('sequelize');
const Engagements = require('../db/index').Engagements;

module.exports = {
  get: (req, res) => {
    Engagements.findAll({
      where: {
        customerID: req.body.customerID,
        providerID: req.body.providerID
      }
    })
               .then(data => {
                 console.log('Engagements GET Request Successful');
                 res.status(200).send(data);
               })
               .catch(err => {
                 console.log('Error with Engagements GET REQ: ', err);
                 res.statsu(404);
               })
  },
  post: (req, res) => {
    Engagements.findOrCreate({
      where:{
        createdAt: req.body.createdAt
      }
    })
              .then(data => {
                console.log('Engagements POST Request Sucessful')
                res.status(201).send(data);
              })
              .catch(err => {
                console.log('Error with Engagements POST REQ: ', err);
                res.status(404);
              })
  },
  put: (req, res) => {
    Engagements.find({
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
              .catch(err => {
                console.log('Error with Engagements PUT REQ: ', err);
                res.status(404);
              })
  }
}