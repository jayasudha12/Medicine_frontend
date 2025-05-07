import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  Grid,
  Paper,
  Box
} from "@mui/material";
import { FaMedkit, FaSearch, FaDonate, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MediConnectPage = () => {
  const videoUrls = [
    "https://www.youtube.com/embed/YJ3W0qN5K8Q?si=3eI7HY3gd9WOLbXS",
    "https://www.youtube.com/embed/8LZJz7GtJA0?si=nbk68t1MCdc29VCw",
    "https://www.youtube.com/embed/QQuyzOlG3Bk?si=5MIopH6dRa-KsPc7",
    "https://www.youtube.com/embed/yeCjMIO726s?si=Uofscqbn6xFYHt7K",
    "https://www.youtube.com/embed/4RMN-C0ezzI?si=T-sqT_XMt4buh2SO",
    "https://www.youtube.com/embed/_pSiCh8tbEk?si=HeJMJZvTYFjWIosy"
  ];

  return (
    <div style={{
      backgroundImage: "url('https://source.unsplash.com/1600x900/?medical,health')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      position: "relative",
    }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#388e3c" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FaMedkit size={30} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: "8px" }}>
            MediConnect
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
          <IconButton color="inherit" aria-label="notifications">
            <FaBell size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content Section */}
      <Container sx={{ marginTop: 4, padding: 4, borderRadius: 2, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Donate Medicines */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              <FaDonate size={50} color="#1976D2" />
              <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 'bold' }}>Donate Medicines</Typography>
              <Typography variant="body1" sx={{ marginY: 2 }}>
                Help those in need by donating unused, unexpired medicines.
              </Typography>
              <Link to="/medicine">
                <Button variant="contained" color="primary" startIcon={<FaDonate />} fullWidth>
                  Donate
                </Button>
              </Link>
            </Paper>
          </Grid>

          {/* Buy Medicines */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: 2,
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              <FaShoppingCart size={50} color="#7E57C2" />
              <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 'bold' }}>Buy Medicines</Typography>
              <Typography variant="body1" sx={{ marginY: 2 }}>
                Purchase affordable and essential medicines with ease.
              </Typography>
              <Link to="/category">
                <Button variant="contained" color="secondary" startIcon={<FaShoppingCart />} fullWidth>
                  Buy
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>

        <Box
  sx={{
    mt: 6,
    py: 1,
    px: 2,
    width: "100%",
    maxWidth: "1700px",
    mx: "auto"
  }}
>
  <center>
  <Typography
    variant="h5"
    sx={{
      mb: 4,
     
      fontWeight: "bold",
      backgroundColor: "whitesmoke", // Light blue background ONLY for heading
      display: "inline-block",
      px: 3,
      py: 1,
      borderRadius: 2
    }}
  >
    Empowering health through accessible medical education
    
  </Typography>
  </center>

  <Grid container spacing={4}>
    {videoUrls.map((videoUrl, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "white",
            transition: "transform 0.3s ease",
            '&:hover': { transform: 'scale(1.03)' }
          }}
        >
          <iframe
            width="100%"
            height="240"
            src={videoUrl}
            title={`Health Video ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

      </Container>
    </div>
  );
};

export default MediConnectPage;
