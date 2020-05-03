const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "role_id"
    },
    role_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "role_name"
    }
  };
  const options = {
    tableName: "roles",
    comment: "",
    indexes: []
  };
  const RolesModel = sequelize.define("roles_model", attributes, options);
  return RolesModel;
};