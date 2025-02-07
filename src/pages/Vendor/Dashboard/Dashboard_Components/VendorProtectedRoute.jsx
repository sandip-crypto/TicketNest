import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const VendorProtectedRoute = () => {
  const { vendor } = useAuth();

  // Check if the user is authenticated and has the 'vendor' role
  if (vendor && vendor.role.toLowerCase() === "vendor") {
    return <Outlet />;
  } else {
    return <Navigate to="/ticketnest/vendor/sign-in" />;
  }
};

export default VendorProtectedRoute;
