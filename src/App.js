import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login"; 
import Page1 from "./components/page1"; 
import SignUp from "./components/signUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

export default App;
