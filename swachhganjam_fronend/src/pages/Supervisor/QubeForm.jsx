import React, { useState } from "react";
import {
  TextField, FormControl, FormHelperText,
  Select, MenuItem, Button, Grid, Box, Typography, IconButton
} from "@mui/material";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CloseIcon from "@mui/icons-material/Close";

import PhotoCaptureModal from "../../components/PhotoCaptureModal";
import useQubeStore from "../../store/useQubeStore";

const QubeForm = () => {
  const { fetchData, getData } = useQubeStore();

  const categories = ['MCC', 'MRF'];

  const [formData, setFormData] = useState({
    supervisorName: "",
    contactNumber: "",
    dateTime: "",
    category: "",
    cubeNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleQubeToggle = (number) => {
    setFormData((prev) => {
      const selectedCubes = prev.cubeNumber
        ? prev.cubeNumber.split(",").map(Number)
        : [];
  
      const isSelected = selectedCubes.includes(number);
  
      const updated = isSelected
        ? selectedCubes.filter((n) => n !== number)
        : [...selectedCubes, number];
  
      updated.sort((a, b) => a - b);
  
      return {
        ...prev,
        cubeNumber: updated.join(","),
      };
    });
  };
  
  const validate = () => {
    const temp = {};

    if (!formData.supervisorName) temp.supervisorName = "Supervisor Name is required";
    if (!formData.contactNumber) temp.contactNumber = "Contact Number is required";
    else if (!/^\d{10}$/.test(formData.contactNumber)) temp.contactNumber = "Invalid Contact Number";
    if (!formData.category) temp.category = "Category is required";
    if (formData.category === "MCC" && formData.cubeNumber.length === 0)
      temp.qubeNumber = "Select at least one cube";
    if (!photo) temp.photo = "Photo is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      ...formData,
      photo,
    };

    fetchData(JSON.stringify(payload));
    setTimeout(() => getData(), 1000);
  };

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.supervisorName}>
            <TextField
              name="supervisorName"
              label="Supervisor Name *"
              value={formData.supervisorName}
              onChange={handleChange}
              fullWidth
            />
            <FormHelperText>{errors.supervisorName}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.contactNumber}>
            <TextField
              name="contactNumber"
              label="Contact Number *"
              type="number"
              value={formData.contactNumber}
              onChange={handleChange}
              fullWidth
            />
            <FormHelperText>{errors.contactNumber}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>
        </Grid>

        {/* QUBE BOXES ONLY FOR MCC */}
        {formData.category && (
  <Box mt={2}>
    <Typography variant="subtitle1" gutterBottom>
      Select Qubes:
    </Typography>
    <Grid container spacing={1}>
      {Array.from({
        length: formData.category === "MCC" ? 14 : formData.category === "MRF" ? 6 : 0,
      }).map((_, index) => {
        const number = index + 1;
        const selectedCubes = formData.cubeNumber
        ? formData.cubeNumber.split(",").map(Number)
        : [];
        const isSelected = selectedCubes.includes(number);
        return (
          <Grid item  key={number}>
            <Box
              onClick={() => handleQubeToggle(number)}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: isSelected ? "green" : "black",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {number}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  </Box>
)}
      </Grid>

      <Box mt={3} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          {!photo ? (
            <Button
              variant="outlined"
              startIcon={<LocalSeeIcon />}
              onClick={() => setOpenCamera(true)}
            >
              Capture Photo
            </Button>
          ) : (
            <Box position="relative">
              <IconButton
                size="small"
                onClick={() => setPhoto(null)}
                sx={{ position: "absolute", top: -10, right: -10, background: "#fff" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="textSecondary">
                Selected Photo:
              </Typography>
              <img
                src={photo}
                alt="Captured"
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 5,
                  border: "1px solid #ccc"
                }}
              />
            </Box>
          )}
          <FormHelperText error>{errors.photo}</FormHelperText>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <PhotoCaptureModal
        open={openCamera}
        onClose={() => setOpenCamera(false)}
        onCapture={(img) => setPhoto(img)}
      />
    </Box>
  );
};

export default QubeForm;
