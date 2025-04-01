import { Button, Container, Grid, Typography, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaGooglePlay, FaApple,FaInfoCircle, FaStar, FaUserMd, FaHeadset,FaTwitter, FaCreditCard, FaPills, FaBell, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Medicine from "./Medicine";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<MedicalAppUI />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicine" element={<Medicine />} />
      </Routes>
    </Router>
  );
};


function MedicalAppUI() {
 
  
  return (
    
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#16a34a" }}>
          Medi<span style={{ color: "#333" }}>Connect</span>
        </h1>
        <ul style={{ display: "flex", gap: "24px", color: "#333", listStyle: "none",fontSize:"18px" }}>
          {["Home", "Services", "Connect", "AboutUs", "Contact"].map((item) => (
            <li key={item} style={{ cursor: "pointer", fontWeight: "500" }}>
              {item}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/register">
        <Button variant="outlined">Sign Up</Button>
      </Link>
      <Link to="/login">
        <Button variant="outlined">Log In</Button>
      </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 40px",
          backgroundColor: "#e5e7eb",
        }}
      >
        <div style={{ maxWidth: "680px", minHeight: "200px", height: "auto" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "#111" }}>
            Stay on Top of Your Medicine with <span style={{ color: "#16a34a" }}>Medicine Exchange Services</span>
          </h2>
          <p style={{ color: "#555", marginTop: "16px" }}>
            Exchange the medicine with near by shops. Our app helps you manage your medicines and <br></br>get timely reminders & make use of it.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
            
          <Button
  style={{
    backgroundColor: "#16a34a", // Green color for consistency with your theme
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "8px",
  }}
>
  <FaHeadset style={{ marginRight: "8px" }} /> Explore the Blog
</Button>
<Button
  style={{
    backgroundColor: "#16a34a", // Green color for consistency with your theme
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "8px",
  }}
>
  <FaGooglePlay style={{ marginRight: "8px" }} /> Learn More
</Button>

          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "24px", gap: "8px" }}>
            <FaStar style={{ color: "#facc15", fontSize: "20px" }} />
            <FaStar style={{ color: "#facc15", fontSize: "20px" }} />
            <FaStar style={{ color: "#facc15", fontSize: "20px" }} />
            <p style={{ color: "#333", fontWeight: "500" }}>Join the early adopters & experience the medication tracking.</p>

          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src="https://media.istockphoto.com/id/1455018058/photo/woman-at-pharmacy-shopping-for-medicine.jpg?s=612x612&w=0&k=20&c=lVWJzQ8BKiTpa0xjWHzWzYsGz8L1bBAEL1wtXYegRzc="
            alt="App Preview"
            style={{
              width: "720px",  // Increased width
              height: "400px", // Increased height
              objectFit: "fill",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "40px",
    padding: "56px 40px",
    backgroundColor: "white",
  }}
>
  {[
    {
      icon: <FaHeadset style={{ color: "#16a34a", fontSize: "32px" }} />,
      title: "Timely Service",
      text: "Get support and assistance anytime you need, right at your fingertips.",
    },
    {
      icon: <FaUserMd style={{ color: "#16a34a", fontSize: "32px" }} />,
      title: "Verified Doctors",
      text: "Consult with trusted, verified doctors directly from the app.",
    },
    {
      icon: <FaCreditCard style={{ color: "#16a34a", fontSize: "32px" }} />,
      title: "Secure Payments",
      text: "Make secure online payments for medicine orders and services.",
    },
  ].map((feature, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column", // Stack icon and text vertically
        alignItems: "center", // Center both icon and text
        textAlign: "center", // Center the text as well
        gap: "16px", // Space between the icon and the text
      }}
    >
      {feature.icon}
      <div>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>{feature.title}</h3>
        <p style={{ color: "#555" }}>{feature.text}</p>
      </div>
    </div>
  ))}
</section>


      {/* Medicine Expiry Tracker Section */}
      <section
        style={{
          padding: "56px 40px",
          backgroundColor: "#f3f4f6",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#16a34a" }}>Never Miss an Expiry Date Again</h2>
        <p style={{ color: "#555", marginTop: "16px", maxWidth: "600px", margin: "auto" }}>
          Keep track of all your medications' expiry dates with ease. Get timely alerts and notifications to ensure you stay safe.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          {[ 
            {
              icon: <FaPills style={{ color: "#16a34a", fontSize: "40px" }} />,
              title: "Track Expiry Dates",
              text: "Scan your medicines and keep track of their expiry dates with ease.",
            },
            {
              icon: <FaBell style={{ color: "#16a34a", fontSize: "40px" }} />,
              title: "Timely Notifications",
              text: "Receive automatic reminders before your medicine expires.",
            },
            {
              icon: <FaShieldAlt style={{ color: "#16a34a", fontSize: "40px" }} />,
              title: "Safe Medication Usage",
              text: "Ensure you're only using non-expired medicines for your health.",
            },
          ].map((feature, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              {feature.icon}
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>{feature.title}</h3>
              <p style={{ color: "#555", marginTop: "8px" }}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
            {/* Footer Section */}
            <footer
  style={{
    backgroundColor: "white", // Updated background color
    color: "black",
    padding: "40px 40px",
    textAlign: "center",
    marginTop: "10px",
  }}
>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
    <p style={{ maxWidth: "600px", color: "black" }}>
      Your trusted healthcare partner, providing seamless medicine exchange and tracking solutions.
    </p>
    <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
      <a href="#" style={{ textDecoration: "none", color: "green" }}>
        <FaGooglePlay style={{ fontSize: "32px" }} />
      </a>
      <a href="#" style={{ textDecoration: "none", color: "green" }}>
        <FaApple style={{ fontSize: "32px" }} />
      </a>
      <a href="#" style={{ textDecoration: "none", color: "green" }}>
        <FaTwitter style={{ fontSize: "32px" }} />
      </a>
    </div>
    <p style={{ marginTop: "16px", fontSize: "14px", color: "black" }}>
      © 2024 MediConnect. All rights reserved.
    </p>
  </div>
</footer>


    </div>
  );
}
export default App;