const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the 'items' table if it doesn't exist
const createTableIfNotExists = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      date_created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "items" is ready (created or already exists).');
    }
  });
};

// Ensure the table is created
createTableIfNotExists();

// Get all items
exports.getAllItems = (callback) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// Add a new item
exports.addItem = (name, description, callback) => {
  const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
  stmt.run([name, description], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, name, description });
  });
  stmt.finalize();
};

// Update an item
exports.updateItem = (id, name, description, callback) => {
  const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
  stmt.run([name, description, id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
  stmt.finalize();
};

// Partially update an item
exports.partialUpdateItem = (id, updates, callback) => {
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(id);

  const stmt = db.prepare(`UPDATE items SET ${fields} WHERE id = ?`);
  stmt.run(values, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
  stmt.finalize();
};

// Delete an item
exports.deleteItem = (id, callback) => {
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  stmt.run([id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
  stmt.finalize();
};