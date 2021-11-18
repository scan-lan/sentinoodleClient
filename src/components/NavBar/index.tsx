import React from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface NavBarProps {
  onMenuClick: () => void
}

const NavBar = ({ onMenuClick }: NavBarProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align="right">
          Sentinoodle
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
)

export default NavBar;
