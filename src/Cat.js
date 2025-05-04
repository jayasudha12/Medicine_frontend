import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom'; 

// Map slugs to human-readable category names
const slugToCategoryName = {
  "prescription-medicines": "Prescription Medicine",
  "otc-medicines": "OTC Medicine",
  "emergency-medicines": "Emergency Medicine",
  "elderly-medicines": "Elderly medicine",
  "others": "Other"
};

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const CategoryMedicines = () => {
  const { category: categorySlug } = useParams(); // Get category from URL
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const token = localStorage.getItem('token'); // Get token from localStorage

  const categoryName = slugToCategoryName[categorySlug]; // Get category name based on the slug

  useEffect(() => {
    if (!categoryName) {
      setError("Invalid category specified.");
      setLoading(false);
      return;
    }

    // Fetch approved medicines for the category
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/categoryMedicine?category=${encodeURIComponent(categoryName)}&userIdToExclude=${userId}`, // Ensure this matches your backend API route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMedicines(res.data);
      } catch (err) {
        console.error('Error fetching medicines:', err.response?.data || err.message);
        setError("Failed to load medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [categoryName, userId, token]);

  // Open the dialog to view medicine details
  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedicine(null);
  };
  const navigate = useNavigate(); // Initialize navigate function

const handleCartClick = () => {
  // Navigate to the cart page when the icon is clicked
  navigate('/cart');
};
  // Handle adding medicine to the cart
  const handleAddToCart = async (medicine) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    try {
      // Make the API request to add medicine to the cart
      const response = await axios.put(
        'https://medicine-expiry-8lj5.onrender.com/api/medicine/addToCart', // Backend API for adding to cart
        {
          userId: userId,
          medicineId: medicine._id, // Sending the medicine's ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        cart.push(medicine); // Update the cart locally
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
        setCartMessage(`${medicine.name} added to cart!`); // Provide success feedback
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
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
            <IconButton sx={{ color: "#fff" }} onClick={handleCartClick}>
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
                    image={med.imageUrl || fallbackImage}
                    alt={med.name}
                    sx={{ objectFit: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
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

      {/* Cart Message */}
      {cartMessage && (
        <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <Alert severity="success">{cartMessage}</Alert>
        </Box>
      )}

      {/* Enhanced Dialog for Medicine Details */}
      {selectedMedicine && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {selectedMedicine.name}
          </DialogTitle>
          <DialogContent sx={{ paddingTop: 2 }}>
            <Grid container spacing={2}>
              {/* Medicine Image */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={selectedMedicine.imageUrl || fallbackImage}
                    alt={selectedMedicine.name}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              {/* Medicine Information */}
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
