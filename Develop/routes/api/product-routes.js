const router = require('express').Router();
const { model } = require('../../config/connection');
const { Product, Category, Tag, ProductTag } = require('../../models');


// The following route handler handles GET requests to the root path.
// It returns all product data including related categories and tags.
// Due to the many-to-many relationship between products and tags,
// the ProductTag model is used as an accociation table to link them.
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category, {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
  .then((products) => res.json(products))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// The following route handler handles GET requests for a single product using that products id.
// It returns that single product including related categories and tags.
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      Category, {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
  .then((products) => res.json(products))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// The following route handler handles POST requests for creating new products in the database.
// The new product is added to the database with or without tags depending on the information in the request body.
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// The following route handler handles PUT requests to update single products selected by id.
// Tags are also added or removed based on the updated product data.
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }
      return res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// The following route handler handles DELETE requests that will delete an existing product based on the id in the request.
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    }, 
  })
  .then((products) => {
    console.log(products);
    res.json(products);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
