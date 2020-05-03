const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "author_id"
    },
    author_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "author_name"
    }
  };
  const options = {
    tableName: "author",
    comment: "",
    indexes: []
  };
  const AuthorModel = sequelize.define("author_model", attributes, options);
  return AuthorModel;
};