import { useState } from "react";
import { Button, IconButton, Drawer } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

function MedicalAppUI() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#16a34a" }} aria-label="MediConnect">
          Medi<span style={{ color: "#333" }}>Connect</span>
        </h1>

        {/* Mobile Drawer Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Menu />
        </IconButton>

        {/* Drawer for Mobile Navigation */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <div style={{ width: 250, padding: "16px" }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Home", "Services", "Connect", "AboutUs", "Contact"].map((item) => (
                <li key={item} style={{ padding: "12px 0", fontWeight: "500" }}>
                  <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Drawer>

        {/* Desktop Navigation */}
        <ul
          style={{
            display: "flex",
            gap: "24px",
            color: "#333",
            listStyle: "none",
            fontSize: "18px",
            display: { xs: "none", md: "flex" },
          }}
        >
          {["Home", "Services", "Connect", "AboutUs", "Contact"].map((item) => (
            <li key={item} style={{ cursor: "pointer", fontWeight: "500" }}>
              <Link to={`/${item.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Button variant="outlined">
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              Log In
            </Link>
          </Button>

          <Button
            style={{ backgroundColor: "#16a34a", color: "white", padding: "8px 16px", borderRadius: "8px" }}
          >
            <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
              Sign Up
            </Link>
          </Button>

          <Button
            style={{ backgroundColor: "#16a34a", color: "white", padding: "8px 16px", borderRadius: "8px" }}
          >
            <Link to="/delivery-form" style={{ textDecoration: "none", color: "inherit" }}>
              Delivery-agent form
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 40px",
          backgroundColor: "#e5e7eb",
        }}
      >
        {/* Text Section */}
        <div style={{ maxWidth: "680px", minHeight: "200px", height: "auto" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "#111" }}>
            Stay on Top of Your Medicine with <span style={{ color: "#16a34a" }}>Medicine Exchange Services</span>
          </h2>
          <p style={{ color: "#555", marginTop: "16px" }}>
            Exchange the medicine with nearby shops. Our app helps you manage your medicines and get timely reminders & make use of it.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
            <Button
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              <FaHeadset style={{ marginRight: "8px" }} /> Explore the Blog
            </Button>
            <Button
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              <FaGooglePlay style={{ marginRight: "8px" }} /> Learn More
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div style={{ position: "relative" }}>
          <img
            src="https://media.istockphoto.com/id/1455018058/photo/woman-at-pharmacy-shopping-for-medicine.jpg?s=612x612&w=0&k=20&c=lVWJzQ8BKiTpa0xjWHzWzYsGz8L1bBAEL1wtXYegRzc="
            alt="App Preview"
            style={{
              width: "720px",
              height: "400px",
              objectFit: "fill",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "40px 40px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <p style={{ maxWidth: "600px", color: "black" }}>
            Your trusted healthcare partner, providing seamless medicine exchange and tracking solutions.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
            <a href="#" style={{ textDecoration: "none", color: "green" }}>
              <FaGooglePlay style={{ fontSize: "32px" }} />
            </a>
            <a href="#" style={{ textDecoration: "none", color: "green" }}>
              <FaApple style={{ fontSize: "32px" }} />
            </a>
            <a href="#" style={{ textDecoration: "none", color: "green" }}>
              <FaTwitter style={{ fontSize: "32px" }} />
            </a>
          </div>
          <p style={{ marginTop: "16px", fontSize: "14px", color: "black" }}>
            © 2024 MediConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
