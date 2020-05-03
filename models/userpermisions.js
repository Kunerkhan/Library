const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "code"
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
    permision_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "permision_code",
      references: {
        key: "permision_code",
        model: "permisions_model"
      }
    }
  };
  const options = {
    tableName: "userpermisions",
    comment: "",
    indexes: [{
      name: "user_id",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "permision_code",
      unique: false,
      type: "BTREE",
      fields: ["permision_code"]
    }]
  };
  const UserpermisionsModel = sequelize.define("userpermisions_model", attributes, options);
  return UserpermisionsModel;
};