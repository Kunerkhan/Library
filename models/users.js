const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "userId"
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userName",
      unique: true
    },
    userPassword: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userPassword"
    }
  };

  const UsersModel = sequelize.define("users", attributes);
  return UsersModel;
};