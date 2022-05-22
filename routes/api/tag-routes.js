const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags // be sure to include its associated Product data
  //use a try catch statement // 
  try {
    const findTags = await Tag.findAll({ include: { model: Product}})
    res.status(200).json(findTags);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` // be sure to include its associated Product data
    //use a try catch statement // 
  try {
    const { id: tag_id } = req.params;
    const selectTag = await Tag.findByPk(tag_id, { include: { model: Product}})
    res.status(200).json(selectTag);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const {tag_name} = req.body;
    const tag = await Tag.create({ tag_name}, {include: { model: Product}})
    res.status(200).json(tag);
  } catch (err) {
    res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    //selecting the specific tag by id through req.param, and updating corresponding tags name from the req.body //
    const { id: tag_id} = req.params;
    const newName = await Tag.update(req.body, { where: {id: tag_id}})
    console.log(`${newName} is the new tag name`)
    res.status(200);
    res.send(`tag number ${tag_id} was updated`);
  }catch (err) {
    res.status(500);
  }
});

router.delete('/:id', async (req, res) => {
      //selecting the specific tag by id through req.param, and deleting the corresponding tag //
  try {
    const { id: tag_id } = req.params;
    const delTag = await Tag.destroy({ where: { id: tag_id}})
    res.status(200).send(`tag ${tag_id} has been deleted`);
  }catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
