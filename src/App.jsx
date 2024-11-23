import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import TheaterLayoutManager from "./TheaterLayoutManager";
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
import RedirectToHomePage from "./pages/RedirectToHomePage";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ticketnest">
            <Route path="explore/home" element={<HomePage />} />
            <Route path="user/sign-in" element={<SignIn />} />
            <Route path="user/sign-up" element={<SignUp />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="*" element={<RedirectToHomePage />} />
          <Route path="/dashboard" element={<VendorDashboard />} />

          <Route path="/layout" element={<TheaterLayoutManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
