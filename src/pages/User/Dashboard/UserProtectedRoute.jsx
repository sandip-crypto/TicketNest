import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const UserProtectedRoute = () => {
  const { user } = useAuth();

  // Check if the user is authenticated and has the 'customer' role
  if (user && user.role.toLowerCase() === "customer") {
    return <Outlet />;
  } else {
    return <Navigate to="/ticketnest/user/sign-in" />;
  }
};

export default UserProtectedRoute;
