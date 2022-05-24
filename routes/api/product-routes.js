const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// route for getting all products
router.get('/', async (req, res) => {
 
  try {
    const findProducts = await Product.findAll({
      // include takes an array of objects that you would have set up associations for in the models file //
      include : [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    // throw error if there isnt any products in db //
    if (!findProducts) {
      res.status(404);
      res.send("No Products found");
    }
    res.status(200).json(findProducts);
  } catch (err) {
    res.status(500);
  }
});

// route for getting a specific product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const selectProduct = await Product.findByPk(
      id,
      { include: [
        {model: Category },
        {model: Tag }]})
      res.status(200).json(selectProduct);
  } catch (err) {
    res.status(500);
  }
});

// route for creating a new product
router.post('/', async (req, res) => {
  try {
  const { product_name, price, stock, category_id, tag_id } = req.body;
  const newProduct = await Product.create({
    product_name,
    price,
    stock,
    category_id
  });
  // using .map to create the new array of tag id's that each product is given through the body of the json //
      tagArray = tag_id.map((tagId) =>{
       return {
         product_id: newProduct.id,
         tagId
       }});
        const productTags =  await ProductTag.bulkCreate(tagArray);
        res.status(200).json(newProduct);
      } catch (err) {
      res.status(500).json(err);
    }
  });


// update product
router.put('/:id', (req, res) => {
  // update product data //
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then(() => res.json(req.body.product_name + " is now updated."))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// route for deleting a product 
router.delete('/:id', async (req, res) => {
  try {
    const { id: product_id } = req.params;
    // delete the product that has a matching id to the param //
    const delProduct = await Product.destroy({ 
      where: { id: product_id },
    });
    if (!delProduct) {
      res.status(404);
      res.json("No product to delete");
    }
    res.status(200);
    res.json(`${delProduct} product deleted successfully`);
  } catch (err) {
    res.status(500);
    res.json(err)
  }
});

module.exports = router;
