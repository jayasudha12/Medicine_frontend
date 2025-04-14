import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    expiryDate: "",
    manufactureDate: "",
    chemicalContent: "",
    quantity: "",
    drugLicense: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("https://medicine-expiry-8lj5.onrender.com/api/medicine/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://medicine-expiry-8lj5.onrender.com/api/medicine/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMedicines();
      setFormData({ name: "", expiryDate: "", manufactureDate: "", chemicalContent: "", quantity: "", drugLicense: "" });
    } catch (error) {
      console.error("Error adding medicine", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://medicine-expiry-8lj5.onrender.com/api/medicine/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" marginY={3}>Medicine Management</Typography>
      <Grid container spacing={4}>
        {/* Form on the left side */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" textAlign="center">Add Medicine</Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Expiry Date" type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} margin="normal" />
              <TextField label="Manufacture Date" type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} margin="normal" />
              <TextField label="Chemical Content" name="chemicalContent" value={formData.chemicalContent} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Drug License" name="drugLicense" value={formData.drugLicense} onChange={handleChange} required fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Add Medicine</Button>
            </form>
          </Paper>
        </Grid>

        {/* Details Table on the right side */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#2E7D32", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Expiry Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Manufacture Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Chemical Content</TableCell>
                  <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                  <TableCell sx={{ color: "white" }}>Drug License</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine._id}>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.expiryDate}</TableCell>
                    <TableCell>{medicine.manufactureDate}</TableCell>
                    <TableCell>{medicine.chemicalContent}</TableCell>
                    <TableCell>{medicine.quantity}</TableCell>
                    <TableCell>{medicine.drugLicense}</TableCell>
                    <TableCell>
                      <Button color="error" onClick={() => handleDelete(medicine._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MedicineManagement;
