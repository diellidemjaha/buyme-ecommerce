import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PurchaseProduct = ({ productId, onPurchaseSuccess }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to buy it!"
    });

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.post(`http://localhost:8000/api/purchase/${productId}`, { quantity }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 201) {
          Swal.fire({
            title: "Purchased!",
            text: "Your product has been purchased.",
            icon: "success"
          });

          onPurchaseSuccess();
        }
      } catch (error) {
        console.error('Purchase failed:', error);
        Swal.fire({
          title: "Error",
          text: "There was an error during the purchase.",
          icon: "error"
        });
      }
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
