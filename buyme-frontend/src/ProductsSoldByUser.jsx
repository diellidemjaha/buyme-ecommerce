// ProductsSoldByUser.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const ProductsSoldByUser = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsSoldByUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/sold-by-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products sold by the user:', error);
      }
    };

    fetchProductsSoldByUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>Products Sold by User</h2>
        {products.length === 0 ? (
          <p>No products sold by the user.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>Name:</strong> {product.product.name}<br />
                <strong>Buyer:</strong> {product.buyer.name}<br />
                <strong>Description:</strong> {product.product.description}<br />
                <strong>Price:</strong> ${product.product.price}<br />
                {/* Add other details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductsSoldByUser;
