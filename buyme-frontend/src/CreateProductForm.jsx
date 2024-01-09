// CreateProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0, // Add stock field
    category: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from your API endpoint
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('name', formData.name);
      formDataForUpload.append('description', formData.description);
      formDataForUpload.append('price', formData.price);
      formDataForUpload.append('stock', formData.stock); // Append stock value
      formDataForUpload.append('category', formData.category);
      formDataForUpload.append('image', formData.image);

      const response = await axios.post('http://localhost:8000/api/products', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        console.log('Product created successfully');
        window.location.href="/";
        // You can redirect the user or perform other actions after successful product creation
      }
    } catch (error) {
      console.error('Product creation failed:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Create a Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Add other form fields as needed */}

          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
      </div>
    </>
  );
};

export default CreateProductForm;
