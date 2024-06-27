const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The following route handler handles GET requests to the root path.
// It returns all tag data including related products.
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
      model: Product,
      through: ProductTag,
      },
    ],
  })
  .then((tags) => res.status(200).json(tags))
  .catch((err) => res.status(500).json(err));
});

// The following route handler handles GET requests for a single tag using its id.
// It returns that single tag including related products.
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

// The following route handler handles POST requests for creating new tags.
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

// The following route handler handles PUT requests to update a single tag using its id.
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

// The following route handler handles DELETE requests that will delete an existing tag using its id.
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

module.exports = router;
