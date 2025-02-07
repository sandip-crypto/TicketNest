import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { user } = useAuth();

  // Check if the user is authenticated and has the 'admin' role
  if (user && user.role.toLowerCase() === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/ticketnest/user/sign-in" />;
  }
};

export default AdminProtectedRoute;
