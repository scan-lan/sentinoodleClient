import React from 'react';
import axios from "axios";
import {
  Routes,
  Route
} from "react-router-dom";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";

import AddMessage from "../../routes/AddMessage";
import Drawer from "../../components/Drawer";
import Home from "../../routes/Home";
import NavBar from "../../components/NavBar";
import Test from "../../routes/Test";

const baseURL = process.env.API_URL ? process.env.API_URL : "https://sentinoodle.nw.r.appspot.com";
const api = axios.create({
  baseURL,
  timeout: 1000
})


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

  const routes = [
    {route: "/", text: "Home"},
    {route: "messages", text: "Add message"},
    {route: "test", text: "Test"}
  ]

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <Box sx={{ display: 'flex' }}>
        <Drawer setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} routes={routes} />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="messages" element={<AddMessage api={api} />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
