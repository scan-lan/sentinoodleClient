import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../../routes/Home";
import Test from "../../routes/Test";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible, sans-serif"
  }
})

function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
