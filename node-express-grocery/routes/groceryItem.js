var express = require('express');
var router = express.Router();
var GroceryService = require('../services/grocery.service');

router.post('/', async function (req, res, next) {
  const body = req.body;

  try {
    const groceryListLength = await GroceryService.add(body);

    return res.status(201).json({ groceryListLength: groceryListLength });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.messsage });
    }
  }
});

module.exports = router;
