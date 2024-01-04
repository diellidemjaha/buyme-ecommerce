import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import PurchaseProduct from './PurchaseProduct';

const SingleProduct = () => {
  const { productId } = useParams(); // Use a different variable name to avoid conflicts
  const [product, setProduct] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    console.log('Fetching product with id:', productId);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`, { headers });
        console.log('API Response:', response.data);
        setProduct(response.data);

        const userResponse = await axios.get(`http://localhost:8000/api/user/${response.data.user_id}`, { headers });
        setUserName(userResponse.data.name);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuy = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/purchase/${productId}`);
      console.log('Purchase successful:', response.data);
      // You can add additional logic here, such as updating the UI
    
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handlePurchaseSuccess = () => {
    // You can add logic here to handle a successful purchase, such as updating the UI
    console.log('Purchase successful! Update UI or perform other actions.');
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <img
              src={`http://localhost:8000/storage/${product.image_path}`}
              className="img-fluid rounded custom-large-image"
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Seller: {userName}</p>
            {/* <button onClick={handleBuy} className="btn btn-primary">Buy</button> */}
            <PurchaseProduct productId={productId} onPurchaseSuccess={handlePurchaseSuccess} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
