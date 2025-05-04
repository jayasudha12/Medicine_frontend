import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Menu, MenuItem, Container, Grid, Card, CardContent, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { FaMedkit } from 'react-icons/fa';
import axios from 'axios';

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://medicine-expiry-8lj5.onrender.com/api/medicine/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [token]);

  // Handle avatar click
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (medicineId) => {
    try {
      await axios.delete(`https://medicine-expiry-8lj5.onrender.com/api/medicine/removeFromCart/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.medicineId._id !== medicineId)); // Update cart locally
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMedkit color="white" size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              MediConnect
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{
              display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: 1, px: 1, py: 0.2, height: 36, width: 250,
            }}>
              <Search sx={{ color: "#888", mr: 0 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 14 }} />
            </Box>
            <IconButton sx={{ color: "#fff" }}>
              <ShoppingCart />
            </IconButton>
            <Avatar
              onClick={handleAvatarClick}
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              src="https://cepi-sa.com/wp-content/uploads/2024/08/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseMenu}>My Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart Items */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center" }}>
            No items in your cart.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card sx={{
                  display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3, ":hover": { boxShadow: 6 },
                  backgroundColor: "#fff", padding: 2
                }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <img
                      src={item.medicineId.imageUrl || fallbackImage}
                      alt={item.medicineId.name}
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.medicineId.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.medicineId.description || "No description available."}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: "#388e3c", mb: 2 }}>
                      ${item.medicineId.price || 'N/A'}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleRemoveFromCart(item.medicineId._id)}
                    >
                      Remove from Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
