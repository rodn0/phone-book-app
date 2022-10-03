import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Contact from "../views/contact/Contact";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;