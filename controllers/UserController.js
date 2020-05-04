const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {UserTB} = require('../models/sequelize');
const {hideWindow} =require('./UserEvents');
 
/* GET home page. */
router.post('/login', function (req, res) {

  const { username, password } = req.body;

  console.log(typeof password);

  UserTB.findOne({
       where: {
                 user_name: username
              }
  }).then(user => {
      if (!user) {
        console.log('!user');
        res.redirect('/login');
      } else {
        if(password === user.dataValues.user_password)
        {
          res.redirect('/home');
        }
        else {
          res.render('loginView', {
            error: 'Пароль введен неправильно.',
            click: hideWindow
          });
        }
      }})
        .catch(errors => {
          console.log(errors)
          // res.render('errorLogin', {
          //   errors: e
          // });
        });
  //       bcrypt.compare(password, String(user.dataValues.user_password), function (err, result) {
  //       console.log(result);
  //    if (result == true) {
  //        res.redirect('/home');
  //    } else {
  //       console.log("Error");
  //    }
  //  });
  }
);

router.get('/users', (req, res) => {
  UserTB.findAll({
    attributes: ['user_id', 'user_name', 'user_password', 'user_role']
  }).then(users=> {
    res.render('users', {
      users: users
    })
  })
})



module.exports = router;


