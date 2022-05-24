const router = require('express').Router();
// add tag and product_tag //
const { Tag, Category, Product, ProductTag } = require('../../models');


// route for getting all categories // add async to function so we can use await //
router.get('/', async (req, res) => {
  // will use a try catch statement //
  try {
    const findCategories = await Category.findAll({
    // showing what products are inside the categories when the json file is shown in insomnia //
      include: [{ model: Product }],
    })
    res.status(200).json(findCategories);
  } catch (err) {
    res.status(500).json(err);
  };
});

// route for getting a specific category // add async to function so we can use await //
router.get('/:id', async (req, res) => {
  const { id: category_id } = req.params;
    // will use a try catch statement //
  try {
    const selectCategory = await Category.findByPk(category_id, {
    // showing what products are inside the categories when the json file is shown in insomnia //
      include: [{ model: Product}]});
    res.status(200).json(selectCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

 // route for creating a new category // add async to function so we can use await //
router.post('/', async (req, res) => {
 // will use a try catch statement //
  try {
    // referencing what is going to be typed in the body of the json file in insomnia as a constant //
    const { category_name } = req.body;
    const newCategory = await Category.create({
      // using the afformentioned in a .create function, only need to add name as ID is autoIncrement //
      category_name,
    })
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500);
  }
});

// route for updating a category // add async to function so we can use await 
router.put('/:id', async (req, res) => {
  // use a try catch statement //
  try {
    // creating a const from what is typed after the forward slash in the url, aka the parameter 
    const { id } = req.params;
    // referencing what is going to be typed in the body of the json file in insomnia as a constant 
    const { category_name } = req.body;
    const updatedCategory = await Category.update(
      { category_name },
      { where: { id }})
    res.status(200).json(`${updatedCategory} category has been updated`)
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for deleting a category add async to function so we can use await 
router.delete('/:id', async (req, res) => {
  // use a try catch statement //
  try {
    // creating a const from what is typed after the forward slash in the url, aka the parameter 
    const { id: category_id } = req.params;
    const delCategory = await Category.destroy({
      // deleting the category that has an id matching the one that was entered into the parameter //
      where: { id: category_id }
    });
    res.status(200).json(`${delCategory} category deleted`);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;