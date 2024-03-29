import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const HelloWorld = () => {
  const [sayHello, setSayHello] = useState();

  useEffect(() => {
    fetchHelloWorld();
  }, []); 

  const fetchHelloWorld = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/hello-world');
      setSayHello(response.data.test);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>{sayHello}</h1>
    </div>
  );
};

export default HelloWorld;