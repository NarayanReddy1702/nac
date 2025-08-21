import React, { useState } from "react";
import { 
  Box, Paper, Typography, FormControl, Button, Menu, MenuItem, Checkbox, ListItemText 
} from "@mui/material";

import TableComponent from "../../components/TableComponent";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
// import PostComplaint from "./PostComplain";

export default function Complain() {
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


  const [selectedColumns, setSelectedColumns] = useState(columns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleColumnChange = (colId) => {
    setSelectedColumns((prev) =>
      prev.includes(colId) ? prev.filter((id) => id !== colId) : [...prev, colId]
    );
  };

  const filteredColumns = columns.filter((col) => selectedColumns.includes(col.id));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Header />
        <Navigation />
      <div className="grid md:grid-cols-12 p-10 gap-6">
        <div className="md:col-span-6">
          <Paper elevation={3} sx={{ p: 4, mx: "auto" }}>
            <Typography variant="h4" fontWeight="bold">
              Post a Complaint
            </Typography>
            <Typography variant="body1" gutterBottom>
              Submit your complaint regarding waste collection services
            </Typography>
            {/* <PostComplaint /> */}
          </Paper>
        </div>

        <div className="md:col-span-6">
  <Paper elevation={3} sx={{ p: 4, mx: "auto" }}>
    <div className="flex items-center justify-between">
      {/* Left Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Previous Complaints
        </Typography>
        <Typography variant="body1" gutterBottom>
          View and search through historical complaint data
        </Typography>
      </Box>

      {/* Dropdown Button */}
      <Button
        variant="outlined"
        onClick={handleMenuOpen}
        endIcon={<ArrowDropDownIcon />}
        sx={{ minWidth: 150, gap:2 }} // Adjust width without making it too large
      >
        <TuneIcon />
        Columns
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {columns.map((col) => (
          <MenuItem key={col.id} onClick={() => handleColumnChange(col.id)}>
            <Checkbox checked={selectedColumns.includes(col.id)} />
            <ListItemText primary={col.label} />
          </MenuItem>
        ))}
      </Menu>
    </div>

    {/* Table with Selected Columns */}
    <TableComponent columns={filteredColumns} rows={complaintData} />
  </Paper>
</div>
      </div>
      <Footer />
    </div>
  );
}
