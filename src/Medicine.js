import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Medicine = () => {
  const [medicine, setMedicine] = useState(null); // Single medicine data
  const [formData, setFormData] = useState({
    name: "",
    expiryDate: "",
    manufactureDate: "",
    chemicalContent: "",
    quantity: "",
    drugLicense: "",
  });

  const medicineId = "some-medicine-id"; // Replace with the ID you want to fetch

  useEffect(() => {
    fetchMedicineById(medicineId);
  }, [medicineId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token"); // Get token from local storage

  const fetchMedicineById = async (id) => {
    try {
      const response = await axios.get(`https://medicine-expiry-8lj5.onrender.com/api/medicine/getOne/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicine(response.data);
    } catch (error) {
      console.error("Error fetching medicine", error);
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
      fetchMedicineById(medicineId);
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
      setMedicine(null); // Reset the medicine data after deletion
    } catch (error) {
      console.error("Error deleting medicine", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" marginY={3}>Medicine Management</Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500, margin: "auto", boxShadow: 3, padding: 3, borderRadius: 2 }}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />
        <TextField label="Expiry Date" type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />
        <TextField label="Manufacture Date" type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />
        <TextField label="Chemical Content" name="chemicalContent" value={formData.chemicalContent} onChange={handleChange} required fullWidth />
        <TextField label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required fullWidth />
        <TextField label="Drug License" name="drugLicense" value={formData.drugLicense} onChange={handleChange} required fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>Add Medicine</Button>
      </Box>

      {medicine ? (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Manufacture Date</TableCell>
                <TableCell>Chemical Content</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Drug License</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" textAlign="center" marginY={3}>No medicine found</Typography>
      )}
    </Container>
  );
};

export default Medicine;
