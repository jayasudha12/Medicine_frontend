import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Prescription Medicine",
    slug: "prescription-medicine",
    image:
      "https://www.shutterstock.com/image-photo/beautiful-asian-woman-pharmacist-checks-600nw-2401180675.jpg",
  },
  {
    id: 2,
    name: "OTC Medicine",
    slug: "otc-medicine",
    image:
      "https://st.depositphotos.com/1031551/2395/i/450/depositphotos_23956663-stock-photo-many-tablets-with-container.jpg",
  },
  {
    id: 3,
    name: "Emergency Medicine",
    slug: "emergency-medicine",
    image:
      "https://img.freepik.com/free-vector/first-aid-kit-realistic-circular-frame-composition-medical-emergency-treatment-supplies-with-bandage-pills_1284-27384.jpg",
  },
  {
    id: 4,
    name: "Elderly Medicine",
    slug: "elderly-medicine",
    image:
      "https://images.unsplash.com/photo-1607874963930-2edecc67a25a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmVzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Others",
    slug: "others",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/448/757/non_2x/different-types-of-medical-equipments-vector.jpg",
  },
];

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FaHeartbeat color="white" size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              MediConnect
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="1200" sx={{ py: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FaHeartbeat size={24} />
          Discover Health Solutions
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {categories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => navigate(`/cat/${cat.slug}`)}
              sx={{
                cursor: "pointer",
                width: "19%",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                ":hover": { transform: "scale(1.05)", boxShadow: 8 },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
                alt={cat.name}
              />
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {cat.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryPage;
