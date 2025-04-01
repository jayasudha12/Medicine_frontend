import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, InputAdornment, Container, Grid, Paper } from "@mui/material";
import { FaMedkit, FaSearch, FaDonate, FaShoppingCart } from "react-icons/fa";

const MediConnectPage = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
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
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
              <FaDonate size={50} color="#1976D2" />
              <Typography variant="h5" sx={{ marginTop: 2 }}>Donate Medicines</Typography>
              <Typography variant="body1" sx={{ marginY: 2 }}>
                Help those in need by donating unused, unexpired medicines.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<FaDonate />} fullWidth>
                Donate
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
              <FaShoppingCart size={50} color="#1976D2" />
              <Typography variant="h5" sx={{ marginTop: 2 }}>Buy Medicines</Typography>
              <Typography variant="body1" sx={{ marginY: 2 }}>
                Purchase affordable and essential medicines with ease.
              </Typography>
              <Button variant="contained" color="secondary" startIcon={<FaShoppingCart />} fullWidth>
                Buy
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MediConnectPage;