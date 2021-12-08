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
import UpdateWaitPeriod from "../../routes/UpdateWaitPeriod";
import ViewSession from "../../routes/ViewSession";
dotenv.config()

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "http://77.100.88.87:5000";
const api = axios.create({
  baseURL,
  timeout: 5000
})


const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("dark");

  const theme = createTheme({
  palette: {
    mode: themeMode,
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible, sans-serif"
  }
})

  const routes = [
    {route: "/", text: "Home"},
    {route: "session", text: "View Session"},
    {route: "messages", text: "Add Message"},
    {route: "waitPeriod", text: "Update Wait Period"}
  ]

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar onMenuClick={() => setMobileOpen(!mobileOpen)} themeMode={themeMode} setThemeMode={setThemeMode} />
      <Box sx={{ display: 'flex' }}>
        <Drawer setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} routes={routes} />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home api={api} />} />
            <Route path="session" element={<ViewSession api={api} />} />
            <Route path="messages" element={<AddMessage api={api} />} />
            <Route path="waitPeriod" element={<UpdateWaitPeriod api={api} />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
