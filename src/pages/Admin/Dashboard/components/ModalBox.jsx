import React from "react";
import { FaTimes } from "react-icons/fa";

const ModalBox = ({ isOpen, onClose, onConfirm, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 outline-none focus:outline-none">
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div
          className={`relative flex flex-col w-full ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } border-0 rounded-lg shadow-lg outline-none focus:outline-none`}
        >
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Logout
            </h3>
            <button
              className={`p-1 ml-auto bg-transparent border-0 ${
                isDarkMode ? "text-white" : "text-black"
              } float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl">
                <FaTimes />
              </span>
            </button>
          </div>
          <div className="relative flex-auto p-6">
            <p
              className={`my-4 text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to logout? This action will end your current
              session.
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <button
              className={`px-6 py-2 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear outline-none ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-gray-900"
              } background-transparent focus:outline-none`}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none ${
                isDarkMode
                  ? "bg-red-600 active:bg-red-700"
                  : "bg-red-500 active:bg-red-600"
              } hover:shadow-lg focus:outline-none`}
              type="button"
              onClick={onConfirm}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
