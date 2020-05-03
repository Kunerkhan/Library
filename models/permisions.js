const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    permision_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
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
  const options = {
    tableName: "permisions",
    comment: "",
    indexes: []
  };
  const PermisionsModel = sequelize.define("permisions_model", attributes, options);
  return PermisionsModel;
};