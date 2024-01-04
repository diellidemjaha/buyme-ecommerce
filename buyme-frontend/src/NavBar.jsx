import React from "react";
import axios from "axios";
import UserProducts from "./UserProducts";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const hasToken = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);

        localStorage.clear();

        //   navigate('/login');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/"><b>BuyMe</b></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link text-light" to="/user-products">Your Products</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/add-product">Add a product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/products-sold">Your Earnings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/products-bought">Your Buyings</a>
            </li>
          </ul>
          {hasToken ? (
            <button type="button" className="btn btn-outline-light m-2" onClick={() => handleLogout()}>Sign out</button>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
