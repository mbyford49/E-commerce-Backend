const router = require('express').Router();
const { Category, Product } = require('../../models');

//The following is a GET request to the root path of the app that will return all categories from the database.
//The include option will perform a join operation in the database which will return the products associated with each category.
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
});

//The following is a GET request that will return only a single category based on the id in the request.
//And again the products associated with that single category will be returned as well.
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json(err));
});

//The following is a POST request to the root path of the app to create a new category in the database
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

//The following is a PUT request that will update an existing category in the database based on the id in the request
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

//The following is a DELETE request that will delete an existing category in the database based on the id in the request
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }, 
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
