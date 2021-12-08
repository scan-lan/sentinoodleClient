import React from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


interface NavBarProps {
  onMenuClick: () => void,
  themeMode: "dark" | "light",
  setThemeMode: (state: "dark" | "light") => void
}

const drawerWidth = 240;

const NavBar = ({ onMenuClick, themeMode, setThemeMode }: NavBarProps) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: "dark" | "light",
  ) => {
    if (newTheme !== null) setThemeMode(newTheme);
  };

  return (
  <Box sx={{flexGrow: 1}}>
    <AppBar
      position="static"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          sx={{mr: 2, display: {md: 'none'}}}
        >
          <MenuIcon/>
        </IconButton>
        <Stack width={"100%"} direction="row" justifyContent="flex-end" spacing={4}>
          <Typography variant="h3" component="div" sx={{flexGrow: 1}}>
            Sentinoodle
          </Typography>
          <ToggleButtonGroup
            value={themeMode}
            exclusive
            onChange={handleAlignment}
            aria-label="set theme"
            size="small"
          >
            <ToggleButton value="light" aria-label="light mode">
              <LightModeIcon />
            </ToggleButton>
            <ToggleButton value="dark" aria-label="dark mode">
              <DarkModeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Toolbar>
    </AppBar>
  </Box>
)}

export default NavBar;
