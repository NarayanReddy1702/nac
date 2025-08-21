import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, DialogTitle, Divider } from "@mui/material";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, TableSortLabel,
  Box, Typography, IconButton, Dialog, DialogContent, Chip
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const TableComponent = ({ columns, rows, onEdit }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Sorting logic
  const sortedRows = [...rows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination handlers
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenImage = (imageSrc) => {
    const defaultImage = " https://media.licdn.com/dms/image/v2/C4D03AQEeEyYzNtDq7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1524234561685?e=2147483647&v=beta&t=uHzeaBv3V2z6Tp6wvhzGABlTs9HR-SP-tEX1UbYNn4Q"; // Dummy user image
    setSelectedImage(imageSrc || defaultImage);
    setOpenImage(true);
  };
  

  // Close image modal
  const handleCloseImage = () => {
    setOpenImage(false);
    setSelectedImage("");
  };

  

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status || cubeStatus?.toLowerCase()) {
      case "Started":
        return "#e0bd02"; // Yellow
      case "Empty":
        return "#e0bd02";
      case "In Progress":
        return "#FF9800"; // Orange
      case "Done":
        return "#4CAF50"; // Green
      default:
        return "#B0BEC5"; // Grey
    }
  };
  const formatDateTime = (isoString) => {
    if (!isoString) return "";
  
    const date = new Date(isoString);
  
    const options = {
      weekday: "long",        // Sunday
      day: "2-digit",         // 06
      month: "long",          // April
      year: "numeric",        // 2025
      hour: "2-digit",        // 12
      minute: "2-digit",      // 46
      second: "2-digit",      // 38
      hour12: false,          // 24-hour format
    };
  
    return date.toLocaleString("en-GB", options).replace(",", ""); // Format as per your need
  };
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell 
                  key={col.id} 
                  sx={{ 
                    color: "black", fontWeight: "bold", width: col.width || "auto",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    padding: "10px", textAlign: "center"
                  }} 
                  sortDirection={orderBy === col.id ? order : false}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
  {sortedRows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => (
      <TableRow
        key={index}
        sx={{
          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
          "&:hover": { backgroundColor: "#e3f2fd", cursor: "pointer" },
        }}
      >
        {columns.map((col) => (
          <TableCell key={col.id} sx={{ padding: "10px" , textAlign: "center"}}>
            {col.id === "photo" || col.id === "defectImage" ? (
              <IconButton onClick={() => handleOpenImage(row[col.id] || null)}>
                <PhotoCameraIcon color="primary" />
              </IconButton>
            ) : col.id === "status" || col.id === "cubeStatus"  ? (
              <Chip
                label={row[col.id]}
                sx={{
                  backgroundColor: getStatusColor(row[col.id]),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ) : col.id === "dateTime" ? (
              formatDateTime(row[col.id]) 
            ) 
            : col.id === "moKhataStock" ?(
               `${(Number(row.moKhataGeneration || 0) + Number(row.moKhataStock || 0) - Number(row.sold || 0))} KG`
            )
            : col.id === "actions" ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onEdit(row)}
            >
              Edit
            </Button>
            )
            :
            (
              row[col.id]
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
</TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" p={1} bgcolor="#f5f5f5">
        <TablePagination
          rowsPerPageOptions={[15, 20, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Image Modal */}
      <Dialog
  open={openImage}
  onClose={handleCloseImage}
  maxWidth="auto"
  fullWidth
  BackdropProps={{sx: { backgroundColor: "rgba(137 , 137, 137, 0.7)" },}}    
  sx={{
    "& .MuiDialog-paper": {
      width: "auto",
      maxWidth: selectedImage ? "100%" : "xs",
    },
  }}
>
  <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1 }}>
    <Typography variant="h6">Selected Image</Typography>
    <Divider/>
    <IconButton onClick={handleCloseImage} sx={{ color: "black" }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
    {selectedImage ? (
      <img
        src={selectedImage}
        alt="Captured"
        style={{
          width: "100%",
          maxWidth: "350px",
          maxHeight: "350px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    ) : (
      <Typography variant="body1" align="center">No Image Available</Typography>
    )}
  </DialogContent>
</Dialog>


    </>
  );
};

export default TableComponent;
