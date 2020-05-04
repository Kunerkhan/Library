const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {UserTB} = require('../models/sequelize');
 
/* GET home page. */
router.post('/login', function (req, res) {

  const { username, password } = req.body;

  let hash = bcrypt.hash(password, 10);

  console.log(typeof password);

  UserTB.findOne({
       where: {
                 user_name: username
              }
  }).then(function (user) {
      if (!user) {
        console.log('!user');
        res.redirect('/registe');
      } else {
        if(password === user.dataValues.user_password)
        {
          res.redirect('/home');
        }
        else
        {
          res.redirect('/login');
        }
  //       bcrypt.compare(password, String(user.dataValues.user_password), function (err, result) {
  //       console.log(result);
  //    if (result == true) {
  //        res.redirect('/home');
  //    } else {
  //       console.log("Error");
  //    }
  //  });
  }
});
});


module.exports = router;
