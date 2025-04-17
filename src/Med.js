import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, InputAdornment, Container, Grid, Paper } from "@mui/material";
import { FaMedkit, FaSearch, FaDonate, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MediConnectPage = () => {
  return (
    <div style={{
      backgroundImage: "url('https://source.unsplash.com/1600x900/?medical,health')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      position: "relative",
    }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(46, 125, 50, 0.8)" }}>
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
      <Container
        sx={{
          marginTop: 4,
          padding: 4,
          borderRadius: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Donate Medicine Card */}
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

          {/* Buy Medicine Card */}
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

        {/* Videos Section */}
        <Typography variant="h5" sx={{ marginTop: 6, textAlign: "center", fontWeight: "bold" }}>
          Health Tips and Videos
        </Typography>
        
        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
          {/* Video 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ padding: 2, borderRadius: 2 }}>
              <iframe
                width="100%"
                height="215"
                src="https://www.youtube.com/embed/tqwdalGQkzM"
                title="Health Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Paper>
          </Grid>

          {/* Video 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ padding: 2, borderRadius: 2 }}>
              <iframe
                width="100%"
                height="215"
                src="https://www.youtube.com/embed/PAfUyS6XW8A"
                title="Health Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Paper>
          </Grid>

          {/* Video 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ padding: 2, borderRadius: 2 }}>
              <iframe
                width="100%"
                height="215"
                src="https://www.youtube.com/embed/aGdDqfNm0Xk"
                title="Health Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Paper>
          </Grid>

          {/* Video 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ padding: 2, borderRadius: 2 }}>
              <iframe
                width="100%"
                height="215"
                src="https://www.youtube.com/embed/J6k1anOXB4Q"
                title="Health Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MediConnectPage;
