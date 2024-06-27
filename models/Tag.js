// Here the required parts of the sequelize library are imported.
const { Model, DataTypes } = require('sequelize');

// Here sequelize is imported from the connection.js file.
const sequelize = require('../config/connection.js');

// Here the Tag class is given all the functionality of a sequelize model.
class Tag extends Model {}

// Here the structure of the Tag model is defined.
Tag.init(
  {
    // Here the table's colums and data types are defined.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
