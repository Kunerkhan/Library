const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    }
}
  const LibraryModel = sequelize.define("library", attributes);
  return LibraryModel;
};