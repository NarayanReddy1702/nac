import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/BarChart';
import TrashIcon from '@mui/icons-material/Delete';
import ComplaintIcon from '@mui/icons-material/Warning';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import ClipboardIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TableComponent from '../../components/TableComponent';
import sideImage from '../../assets/side-image.jpg'
import Footer from '../../components/Footer';
import { NavLink } from 'react-router';

const CitizenDashboard = () => {
  const [oldUser, setOldUser] = useState(true); 

  const columns = [
    { id: "citizenName", label: "Citizen Name", width: "15%" },
    { id: "wardNumber", label: "Ward No.", width: "10%" },
    { id: "phoneNumber", label: "Phone Number", width: "15%" },
    { id: "area", label: "Area", width: "15%" },
    { id: "dateTime", label: "Date & Time", width: "20%" },
    { id: "description", label: "Description", width: "20%" },
    { id: "photo", label: "Photo", width: "5%" },
    { id: "status", label: "Status", width: "10%" },
  ];
  

  // Sample Data (Replace with API data)
  const complaintData = [
    { citizenName: "John Doe", wardNumber: "12", phoneNumber: "9876543210", area: "Downtown", dateTime: "2024-03-23 10:30 AM", description: "Overflowing garbage", photo: "📷", status: "Pending" },
    { citizenName: "Jane Smith", wardNumber: "7", phoneNumber: "9123456780", area: "Uptown", dateTime: "2024-03-22 3:15 PM", description: "Missed pickup", photo: "📷", status: "Resolved" },
  ];

  return (
    <>
      <Header />
      <Navigation dashboard />

      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Box className="mt-6  p-6 bg-white flex  justify-between items-center rounded-lg border border-gray-200 mb-6">
          <div>
          <Typography variant="h4" fontWeight="bold">
            Welcome to the Citizen Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={2}>
            {oldUser
              ? "Track and manage your waste collection services effectively."
              : "Monitor your waste collection services and track important information."
            }
          </Typography>
          </div>
          <Box display="flex" gap={2} mt={4}>
            <Button variant="outlined" component = {NavLink}
            to = "/complain" startIcon={<DescriptionIcon />}>
              View Reports
            </Button>
            <Button 
            className='bg-orange-300'
            component = {NavLink}
            to = "/complain"
            variant="contained" startIcon={<AssignmentIcon />}>
              Post a Complaint
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3} mb={2} className='bg-[#f9f9f9] p-10'>
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardContent>
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <ComplaintIcon sx={{ fontSize: 20, color: "grey" }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          Total Registered Complaints
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: oldUser ? "black" : "gray" }}
        >
          {oldUser ? 125 : 0}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardContent>
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <TrashIcon sx={{ fontSize: 20, color: "grey" }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          Monthly Waste Collected (kg)
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: oldUser ? "black" : "gray" }}
        >
          {oldUser ? 4500 : 0}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={4}>
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardContent>
        {/* Icon in Top-Right */}
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <ReportIcon sx={{ fontSize: 20, color: "grey" }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          Active Complaints
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: oldUser ? "black" : "gray" }}
        >
          {oldUser ? 12 : 0}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            textTransform: "none",
            backgroundColor: oldUser ? "black" : "gray",
            color: "white",
            "&:hover": {
              backgroundColor: oldUser ? "#333" : "gray",
            },
          }}
          onClick={() => setActiveTab("complain")}
        >
          {oldUser ? "View a Complaint" : "Post a Complaint"}
        </Button>
      </CardContent>
    </Card>
  </Grid>
</Grid>

{!oldUser && (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      gap:4,
      paddingBottom: 8
    }}
  >
    {/* Left Section: How It Works */}
    <Card
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        border: "2px solid #f9f9f9",
       
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            How It Works
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textSecondary">
            Understand how the waste management system operates
          </Typography>
        }
      />
      <CardContent>
        {/* Step 1: Monitor Waste Collection */}
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            borderRadius="50%"
            sx={{
              backgroundColor: "blue.100",
              boxShadow: 3,
            }}
          >
            <BarChartIcon color="primary" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Monitor Waste Collection & Complaints
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your dashboard provides an overview of total waste collected, registered complaints, and complaint statuses in real-time.
            </Typography>
          </Box>
        </Box>

        {/* Step 2: Raise a Complaint */}
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            borderRadius="50%"
            sx={{ backgroundColor: "orange.100" }}
          >
            <EditIcon color="success" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Raise a Complaint
            </Typography>
            <Typography variant="body2" color="textSecondary">
              If you face any waste collection issues, submit a complaint through the dashboard. Provide details about the problem for quicker resolution.
            </Typography>
          </Box>
        </Box>

        {/* Step 3: Track Complaint Status */}
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            borderRadius="50%"
            sx={{ backgroundColor: "yellow.100" }}
          >
            <ClipboardIcon color="warning" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Check Complaint Status
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Stay updated with real-time complaint tracking. You can view the progress of your complaint, from submission to resolution.
            </Typography>
          </Box>
        </Box>

        {/* Step 4: Track Waste Collection Vehicle */}
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            borderRadius="50%"
            sx={{ backgroundColor: "red.100" }}
          >
            <LocalShippingIcon color="error" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Track Collection Vehicle
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Use the dashboard to track the waste collection vehicle in real-time. Know when it will arrive at your location.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>

    {/* Right Section: Image */}
    <Box sx={{ width: "50%", height: "auto", display: "flex" }}>
      <img
        src={sideImage}
        alt="How It Works"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "0px 8px 8px 0px",
        }}
      />
    </Box>
  </Box>
)}


{oldUser && (
  <Card>
    <CardContent>
      <Grid container spacing={2}>
        {/* Left Side: Table Data */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" mb={2}>Complaint Summary</Typography>
          <TableContainer component={Paper}>
           <TableComponent columns={columns} rows={complaintData} />
          </TableContainer>
        </Grid>

        {/* Right Side: Map Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" mb={2}>Live Vehicle Tracking</Typography>
          <Box height={300} borderRadius={2} overflow="hidden">
            {/* Integrate Google Maps or a Map Component */}
            <iframe
              title="Vehicle Tracking"
              src="https://www.google.com/maps/embed?..."  // Replace with actual tracking URL or map component
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)}

      </Container>
      <Footer />
    </>
  );
};

export default CitizenDashboard;
