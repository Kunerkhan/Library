const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "author_id"
    },
    author_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  };
  const AuthorModel = sequelize.define("author", attributes);
  return AuthorModel;
};