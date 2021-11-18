import React from 'react';
import Box from '@mui/material/Box';
import MUIDrawer from '@mui/material/Drawer';
import DrawerContent from "../DrawerContent";

const drawerWidth = 240;

interface DrawerProps {
  drawerToggle: () => void,
  mobileOpen: boolean,
  routes: {
    route: string,
    text: string
  }[]
}

const Drawer = ({ drawerToggle, mobileOpen, routes }: DrawerProps) => {
  const drawerContent = <DrawerContent routes={routes} clickHandler={drawerToggle} />

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="side bar"
    >
      <MUIDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={drawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </MUIDrawer>
    </Box>
  );
}

export default Drawer;
