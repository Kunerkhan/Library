const Sequelize = require('sequelize');
const {
  DataTypes
} = require('sequelize');
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

AuthorTB.hasMany(BookTB, { foreignKey: 'author_id'});
BookTB.belongsTo(AuthorTB,  { foreignKey: 'author_id' });
RolesTB.hasMany(UserTB, {  foreignKey: {
  name: 'role_id'
},
targetKey: 'role_id',
onDelete: 'CASCADE',
onUpdate: 'CASCADE'
});
UserTB.belongsTo(RolesTB, {
  foreignKey: {
    name: 'role_id'
  },
  targetKey: 'role_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
UserTB.belongsToMany(PermisionsTB, { through: UserPermissionsTB, foreignKey: 'user_id', timestamps: false});
PermisionsTB.belongsToMany(UserTB, { through: UserPermissionsTB, foreignKey: 'permision_id', timestamps: false});

UserTB.hasMany(UserBooksTB, { foreignKey: 'user_id'});
UserBooksTB.belongsTo(UserTB, { foreignKey: 'user_id'});

BookTB.hasMany(UserTB, { foreignKey: 'book_id'} );
UserTB.belongsTo(BookTB, { foreignKey: 'book_id'})

AuthorTB.belongsToMany(BookTB, { through: LibraryTB, foreignKey: 'book_id', timestamps: false });
BookTB.belongsToMany(AuthorTB, { through: LibraryTB, foreignKey: 'author_id', timestamps: false });


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