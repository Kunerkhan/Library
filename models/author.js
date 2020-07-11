const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "authorId"
    },
    authorName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "authorName",
      unique: true
    }
  };
  const AuthorModel = sequelize.define("author", attributes);
  return AuthorModel;
};