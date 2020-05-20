const express = require('express');
const router = express.Router();

const { LibraryTB, BookTB, AuthorTB } = require('../models/sequelize');
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

    let { authorization } = req.headers;

    let access = await checkPermission(GET_BOOKS, authorization);

    if (access) {
        BookTB.findAll({
            include: [
                AuthorTB
            ]
        }).then(resbooks => {
            
            let bookArr = [];
           
            if (resbooks) {

                console.log(resbooks);
                
                bookArr = resbooks && resbooks.map((books) => {

                    return {
                        book_id: books.dataValues.book_id,
                        book_name: books.dataValues.book_name,
                        authors: books.dataValues.authors.map(author => {
                            return {
                                author_id: author.author_id,
                                author_name: author.author_name
                            }
                        })
                    }
                })

                res.status(200).json(bookArr);
            }
            else {
                res.status(404).send("Library is broken");
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