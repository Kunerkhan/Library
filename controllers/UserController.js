const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();

const { checkPermission } = require('./PermissionController');
const { UserTB, LibraryTB, UserBooksTB } = require('../models/sequelize');
const {
  ADD_BOOK, GET_BOOKS,
  CHANGE_ROLE, DELETE_BOOK,
  DELETE_USER, DOWNLOAD_BOOK,
  ADD_USER, ADD_USER_BOOK,
  EDIT_USER_PROFILE, GET_USER_BOOK,
  GET_USERS
} = require('./roles');


/* GET home page. */
exports.login = (req, res) => {

  const username = req.body.user_name;
  const password = req.body.user_password;

  UserTB.findOne({
    where: {
     user_name: username
  }
  })
  .then(user => {
    console.log(user);
     if(password === user.user_password)
     {
      res.status(200).send({
        userName: user.user_name,
        roleId: user.user_role
      });
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

exports.getUsers = async(req, res) => {
  {
    let { user_role } = req.body;
    let access = await checkPermission(GET_USERS, user_role);
   
      if(access)
      {
        UserTB.findAll({
          attributes: ['user_id', 'user_name', 'user_password', 'user_role']
        }).then(users=> {
          res.status(200).send(users); 
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
      }
    

    }
};

exports.deleteUser = async(req, res) => {
  
  const id = req.params.id;
  const user_role = req.body.user_role;

  try{
    let access = await checkPermission(DELETE_USER, user_role);
    
    if(access)
    {
        UserTB.destroy({where: {user_id: id}})
        .then( user => {
          res.status(200).send(`User was deleted.`); 
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
    }
    else
    {
      console.log("sss", access);
      res.status(401).send({
        message: "Access denied."
      })
    }
  }
  catch(e)
  {
    console.log(e);
  }

};

exports.addUser = async (req, res) => {

  const {user_name, user_role, user_password} = req.body;

  let access = await checkPermission(ADD_USER, user_role);
  console.log(access);

  if(access)
  {
      UserTB.create({
        user_role: user_role, user_name: user_name, user_password: user_password})
      .then( user => {
        res.status(200).send(`User was created.`); 
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  }
  else
  {
    res.status(401).send({
      message: "Access denied."
    })
  }

}




