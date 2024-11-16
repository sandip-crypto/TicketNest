import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/explore/movies", label: "Movies" },
    { to: "/explore/streams", label: "Streams" },
    { to: "/explore/events", label: "Events" },
    { to: "/explore/games-&-sports", label: "Games" },
    { to: "/explore/theatre", label: "Theatres" },
  ];

  return (
    <nav className="bg-gray-100">
      <div className="container px-4 py-2 mx-auto">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="hidden space-x-4 font-semibold text-gray-600 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "text-[#22B0AF]" : "hover:text-[#22B0AF]"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Placeholder for alignment */}
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "text-[#22B0AF] bg-gray-200"
                      : "text-gray-600 hover:text-[#22B0AF] hover:bg-gray-200"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
