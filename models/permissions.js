const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    permisionCode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "permisionCode"
    },
    permissionName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "permissionName"
    }
  };
  const PermisionsModel = sequelize.define("permissions", attributes);
  return PermisionsModel;
};