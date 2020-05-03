const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    book_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "book_code"
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id",
      references: {
        key: "user_id",
        model: "users_model"
      }
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "author_id",
      references: {
        key: "author_id",
        model: "author_model"
      }
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "book_id",
      references: {
        key: "book_id",
        model: "book_model"
      }
    }
  };
  const options = {
    tableName: "userbooks",
    comment: "",
    indexes: [{
      name: "user_id",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "author_id",
      unique: false,
      type: "BTREE",
      fields: ["author_id"]
    }, {
      name: "book_id",
      unique: false,
      type: "BTREE",
      fields: ["book_id"]
    }]
  };
  const UserbooksModel = sequelize.define("userbooks_model", attributes, options);
  return UserbooksModel;
};