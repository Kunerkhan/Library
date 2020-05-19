const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    permision_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "permision_code"
    },
    permision_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "permision_name"
    }
  };
  const PermisionsModel = sequelize.define("permisions", attributes);
  return PermisionsModel;
};