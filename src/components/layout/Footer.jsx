import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaXTwitter,
} from "react-icons/fa6";

const date = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="container px-4 py-8 mx-auto">
        {/* Text Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-grow border-b-2 border-[#22B0AF]"></div>
          <Link to="/" className="px-4 text-2xl font-bold whitespace-nowrap">
            TicketNest
          </Link>
          <div className="flex-grow border-b-2 border-[#22B0AF]"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h1 className="mb-2 text-lg font-semibold">Services</h1>
            <h2 className="text-sm">Marketing</h2>
            <h2 className="text-sm">Advertisement</h2>
          </div>

          <div>
            <h1 className="mb-2 text-lg font-semibold">Company</h1>
            <h2 className="text-sm">About Us</h2>
            <h2 className="text-sm">Contact</h2>
          </div>

          <div>
            <h1 className="mb-2 text-lg font-semibold">Legal</h1>
            <h2 className="text-sm">Terms of Use</h2>
            <h2 className="text-sm">Privacy Policy</h2>
            <h2 className="text-sm">Cookie Policy</h2>
          </div>

          <div>
            <h1 className="mb-2 text-lg font-semibold">Social Links</h1>
            <div className="flex gap-4 mb-4">
              <FaFacebook className="text-xl hover:text-[#22B0AF] cursor-pointer" />
              <FaInstagram className="text-xl hover:text-[#22B0AF] cursor-pointer" />
              <FaPinterest className="text-xl hover:text-[#22B0AF] cursor-pointer" />
              <FaXTwitter className="text-xl hover:text-[#22B0AF] cursor-pointer" />
            </div>
            <h1 className="mb-2 text-lg font-semibold">Get Latest Updates</h1>
            <input
              type="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-[#22b0af] py-2 mb-2"
              placeholder="example@gmail.com"
            />
            <div className="flex gap-2">
              <button className="bg-[#22b0af] text-white py-2 px-4 rounded hover:bg-[#1d9594] transition-colors">
                Send
              </button>
              <button className="px-4 py-2 text-white transition-colors bg-red-400 rounded hover:bg-red-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-center bg-gray-200">
        <p>Copyright &copy; {date} TicketNest. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
