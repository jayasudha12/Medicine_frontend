import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from "@mui/material";

const Buy = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    phoneNo: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const token = localStorage.getItem("token"); // Get token from localStorage

  // Fetch medicine details
  const fetchMedicines = async () => {
    try {
      const response = await axios.get("https://medicine-expiry-8lj5.onrender.com/api/medicine/getAll", {
        headers: { Authorization: `Bearer ${token}` }, // Ensure token is added
      });
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines", error.response?.data || error.message);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://medicine-expiry-8lj5.onrender.com/api/order/${selectedMedicine._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is added
        }
      );
      alert("Order placed successfully!");
      setSelectedMedicine(null); // Close form after order
      setFormData({ name: "", quantity: "", phoneNo: "", address: "", email: "" }); // Reset form
    } catch (error) {
      console.error("Error placing order", error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Buy Medicines
      </Typography>

      <Grid container spacing={4}>
        {/* Medicine List */}
        <Grid item xs={12} md={7}>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Expiry Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine._id}>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.expiryDate}</TableCell>
                    <TableCell>{medicine.quantity}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => setSelectedMedicine(medicine)}>
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Order Form (Shown when a medicine is selected) */}
        {selectedMedicine && (
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" textAlign="center">
                Order {selectedMedicine.name}
              </Typography>
              <form onSubmit={handleOrderSubmit}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Phone No" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: 2 }}>
                  Place Order
                </Button>
                <Button variant="outlined" color="error" fullWidth sx={{ marginTop: 1 }} onClick={() => setSelectedMedicine(null)}>
                  Cancel
                </Button>
              </form>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Buy;
