import React from 'react';
import axios from "axios";
import {
  Routes,
  Route
} from "react-router-dom";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import dotenv from "dotenv";

import AddMessage from "../../routes/AddMessage";
import Drawer from "../../components/Drawer";
import Home from "../../routes/Home";
import NavBar from "../../components/NavBar";
import Test from "../../routes/Test";
dotenv.config()

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "http://77.100.88.87:5000";
const api = axios.create({
  baseURL,
  timeout: 5000
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
            <Route path="/" element={<Home api={api} />} />
            <Route path="test" element={<Test />} />
            <Route path="messages" element={<AddMessage api={api} />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
