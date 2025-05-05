import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const agentId = localStorage.getItem("userId");

  useEffect(() => {
    if (!agentId || !token) {
      setError("Missing agent ID or token. Please log in.");
      setLoading(false);
      return;
    }

    const fetchAssignedOrders = async () => {
      try {
        const response = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/${agentId}/assignedOrders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.assignedOrders) {
          if (response.data.assignedOrders.length > 0) {
            setOrders(response.data.assignedOrders);
          } else {
            setError("No assigned orders currently.");
          }
        } else {
          setError("Invalid data format received.");
        }
      } catch (err) {
        console.error("Error fetching assigned orders:", err);
        setError("Failed to fetch assigned orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedOrders();
  }, [agentId, token]);

  const handleAction = async (orderId, action, reason = '') => {
    try {
      let endpoint = "";
      let payload = { agentId, orderId };

      if (action === "accept") {
        endpoint = "https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/orders/accept";
      } else if (action === "reject") {
        endpoint = "https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/orders/reject";
        payload.reason = reason || "No reason provided";
      } else if (action === "confirm") {
        endpoint = "https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/orders/confirm-delivery";
      }

      const response = await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(`Error on ${action}:`, err);
      alert(`Failed to ${action} order`);
    }
  };

  if (loading) return <div style={styles.loading}>Loading assigned orders...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div>
        <Admin/>
    <div style={styles.container}>
      <h2 style={styles.title}>Assigned Orders</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No assigned orders currently.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.name || "Unknown"}</p>
            <p><strong>Address:</strong> {order.address || "Unknown"}</p>
            <p><strong>Status:</strong> {order.status || "Not specified"}</p>

            <div style={styles.buttonGroup}>
              <button
                onClick={() => handleAction(order._id, "accept")}
                style={{ ...styles.button, ...styles.accept }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Enter rejection reason:");
                  if (reason) handleAction(order._id, "reject", reason);
                }}
                style={{ ...styles.button, ...styles.reject }}
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(order._id, "confirm")}
                style={{ ...styles.button, ...styles.confirm }}
              >
                Confirm Delivery
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

// ✨ CSS-in-JS style object
const styles = {
    container: {
        background: "rgba(144, 238, 144, 0.3)",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "Segoe UI, sans-serif",
      }
      ,
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#2e7d32",
  },
  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease-in-out",
    width: "80%", // Increased width
    maxWidth: "800px", // Optional: limits width on very large screens
    margin: "15px auto", // Center the card horizontally
  },
  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  accept: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  reject: {
    backgroundColor: "#f44336",
    color: "white",
  },
  confirm: {
    backgroundColor: "#2196F3",
    color: "white",
  },
  loading: {
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    color: "red",
    padding: "20px",
  },
  noOrders: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
  },
};

export default DeliveryDashboard;
