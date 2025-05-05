import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton, Container, Card, CardContent, Grid, CircularProgress, Alert, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve token and userId from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  console.log('User ID:', userId);

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchOrders = async () => {
     
      try {
        const res = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/order/orderHistory/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data.pastOrders); // Assuming response has `pastOrders`
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token, navigate]);

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MedDelivery
          </Typography>
          <IconButton color="inherit" href="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" href="/order-history">
            <ListAltIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Delivered Orders History
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : orders.length === 0 ? (
          <Alert severity="info">No delivered orders found.</Alert>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.primary">
                      Order Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                      Status: {order.status}
                    </Typography>
                    <Grid container spacing={2}>
                      {order.items.map((item, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                          <Card variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                            <Typography><strong>Medicine:</strong> {item.medicineId?.name || 'N/A'}</Typography>
                            <Typography><strong>Price:</strong> ₹{item.medicineId?.price}</Typography>
                            <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => alert(`Reorder ${order._id}`)}>
                      Reorder
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

export default OrderHistoryPage;
