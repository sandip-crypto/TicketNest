import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTicketAlt,
  FaFilm,
  FaTheaterMasks,
  FaGamepad,
  FaMusic,
  FaUsers,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa";
import { MdOutlineLocalGroceryStore, MdEmojiEvents } from "react-icons/md";

import { useAuth } from "../../../../context/AuthContext";
import ConfirmationModal from "./../Dashboard_Components/ConfirmationModal";

const Sidebar = ({ darkMode, setDarkMode, searchTerm, setSearchTerm }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-6">
          <NavLink
            to="/ticketnest/explore/home"
            className="text-2xl font-bold text-gray-800 dark:text-white"
            title="Back to home"
          >
            <span>Ticket</span>
            <span className="text-teal-400">Nest</span>
          </NavLink>
          <button
            onClick={() => setDarkMode((prevMode) => !prevMode)}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="px-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-teal-500 focus:outline-none focus:ring"
            />
            <FaSearch className="absolute text-gray-400 top-3 right-3" />
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-4">
          <NavLink
            to="/ticketnest/vendor/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center dark:text-white w-full px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaTicketAlt className="w-5 h-5 mr-4" />
            All Events
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/create-movie"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaFilm className="w-5 h-5 mr-4" />
            Add Movies
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/create-theater"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaTheaterMasks className="w-5 h-5 mr-4" />
            Add Theaters
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/create-game"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaGamepad className="w-5 h-5 mr-4" />
            Add Games
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/create-concert"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaMusic className="w-5 h-5 mr-4" />
            Add Concerts
          </NavLink>

          <NavLink
            to="/ticketnest/vendor/dashboard/create-groceries"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdOutlineLocalGroceryStore className="w-5 h-5 mr-4" />
            Add Groceries
          </NavLink>

          <NavLink
            to="/ticketnest/vendor/dashboard/create-event"
            className={({ isActive }) =>
              `flex items-center w-full dark:text-white px-4 py-2 text-left rounded-md ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdEmojiEvents className="w-5 h-5 mr-4" />
            Add Events
          </NavLink>

          <hr className="border-gray-200 dark:border-gray-700" />
          <NavLink
            to="/ticketnest/vendor/dashboard/users"
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaUsers className="w-5 h-5 mr-4" />
            Users
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/sales"
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaDollarSign className="w-5 h-5 mr-4" />
            Sales
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaChartBar className="w-5 h-5 mr-4" />
            Analytics
          </NavLink>
          <NavLink
            to="/ticketnest/vendor/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaCog className="w-5 h-5 mr-4" />
            Settings
          </NavLink>
        </nav>
        <div className="px-4 py-6">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaSignOutAlt className="w-5 h-5 mr-4" />
            Logout
          </button>

          {showLogoutModal && (
            <ConfirmationModal
              onCancel={() => setShowLogoutModal(false)}
              onConfirm={() => {
                setShowLogoutModal(false);
                logout();
              }}
              message={"Are you sure you want to log out?"}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
