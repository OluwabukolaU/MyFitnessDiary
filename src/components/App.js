import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HOME/Home";
import Diet from "./Diet/Diet";
import ScrollToTop from "./ScrollToTop"; // Import ScrollToTop
import MainTarget from "./Target/MainTarget";
import Main from "./Meals/Main";
import MainGoals from "./GOALS/MainGoals";
export default function App() {
  return (
    <>
      <Router>
        {/* Include ScrollToTop component here */}
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/diet" element={<Diet/>} />
          <Route path="/target" element={<MainTarget/>} />
          <Route path="/meals" element={<Main/>} />
          <Route path="/goals" element={<MainGoals/>} />
        </Routes>
      </Router>
    </>
  );
}
