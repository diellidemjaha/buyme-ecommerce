import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloWorld = () => {
  const [sayHello, setSayHello] = useState();

  useEffect(() => {
    fetchHelloWorld();
  }, []); // Specify an empty dependency array to run the effect only once on mount

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
      <h1>{sayHello}</h1>
    </div>
  );
};

export default HelloWorld;