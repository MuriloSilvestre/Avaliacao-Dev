import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000/items';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items on load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(API_URL);
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await axios.put(`${API_URL}/${editingItem.id}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: '', description: '' });
    setEditingItem(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <button type="submit">{editingItem ? 'Update' : 'Create'} Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <div>
              <button 
                className="edit-button" 
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
