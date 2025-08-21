import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Header from "./Header";
import Navigation from "./Navigation";
import BasicModal from "./Modal";
import Footer from "./Footer";
import TableComponent from "./TableComponent";
import StatusTable from "./StatusTables";

const AdminLayout = ({
  userRole,
  title,
  description,
  buttonLabel,
  tableName,
  showButton,
  modalOpen,
  setModalOpen,
  tableColumns,
  tableRows,
  loading,
  modalHeading,
  onEdit, 
  selectedRow, // <-- new prop to pass selected row to modal
  setSelectedRow,
  rawUpdate,
}) => {
  const handleOpenModal = () => {
    setSelectedRow(null); 
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  return (
    <>
      <Header />
      <Navigation userRole={userRole} />

      <Container maxWidth="xl">

        <Card sx={{ mb: 3, mt:6 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={2}
                  sx={{
                    fontSize: {
                      xs: "1.20rem",
                      md: "1.5rem",
                    },
                  }}
                >
                  {tableName}
                </Typography>

                <Paper
                  sx={{
                    minHeight: "350px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {loading ? (
                    <Typography p={3}>Loading...</Typography>
                  ) : tableRows?.length > 0 ? (
                    <StatusTable
                      columns={tableColumns}
                      rows={tableRows}
                      onEdit={onEdit}
                      onUpdate = {rawUpdate}
                    />
                  ) : (
                    <Typography p={3}>No data found.</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default AdminLayout;
