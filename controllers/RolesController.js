const express = require('express');
const router = express.Router();

const {RolesTB} = require('../models/sequelize');

exports.getRoles = (req, res) => {

    let roles = [];

   RolesTB.findAll({
        attributes: ['role_id', 'role_name'],
          }).then(role => {
            res.status(200).json(role);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving roles."
            });
          });;
    return roles;     
}