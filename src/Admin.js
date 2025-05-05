import React from "react";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
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
          {/* New Links for Managing Orders */}
          <Button color="inherit">
            <Link to="/admin-assign-order" style={{ color: "white", textDecoration: "none" }}>
              Assign Orders
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Admin;
