import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, IconButton, AppBar, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import LockIcon from "@mui/icons-material/Lock";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { Link } from "react-router-dom";
import { FaMedkit } from "react-icons/fa";

const Slide1 = "https://www.pharmaceutical-technology.com/wp-content/uploads/sites/24/2020/10/Feature-image-top-ten-pharma-companies-in-2020.jpg";
const Slide2 = "https://thehealthcareinsights.com/wp-content/uploads/2022/10/The-Future-of-the-Pharmaceutical-Industry.jpg";
const Slide3 = "https://media.istockphoto.com/id/1499814881/photo/sorting-pharmaceutical-capsules-by-a-sorting-machine-on-a-production-line.jpg?s=612x612&w=0&k=20&c=JPJzEW8SijY5nwBMi6IqLwlO_RHmK4UUb406ZN-5bCs=";

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2, Slide3];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: 3 }}>
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

      {/* About Us Section */}
      <Box sx={{ textAlign: "center", mt: 10, maxWidth: "900px", margin: "auto" }}>
        <Typography variant="h5" color="black" sx={{ mt: 6 }}>
          MediConnect is revolutionizing the healthcare industry by making it easier for individuals to access medical products and services.
        </Typography>
      </Box>

      <Paper
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "80%", 
          height: "500px",
          borderRadius: 2,
          margin: "auto",
          mt: 4,
        }}
      >
        <Box
          component="img"
          src={slides[currentSlide]}
          alt="Slide"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "fill", 
            borderRadius: 2,
          }}
        />
      </Paper>

      {/* Fast and Reliable Service, Secure and Confidential, Easy Integration in a row */}
      <Grid 
        container 
        spacing={4} 
        sx={{ marginTop: 4, justifyContent: "center", flexDirection: "row" }} // Ensure row layout
      >
        <Grid item xs={5} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
            <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
              <FastRewindIcon sx={{ fontSize: 40, color: blue[500] }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
              Fast and Reliable Service
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }}>
              It delivers essential medicines and healthcare products 
              <br></br>swiftly, ensuring that you never have to wait.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
            <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
              <LockIcon sx={{ fontSize: 40, color: blue[500] }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
              Secure and Confidential
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }}>
              Your personal data are securely stored, ensuring 
              <br></br>confidentiality  for every customer.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: "center", backgroundColor: "#ffffff", padding: 3, borderRadius: 2 }}>
            <IconButton sx={{ backgroundColor: blue[100], padding: 2, borderRadius: "50%" }}>
              <IntegrationInstructionsIcon sx={{ fontSize: 40, color: blue[500] }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" color={blue[500]} sx={{ mt: 2 }}>
              Easy Integration
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }}>
              Our platform integrates easily with pharmacies 
              <br></br>and health systems to ensure a seamless experience.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 6, textAlign: "center" }}>
        <Typography variant="h5" color={blue[700]} fontWeight="bold">
         What do people say?
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 3, justifyContent: "center" }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 3, backgroundColor: "#ffffff", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" color={blue[500]}>
                John Doe
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                "MediConnect has made getting my prescriptions so easy and hassle-free."
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 3, backgroundColor: "#ffffff", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" color={blue[500]}>
                Emily Smith
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                "The service is quick, reliable, and makes my life easier. "
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4, padding: 2, backgroundColor: "#1e40af", color: "white" }}>
        <Typography variant="body2">© 2025 MediConnect | Revolutionizing Healthcare Delivery</Typography>
      </Box>
    </Box>
  );
}