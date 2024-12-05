const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController'); // Import controller

// CRUD routes for items
router.get('/', itemController.getAllItems);
router.post('/', itemController.addItem);
router.put('/:id', itemController.updateItem);
router.patch('/:id', itemController.partialUpdateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;