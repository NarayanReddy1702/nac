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

const Layout = ({
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
        <Box className="mt-6 p-6 bg-white block md:flex justify-between items-center rounded-lg border border-gray-200 mb-6">
          <div>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              sx={{
                fontSize: {
                  xs: "1.25rem",
                  md: "1.5rem",
                },
              }}
            >
              {title}
            </Typography>

            <Typography variant="body1" color="textSecondary" mt={2}>
              {description}
            </Typography>
          </div>
          {showButton && (
            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="contained"
                startIcon={<AssignmentIcon />}
                onClick={handleOpenModal}
              >
                {buttonLabel}
              </Button>
            </Box>
          )}
        </Box>

        <Card sx={{ mb: 3 }}>
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
                    minHeight: "250px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {loading ? (
                    <Typography p={3}>Loading...</Typography>
                  ) : tableRows?.length > 0 ? (
                    <TableComponent
                      columns={tableColumns}
                      rows={tableRows}
                      onEdit={onEdit} // 👈 pass the edit function to the table
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

      <BasicModal
       key={selectedRow?.id || "new"}
        modalHeading={modalHeading}
        open={modalOpen}
        userRole={userRole}
        handleClose={handleCloseModal}
        selectedRow={selectedRow} // 👈 pass selected row to modal
      />

      <Footer />
    </>
  );
};

export default Layout;
