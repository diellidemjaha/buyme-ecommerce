import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
  
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
  
    try {
      const response = await axios.get('http://localhost:8000/api/search', {
        headers,
        params: { q: searchTerm }, // Pass the search term as a query parameter
      });
  
      const products = response.data;
  
      // Redirect to the search results page
      navigate(`/search-results?q=${searchTerm}`, { state: { products } });
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
<div className="d-flex justify-content-end">
  <form onSubmit={handleSearch} className="d-flex align-items-center">
    <div className="form-outline" data-mdb-input-init>
      <input
        id="search-input"
        type="search"
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <label className="form-label" htmlFor="search-input">
        Search
      </label> */}
    </div>
    <button type="submit" id="search-button" className="btn btn-primary">
      <i className="fas fa-search"></i>
    </button>
  </form>
</div>


  
  );
};

export default SearchForm;
