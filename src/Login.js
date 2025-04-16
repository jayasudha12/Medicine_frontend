import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, AppBar, Toolbar, IconButton, Container } from "@mui/material";
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaMedkit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
  
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://medicine-expiry-8lj5.onrender.com/api/user/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/med"); 
    } catch (err) {
      console.error("Login Error:", err);
  
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "An error occurred during login.";
      setError(errorMessage);
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
            <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>Home</Link>
            <Link to="/contact" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>Contact</Link>
            <Link to="/connect" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>Connect</Link>
            <Link to="/services" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>Services</Link>
            <Link to="/aboutus" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Login Form with Image */}
      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "103px" }}>
        <Box sx={{ maxWidth: 500, padding: 4, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white", borderRadius: "8px", marginRight: "20px" }}>
          <Typography variant="h5" component="h2" textAlign="center" marginBottom={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaSignInAlt style={{ fontSize: "28px", color: "black", marginRight: "8px" }} />
            Login to MediConnect
          </Typography>

          {error && (
            <Typography color="error" variant="body2" textAlign="center" marginBottom={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
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
            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" marginTop={2}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#16a34a", textDecoration: "none" }}>
              Register here
            </Link>
          </Typography>

          {/* Display decoded token details */}
          {decodedToken && (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="body2" textAlign="center">
                Logged in as User ID: {decodedToken.userId}
              </Typography>
              <Button variant="outlined" color="secondary" onClick={handleLogout} fullWidth sx={{ marginTop: 2 }}>
                Logout
              </Button>
            </Box>
          )}
        </Box>

        <Box component="img" src="https://img.freepik.com/premium-vector/medicine-healthcare-with-online-medical-consultation-doctor-appointment-flat-design_269730-361.jpg" alt="Login Illustration" sx={{ width: 500, height: 400, objectFit: "cover", borderRadius: "8px", margin: "20px" }} />
      </Container>
    </div>
  );
};

export default Login;
