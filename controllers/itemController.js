const itemModel = require('../models/itemModel'); // Import model

// Get all items
exports.getAllItems = (req, res) => {
  itemModel.getAllItems((err, items) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(items);
  });
};

// Add a new item
exports.addItem = (req, res) => {
  const { name, description } = req.body;
  itemModel.addItem(name, description, (err, item) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(item);
  });
};

// Update an item
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  itemModel.updateItem(id, name, description, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.sendStatus(204);
  });
};

// Partially update an item
exports.partialUpdateItem = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  itemModel.partialUpdateItem(id, updates, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.sendStatus(204);
  });
};

// Delete an item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  itemModel.deleteItem(id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.sendStatus(204);
  });
};