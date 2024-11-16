import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import locations from "../../data/locations"; // Importing locations data
import logo from "../../assets/images/ticketnest_logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "Kathmandu";
  });
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredLocations, setFilteredLocations] = useState(locations); // Filtered locations

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    localStorage.setItem("selectedCity", selectedCity);
    setOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredLocations(
      locations.filter((loc) => loc.city.toLowerCase().includes(query))
    );
  };

  return (
    <header className="container px-4 py-4 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="w-full sm:w-auto">
          <Link
            to="/explore/home"
            className="text-lg font-bold text-black select-none"
          >
            <img src={logo} alt="logo" className="w-[100px] h-auto" />
          </Link>
        </div>

        <div className="relative w-full sm:w-1/2 lg:w-2/5">
          <IoIosSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search for Movies, Events and Activities"
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <h3 className="mr-1 select-none">{city}</h3>
            <MdKeyboardArrowDown />
          </div>

          <div className="flex items-center cursor-pointer">
            <RxAvatar className="mr-2 text-xl" />
            <h3 className="hidden select-none sm:block">Hi, user</h3>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
          <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="mb-4 text-lg font-medium leading-6 text-gray-900"
            >
              Select your city or location
            </DialogTitle>

            {/* Search Input */}
            <div className="relative mb-4">
              <IoIosSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search for your city or location"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtered Locations */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((elem) => (
                  <button
                    key={elem.id}
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-black"
                    onClick={() => handleCitySelection(elem.city)}
                  >
                    {elem.city}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-full">
                  No matching locations found.
                </p>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
