import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaStore,
  FaCalendarAlt,
  FaUserCircle,
  FaChartLine,
  FaUsersCog,
  FaBell,
  FaCreditCard,
} from "react-icons/fa";
import { MdContactPage } from "react-icons/md";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      icon: FaChartBar,
      label: "Dashboard",
      path: "/ticketnest/admin/dashboard",
    },
    {
      icon: FaUsers,
      label: "Customers",
      path: "/ticketnest/admin/dashboard/customers",
    },

    {
      icon: FaStore,
      label: "Vendors",
      path: "/ticketnest/admin/dashboard/vendors",
    },
    {
      icon: FaCalendarAlt,
      label: "Events",
      path: "/ticketnest/admin/dashboard/events",
    },
    {
      icon: FaUserCircle,
      label: "Profile",
      path: "/ticketnest/admin/dashboard/profile",
    },
    {
      icon: FaChartLine,
      label: "Analytics",
      path: "/ticketnest/admin/dashboard/analytics",
    },
    {
      icon: FaUsersCog,
      label: "User Management",
      path: "/ticketnest/admin/dashboard/user-management",
    },
    {
      icon: FaUsersCog,
      label: "Event Management",
      path: "/ticketnest/admin/dashboard/event-management",
    },
    {
      icon: FaBell,
      label: "Notifications",
      path: "/ticketnest/admin/dashboard/notifications",
    },
    {
      icon: FaCreditCard,
      label: "Payment Integration",
      path: "/ticketnest/admin/dashboard/payment-integration",
    },
    {
      icon: MdContactPage,
      label: "Contact Requests",
      path: "/ticketnest/admin/dashboard/contact-requests",
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 dark:bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}
      >
        <nav className="mt-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              className={`flex items-center px-6 py-2 mt-4 text-gray-100 ${
                location.pathname === item.path
                  ? "bg-gray-700 bg-opacity-25 text-gray-100"
                  : "hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              }`}
              to={item.path}
            >
              <item.icon className="w-6 h-6" />
              <span className="mx-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
