// PurchaseProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PurchaseProduct = ({ productId, onPurchaseSuccess }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/purchase/${productId}`, { quantity }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        console.log('Purchase successful:', response.data);
        // You can add additional logic here, such as updating the UI or redirecting the user
        onPurchaseSuccess();
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={handlePurchase} className="btn btn-primary">Purchase</button>
    </div>
  );
};

export default PurchaseProduct;
