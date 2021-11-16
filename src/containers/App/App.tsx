import React from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../../routes/Home";
import Test from "../../routes/Test";
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
