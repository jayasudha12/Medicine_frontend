import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Container,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  IconButton
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { FaMedkit } from 'react-icons/fa';

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const categoryMap = {
  "prescription-medicine": "Prescription Medicine",
  "otc-medicine": "OTC medicine",
  "emergency-medicine": "Emergency Medicine",
  "elderly-medicine": "Elderly medicine",
  "others": "Other",
};

const CategoryMedicines = () => {
  const { category } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const categoryName = categoryMap[category] || category;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/categoryMedicine?category=${encodeURIComponent(categoryName)}&userIdToExclude=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMedicines(res.data);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
        setError("Failed to load medicines.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [category, userId]);

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedicine(null);
  };

  const handleAddToCart = async (medicine) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
      const response = await axios.put(
        'https://medicine-expiry-8lj5.onrender.com/api/medicine/addToCart',
        {
          userId,
          medicineId: medicine._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        cart.push(medicine);
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartMessage(`${medicine.name} added to cart!`);
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setCartMessage("Failed to add to cart. Please try again.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMedkit color="white" size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              MediConnect
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: 1, px: 1, py: 0.2, height: 36, width: 250 }}>
              <Search sx={{ color: "#888", mr: 0 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 14 }} />
            </Box>
            <IconButton sx={{ color: "#fff" }} onClick={() => navigate('/cart')}>
              <ShoppingCart />
            </IconButton>
            <Avatar sx={{ width: 40, height: 40, cursor: "pointer" }} src="https://cepi-sa.com/wp-content/uploads/2024/08/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, textAlign: "left" }}>
            {categoryName}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Discover a range of effective {categoryName?.toLowerCase()} curated for your wellness.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : medicines.length === 0 ? (
          <Typography>No medicines found in this category.</Typography>
        ) : (
          <Grid container spacing={4}>
            {medicines.map((med) => (
              <Grid item xs={12} sm={6} md={4} key={med._id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3, ":hover": { boxShadow: 6 } }}>
                <CardMedia
  component="img"
  height="180"
  image={med.imageUrl} // use only the actual image URL
  alt={med.name}
  sx={{ objectFit: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
/>

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {med.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {med.description || "Effective and safe medicine for your needs."}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button variant="outlined" color="primary" onClick={() => handleViewDetails(med)}>
                        View Details
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleAddToCart(med)}>
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Snackbar-style Cart Message */}
      {cartMessage && (
        <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <Alert severity="success">{cartMessage}</Alert>
        </Box>
      )}

      {/* Dialog for Medicine Details */}
      {selectedMedicine && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {selectedMedicine.name}
          </DialogTitle>
          <DialogContent sx={{ paddingTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={selectedMedicine.image || fallbackImage}
                    alt={selectedMedicine.name}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {selectedMedicine.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Description:</strong> {selectedMedicine.description || 'No description available.'}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ${selectedMedicine.price || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CategoryMedicines;
