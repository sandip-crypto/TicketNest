import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import TheaterLayoutManager from "./TheaterLayoutManager";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/explore/home" element={<HomePage />} />
          <Route path="/dashboard" element={<VendorDashboard />} />
          <Route path="/layout" element={<TheaterLayoutManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
