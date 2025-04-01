import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, AppBar, Toolbar, IconButton, Container } from "@mui/material";
import { FaUser, FaEnvelope, FaLock,FaQuoteLeft,FaQuoteRight,FaUserPlus,FaMedkit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`https://medicine-expiry-8lj5.onrender.com/api/user/register`, {
        userName,
        email,
        password,
      });

      console.log(response.data);
      alert("Registration successful! Please log in.");
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data : "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#16a34a" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
            <FaMedkit size={30} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: "8px" }}>
            MediConnect
          </Typography>
          <div>
            <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
              Home
            </Link>
            <Link to="/contact" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
              Contact
            </Link>
            <Link to="/connect" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
              Connect
            </Link>
            <Link to="/services" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
              Services
            </Link>
            <Link to="/aboutus" style={{ color: "white", textDecoration: "none" }}>
              About Us
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Registration Form with Image */}
      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "70px" }}>
        <Box
          sx={{
            maxWidth: 500, // Increased width
            padding: 4,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            borderRadius: "8px",
            marginRight: "20px",
          }}
        >
         <Typography variant="h5" component="h2" textAlign="center" marginBottom={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
  <FaUserPlus style={{ fontSize: "28px", color: "black", marginRight: "8px" }} />
  Register for MediConnect
</Typography>
{/* Quotes with Icon */}
<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2 }}>
 
  <Typography variant="body2" color="textSecondary" sx={{ maxWidth: "90%" }}>
    "Connecting people, empowering health. Your journey starts here."
  </Typography>
  
</Box>

          {error && (
            <Typography color="error" variant="body2" textAlign="center" marginBottom={2}>
              {error}
            </Typography>
          )}
<br></br>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: <FaUser style={{ marginRight: 8 }} />,
              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: <FaEnvelope style={{ marginRight: 8 }} />,
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: <FaLock style={{ marginRight: 8 }} />,
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" marginTop={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#16a34a", textDecoration: "none" }}>
              Login here
            </Link>
          </Typography>
        </Box>

        <Box
  component="img"
  src="https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg"
  alt="Register Illustration"
  sx={{
    width: 500,
    height: 400,
    objectFit: "cover",
    borderRadius: "8px",
    margin: "20px", // Added margin
  }}
/>

      </Container>
    </div>
  );
};

export default Register;
