const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "book_id"
    },
    book_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "book_name"
    }
  };
  const options = {
    tableName: "book",
    comment: "",
    indexes: []
  };
  const BookModel = sequelize.define("book_model", attributes, options);
  return BookModel;
};