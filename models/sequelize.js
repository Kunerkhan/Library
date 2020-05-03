const Sequelize = require('sequelize')
const mysql = require('mysql');
const AuthorModel = require('./author');
const BookModel = require('./book');

const connection = require('./db');


const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
    host: 'localhost',
    dialect: 'mysql'
});

const Book = BookModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);

// Author has Many to book
Author.hasMany(Book);

sequelize.sync({ force: false })
.then(() => {
console.log(`Database & tables created here!`)
})

module.exports = {
Author,
Book
}