import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import ModalBox from "./ModalBox";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  toggleDarkMode,
  isDarkMode,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useAuth();

  const openLogoutModal = () => {
    setIsProfileOpen(false);
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    closeLogoutModal();

    logout();
  };

  return (
    <>
      <header className="transition-colors duration-200 bg-white shadow-md dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none focus:ring"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <FaSun className="w-6 h-6" />
                ) : (
                  <FaMoon className="w-6 h-6" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex text-gray-600 dark:text-gray-400 focus:outline-none"
                  aria-label="Open user menu"
                >
                  <FaUserCircle className="w-6 h-6" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                    <Link
                      to="/ticketnest/admin/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={openLogoutModal}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                    <Link
                      to="/ticketnest/explore/home"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Back to home
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <ModalBox
        isOpen={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default Header;
