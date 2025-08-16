import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, IconButton, Dialog,
  DialogContent, DialogTitle, Box, Typography, Divider, Chip, Select, MenuItem,
  Button,
  TextField
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const StatusTables = ({ columns, rows, onEdit, onStatusChange, onUpdate }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [soldUpdate, setSoldUpdate] = useState("");

  const statusOptions = ["Started", "In Progress", "Done"];

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenImage = (imageSrc) => {
    const defaultImage = "https://media.licdn.com/dms/image/v2/C4D03AQEeEyYzNtDq7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1524234561685?e=2147483647&v=beta&t=uHzeaBv3V2z6Tp6wvhzGABlTs9HR-SP-tEX1UbYNn4Q";
    setSelectedImage(imageSrc || defaultImage);
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
    setSelectedImage("");
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "started": return "#e0bd02";
      case "in progress": return "#FF9800";
      case "done": return "#4CAF50";
      default: return "#B0BEC5";
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const options = {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  const handleEditClick = (index, currentStatus) => {
    setEditingRowIndex(index);
    setStatusUpdate(currentStatus);
  };

  const handleStatusSelectChange = (e, row) => {
    const newStatus = e.target.value;
    setStatusUpdate(newStatus);
    if (onStatusChange) {
      onStatusChange({ ...row, status: newStatus });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.name}
                  sx={{
                    color: "black", fontWeight: "bold", width: col.width || "auto",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    padding: "10px", textAlign: "center"
                  }}
                  sortDirection={orderBy === col.name ? order : false}
                >
                  {col.label}
                </TableCell>
              ))}
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
  {rows
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
          <TableCell key={col.name} sx={{ padding: "10px", textAlign: "center" }}>
            {col.name === "photo" || col.name === "defectImage" ? (
              <IconButton onClick={() => handleOpenImage(row[col.name] || null)}>
                <PhotoCameraIcon color="primary" />
              </IconButton>
            ) : col.name === "status" || col.name === "cubeStatus" ? (

              editingRowIndex === index ? (
                <Select
                  value={statusUpdate}
                  onChange={(e) => handleStatusSelectChange(e, row)}
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Chip
                  label={row[col.name]}
                  sx={{
                    backgroundColor: getStatusColor(row[col.name]),
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              )
              
            )
            : col.name === "moKhataStock" ?(
               `${(Number(row.moKhataGeneration || 0) + Number(row.moKhataStock || 0) - Number(row.sold || 0))} KG`
            )
            :col.name === "sold" ? (
               editingRowIndex === index ? (
    <TextField
      type="number"
      size="small"
      value={soldUpdate}
      onChange={(e) => setSoldUpdate(e.target.value)}
      inputProps={{ min: 0 }}
      sx={{ width: 100 }}
    />
  ): row[col.name]):
        col.name === "dateTime" ? (
              formatDateTime(row[col.name])
            ) :
   (
              row[col.name]
            )}
          </TableCell>
        ))}
     <TableCell align="center">
  {editingRowIndex === index ? (
  <Button
  variant="contained"
  color="success"
  size="small"
  onClick={() => {
    const updatedRow = { ...row };
    if (row.status !== undefined) updatedRow.status = statusUpdate;
    if (row.cubeStatus !== undefined) updatedRow.cubeStatus = statusUpdate;
    if (row.sold !== undefined) updatedRow.sold = soldUpdate;

    const payload = {};
    if (row.status !== undefined) payload.status = statusUpdate;
    if (row.cubeStatus !== undefined) payload.cubeStatus = statusUpdate;
    if (row.sold !== undefined) payload.sold = soldUpdate;

    onUpdate(row.id, payload);
    setEditingRowIndex(null); // exit edit mode
  }}
>
  Update
</Button>

  ) : (
    <IconButton
      color="primary"
      onClick={() => handleEditClick(index, row.status || row.cubeStatus)}
    >
      <EditIcon />
    </IconButton>
  )}
</TableCell>

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
        BackdropProps={{ sx: { backgroundColor: "rgba(137, 137, 137, 0.7)" } }}
        sx={{
          "& .MuiDialog-paper": {
            width: "auto",
            maxWidth: selectedImage ? "100%" : "xs",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1 }}>
          <Typography variant="h6">Selected Image</Typography>
          <Divider />
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

export default StatusTables;
