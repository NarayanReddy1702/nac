import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent" // Make the sidebar persistent
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Post a Complain', icon: <FeedIcon /> },
            { text: 'Track Vehicle', icon: <DepartureBoardIcon /> },
          ].map((item, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;