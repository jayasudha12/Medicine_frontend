import React, { useState } from "react";
import { Container, Typography, Box, Card, CardContent, Grid, IconButton, Paper, CircularProgress, AppBar, Toolbar, InputBase, Avatar, Menu, MenuItem } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { styled } from "@mui/system";
import { FaMedkit } from 'react-icons/fa'; // Add the medkit icon
import { Search, ShoppingCart } from '@mui/icons-material';

// Example thermometer image URL
const thermometerImageUrl = "https://example.com/your-thermometer-image.jpg"; // Replace with actual URL

// Styled components for better design
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: "#f5f5f5",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  padding: theme.spacing(3),
}));

const ViewDetailsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMedkit color="white" size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              MediConnect
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 1,
                px: 1,
                py: 0.2,
                height: 36,
                width: 250,
              }}
            >
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

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Temperature Details
          </Typography>
          <IconButton color="primary" size="large">
            <ThermostatIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {/* Main Content Section */}
        <Grid container spacing={4}>
          {/* Thermometer Image and Data */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box
                  component="img"
                  src={thermometerImageUrl}
                  alt="Thermometer"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: 3,
                  }}
                />
                <Typography variant="h5" mt={3} fontWeight="bold">
                  Current Temperature: 22°C
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  The current temperature is optimal for human comfort. Our thermometer provides real-time data
                  and helps maintain perfect environmental conditions in your home or office.
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2" color="text.secondary">
                    Humidity: 60%
                  </Typography>
                  <CircularProgress size={24} color="secondary" sx={{ marginLeft: "8px" }} />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Additional Insights Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                Additional Insights
              </Typography>
              <Typography variant="body1" paragraph>
                Monitor your surroundings effortlessly. With our smart thermometer, you can:
                <ul>
                  <li>Receive notifications when the temperature exceeds the set threshold.</li>
                  <li>Check your device's temperature data in real-time.</li>
                  <li>Adjust settings remotely for optimal comfort.</li>
                </ul>
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <IconButton color="primary" size="large">
                  <ThermostatIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewDetailsPage;
