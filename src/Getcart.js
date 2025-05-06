import { useState, useEffect } from 'react';
import {
  Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Menu, MenuItem,
  Container, Grid, Card, CardContent, Button, CircularProgress, Alert, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, Divider
} from '@mui/material';
import { Search, ShoppingCart, Add, Remove } from '@mui/icons-material';
import { FaMedkit } from 'react-icons/fa';
import axios from 'axios';
import { Link } from "react-router-dom";

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: '', phoneNo: '', email: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://medicine-expiry-8lj5.onrender.com/api/medicine/cart', {
          headers: { Authorization: `Bearer ${token}` }
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

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleIncreaseQuantity = (medicineId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.medicineId._id === medicineId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (medicineId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.medicineId._id === medicineId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = async (medicineId) => {
    setCartItems(prev => prev.filter(item => item.medicineId._id !== medicineId));
    try {
      await axios.delete(`https://medicine-expiry-8lj5.onrender.com/api/medicine/removeFromCart/${userId}/${medicineId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Remove failed:", err);
      setError("Failed to remove item.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenOrderDialog = () => setOrderDialogOpen(true);
  const handleCloseOrderDialog = () => setOrderDialogOpen(false);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const selectedCartItemIds = cartItems.map(item => ({
        _id: item._id,
        quantity: item.quantity,
      }));
      await axios.post('https://medicine-expiry-8lj5.onrender.com/api/order/placeOrder', {
        userId, selectedCartItemIds, ...orderDetails
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems([]);
      setOrderDetails({ name: '', phoneNo: '', email: '', address: '' });
      setOrderDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Order error:", error);
      setError("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessDialog = () => setSuccessDialogOpen(false);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", px: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMedkit color="white" size={24} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
              MediConnect
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{
              display: "flex", alignItems: "center", backgroundColor: "#fff",
              borderRadius: 1, px: 1, py: 0.5, height: 36, width: 250
            }}>
              <Search sx={{ color: "#888" }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 14, ml: 1 }} />
            </Box>
            <IconButton sx={{ color: "#fff" }}><ShoppingCart /></IconButton>
            <Avatar
              src="https://cepi-sa.com/wp-content/uploads/2024/08/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
              sx={{ cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem onClick={handleCloseMenu}>My Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container sx={{ py: 5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {cartItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                    <img
                      src={item.medicineId.imageUrl || fallbackImage}
                      alt={item.medicineId.name}
                      style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.medicineId.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.medicineId.price}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        <IconButton onClick={() => handleDecreaseQuantity(item.medicineId._id)}><Remove /></IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => handleIncreaseQuantity(item.medicineId._id)}><Add /></IconButton>
                      </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleRemoveFromCart(item.medicineId._id)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: "center", mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpenOrderDialog}
                sx={{ backgroundColor: "#388e3c", px: 5, py: 1.5 }}
              >
                Proceed to Order
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/order-history"
                sx={{ borderColor: "#1976d2", color: "#1976d2", px: 4, py: 1.5 }}
              >
                View Order History
              </Button>
            </Box>
          </>
        )}
      </Container>

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog} fullWidth maxWidth="sm">
        <DialogTitle>Enter Your Order Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Name" name="name" margin="dense"
            value={orderDetails.name} onChange={handleInputChange}
          />
          <TextField
            fullWidth label="Phone Number" name="phoneNo" margin="dense"
            value={orderDetails.phoneNo} onChange={handleInputChange}
          />
          <TextField
            fullWidth label="Email" name="email" margin="dense"
            value={orderDetails.email} onChange={handleInputChange}
          />
          <TextField
            fullWidth label="Address" name="address" margin="dense"
            multiline rows={3}
            value={orderDetails.address} onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrderDialog}>Cancel</Button>
          <Button
            onClick={handlePlaceOrder}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Order Placed Successfully!</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPage;
