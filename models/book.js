const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "bookId"
    },
    bookName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "bookName",
      unique: true
    }
  };
  const BookModel = sequelize.define("book", attributes);
  return BookModel;
};