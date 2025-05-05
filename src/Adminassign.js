import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Paper,
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
  const token = localStorage.getItem("token");

  // Fetch pending orders
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const ordersResponse = await axios.get(
          "https://medicine-expiry-8lj5.onrender.com/api/admin/orders/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
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

  // Fetch agents for selected order
  useEffect(() => {
    const fetchAgents = async () => {
      if (!selectedOrder || !token) return;
      try {
        const agentsResponse = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/admin/available-agents/${selectedOrder}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
      const response = await axios.put(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/orders/assign/${selectedOrder}`,
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
      console.error("Error assigning order:", err);
      setError("Failed to assign the order. Please try again.");
    }
  };

  return (
    <>
    <Admin/>
    <div
  style={{
    backgroundColor: "rgba(144, 238, 144, 0.3)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>

      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 600 }}>
            Assign Delivery Agent to Order
          </Typography>

          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Select Order */}
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="select-order-label">Select Order</InputLabel>
            <Select
              labelId="select-order-label"
              value={selectedOrder}
              onChange={(e) => {
                setSelectedOrder(e.target.value);
                setSelectedAgent("");
                setAvailableAgents([]);
              }}
            >
              {orders.map((order) => (
                <MenuItem key={order._id} value={order._id}>
                  {order.items?.[0]?.medicineName || "Unnamed Medicine"} —{" "}
                  {order.userId?.email || "Unknown User"}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select an order to assign a delivery agent</FormHelperText>
          </FormControl>

          {/* Select Agent */}
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
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
            color="success"
            fullWidth
            sx={{ padding: "10px", fontWeight: "bold" }}
            onClick={handleAssignOrder}
            disabled={!selectedOrder || !selectedAgent}
          >
            Assign Order
          </Button>
        </Paper>
      </Container>
    </div>
    </>
  );
};

export default AdminAssignOrder;
