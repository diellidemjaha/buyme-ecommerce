import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products', { headers });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleBuy = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/purchase/${productId}`);
      console.log('Purchase successful:', response.data);
      // You can add additional logic here, such as updating the UI
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">All Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <Link to={`/Singleproducts/${product.id}`}>
                    <img src={`http://localhost:8000/storage/${product.image_path}`} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '200px' }} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <Link to={`/Singleproducts/${product.id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>
                    {/* <button onClick={() => handleBuy(product.id)} className="btn btn-success mx-2">Buy</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
