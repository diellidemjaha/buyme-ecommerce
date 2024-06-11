import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import CreateProductForm from './CreateProductForm';
import UserProducts from './UserProducts';
import SingleProduct from './SingleProduct';
import ProductsBoughtByUser from './ProductsBoughtByUser';
import ProductsSoldByUser from './ProductsSoldByUser';
import AllProducts from './AllProducts';
import SearchResults from './SearchResults';


function App() {


  let logged_in = localStorage.getItem('token');
  let userId = localStorage.getItem('user_id');

  return (
    <>
      <Router>
        {logged_in == null ?

          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/add-product" element={<CreateProductForm />} />
            <Route path="/user-products/:userId" render={({ match }) => <UserProducts userId={match.params.userId} />} />
            <Route path="/user-products" element={<UserProducts />} />
            <Route path="/Singleproducts/:productId" element={<SingleProduct />} />
            <Route path="/products-bought" element={<ProductsBoughtByUser />} />
            <Route path="/products-sold" element={<ProductsSoldByUser />} />
            <Route path="/all-products" element={<AllProducts/>} />
            <Route path="/search-results" element={<SearchResults />} />

          </Routes>
        }
      </Router>
    </>
  )
}

export default App
