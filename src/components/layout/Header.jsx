import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoLocationOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";

import locations from "../../data/locations"; // Importing locations data
import logo from "../../assets/images/ticketnest_logo.png";
import Navbar from "../Navbar/Navbar";

import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import axios from "axios";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "Kathmandu";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(searchTerm);

  const [dialogSearchQuery, setDialogSearchQuery] = useState(""); // State for search input in the dialog
  const [filteredLocations, setFilteredLocations] = useState(locations); // Filtered locations

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, vendor, logout } = useAuth();

  // Handle the search input change
  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value); // Update global search term
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    window.location.href = "/ticketnest/explore/home";
    localStorage.setItem("selectedCity", selectedCity);
    setOpen(false); // Close the dialog after selecting a city
  };

  const handleSearch = (query, inDialog = false) => {
    const lowerCaseQuery = query.toLowerCase();
    if (inDialog) {
      setDialogSearchQuery(lowerCaseQuery);
      setFilteredLocations(
        locations.filter((loc) =>
          loc.city.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-teal-600 to-teal-800">
      <div className="container px-4 py-1 mx-auto">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          {/* Logo Section */}
          <div className="flex justify-center w-full sm:w-auto sm:justify-start">
            <Link
              to="/ticketnest/explore/home"
              className="text-lg font-bold text-black select-none"
            >
              <img src={logo} alt="logo" className="w-[100px] h-auto" />
            </Link>
          </div>

          {/* Search Section */}
          <div className="relative w-full max-w-md sm:w-1/2 lg:w-2/5 xl:w-1/3">
            <IoIosSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search for Movies, Events and Activities"
              className="w-full py-1 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:border-transparent"
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>

          {/* Actions Section */}
          <div className="flex items-center justify-center w-full space-x-4 sm:w-auto sm:justify-end">
            {/* City Selection */}
            <div
              className="flex items-center text-white cursor-pointer "
              onClick={() => setOpen(true)}
            >
              <IoLocationOutline className="mr-1" />
              <h3 className="mr-1 text-sm select-none sm:text-base">{city}</h3>
              <MdKeyboardArrowDown />
            </div>

            {/* Sign In Button */}
            <Link
              to={user || vendor ? "#" : "/ticketnest/user/sign-in"}
              className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium text-teal-800 transition-colors duration-300 bg-white rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-teal-500 focus:outline-none whitespace-nowrap"
            >
              {user || vendor ? (
                <>
                  <div
                    className="flex gap-2"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <FaUserCheck
                      className="text-xl"
                      aria-label="Open user menu"
                    />
                    <h3>
                      {" "}
                      Hi,{" "}
                      {user ? user.username : vendor.owner_name.split(" ")[0]}
                    </h3>
                  </div>
                  {isProfileOpen &&
                    (user || vendor ? (
                      <div className="absolute right-0 z-10 w-48 mt-[13rem] overflow-hidden rounded-md shadow-xl">
                        <Link
                          to={`/ticketnest/${
                            user?.role.toLowerCase() === "customer"
                              ? "user"
                              : user?.role.toLowerCase() === "admin"
                              ? "admin"
                              : vendor?.role.toLowerCase() === "vendor"
                              ? "vendor"
                              : `${user.role}`
                          }/dashboard`}
                          className="block px-4 py-2 text-sm text-gray-700 transition-all duration-300 bg-gray-100 hover:bg-teal-200"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to={`/ticketnest/${
                            user?.role.toLowerCase() === "customer"
                              ? "user"
                              : user?.role.toLowerCase() === "admin"
                              ? "admin"
                              : vendor?.role.toLowerCase() === "vendor"
                              ? "vendor"
                              : `${user.role}`
                          }/dashboard/settings`}
                          className="block px-4 py-2 text-sm text-gray-700 transition-all duration-300 bg-gray-100 hover:bg-teal-200"
                        >
                          Settings
                        </Link>
                        <Link
                          to={`/ticketnest/${
                            user?.role.toLowerCase() === "customer"
                              ? "user"
                              : user?.role.toLowerCase() === "admin"
                              ? "admin"
                              : vendor?.role.toLowerCase() === "vendor"
                              ? "vendor"
                              : `${user.role}`
                          }/dashboard/settings`}
                          className="block px-4 py-2 text-sm text-gray-700 transition-all duration-300 bg-gray-100 hover:bg-teal-200"
                        >
                          Profile
                        </Link>
                        <button
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 transition-all duration-300 bg-gray-100 hover:bg-teal-200"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <></>
                    ))}
                </>
              ) : (
                <>
                  <RxPerson className="text-lg" />
                  Sign In
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Dialog for City Selection */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
          <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="mb-4 text-lg font-medium leading-6 text-gray-300"
            >
              Select your city or location
            </DialogTitle>

            {/* Search Input in the Dialog */}
            <div className="relative mb-4">
              <IoIosSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search for your city or location"
                value={dialogSearchQuery}
                onChange={(e) => handleSearch(e.target.value, true)}
                className="w-full py-1 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:border-transparent"
              />
            </div>

            {/* Filtered Locations */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((elem) => (
                  <button
                    key={elem.id}
                    className="px-2 py-1 text-sm text-center text-white transition-colors duration-200 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => handleCitySelection(elem.city)}
                  >
                    {elem.city}
                  </button>
                ))
              ) : (
                <p className="text-sm text-white col-span-full">
                  No matching locations found.
                </p>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <Navbar />
    </header>
  );
}
