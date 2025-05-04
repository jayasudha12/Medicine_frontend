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

  const token = localStorage.getItem("token"); // Ensure token is stored at login

  // Fetch pending orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/admin/orders/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch pending orders", err);
        setError("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, [token]);

  // Fetch available agents when an order is selected
  useEffect(() => {
    const fetchAgents = async () => {
      if (!selectedOrder) return;
      try {
        const response = await axios.get(`/api/admin/available-agents/${selectedOrder}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableAgents(response.data);
      } catch (err) {
        console.error("Failed to fetch available agents", err);
        setError("Failed to fetch delivery agents.");
      }
    };
    fetchAgents();
  }, [selectedOrder, token]);

  // Handle assignment
  const handleAssignOrder = async () => {
    if (!selectedOrder || !selectedAgent) {
      setError("Please select both an order and a delivery agent.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/admin/orders/assign/${selectedOrder}`,
        { deliveryAgentId: selectedAgent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Order assigned successfully!");
        navigate("/admin-orders");
      }
    } catch (err) {
      console.error("Assignment failed", err);
      setError("Failed to assign the order.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Assign Delivery Agent to Order
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Select Order */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="order-label">Select Order</InputLabel>
        <Select
          labelId="order-label"
          value={selectedOrder}
          onChange={(e) => {
            setSelectedOrder(e.target.value);
            setSelectedAgent(""); // Reset agent when order changes
          }}
        >
          {orders.map((order) => (
            <MenuItem key={order._id} value={order._id}>
              #{order._id} - {order?.medicineId?.name || "Unknown"} (User: {order?.userId?.email || "N/A"})
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose a pending order</FormHelperText>
      </FormControl>

      {/* Select Agent */}
      <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedOrder}>
        <InputLabel id="agent-label">Select Delivery Agent</InputLabel>
        <Select
          labelId="agent-label"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          {availableAgents.map((agent) => (
            <MenuItem key={agent._id} value={agent._id}>
              {agent.fullName} (Email: {agent.email})
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose an agent for the selected order</FormHelperText>
      </FormControl>

      <Button variant="contained" onClick={handleAssignOrder} disabled={!selectedOrder || !selectedAgent}>
        Assign Order
      </Button>
    </Container>
  );
};

export default AdminAssignOrder;
