import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Menu, MenuItem, Container, Grid, Card, CardContent, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton as MuiIconButton } from '@mui/material';
import { Search, ShoppingCart, Add, Remove } from '@mui/icons-material';
import { FaMedkit } from 'react-icons/fa';
import axios from 'axios';

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: '', phoneNo: '', email: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Handle quantity increase
  const handleIncreaseQuantity = (medicineId) => {
    const updatedItems = cartItems.map(item => 
      item.medicineId._id === medicineId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedItems);
  };
  const handleRemoveFromCart = async (medicineId) => {
    try {
      // Optimistic UI update: Remove the item from the cart immediately for fast feedback
      setCartItems(prevItems => prevItems.filter(item => item.medicineId._id !== medicineId));
  
      // Get userId from localStorage (ensure userId is available)
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error("User ID is not available.");
        setError("User is not logged in.");
        return;
      }
  
      // Log the values to verify before sending the request
      console.log("userId:", userId, "medicineId:", medicineId);
  
      // Send DELETE request with both userId and medicineId
      const response = await axios.delete(`https://medicine-expiry-8lj5.onrender.com/api/medicine/removeFromCart/${userId}/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Item successfully removed from the cart!');
      } else {
        // If the response is not a success (not 200), re-add the item to the cart
        setCartItems(prevItems => [...prevItems]); // Revert to the old cart state
        setError("Failed to remove item from cart");
        console.error("Error removing item: ", response);
      }
    } catch (error) {
      // If API call fails, restore the item in the cart and show an error message
      setCartItems(prevItems => [...prevItems]);
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart.");
    }
  };
  

  // Handle quantity decrease
  const handleDecreaseQuantity = (medicineId) => {
    const updatedItems = cartItems.map(item => 
      item.medicineId._id === medicineId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  // Handle input changes in the order details form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const selectedCartItemIds = cartItems.map(item => ({ _id: item._id, quantity: item.quantity }));
      const response = await axios.post('https://medicine-expiry-8lj5.onrender.com/api/order/placeOrder', {
        userId,
        selectedCartItemIds,
        ...orderDetails,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Order placed successfully:', response.data);
      // Reset the cart and order details after successful order
      setCartItems([]);
      setOrderDetails({ name: '', phoneNo: '', email: '', address: '' });
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order.");
    } finally {
      setIsSubmitting(false);
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

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center', mb: 2 }}>
                      <MuiIconButton 
                        color="primary" 
                        onClick={() => handleDecreaseQuantity(item.medicineId._id)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </MuiIconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <MuiIconButton 
                        color="primary" 
                        onClick={() => handleIncreaseQuantity(item.medicineId._id)}
                      >
                        <Add />
                      </MuiIconButton>
                    </Box>

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

        {/* Order Details Form */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Order Details</Typography>
          <TextField
            label="Name"
            fullWidth
            value={orderDetails.name}
            name="name"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            fullWidth
            value={orderDetails.phoneNo}
            name="phoneNo"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={orderDetails.email}
            name="email"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            value={orderDetails.address}
            name="address"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>
        </Box>
      </Container>

      {/* Order Success Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Order Placed Successfully</DialogTitle>
        <DialogContent>
          <Typography>Your order has been placed successfully. You will receive a confirmation shortly.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPage;
