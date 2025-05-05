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
} from "@mui/material";

const DeliveryApprove = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://medicine-expiry-8lj5.onrender.com/api/admin/deliveryAgent/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/applications/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Delivery agent application approved.");
      fetchApplications();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `https://medicine-expiry-8lj5.onrender.com/api/admin/applications/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Delivery agent application rejected.");
      fetchApplications();
    } catch (error) {
      console.error("Rejection failed:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <Admin /> {/* Make sure this fills width inside the component */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Delivery Agent Applications
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : applications.length === 0 ? (
          <Typography>No pending delivery agent applications.</Typography>
        ) : (
          applications.map((application) => (
            <Paper key={application._id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography><strong>Name:</strong> {application.fullName}</Typography>
              <Typography><strong>Email:</strong> {application.email}</Typography>
              <Typography><strong>Phone:</strong> {application.phone}</Typography>
              <Typography><strong>Address:</strong> {application.address}</Typography>

              <Box sx={{ marginTop: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApprove(application._id)}
                  sx={{ marginRight: 1 }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(application._id)}
                >
                  Reject
                </Button>
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
};

export default DeliveryApprove;
