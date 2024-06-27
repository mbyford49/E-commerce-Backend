// Here the required parts of the sequelize library are imported.
const { Model, DataTypes } = require('sequelize');

// Here sequelize is imported from the connection.js file.
const sequelize = require('../config/connection.js');

// Here the Category class is given all the functionality of a sequelize model.
class Category extends Model {}

// Here the structure of the Category model is defined.
Category.init(
  {
    // Here the table's colums and data types are defined.
    // The id is an integer, is mandatory, is set as the primary key, and will auto-increment when a new record is created.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // The name is a string, and is also mandatory.
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
