const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();

const { checkPermission } = require('./PermissionController');
const { UserTB, LibraryTB, UserBooksTB, BookTB, AuthorTB, AUTHORBOOKSTB } = require('../models/sequelize');
const {
  ADD_BOOK, GET_BOOKS,
  CHANGE_ROLE, DELETE_BOOK,
  DELETE_USER, DOWNLOAD_BOOK,
  ADD_USER, ADD_USER_BOOK,
  EDIT_USER_PROFILE, GET_USER_BOOK,
  GET_USERS, SEARCH_BOOK,
  GET_USER_ID, EDIT_USER, GET_ROLES
} = require('./roles');


/* GET home page. */
exports.login = (req, res) => {

  const username = req.body.userName;
  const password = req.body.userPassword;
  console.log(req.body)

  UserTB.findOne({
    where: {
      userName: username
    }
  })
    .then(user => {
      console.log(user);
      if (password === user.userPassword) {

        res.status(200).send({
          userId: user.userId,
          roleId: user.roleId
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

exports.getUsers = async (req, res) => {

  let { authorization } = req.headers;

  let access = await checkPermission(GET_USERS, authorization);
  console.log(access);

  if (access) {
    UserTB.findAll({
      attributes: ['userId', 'userName', 'userPassword', 'roleId']
    }).then(users => {
      res.status(200).json(users);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  }
  else
  {
    res.status(401).send("Access denied");
  }
};

exports.getUserById = async (req, res) => {

  let { authorization } = req.headers;
  const id = req.params.id;
  
  let access = await checkPermission(GET_USER_ID, authorization);

  if (access) {
    UserTB.findOne({
      include: {
        model: BookTB,
        include: AuthorTB
      },
      where: {
        user_id: id
      }
    }).then(user => {
      if(user)
      {
        let userInfo = 
          {
            user_id: user.dataValues.user_id,
            user_name: user.dataValues.user_name,
            user_password: user.dataValues.user_password,
            role_id: user.dataValues.role_id,
            books: user.dataValues.books.map((item) => {
              return {
                book_id: item.book_id,
                book_name: item.book_name,
                authors: item.authors.map((author) => {
                  return {
                    author_id: author.author_id,
                    author_name: author.author_name
                  }
                })
              }
            })
          };
      
        res.status(200).json(userInfo);
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

exports.deleteUser = async (req, res) => {

  const id = req.params.id;
  let { authorization } = req.headers;

  try {
    let access = await checkPermission(DELETE_USER, authorization);

    if (access) {
      UserTB.destroy({ where: { user_id: id } })
        .then(user => {
          res.status(200).send(`User was deleted.`);
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    }
    else {
      console.log("sss", access);
      res.status(401).send({
        message: "Access denied."
      })
    }
  }
  catch (e) {
    console.log(e);
  }

};

exports.addUser = async (req, res) => {

  const { user_name, user_password, role_id } = req.body;
  let { authorization } = req.headers;

  let access = await checkPermission(ADD_USER, authorization);
  console.log(access);

  if (access) {
    UserTB.create({
      role_id: role_id, user_name: user_name, user_password: user_password
    })
      .then(user => {
        res.status(200).send(`User was created.`);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  }
  else {
    res.status(401).send({
      message: "Access denied."
    })
  }

}

exports.editUser = async (req, res) => {

  const id = req.params.id;
  console.log(req.params);
  let { authorization } = req.headers;
  const { user_name, user_password, role_id } = req.body;

  let access = await checkPermission(EDIT_USER, authorization);
 

  if (access) {
    UserTB.update({
      role_id: role_id, user_name: user_name, user_password: user_password
    },
      {
        where: {
          user_id: id
        }
      }
    )
      .then(user => {
        res.status(200).send(`User was edited.`);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while editing users."
        });
      });
  }
  else {
    res.status(401).send({
      message: "Access denied."
    })
  }
};

exports.addBook = async (req, res) => {

  let { authorization } = req.headers;
  let { author_name, book_name } = req.body;

  let access = await checkPermission(ADD_BOOK, authorization);

  if (access) {
    let id = await getAuthor(author_name);

    if (typeof id === "number") {
      BookTB.create({ book_name: book_name, book_author: id })
        .then(book => {
          let idBook = book.dataValues.book_id;

          // LibraryTB.create({
          //   book_id: idBook, author_id: id
          // }).catch(err=>console.log(err));
          res.status(200).send(`Book was added.`);
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    }
    else if (typeof id === "string") {
      AuthorTB.create({
        author_name: author_name
      })
        .then(author => {

          let idAuthor = author.dataValues.author_id;

          BookTB.create({ book_name: book_name, book_author: idAuthor })
            .then(book => {
              let idBook = book.dataValues.book_id;

              // LibraryTB.create({
              //   book_id: idBook, author_id: idAuthor
              // }).catch(err=>console.log(err));

            })
            .catch(err => console.log(err));
          res.status(200).send(`Book was added.`);
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    }
  } else {
    res.status(401).send({
      message: "Access denied."
    })
  }


}
exports.editBook = (req, res) => {



}


exports.getUserBooks = async (req, res) => {

  let { authorization } = req.headers;
  let user_id = req.params.id;

  let access = await checkPermission(GET_USER_BOOK, authorization);

  if (access) {
    UserTB.findOne({
      include: {
        model: BookTB,
        include: AuthorTB
      },
      where: {
        user_id: user_id
      }
    }).then(users => {
      if (users) {
        let userBooks;

        userBooks = users && users.dataValues.books.map((books) => {
        
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
        res.status(200).json(userBooks);
      }
      else {
        res.status(404).send("User not found")
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


exports.deleteBook = async (req, res) => {

  const id = req.params.id;
  let { authorization } = req.headers;

  try {
    let access = await checkPermission(DELETE_USER, authorization);

    if (access) {
      BookTB.destroy({ where: { book_id: id } })
        .then(book => {
          res.status(200).send(`User was deleted.`);
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    }
    else {
      console.log("sss", access);
      res.status(401).send({
        message: "Access denied."
      })
    }
  }
  catch (e) {
    console.log(e);
  }
}

exports.search = async (req, res) => {

  let { authorization } = req.headers;

  
  let query = req.query.bookName;
  console.log(query);
  let access = await checkPermission(SEARCH_BOOK, authorization);

  if (access) {
    BookTB.findAll({
      include: [
        AuthorTB
    ],
      where: {
        bookName: query
      }
    }).then(book => {
      
       if(book)
       {
         console.log(book);
         let result = book && book.map((item) => {
           return {
            bookId: item.dataValues.bookId,
            bookName: item.dataValues.bookName,
            authors: item.dataValues.authors.map(author => {
             return {
               authorId: author.authorId,
               authorName: author.authorName
             }})
           }
         })
         res.status(200).json(result);
       }
       else
       {
         res.status(404).send("Book is not exist");
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

