import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PostComplaint from "../pages/Citizen/PostComplain";
import MachineryDefect from "../pages/Supervisor/MachineryDefect";
import QubeForm from "../pages/Supervisor/QubeForm";
import MoKhhataForm from "../pages/Supervisor/MoKhhataForm";
import ManageUserForm from "../pages/Admin/MangeUserForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #ddd",
  boxShadow: 24,
  p: 4,  
  maxHeight: "90vh", 
  overflowY: "auto", 
  borderRadius: "8px",
};


export default function BasicModal({ modalHeading, open, handleClose, userRole, selectedRow }) {
  return (
    <Modal className="min-w-[400px]"
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        sx: { backgroundColor: "rgba(137 , 137, 137, 0.7)" }, // Darker background
      }}
    >
       <Box
    sx={{
      ...style,
      minWidth: 400, 
    }}
  >
        {/* Title Bar with Close Icon */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" fontWeight="bold">{modalHeading} </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Modal Content */}
        <Box id="modal-modal-description">
          {
          userRole === "citizen" ?
          (
            <PostComplaint />
          )
          : userRole === "supervisor" ?
          (
            <MachineryDefect />
          ) 
          : userRole === "qubeFulfillment" ?
           (
            <QubeForm />
           )
          :  userRole === "moKhhataForm"?
          (
            <MoKhhataForm selectedRow={selectedRow} />
          )
          : userRole === "admin" ?
          (
           <ManageUserForm  />
          )
          :
          (
            null
          )
          }
         
        </Box>
      </Box>
    </Modal>
  );
}
