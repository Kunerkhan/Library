const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "roleId"
    },
    roleName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "roleName",
      unique: true
    }
  };
  const RolesModel = sequelize.define("roles", attributes);
  return RolesModel;
};