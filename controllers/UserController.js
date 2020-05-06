const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {UserTB} = require('../models/sequelize');

/* GET home page. */
exports.findOne = (req, res) => {

  const username = req.body.user_name;
  const password = req.body.user_password;

  UserTB.findOne({
    where: {
     user_name: username
 }
}).then(user => {
    console.log(user);
     if(password === user.user_password)
     {
      res.status(200).send(user);
     }
     else {
       res.send("Проверьте логин или пароль.")
     }
   })
   .catch(err => {
    res.status(500).send({
      message: "Такого пользователя не существует"
    });
  });
};

exports.findAll = (req, res) => {
  UserTB.findAll({
    attributes: ['user_id', 'user_name', 'user_password', 'user_role']
  }).then(users=> {
    res.send(users); 
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

// router.post('/deleteuser/:id', (req, res) => {

//   const {user_id} = req.body;

//   UserTB.findOne({where: {id: user_id}})
//   .then( user => {
//     console.log(user)
//  });


// });





