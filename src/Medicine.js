import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, InputAdornment, Container, Grid, Paper } from "@mui/material";
import { FaMedkit, FaSearch, FaDonate, FaShoppingCart, FaBell } from "react-icons/fa";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicineManagement = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [editingId, setEditingId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState({
    name: '',
    expiryDate: '',
    manufactureDate: '',
    chemicalContent: '',
    quantity: 1,
    drugLicense: '',
    category: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login');
    } else {
      fetchMedicines();
    }
  }, [userId, token, navigate]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/donorMedicine/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMedicines([...response.data]);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error fetching medicines');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineDetails({ ...medicineDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMedicineDetails({ ...medicineDetails, image: file });
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
  
    Object.entries(medicineDetails).forEach(([key, value]) => {
      if (key === 'image') {
        if (value) {
          formData.append('file', value); // binary image
        }
      } else {
        formData.append(key, value);
      }
    });
    
    try {
      if (editingId) {
        await axios.put(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/update/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/add/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      await fetchMedicines();
      setMedicineDetails({
        name: '',
        expiryDate: '',
        manufactureDate: '',
        chemicalContent: '',
        quantity: 1,
        drugLicense: '',
        category: '',
        image: null,
      });
      setImagePreview(null);
      setEditingId(null);
      document.getElementById('imageInput').value = '';
    } catch (error) {
      console.error('Submit error:', error);
      setError(editingId ? 'Error updating medicine' : 'Error adding medicine');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/getOne/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const {
        name,
        expiryDate,
        manufactureDate,
        chemicalContent,
        quantity,
        drugLicense,
        category,
        imageUrl,
      } = response.data;

      setMedicineDetails({
        name,
        expiryDate: expiryDate.slice(0, 10),
        manufactureDate: manufactureDate.slice(0, 10),
        chemicalContent,
        quantity,
        drugLicense,
        category,
        image: null,
      });

      setImagePreview(imageUrl);
      setEditingId(id);
      document.getElementById('imageInput').value = '';
    } catch (error) {
      console.error('Edit fetch error:', error);
      setError('Error fetching medicine details');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMedicines();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error deleting medicine');
    }
  };

  return (
    <div style={{ padding: '0px', background: '#e8f5e9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <AppBar position="static" sx={{ backgroundColor: "#2E7D32" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FaMedkit size={30} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: "8px" }}>
            MediConnect
          </Typography>
        </Toolbar>
      </AppBar>
      <h1 style={{ textAlign: 'center', color: '#1b5e20', marginBottom: '40px', fontSize: '32px' }}></h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            flex: '1',
            minWidth: '350px',
            maxWidth: '500px',
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(76, 175, 80, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
          }}
        >
          <h2 style={{ color: '#2e7d32', marginBottom: '20px', textAlign: 'center' }}>
            {editingId ? 'Edit Medicine' : 'Add Medicine'}
          </h2>

          {[['Name', 'name', 'text'], ['Expiry Date', 'expiryDate', 'date'], ['Manufacture Date', 'manufactureDate', 'date'], 
            ['Chemical Content', 'chemicalContent', 'text'], ['Quantity', 'quantity', 'number'], 
            ['Drug License', 'drugLicense', 'text']].map(([label, name, type]) => (
            <div key={name} style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#1b5e20' }}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={medicineDetails[name]}
                onChange={handleInputChange}
                required
                min={type === 'number' ? 1 : undefined}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #a5d6a7',
                  fontSize: '14px',
                  backgroundColor: '#f9fff9',
                }}
              />
            </div>
          ))}

          <div key="category" style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#1b5e20' }}>
              Category
            </label>
            <select
              name="category"
              value={medicineDetails.category}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #a5d6a7',
                fontSize: '14px',
                backgroundColor: '#f9fff9',
              }}
            >
              <option value="">Select Category</option>
              <option value="Prescription Medicine">Prescription Medicines</option>
              <option value="OTC Medicine">OTC Medicines</option>
              <option value="Emergency Medicine">Emergency Medicines</option>
              <option value="Elderly medicine">Elderly Medicines</option>
              <option value="Other">Others</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#1b5e20' }}>
              Image
            </label>
            <input
              id="imageInput"
              type="file"
              name="image"
              onChange={handleImageChange}
              required={!editingId}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #a5d6a7',
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: '10px', width: '100%', maxHeight: '200px', borderRadius: '10px' }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#43a047',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : editingId ? 'Update Medicine' : 'Add Medicine'}
          </button>
        </form>

        <div style={{
          flex: '1',
          minWidth: '350px',
          maxWidth: '500px',
          padding: '30px',
          borderRadius: '20px',
          background: 'rgba(76, 175, 80, 0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          overflowY: 'auto',
          maxHeight: '650px'
        }}>
          <h2 style={{ color: '#1b5e20', marginBottom: '20px', textAlign: 'center' }}>Donated Medicines</h2>

          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                padding: '15px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <img
                src={medicine.imageUrl || 'https://via.placeholder.com/150'}
                alt={medicine.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '5px' }}>{medicine.name}</h3>
                <p style={{ fontSize: '14px', color: '#388e3c' }}>Category: {medicine.category}</p>
                <p style={{ fontSize: '14px', color: '#2e7d32' }}>Quantity: {medicine.quantity}</p>
                <p style={{ fontSize: '14px', color: '#2e7d32' }}>Expiry: {medicine.expiryDate}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(medicine._id)}
                  style={{
                    backgroundColor: '#388e3c',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(medicine._id)}
                  style={{
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineManagement;
