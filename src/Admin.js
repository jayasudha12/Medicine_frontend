import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit">
            <Link to="/admin-med" style={{ color: "white", textDecoration: "none" }}>
              Medicines
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/admin-delivery" style={{ color: "white", textDecoration: "none" }}>
              Delivery Agents
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/admin-assign-order" style={{ color: "white", textDecoration: "none" }}>
              Assign Orders
            </Link>
          </Button>
          <Button color="inherit">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container sx={{ paddingTop: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="h6" paragraph>
          As an admin, you have access to manage all aspects of the delivery system. You can assign orders, 
          manage medicines, and track delivery agents' progress.
        </Typography>

        {/* Instructions or Call to Action */}
        <Box sx={{ marginTop: "40px", textAlign: "center" }}>
          <Typography variant="h6" paragraph>
            You can navigate through the links above to manage medicines, delivery agents, and assign orders. 
            Click on "Assign Orders" to manage current orders and their assignment to delivery agents.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Admin;
