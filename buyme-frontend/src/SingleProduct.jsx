import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import PurchaseProduct from './PurchaseProduct';
import { Rating } from 'react-simple-star-rating'


const SingleProduct = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [userName, setUserName] = useState(null);
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(0);

  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  const handleRating = rate => {
    setRating(rate);
    axios.post(`http://localhost:8000/api/products/ratings`, { rating: rate, product_id: productId }, { headers })
      .then(response => {
        console.log('Rating submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  const getRatings = () => {
    axios.get(`http://localhost:8000/api/products/${productId}/ratings`, { headers })
      .then(response => {
        setAverageRating(response.data.average_rating);
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });
      
     
  };

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
    getRatings();
  }, [productId]);

  const handleBuy = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/purchase/${productId}`);
      console.log('Purchase successful:', response.data);
    
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handlePurchaseSuccess = () => {
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
            <div className="d-flex gap-2">
                    <div className="col-md-12 col-lg-6">
                    <div id="rating">
                        {averageRating.length > 0 ? (
                          <>
                            Average Rating: {averageRating}
                            <Rating
                              // ratingValue={4.38}
                              initialValue={averageRating}
                              size={20}
                              label
                            />
                          </>
                        ) : (
                          <>
                            Rate this Product:
                            <Rating
                              onClick={handleRating}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
