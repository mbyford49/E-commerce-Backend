// Here models are imported in order to define their relationships.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// The following defines the relationship whereas a product can only belong to one category.
// With onDelete set to CASCADE, any product referencing a deleted category will also be deleted.
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// The following defines the relationship whereas a category can contain many products.
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// The following defines the many-to-many relationship between the product and tag models.
// The through option specifies the ProductTag model as the junction table for the many-to-many relationship.
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Here models are exported for use elsewhere in the app.
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
