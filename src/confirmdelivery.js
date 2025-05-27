import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ConfirmDelivery = () => {
  const { orderId } = useParams();
  const [message, setMessage] = useState("Confirming...");
  const navigate = useNavigate();  // Hook to navigate to other pages
  const location = useLocation();  // To access the redirect URL after login

  useEffect(() => {
    const confirm = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      // If the token is not available, redirect the user to the login page
      if (!token) {
        navigate('/login', { state: { from: `/confirm-delivery/${orderId}` } }); // Save the current page to redirect after login
        return;
      }

      try {
        const response = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/user/confirm-delivery/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If the confirmation is successful, show the success message
        setMessage(response.data.message || "Delivery confirmed successfully!");
      } catch (err) {
        // Handle any errors (unauthorized, network issues, etc.)
        if (err.response && err.response.status === 401) {
          // If unauthorized, redirect to login page
          navigate('/login', { state: { from: `/confirm-delivery/${orderId}` } });
        } else {
          setMessage("Failed to confirm delivery.");
        }
      }
    };

    confirm();
  }, [orderId, navigate]);

  return (
    <div style={{ padding: "55px", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmDelivery;   
