import React from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../../routes/Home";
import Test from "../../routes/Test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
