import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  TextField,
} from "@mui/material";

const MedApproval = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To handle error messages
  const [prices, setPrices] = useState({}); // To store the price of each medicine
  const token = localStorage.getItem("token");

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://medicine-expiry-8lj5.onrender.com/api/admin/medicines/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicines(res.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
      setError("Failed to fetch medicines.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, medicine) => {
    const price = prices[id]; // Get the price entered by the admin for this medicine

    // Ensure that the price is valid
    if (price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    try {
      const res = await axios.put(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/medicines/approve/${id}`,
        { price }, // Send the price along with the approval request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Medicine approved.");
      fetchMedicines();
    } catch (error) {
      console.error("Approval failed:", error);
      setError("Approval failed. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/medicines/reject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Medicine rejected.");
      fetchMedicines();
    } catch (error) {
      console.error("Rejection failed:", error);
      setError("Rejection failed. Please try again.");
    }
  };

  const handlePriceChange = (id, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <>
    <Admin/>
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Medicines Pending Approval
      </Typography>

      {/* Display error message */}
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <CircularProgress />
      ) : medicines.length === 0 ? (
        <Typography>No pending medicines.</Typography>
      ) : (
        medicines.map((medicine) => (
          <Paper
  key={medicine._id}
  sx={{
    display: "flex",
    alignItems: "flex-start",
    padding: 2,
    marginBottom: 2,
    gap: 3,
  }}
>
  {/* Left: Image */}
  <Box sx={{ flexShrink: 0 }}>
    <img
      src={medicine.imageUrl}
      alt={medicine.name}
      style={{ width: 150, height: "auto", borderRadius: 8 }}
    />
  </Box>

  {/* Right: Details */}
  <Box sx={{ flexGrow: 1 }}>
    <Typography variant="h6" gutterBottom>
      {medicine.name}
    </Typography>
    <Typography sx={{ marginBottom: 1 }}>
      <strong>Expiry Date:</strong> {medicine.expiryDate}
    </Typography>

    <TextField
      label="Price"
      type="number"
      variant="outlined"
      fullWidth
      value={prices[medicine._id] || ""}
      onChange={(e) => handlePriceChange(medicine._id, e.target.value)}
      sx={{ marginBottom: 2 }}
    />

    <Box sx={{ marginTop: 1 }}>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleApprove(medicine._id, medicine)}
        sx={{ marginRight: 1 }}
      >
        Approve
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleReject(medicine._id)}
      >
        Reject
      </Button>
    </Box>
  </Box>
</Paper>

        ))
      )}
    </Container>
    </>
  );
};

export default MedApproval;
