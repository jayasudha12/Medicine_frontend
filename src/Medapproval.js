import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

const MedApproval = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/medicines/approve/${id}`,
        {},
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
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Medicines Pending Approval
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : medicines.length === 0 ? (
        <Typography>No pending medicines.</Typography>
      ) : (
        medicines.map((medicine) => (
          <Paper key={medicine._id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography>
              <strong>Name:</strong> {medicine.name}
            </Typography>
            <Typography>
              <strong>Description:</strong> {medicine.description}
            </Typography>
            <Typography>
              <strong>Expiry Date:</strong> {medicine.expiryDate}
            </Typography>

            <Box sx={{ marginTop: 1 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(medicine._id)}
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
          </Paper>
        ))
      )}
    </Container>
  );
};

export default MedApproval;
