const Sequelize = require('sequelize')
const mysql = require('mysql');

const AUTHORMODEL = require('./author');
const BOOKMODEL = require('./book');
const LIBRARYMODEL = require('./library');
const USERBOOKSMODEL = require('./userbooks');
const PERMISIONSMODEL = require('./permisions');
const USERPERMISSIONSMODEL = require('./userpermisions');
const USERMODEL = require('./users');
const ROLESMODEL = require('./roles');

const {DATABASE_NAME,USER,PASSWORD,HOST,DIALECT} =require('./constants')


const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT
});

const BookTB = BOOKMODEL(sequelize, Sequelize);
const AuthorTB = AUTHORMODEL(sequelize, Sequelize);
const LibraryTB = LIBRARYMODEL(sequelize, Sequelize);
const UserBooksTB = USERBOOKSMODEL(sequelize, Sequelize);
const PermisionsTB = PERMISIONSMODEL(sequelize, Sequelize);
const UserPermissionsTB = USERPERMISSIONSMODEL(sequelize, Sequelize);
const UserTB = USERMODEL(sequelize, Sequelize);
const RolesTB = ROLESMODEL(sequelize, Sequelize);

sequelize.sync({ force: false })
.then(() => {
console.log(`Database & tables created here!`)
})

module.exports = {
AuthorTB,
BookTB,
LibraryTB,
UserBooksTB,
PermisionsTB,
UserPermissionsTB,
UserTB,
RolesTB
}