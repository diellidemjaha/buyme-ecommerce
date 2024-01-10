import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const SearchResults = () => {
  const location = useLocation();
  const products = location.state?.products || [];

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
