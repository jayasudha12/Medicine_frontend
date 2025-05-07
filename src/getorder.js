import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar, Toolbar, Typography, IconButton, Grid,
  CircularProgress, Alert, Box, Button, Card, CardContent, CardMedia
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/order/orderHistory/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data.pastOrders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId, token]);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
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

      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : orders.length === 0 ? (
          <Alert severity="info">No delivered orders found.</Alert>
        ) : (
          orders.map((order, idx) => (
            <Card
              key={idx}
              sx={{ mb: 4, borderRadius: 3, p: 2, backgroundColor: '#fff' }}
              elevation={2}
            >
              <Typography variant="h6" gutterBottom>
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: {order.status}
              </Typography>

              <Grid container spacing={2}>
                {order.items.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        bgcolor: '#fafafa',
                        overflow: 'hidden',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 3,
                        },
                      }}
                    >
                      {item.medicineId?.imageUrl && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.medicineId.imageUrl}
                          alt={item.medicineId?.name}
                        />
                      )}
                      <Box sx={{ p: 2 }}>
                        <Typography fontWeight="bold">
                          {item.medicineId?.name || 'Unknown'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.medicineId?.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box mt={2} textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => alert(`Reorder ${order._id}`)}
                >
                  Reorder
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default OrderHistoryPage;