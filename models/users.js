const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "user_id"
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_name"
    },
    user_password: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_password"
    }
  };

  const UsersModel = sequelize.define("users", attributes);
  return UsersModel;
};