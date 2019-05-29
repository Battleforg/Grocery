var express = require('express');
var router = express.Router();
var GroceryService = require('../services/grocery.service');

/**
 * add a new item to the list
 */
router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const groceryListLength = await GroceryService.add(body);

    return res.status(201).json({ groceryListLength: groceryListLength });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    // unexpected error
    return next(error);
  }
});

/**
 * Get an item by its id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const grocery = await GroceryService.retrieveOne(req.params.id);

    return res.json({ grocery: grocery });
  } catch (error) {
    // unexpected error
    return next(error);
  }
});

/**
 * Get all items in the list
 */
router.get('/', async (req, res, next) => {
  try {
    const groceryList = await GroceryService.retrieveAll();

    return res.json({ list: groceryList });
  } catch (error) {
    // unexpected error
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await GroceryService.delete(req.params.id);
    return res.json({ success: result });
  } catch (error) {
    // unexpected error
    return next(error);
  }
});

module.exports = router;