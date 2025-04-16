import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { FaMedkit } from 'react-icons/fa';

const slugToCategoryName = {
  "prescription-medicines": "Prescription Medicine",
  "otc-medicines": "OTC Medicine",
  "emergency-medicines": "Emergency Medicine",
  "elderly-medicines": "Elderly medicine",
  "others": "Other"
};

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const CategoryMedicines = () => {
  const { category: categorySlug } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const categoryName = slugToCategoryName[categorySlug];

  useEffect(() => {
    if (!categoryName) {
      setError("Invalid category specified.");
      setLoading(false);
      return;
    }

    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/categoryMedicine?category=${encodeURIComponent(categoryName)}&userIdToExclude=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMedicines(res.data);
      } catch (err) {
        console.error('Error fetching medicines:', err.response?.data || err.message);
        setError("Failed to load medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [categoryName, userId, token]);

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedicine(null);
  };

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      {/* ✅ NAVBAR */}
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
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              src="https://cepi-sa.com/wp-content/uploads/2024/08/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, textAlign: "left" }}>
            {categoryName}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Discover a range of effective {categoryName?.toLowerCase()} curated for your wellness.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : medicines.length === 0 ? (
          <Typography>No medicines found in this category.</Typography>
        ) : (
          <Grid container spacing={4}>
            {medicines.map((med) => (
              <Grid item xs={12} sm={6} md={4} key={med._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                    ":hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={med.imageUrl || fallbackImage}
                    alt={med.name}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {med.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {med.description || "Effective and safe medicine for your needs."}
                    </Typography>
                    <center><Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleViewDetails(med)}
                    >
                      View Details
                    </Button>
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Enhanced Dialog for Medicine Details */}
      {selectedMedicine && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {selectedMedicine.name}
          </DialogTitle>
          <DialogContent sx={{ paddingTop: 2 }}>
            <Grid container spacing={2}>
              {/* Medicine Image */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={selectedMedicine.imageUrl || fallbackImage}
                    alt={selectedMedicine.name}
                    style={{
                      width: "60%",
                      borderRadius: 8,
                      objectFit: 'cover',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </Box>
              </Grid>
              {/* Medicine Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <strong>Expiry Date:</strong> {new Date(selectedMedicine.expiryDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <strong>Manufacture Date:</strong> {new Date(selectedMedicine.manufactureDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <strong>Chemical Content:</strong> {selectedMedicine.chemicalContent}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <strong>Quantity:</strong> {selectedMedicine.quantity}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <strong>Drug License:</strong> {selectedMedicine.drugLicense}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CategoryMedicines;
