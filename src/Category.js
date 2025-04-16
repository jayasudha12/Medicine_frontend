import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
  Paper,
  Container,
  Avatar,
  Menu,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { FaMedkit, FaGift, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LocationOn,
  Phone,
  Email
} from "@mui/icons-material";


// Category Data
const categories = [
  {
    id: 1,
    name: "Prescription Medicines",
    image:
      "https://www.shutterstock.com/image-photo/beautiful-asian-woman-pharmacist-checks-600nw-2401180675.jpg",
  },
  {
    id: 2,
    name: "OTC Medicines",
    image:
      "https://st.depositphotos.com/1031551/2395/i/450/depositphotos_23956663-stock-photo-many-tablets-with-container.jpg",
  },
  {
    id: 3,
    name: "Emergency Medicines",
    image:
      "https://img.freepik.com/free-vector/first-aid-kit-realistic-circular-frame-composition-medical-emergency-treatment-supplies-with-bandage-pills_1284-27384.jpg",
  },
  {
    id: 4,
    name: "Elderly Medicines",
    image:
      "https://images.unsplash.com/photo-1607874963930-2edecc67a25a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmVzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Others",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/448/757/non_2x/different-types-of-medical-equipments-vector.jpg",
  },
];

// All products with types
const allProducts = [
  { id: 1, title: "BP Monitor", type: "bp", image: "https://img2.exportersindia.com/product_images/bc-full/2021/5/7042936/digital-bp-monitor-1622177607-5838486.jpeg" },
  { id: 2, title: "BP Wrist Monitor", type: "bp", image: "https://cleaneat.ng/wp-content/uploads/2020/06/Digital-Wrist-Blood-Pressure-BP-Monitor.jpg" },
  { id: 2, title: "BP Monitor New 15RF", type: "bp", image: "https://www.ctmrihub.com/console/public/storage/product_images/2024/07/25/1721913963394.png" },
  { id: 3, title: "Thermometer ", type: "thermometer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ju4QStUmih1TiqDP1SHcWyUkIN8gj7vTPb3489jVG81FI89tAIerKLog-I1Snfh6-k8&usqp=CAU" },
  { id: 4, title: "Thermometer ", type: "thermometer", image: "https://halomedicals.com/wp-content/uploads/2020/08/Clinical-Thermometer.jpg" },
 
  { id: 6, title: "Oximeter B", type: "oximeter", image: "https://media.istockphoto.com/id/496972049/photo/pulse-oximeter.jpg?s=612x612&w=0&k=20&c=3bzvW511HBbJOxRIcCW4TlARvaQJXqxCbu5QBGI66xY=" },
];

const CategoryPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Filter State
  const [filters, setFilters] = useState({
    bp: true,
    thermometer: false,
    oximeter: false,
  });

  const handleFilterChange = (type) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredProducts = allProducts.filter((p) => filters[p.type]);
  const navigate = useNavigate();

  return (
    
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaMedkit color="white" size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              MediConnect
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 1,
                px: 1,
                py: 0.2,
                height: 36,
                width: 250,
              }}
            >
              <Search sx={{ color: "#888", mr: 0 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 14 }} />
            </Box>
            <IconButton sx={{ color: "#fff" }}>
              <ShoppingCart />
            </IconButton>
            <Avatar
              onClick={handleAvatarClick}
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              src="https://cepi-sa.com/wp-content/uploads/2024/08/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseMenu}>My Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Category Section */}
      <Container maxWidth="1200" sx={{ py: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
  <FaHeartbeat size={24} />
  Discover Health Solutions
</Typography>

<Typography variant="body2" sx={{ mb: 5, fontStyle: "italic", color: "text.secondary" }}>
  "Explore a wide range of health solutions for a better tomorrow.  We provide the latest and most reliable medical devices, ensuring you stay ahead with your health goals."
</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {categories.map((cat) => (
            <Card
            key={cat.id}
            onClick={() => navigate(`/cat/${cat.name.toLowerCase().replace(/\s+/g, "-")}`)}

            sx={{
              cursor: "pointer",
              width: "19%",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              ":hover": { transform: "scale(1.05)", boxShadow: 8 },
            }}
          >
          
              <CardMedia component="img" height="140" image={cat.image} alt={cat.name} />
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {cat.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Breadcrumbs & Sorting */}
      <Box
        sx={{
          backgroundColor: "#fff",
          py: 2,
          px: { xs: 2, md: 6 },
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
          <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14 }}>
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Health & Wellness
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Monitoring Devices
              </Link>
              <Typography color="text.primary">Blood Pressure Monitors</Typography>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
             Medical Emergency Equipments
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: { xs: 2, md: 0 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Sort By:</Typography>
              <Select defaultValue="featured" size="small">
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Show:</Typography>
              <Select defaultValue={3} size="small">
                <MenuItem value={3}>3 items</MenuItem>
                <MenuItem value={6}>6 items</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product Grid Section with Sidebar */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Sidebar */}
          <Box sx={{ width: "25%", position: "sticky", top: 90,ml: -20 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="info">
                Delivery Options
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Home Delivery" />
              <FormControlLabel control={<Checkbox />} label="Store Pickup" />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom color="info">
                Device Type
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.bp}
                    onChange={() => handleFilterChange("bp")}
                  />
                }
                label="Blood Pressure Monitors"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.thermometer}
                    onChange={() => handleFilterChange("thermometer")}
                  />
                }
                label="Thermometers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.oximeter}
                    onChange={() => handleFilterChange("oximeter")}
                  />
                }
                label="Oximeters"
              />
            </Paper>
          </Box>

          {/* Product Cards */}
          <Box sx={{ width: "80%" }}>
            <Box>
              <Grid container spacing={3}>
                {filteredProducts.length === 0 ? (
                  <Typography>No devices available for the selected filters.</Typography>
                ) : (
                  filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          ":hover": { transform: "scale(1.03)", boxShadow: 4 },
                          transition: "0.3s ease",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={product.image}
                          alt={product.title}
                        />
                        <CardContent>
                          <Typography variant="h6" fontSize={16} gutterBottom>
                            {product.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           Digital monitor with accurate result.
                          </Typography>
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                          <Button variant="outlined" fullWidth>
                            VIEW DETAILS
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
      
      
    </Box>
  );
};

export default CategoryPage;
