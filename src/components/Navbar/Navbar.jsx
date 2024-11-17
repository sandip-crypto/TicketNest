import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdLocalMovies,
  MdLiveTv,
  MdEvent,
  MdSportsEsports,
  MdTheaters,
  MdMenu,
  MdClose,
} from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/explore/movies", label: "Movies", icon: <MdLocalMovies /> },
    { to: "/explore/streams", label: "Streams", icon: <MdLiveTv /> },
    { to: "/explore/events", label: "Events", icon: <MdEvent /> },
    {
      to: "/explore/games-&-sports",
      label: "Games",
      icon: <MdSportsEsports />,
    },
    { to: "/explore/theatre", label: "Theatres", icon: <MdTheaters /> },
  ];

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-white bg-teal-600"
                          : "text-gray-700 hover:bg-teal-500 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 transition duration-300 ease-in-out rounded-md hover:text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "text-white bg-teal-600"
                    : "text-gray-700 hover:bg-teal-500 hover:text-white"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
