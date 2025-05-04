import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Avatar,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import del from './del-removebg-preview.png';
import axios from 'axios';

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Input = styled('input')({
  display: 'none',
});

const AddDeliveryAgentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    vehicleType: '',
    registrationNumber: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === 'profile') setProfilePhoto(e.target.files[0]);
    else setLicensePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text inputs
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      // Append images
      if (profilePhoto) data.append('profilePhoto', profilePhoto);
      if (licensePhoto) data.append('licensePhoto', licensePhoto);

      const response = await axios.post(
        'https://medicine-expiry-8lj5.onrender.com/api/deliveryAgent/apply', // change this if needed
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Application submitted successfully!');
      console.log(response.data);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        licenseNumber: '',
        vehicleType: '',
        registrationNumber: '',
      });
      setProfilePhoto(null);
      setLicensePhoto(null);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 1100,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: { md: '60%' },
            p: { xs: 3, sm: 4 },
            backgroundColor: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Avatar sx={{ bgcolor: '#0288d1', width: 60, height: 60 }}>
              <DeliveryDiningIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Apply as Delivery Agent
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join our logistics team and help deliver smiles!
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            Enter your details below
          </Typography>
          <br />

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar sx={{ bgcolor: 'grey', width: 20, height: 20 }}>
                          <AccountCircleIcon fontSize="small" />
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  fullWidth
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="License No."
                  name="licenseNumber"
                  fullWidth
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Vehicle Type"
                  name="vehicleType"
                  fullWidth
                  required
                  value={formData.vehicleType}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsCarIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Reg. Number"
                  name="registrationNumber"
                  fullWidth
                  required
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street Address"
                  name="address"
                  fullWidth
                  required
                  value={formData.address}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '207%',
                  }}
                />
              </Grid>

              {/* Upload Section */}
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Typography variant="subtitle2" gutterBottom>
                        Profile Photo
                      </Typography>
                      <label htmlFor="profilePhoto">
                        <Input
                          accept="image/*"
                          id="profilePhoto"
                          type="file"
                          onChange={(e) => handleFileChange(e, 'profile')}
                        />
                        <Button variant="outlined" component="span" fullWidth>
                          Upload Profile
                        </Button>
                        {profilePhoto && (
                          <Typography variant="body2" mt={1}>
                            {profilePhoto.name}
                          </Typography>
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Typography variant="subtitle2" gutterBottom>
                        License Photo
                      </Typography>
                      <label htmlFor="licensePhoto">
                        <Input
                          accept="image/*"
                          id="licensePhoto"
                          type="file"
                          onChange={(e) => handleFileChange(e, 'license')}
                        />
                        <Button variant="outlined" component="span" fullWidth>
                          Upload License
                        </Button>
                        {licensePhoto && (
                          <Typography variant="body2" mt={1}>
                            {licensePhoto.name}
                          </Typography>
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  py: 1.4,
                  fontWeight: 600,
                  borderRadius: 3,
                  maxWidth: 200,
                  m: 'auto',
                }}
              >
                Submit Application
              </Button>
            </Grid>
          </Box>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            height: { xs: 220, md: 'auto' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            backgroundColor: '#91BAD6',
          }}
        >
          <Box
            component="img"
            src={del}
            alt="Delivery Illustration"
            sx={{
              width: '300%',
              maxWidth: 600,
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AddDeliveryAgentForm;