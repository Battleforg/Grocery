const GroceryItem = require('../models/groceryItem.model');
let Validator = require('fastest-validator');

// In memory data storage
let groceryList = [];
let counter = 0;

let groceryValidator = new Validator();

// const validator schema
const grocerySchema = {
  title: { type: 'string', min: 5}
};

class GroceryService {
  /**
   * Add a new grocery item into grocery list
   * @param {*} data the grocery item to be added
   * @returns length of grocery list
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
      };
    }

    // validation success
    const groceryItem = new GroceryItem('g' + counter++, data.title, data.notes);
  
    // mock database operation
    groceryList.push(groceryItem);

    return groceryList.length;
    
  }

  /**
   * Get all grocery items in the list
   * @returns the grocery list
   */
  static retrieveAll() {
    return groceryList;
  }

  /**
   * Get one grocery item by gid
   * @param {*} gid the id of retrieved grocery item
   */
  static retrieveOne(gid) {
 
    const foundItem = groceryList.find(elememt => elememt.gid === gid);

    if (foundItem === undefined) {
      throw new Error('Unable to retrieve a grocery by(gid:' + gid + ')');
    }

    return foundItem;
  }

  /**
   * Delete an item by its id
   * @param {*} gid the id of item to be deleted
   */
  static delete(gid) {
    const foundItemIndex = groceryList.findIndex(elememt => elememt.gid === gid);

    if (foundItemIndex === -1) {
      return false;
    }

    groceryList.splice(foundItemIndex, 1);
    return true;
  }
}

module.exports = GroceryService;