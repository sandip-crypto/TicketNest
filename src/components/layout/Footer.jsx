import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/images/ticketnest_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    // Scroll to the top
    window.scrollTo(0, 0);
    // Navigate to the specified route
    navigate(route);
  };

  return (
    <footer className="text-white bg-gray-900">
      {/* Top Section */}
      <div className="container px-4 py-8 mx-auto sm:py-12 md:py-16">
        {/* Logo and Description */}
        <div className="flex flex-col items-center justify-center mb-8 space-y-4">
          <div
            onClick={() => handleNavigation("/ticketnest/explore/home")}
            className="text-2xl font-bold cursor-pointer sm:text-3xl md:text-4xl"
          >
            <div className="flex items-center">
              Ticket<span className="text-teal-600">Nest</span>
              <img
                src={logo}
                alt="ticketnest_logo"
                className="w-[100px] h-auto"
              />
            </div>
          </div>
          <p className="max-w-xl text-sm text-center text-gray-400 sm:text-base md:text-lg">
            Your Entertainment, Your Way. Book tickets for movies, events,
            plays, games, and more - all in one place.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Services Section */}
          <div className="text-center sm:text-left">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">Services</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/marketing")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/advertisement")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Advertisement
                </button>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="text-center sm:text-left">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">Company</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/about-us")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/contact-us")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center sm:text-left">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">Legal</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/terms-of-use")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/privacy-policy")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/ticketnest/cookie-policy")}
                  className="text-sm text-gray-400 hover:text-teal-400 sm:text-base"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Connect with Us Section */}
          <div className="text-center sm:text-left">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">
              Connect with Us
            </h2>
            <div className="flex justify-center mb-4 space-x-4 sm:justify-start">
              <button
                onClick={() => window.open("#", "_blank")}
                className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
              >
                <FaFacebook size={24} />
              </button>
              <button
                onClick={() => window.open("#", "_blank")}
                className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
              >
                <FaInstagram size={24} />
              </button>
              <button
                onClick={() => window.open("#", "_blank")}
                className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
              >
                <FaPinterest size={24} />
              </button>
              <button
                onClick={() => window.open("#", "_blank")}
                className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
              >
                <FaTwitter size={24} />
              </button>
            </div>
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">
              Get Latest Updates
            </h2>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm text-white bg-gray-800 rounded-full sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="submit"
                className="px-6 py-2 text-sm text-white transition duration-300 bg-teal-500 rounded-full sm:text-base hover:bg-teal-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-4 bg-gray-800">
        <div className="container px-4 mx-auto text-xs text-center text-gray-400 sm:text-sm">
          <p>&copy; {currentYear} TicketNest. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
