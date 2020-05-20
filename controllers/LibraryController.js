const express = require('express');
const router = express.Router();

const {LibraryTB, BookTB, AuthorTB} = require('../models/sequelize');
const { checkPermission } = require('./PermissionController');
const {
    ADD_BOOK, GET_BOOKS,
    CHANGE_ROLE, DELETE_BOOK,
    DELETE_USER, DOWNLOAD_BOOK,
    ADD_USER, ADD_USER_BOOK,
    EDIT_USER_PROFILE, GET_USER_BOOK,
    GET_USERS, SEARCH_BOOK,
    GET_USER_ID
  } = require('./roles');
  
  

exports.getAllbooks = async (req, res) => {
    let { authorization} = req.headers;
    
    let access = await checkPermission(GET_BOOKS, authorization);
    
    if(access)
    {
      BookTB.findAll({
        include: [
            AuthorTB
        ]
      }).then(book => {
          if(book)
          {
            let bookArr = [];
            // res.json(book).map((item) => {
            //     if(item.book_id == book_id)
            //     {
            //         bookArr.push({
            //             book_id: item.book_id,
            //             book_name: item.book_name,
            //             author: [
                            
            //             ]
            //         })
            //     }
            //     else
            //     {
            //         bookArr.push(item)
            //     }
            // })
            res.status(200).json(book); 
          }
          else
          {
            console.log("dd", book);
          }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
    }

     
} 