import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAssignOrder = () => {
  const [orders, setOrders] = useState([]);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch token from localStorage
  const token = localStorage.getItem("token");

  // Redirect if no token is found (for unauthorized users)
useEffect(() => {
  const fetchData = async () => {
    if (!token) return; // Don't make API call if token is not available

    try {
      const ordersResponse = await axios.get(
        "https://medicine-expiry-8lj5.onrender.com/api/admin/orders/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Fetched orders:", ordersResponse.data); // Add this line to inspect the data
      setOrders(ordersResponse.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response && err.response.status === 401) {
        setError("Invalid or expired token. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to fetch orders. Make sure you're logged in as admin.");
      }
    }
  };

  fetchData();
}, [token, navigate]);


  // Fetch pending orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // Don't make API call if token is not available

      try {
        const ordersResponse = await axios.get(
          "https://medicine-expiry-8lj5.onrender.com/api/admin/orders/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response && err.response.status === 401) {
          setError("Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to fetch orders. Make sure you're logged in as admin.");
        }
      }
    };

    fetchData();
  }, [token, navigate]);

  // Fetch available agents when an order is selected
  useEffect(() => {
    const fetchAgents = async () => {
      if (!selectedOrder || !token) return;

      try {
        const agentsResponse = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/admin/available-agents/${selectedOrder}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailableAgents(agentsResponse.data);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to fetch available delivery agents.");
      }
    };

    fetchAgents();
  }, [selectedOrder, token]);

  const handleAssignOrder = async () => {
    if (!selectedOrder || !selectedAgent) {
      setError("Please select both an order and a delivery agent.");
      return;
    }

    try {
      // Send PUT request to backend with the order ID and selected agent ID
      const response = await axios.put(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/orders/assign/${selectedOrder}`,
        { deliveryAgentId: selectedAgent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Order assigned successfully!");
        navigate("/admin-orders");
      }
    } catch (err) {
      console.error("Error assigning order:", err);
      setError("Failed to assign the order. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Assign Delivery Agent to Order
      </Typography>

      {/* Display errors */}
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Select Order */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="select-order-label">Select Order</InputLabel>
        <Select
  labelId="select-order-label"
  value={selectedOrder}
  onChange={(e) => {
    setSelectedOrder(e.target.value);
    setSelectedAgent(""); // Reset agent when order changes
    setAvailableAgents([]); // Clear agents until refetch
  }}
>
  {orders.map((order) => (
    <MenuItem key={order._id} value={order._id}>
      {order.items?.[0]?.medicineName || "Unnamed Medicine"} — {order.userId?.email || "Unknown User"}
    </MenuItem>
  ))}
</Select>

        <FormHelperText>Select an order to assign a delivery agent</FormHelperText>
      </FormControl>

      {/* Select Delivery Agent */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="select-agent-label">Select Delivery Agent</InputLabel>
        <Select
          labelId="select-agent-label"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          disabled={!availableAgents.length}
        >
          {availableAgents.map((agent) => (
            <MenuItem key={agent._id} value={agent._id}>
              {agent.fullName} (Email: {agent.email})
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a delivery agent to assign</FormHelperText>
      </FormControl>

      {/* Assign Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignOrder}
        disabled={!selectedOrder || !selectedAgent}
      >
        Assign Order
      </Button>
    </Container>
  );
};

export default AdminAssignOrder;
