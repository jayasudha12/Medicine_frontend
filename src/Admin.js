// AdminDashboard.js
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1f2937" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Admin!
        </Typography>
        <Typography>
          This is a simple static admin panel. You can add admin-specific functionalities here.
        </Typography>
      </Box>
    </Box>
  );
};

export default Admin;
