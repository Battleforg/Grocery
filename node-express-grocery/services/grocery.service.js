const GroceryItem = require('../models/groceryItem.model');
let Validator = require('fastest-validator');

// In memory data storage
let groceryList = [];

let groceryValidator = new Validator();

// const validator schema
const grocerySchema = {
  title: { type: 'string', min: 1}
};

class GroceryService {
  /**
   * add a new grocery item into grocery list
   * @param {*} data the grocery item to be added
   */
  static add(data) {

    // it is true or array of error 
    var validationResult = groceryValidator.validate(data, grocerySchema);

    // validation failed
    if (!(validationResult === true)) {
      let errors = {};
      for (let index = 0; index < validationResult.length; index++) {
        const element = validationResult[index];
        errors[element.field] = element.message;
      }
      throw {
        name: 'ValidationError',
        message: errors
      }
    }

    // validation success
    let groceryItem = new GroceryItem(data.title, data.notes);
    // mock database operation
    groceryList.push(groceryItem);

    return groceryList.length;
    
  }
}

module.exports = GroceryService;