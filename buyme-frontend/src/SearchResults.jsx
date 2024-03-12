import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const [averageRatings, setAverageRatings] = useState({});
  const products = location.state?.products || [];

  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingPromises = products.map(async (product) => {
        try {
          const ratingResponse = await axios.get(`http://localhost:8000/api/products/${product.id}/ratings`, { headers });
          return { productId: product.id, averageRating: ratingResponse.data.average_rating };
        } catch (ratingError) {
          console.error(`Error fetching ratings for product ${product.id}:`, ratingError);
          return { productId: product.id, averageRating: 0 }; // or any default value you prefer
        }
      });

      const ratings = await Promise.all(ratingPromises);
      const updatedRatings = {};

      ratings.forEach((rating) => {
        updatedRatings[rating.productId] = rating.averageRating;
      });

      setAverageRatings(updatedRatings);
    };

    fetchRatings();
  }, [products, headers]);

  return (
    <>
      <NavBar />
      <div className="container">
        <h2 className="mb-4">Search Results</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <Link to={`/Singleproducts/${product.id}`}>
                    <img
                      src={`http://localhost:8000/storage/${product.image_path}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <Link to={`/Singleproducts/${product.id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>
                    {averageRatings[product.id] !== undefined ? (
                      <div className="d-flex gap-2">
                        <div className="col-md-12 col-lg-6">
                          <div id="rating">
                            {averageRatings[product.id]}
                            <Rating initialValue={averageRatings[product.id]} size={20} label />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p> </p>
                    )}
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

export default SearchResults;
