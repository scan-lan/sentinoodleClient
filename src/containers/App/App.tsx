import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../../routes/Home";
import Test from "../../routes/Test";
import NavBar from "../../components/NavBar";
import Drawer from "../../components/Drawer";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";


const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible, sans-serif"
  }
})

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
  const routes = [
    {route: "/", text: "Home"},
    {route: "test", text: "Test"}
  ]

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar onMenuClick={toggleDrawer} />
      <Box sx={{ display: 'flex' }}>
        <Drawer drawerToggle={toggleDrawer} mobileOpen={mobileOpen} routes={routes} />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
