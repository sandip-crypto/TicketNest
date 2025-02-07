import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });

  // Fetch customer data from backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/all-users", {
        withCredentials: true,
        params: {
          searchTerm,
          page: currentPage,
          limit: 10,
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction,
        },
      });
      setCustomers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm, sortConfig]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
          Customer Management System
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search customers by name, email..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-300"
                    onClick={() => handleSort("username")}
                  >
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Contact
                  </th>

                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {customers
                  .filter((customer) => customer.role !== "admin") // Filter out admin users
                  .map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {customer.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {customer.email}
                          <div className="text-xs text-gray-500">
                            {customer.phoneNumber}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.last_activity
                              ? (() => {
                                  const currentDate = new Date();
                                  const last_activity = new Date(
                                    customer.last_activity
                                  );
                                  const difference =
                                    currentDate - last_activity;
                                  return difference > 30000
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800";
                                })()
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {(() => {
                            const currentDate = new Date();
                            const last_activity = new Date(
                              customer.last_activity
                            );
                            const difference = currentDate - last_activity;
                            return difference > 30000 ? "inactive" : "active";
                          })()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <FiEye
                              className="w-5 h-5"
                              onClick={() => setSelectedUser(customer)}
                            />
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  User Details
                </h2>
                <button
                  onClick={() => setSelectedUser(null)} // Close modal
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* User Details Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.username}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date of Birth
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.dateOfBirth}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Address Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Address
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-white"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
