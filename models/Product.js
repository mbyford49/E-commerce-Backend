// Here the required parts of the sequelize library are imported.
const { Model, DataTypes } = require('sequelize');

// Here sequelize is imported from the connection.js file.
const sequelize = require('../config/connection');

// Here the Product class is given all the functionality of a sequelize model.
class Product extends Model {}

// Here the structure of the Product model is defined.
Product.init(
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
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The price is a decimal number with 10 total digits, 2 after the decimal point and is mandatory.
    // There is a validation rule to ensure the stored value is a decimal number.
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // Stock is an integer, is mandatory, and has a defualt value of 10.
    // There is a validation rule to ensure the stored value is a number.
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // The category id is an integer. With allowNull set to true, it is not mandatory.
    // Lastly a foreign key relationship is defined between the product and category tables.
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
