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
      }, 
    },
    user_role: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_role",
      references: {
        key: "role_id",
        model: "roles_model"
      }
    }
  };
  const options = {
    tableName: "userpermisions",
    comment: "",
    indexes: [{
      name: "user_role",
      unique: false,
      type: "BTREE",
      fields: ["user_role"]
    }, {
      name: "permision_code",
      unique: false,
      type: "BTREE",
      fields: ["permision_code"]
    }],
  };
  const UserpermisionsModel = sequelize.define("userpermisions_model", attributes, options, {
    timestamps: false
});
  return UserpermisionsModel;
};