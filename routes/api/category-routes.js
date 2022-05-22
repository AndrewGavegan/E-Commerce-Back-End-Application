const router = require('express').Router();
// add tag and product_tag //
const { Tag, Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint
// add async to function so we can use await //
router.get('/', async (req, res) => {
  // find all categories // be sure to include its associated Products
  // will use a try catch statement //
  try {
    const findCategories = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(findCategories);
  } catch (err) {
    res.status(500).json(err);
  };
});

// add async to function so we can use await //
router.get('/:id', async (req, res) => {
  // find one category by its `id` value // be sure to include its associated Products
  const { id: category_id } = req.params;
  console.log(category_id);
    // will use a try catch statement //
  try {
    const selectCategory = await Category.findByPk(category_id);
    res.status(200).json(selectCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add async to function so we can use await //
router.post('/', async (req, res) => {
  // create a new category   // will use a try catch statement //
  try {
    const { category_name } = req.body;
    const newCategory = await Category.create({
      category_name,
    })
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500);
  }
});

// add async to function so we can use await //
router.put('/:id', async (req, res) => {
  // update a category by its `id` value // use a try catch statement //
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const updatedCategory = await Category.update(
      { category_name },
      { where: { id }})
    res.status(200).json(`${updatedCategory} category has been updated`)
  } catch (err) {
    res.status(500).json(err);
  }
});

// add async to function so we can use await //
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value // use a try catch statement //
  try {
    // req.params is whatever is entered in the url parameter after the slash usually //
    const { id: category_id } = req.params;
    const delCategory = await Category.destroy({
      // deleting the category that has the matching id to the one that was entered into the parameter //
      where: { id: category_id }
    });
    res.status(200).json(`${delCategory} category deleted`);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;