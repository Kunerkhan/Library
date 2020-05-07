const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
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
    tableName: "users",
    comment: "",
    indexes: [{
      name: "user_role",
      unique: false,
      type: "BTREE",
      fields: ["user_role"]
    }],
      freezeTableName: true,
      timestamps: false
  };

  const UsersModel = sequelize.define("users_model", attributes, options, {
    timestamps: false
});

  return UsersModel;
};