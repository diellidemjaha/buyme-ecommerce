import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import SearchForm from './SearchForm';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';

const AllProducts = () => {
  const { productId } = useParams();
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products', {
          headers,
          params: { category },
        });
        setProducts(response.data);

        // Fetch ratings for each product individually
        response.data.forEach(async (product) => {
          try {
            const ratingResponse = await axios.get(`http://localhost:8000/api/products/${product.id}/ratings`, { headers });
            // Update the product with its average rating
            setAverageRating((prevRatings) => ({
              ...prevRatings,
              [product.id]: ratingResponse.data.average_rating,
            }));
          } catch (ratingError) {
            // console.error(`Error fetching ratings for product ${product.id}:`, ratingError);
          }
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <SearchForm />
        <label htmlFor="category">Select Category:</label>
        <select id="category" name="category" className="form-control" onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Computers">Computers</option>
          <option value="Football">Football</option>
          <option value="Other">Other</option>
        </select>

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
                    {averageRating[product.id] !== undefined ? (
                    <div className="d-flex gap-2">
                      <div className="col-md-12 col-lg-6">
                        <div id="rating">
                          {averageRating[product.id]}
                          <Rating initialValue={averageRating[product.id]} size={20} label />
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

export default AllProducts;
