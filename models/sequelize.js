const Sequelize = require('sequelize');
const {
  DataTypes
} = require('sequelize');
const mysql = require('mysql');

const AUTHORMODEL = require('./author');
const BOOKMODEL = require('./book');
const LIBRARYMODEL = require('./library');
const USERBOOKSMODEL = require('./userbooks');
const PERMISIONSMODEL = require('./permissions');
const USERPERMISSIONSMODEL = require('./userpermisions');
const USERMODEL = require('./users');
const ROLESMODEL = require('./roles');

const {DATABASE_NAME,USER,PASSWORD,HOST,DIALECT} =require('./constants')


const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    define: {
        timestamps: false
      }
});

const BookTB = BOOKMODEL(sequelize, Sequelize);
const AuthorTB = AUTHORMODEL(sequelize, Sequelize);
const LibraryTB = LIBRARYMODEL(sequelize, Sequelize);
const UserBooksTB = USERBOOKSMODEL(sequelize, Sequelize);
const PermisionsTB = PERMISIONSMODEL(sequelize, Sequelize);
const UserPermissionsTB = USERPERMISSIONSMODEL(sequelize, Sequelize);
const UserTB = USERMODEL(sequelize, Sequelize);
const RolesTB = ROLESMODEL(sequelize, Sequelize);

RolesTB.hasMany(UserTB,  { foreignKey: {
  name: 'roleId'
},
targetKey: 'roleId'
});
UserTB.belongsTo(RolesTB, {
  foreignKey: {
    name: 'roleId'
  },
  targetKey: 'roleId'
});

RolesTB.belongsToMany(PermisionsTB, { through: UserPermissionsTB, foreignKey: 'roleId', sourceKey: 'roleId', timestamps: false});
PermisionsTB.belongsToMany(RolesTB, { through: UserPermissionsTB, foreignKey: 'permisionCode', sourceKey: 'permisionCode',  timestamps: false});
UserTB.belongsToMany(BookTB, { through: UserBooksTB, foreignKey: 'userId',  timestamps: false});
BookTB.belongsToMany(UserTB, { through: UserBooksTB, foreignKey: 'bookId',  timestamps: false});
AuthorTB.belongsToMany(BookTB, { through: LibraryTB, foreignKey: 'authorId', timestamps: false });
BookTB.belongsToMany(AuthorTB, { through: LibraryTB, foreignKey: 'bookId', timestamps: false });





sequelize.sync({ force: false })
.then(() => {
console.log(`Database & tables created here!`);
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