import { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Badge,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo.jpg";
import useLoginStore from "../store/useLoginStore";
import { useNotificationStore } from "../store/useNotificationStore";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("userRole") || "");

  const { logout } = useLoginStore();

  const open = Boolean(anchorEl);
  const notificationMenuOpen = Boolean(notificationAnchorEl);

  const {
    notification,
    getData,
    loading,
    error,
    updateData,
    message,
    seterror
  } = useNotificationStore();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleConfirmLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    updateData();
  };

  useEffect(() => {
    getData(); 
  }, []);

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  

  return (
    <header className="bg-orange-600 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-10 w-10" alt="Logo" />
          <h1 className="text-xl font-bold">Solid Waste Management</h1>
        </div>

        <div className="flex items-center gap-3">
          {role === "admin" && (
            <>
              <IconButton
                className="text-white hover:bg-orange-700"
                onClick={handleNotificationClick}
              >
                <Badge badgeContent={notification.length} color="error">
                  <NotificationsIcon sx={{ fontSize: 28, color: "#fff" }} />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={notificationAnchorEl}
                open={notificationMenuOpen}
                onClose={handleNotificationClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {loading && (
                  <MenuItem>
                    <CircularProgress size={24} />
                    <Typography className="ml-2">Loading...</Typography>
                  </MenuItem>
                )}

                {seterror && error && (
                  <MenuItem>
                    <Typography color="error">{message}</Typography>
                  </MenuItem>
                )}

                {!loading && !error && !seterror && notification.length === 0 && (
                  <MenuItem>
                    <Typography>No new notifications</Typography>
                  </MenuItem>
                )}
                {!loading && !error &&
                  notification.map((item, index) => (
                    <MenuItem key={index}>
                      <Typography variant="body2">{item.message}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </>
          )}

          <IconButton
            onClick={handleMenuOpen}
            className="text-white hover:bg-orange-700"
          >
            <AccountIcon className="text-white" sx={{ fontSize: 30 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogOutClick} className="px-6 py-4 flex items-center gap-4">
              <LogoutIcon sx={{ fontSize: 32, color: "grey" }} />
              <Typography className="text-lg font-medium">Log out</Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        BackdropProps={{ sx: { backgroundColor: "rgba(137 , 137, 137, 0.7)" } }}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
