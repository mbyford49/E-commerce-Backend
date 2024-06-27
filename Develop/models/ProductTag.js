// Here the required parts of the sequelize library are imported.
const { Model, DataTypes } = require('sequelize');

// Here sequelize is imported from the connection.js file.
const sequelize = require('../config/connection');

// Here the ProductTag class is given all the functionality of a sequelize model.
class ProductTag extends Model {}

// Here the structure of the ProductTag model is defined.
ProductTag.init(
  {
    // Here the table's colums and data types are defined.
    // The id is an integer, is mandatory, is set as the primary key, and will auto-increment when a new record is created.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Here is where the foreign key relationships are defined between the ProductTag, Product and Tag tables.
    // This makes ProductTag the junction table for the many-to-many relationship between products and tags.
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
