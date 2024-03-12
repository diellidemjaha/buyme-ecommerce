import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const ProductsBoughtByUser = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsBoughtByUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/bought-by-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products bought by the user:', error);
      }
    };

    fetchProductsBoughtByUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>Products Bought by User</h2>
        {products.length === 0 ? (
          <p>No products bought by the user.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
               <strong>Name:</strong> {product.product?.name || 'N/A'}<br />
                <strong>Seller:</strong> {product.seller?.name || 'N/A'}<br />
                <strong>Description:</strong> {product.product?.description || 'N/A'}<br />
                <strong>Price:</strong> ${product.product?.price || 'N/A'}<br />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductsBoughtByUser;
