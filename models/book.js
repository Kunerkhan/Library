const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "book_id"
    },
    book_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: "book_name"
    }
  };
  const BookModel = sequelize.define("book", attributes);
  return BookModel;
};