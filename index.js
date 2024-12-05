const express = require('express');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes'); // Import item routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Use item routes
app.use('/items', itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});