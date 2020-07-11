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
    console.log(access);
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
                        bookId: books.dataValues.bookId,
                        bookName: books.dataValues.bookName,
                        authors: books.dataValues.authors.map(author => {
                            return {
                                authorId: author.authorId,
                                authorName: author.authorName
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