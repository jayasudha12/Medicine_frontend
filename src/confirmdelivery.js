import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmDelivery = () => {
  const { orderId } = useParams();
  const [message, setMessage] = useState("Confirming...");

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await axios.post(
          `https://your-backend-api.com/api/deliveryAgent/orders/confirm-user/${orderId}`
        );
        setMessage(response.data);
      } catch (err) {
        setMessage("Failed to confirm delivery.");
      }
    };
    confirm();
  }, [orderId]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmDelivery;
