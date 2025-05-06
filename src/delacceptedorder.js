import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import for React Router v6

const AcceptedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const agentId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Correct usage of useNavigate

  useEffect(() => {
    if (!agentId || !token) return;

    const fetchAcceptedOrders = async () => {
      try {
        const response = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/accepted-orders/${agentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.acceptedOrders);
      } catch (error) {
        console.error('Error fetching accepted orders:', error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, [agentId, token]);

  const handleConfirmDelivery = async (orderId) => {
    try {
      await axios.post(
        `https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/orders/confirm-delivery`,
        { agentId, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Delivery confirmation email sent!');
    } catch (error) {
      console.error('Error confirming delivery:', error.response || error.message);
      alert('Error confirming delivery');
    }
  };

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) to go back to the previous page
  };

  if (!agentId) return <p className="error-message">Agent ID not found. Please log in again.</p>;
  if (!token) return <p className="error-message">Authorization token missing. Please log in again.</p>;
  if (loading) return <p className="loading-message">Loading accepted orders...</p>;
  if (orders.length === 0) return <p className="no-orders-message">No accepted orders yet.</p>;

  return (
    <div className="container">
      <button onClick={handleBack} className="back-button">
        &lt; Back
      </button>
      <h2 className="header">Accepted Orders</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-detail">
              <p className="label">Order ID</p>
              <p className="value">{order._id}</p>
            </div>
            <div className="order-detail">
              <p className="label">Customer</p>
              <p className="value">{order.name}</p>
            </div>
            <div className="order-detail">
              <p className="label">Email</p>
              <p className="value">{order.email}</p>
            </div>
            <div className="order-detail">
              <p className="label">Address</p>
              <p className="value">{order.address}</p>
            </div>
            <div className="confirm-button-container">
              <button onClick={() => handleConfirmDelivery(order._id)} className="confirm-button">
                Confirm Delivery
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        body {
          background-color: rgb(185, 244, 197); /* Light green background */
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        .container {
          padding: 2rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: transparent;
          color: #4CAF50;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          padding: 10px 20px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .back-button:hover {
          color: #45a049;
        }

        .header {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #4CAF50; /* Light green */
        }

        .orders-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .order-card {
          background-color: rgb(250, 255, 244);
          border: 1px solid #d1d1d1;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .order-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .order-detail {
          margin-bottom: 1rem;
        }

        .label {
          font-size: 0.875rem;
          color: #888;
        }

        .value {
          font-size: 1rem;
          color: #333;
          font-weight: 500;
        }

        .confirm-button-container {
          text-align: right;
        }

        .confirm-button {
          background-color: #4CAF50;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }

        .confirm-button:hover {
          background-color: #45a049;
        }

        .error-message, .loading-message, .no-orders-message {
          text-align: center;
          color: #ff5e57;
          font-size: 1.2rem;
        }

        .loading-message {
          color: #0066cc;
        }

        .no-orders-message {
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default AcceptedOrder;
