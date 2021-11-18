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
  const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: 'flex' }}>
        <Drawer />
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
