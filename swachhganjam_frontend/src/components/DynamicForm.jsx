import React, { useState, useEffect } from "react";
import {
  TextField, TextareaAutosize, FormControl, FormHelperText,
  Select, MenuItem, Button, Grid, Box, Typography, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCaptureModal from "./PhotoCaptureModal";

const DynamicForm = ({ fields, onSubmit, initialValues}) => {
  const safeInitialValues = initialValues || {};
   const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: initialValues?.[field.name] ?? "", // 👈 use nullish coalescing
    }), {})
  );
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(safeInitialValues.photo || null);
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    const updatedForm = fields.reduce((acc, field) => {
      if (field.type === "datetime-local" && safeInitialValues[field.name]) {
        const dt = new Date(safeInitialValues[field.name]);
        if (!isNaN(dt.getTime())) {
          const formatted = dt.toLocaleString("sv-SE").slice(0, 16); // "YYYY-MM-DDTHH:mm"
          acc[field.name] = formatted;
        } else {
          acc[field.name] = ""; // Fallback if the date is invalid
        }
      } else if (field.type === "select" || field.type === "text" || field.type === "textarea") {
        acc[field.name] = safeInitialValues[field.name] ?? "";
      } else {
        // For fields that are not datetime-local or other types handled above
        acc[field.name] = safeInitialValues[field.name] ?? "";
      }
      return acc;
    }, {});
  
    setFormData(updatedForm);
    setPhoto(null);
  
  }, [initialValues, fields]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const temp = {};
  
    fields.forEach(field => {
      const fieldValue = formData[field.name];
      
      // Check for required fields, allowing zero (0) values to pass as valid
      if (field.required && (fieldValue === "" || fieldValue === undefined || fieldValue === null)) {
        temp[field.name] = `${field.label || field.name} is required`;
      }
  
      // Check for pattern validation (for fields that require a specific pattern)
      if (field.pattern && fieldValue && !field.pattern.test(fieldValue)) {
        temp[field.name] = `Invalid ${field.label || field.name}`;
      }
    });
  
    const photoField = fields.find(f => f.type === "photo");
    if (photoField && !photo) temp.photo = "Photo is required";
  
    setErrors(temp);
  
    // Return true if no errors, false if there are errors
    return Object.keys(temp).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validate()) return;
    const payload = { ...formData };
    if (fields.some(f => f.type === "photo")) {
      payload.photo = photo;
    }
    onSubmit(payload);
  };

  return (
    <Box p={3}>
      <div id="modal-modal-description">
        <Grid container spacing={2}>
          {fields.map(field => {
            if (field.type === "photo") return null;

            return (
              <Grid
                item
                xs={field.name === "description" || field.type === "select"  ? 12 : 12}
                sm={field.name === "description" || field.type === "select" ? 12 : 12}
                md={field.name === "description" || field.type === "select" ? 12 : 6}
                
                key={field.name}
              >
                <FormControl fullWidth margin="normal" error={!!errors[field.name]}>
                  {field.type === "textarea" ? (
                    <TextareaAutosize
                      minRows={3}
                      placeholder={field.label}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 5,
                        border: "1px solid #ccc"
                      }}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      displayEmpty
                      error={!!errors[field.name]}
                      sx={{
                        "& .MuiSelect-select": {
                          color: formData[field.name] === "" ? "#aaa" : "inherit" // light grey for placeholder
                        }
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: "#aaa" }}>
                        Select {field.label}
                      </MenuItem>
                      {field.options.map(opt => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : field.type === "datetime-local" ? (
                    <TextField
                      type="datetime-local"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        backgroundColor: "#fff",
                        "& input::-webkit-calendar-picker-indicator": {
                          filter: "invert(1)"
                        }
                      }}
                    />
                  )
                  : field.type === "password"?(
                   <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                      name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  )
                  : (
                    <TextField
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      label={
                        field.hideLabel
                          ? undefined
                          : `${field.label}${field.required ? " *" : ""}`
                      }
                      InputLabelProps={field.hideLabel ? { shrink: false } : {}}
                      fullWidth
                    />
                  )}
                  <FormHelperText>{errors[field.name]}</FormHelperText>
                </FormControl>
              </Grid>
            );
          })}
        </Grid>
      </div>

      {/* Photo capture */}
      <Box
        mt={3}
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        gap={2}
      >
        {fields.some(f => f.type === "photo") && (
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
        )}

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

export default DynamicForm;
