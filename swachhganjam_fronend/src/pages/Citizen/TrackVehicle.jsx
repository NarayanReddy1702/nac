import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import Footer from "../../components/Footer";
import VehicleMap from "../../utils/Vehicle";



export default function TrackVehicle() {
const [vehicleList, setVehicleList] = useState( []);
  const [loading, setLoading] = useState(false);
   const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token) return;

  const fetchTrackingData = () => {
    fetch(`${window.config.API_BASE_URL}citizen/trackings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Aaa-Enabled": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVehicleList(data.data?.list || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Tracking fetch error:", err);
        setLoading(false);
      });
  };
  fetchTrackingData();

  const intervalId = setInterval(fetchTrackingData, 3000);
  return () => clearInterval(intervalId);

}, []);


  const hasActiveVehicles = vehicleList.length > 0;

  return (
    <div>
      <Header />
      <Navigation />

       <Container maxWidth="xl">
  <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
    <Typography variant="h4" fontWeight="bold" sx={{ pb: 2 }}>
      Track Vehicles
    </Typography>
    <Typography variant="body1">
      Real-time location of all active waste collection vehicles.
    </Typography>

    {loading ? (
      <Typography variant="body2" sx={{ mt: 3 }}>
        Loading...
      </Typography>
    ) : !hasActiveVehicles ? (
      <Box sx={{ mt: 3, textAlign: "center", minHeight: 300 }}>
        <Typography variant="h6" color="error">
          No Active Vehicles Found
        </Typography>
      </Box>
    ) : (
      <Box
  sx={{
    mt: 4,
    display: "flex",
    gap: 3,
     flexDirection: { xs: "column", md: "row" },
    height: { xs: "600px", md: "400px" },
  }}
>
  {/* Sidebar */}
<Box
  sx={{
    flex: 1,
    height: { xs: "300px", md: "400px" },
    overflowY: "auto",
    pr: 1,
    // custom scrollbar styles
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bdbdbd",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#888",
    },
    scrollbarWidth: "thin", 
    scrollbarColor: "#bdbdbd #f1f1f1",
  }}
>
    {vehicleList.map((vehicle, index) => (
      <Paper
        key={vehicle.truck_id}
        elevation={2}
        sx={{ p: 2, mb: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          #{index + 1} - {vehicle.truck_no}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong>{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>
            {vehicle.status_display_text}
          </span>
        </Typography>
        <Typography variant="body2">
          <strong>Last Updated:</strong> {vehicle.last_updated_on_format}
        </Typography>
        <Typography variant="body2">
          <strong>Location:</strong> {vehicle.address}
        </Typography>
      </Paper>
    ))}
  </Box>
  {/*Map */}
  <Box
    sx={{
      flex: 2,
      height: { xs: "300px", md: "100%" },
    }}
  >
    <VehicleMap vehicleList={vehicleList} />
  </Box>
</Box>
)}
  </Paper>
</Container>

      <Footer />
    </div>
  );
}
