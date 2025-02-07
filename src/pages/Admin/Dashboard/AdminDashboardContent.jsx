import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Overview from "./components/Overview";

const AdminDashboardContent = () => {
  const location = useLocation(); // Get current location/pathname
  if (location.pathname === "/ticketnest/admin/dashboard") {
    return (
      <div>
        <Overview />
      </div>
    );
  }

  // Otherwise, render the Outlet for other routes
  return <Outlet />;
};

export default AdminDashboardContent;
