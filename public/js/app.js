document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemsTable = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
  
    // Fetch items and update the table
    function fetchItems() {
      fetch('/items')
        .then(response => response.json())
        .then(items => {
          // Clear the table first
          itemsTable.innerHTML = '';
  
          // Populate the table with item data
          items.forEach(item => {
            const row = itemsTable.insertRow();
            row.innerHTML = `
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.description || ''}</td>
              <td>${item.date_created}</td>
            `;
          });
        })
        .catch(error => console.error('Error fetching items:', error));
    }
  
    // Add item via form submission
    itemForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent page reload
  
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
  
      // Send POST request to add a new item
      fetch('/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      })
        .then(response => response.json())
        .then(item => {
          // Clear the form
          itemForm.reset();
          // Refresh the item list
          fetchItems();
        })
        .catch(error => console.error('Error adding item:', error));
    });
  
    // Initially fetch and display items
    fetchItems();
  });