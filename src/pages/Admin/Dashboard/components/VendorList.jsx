import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "business_name",
    direction: "asc",
  });

  // Fetch vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/all-vendors", {
          params: {
            searchTerm,
            selectedType,
            page: currentPage,
            limit: 10,
            sortKey: sortConfig.key,
            sortDirection: sortConfig.direction,
          },
          withCredentials: true,
        });
        if (data?.vendors) {
          setVendors(data.vendors);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, [searchTerm, selectedType, currentPage, sortConfig]);

  // Extract unique business types from the vendor list
  const businessTypes = [
    "all",
    ...new Set(vendors.map((vendor) => vendor.business_type)),
  ];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
          Vendor Management System
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search vendors by business name, email, business type..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-300 dark:bg-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-300 dark:bg-gray-700"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vendor Table */}
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-300"
                    onClick={() => handleSort("business_name")}
                  >
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Business Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {vendors.map((vendor) => (
                  <tr
                    key={vendor._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {vendor.business_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {vendor.owner_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {vendor.email}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {vendor.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                        {vendor.business_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                      {vendor.city}, {vendor.state}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <FiEye
                            className="w-5 h-5"
                            onClick={() => setSelectedVendor(vendor)}
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

        {/* Vendor Details Modal */}
        {selectedVendor && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Vendor Details
                </h2>
                <button
                  onClick={() => setSelectedVendor(null)} // Close modal
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Vendor Details Section */}
              <div className="space-y-4">
                {/* Business Information */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Business Name
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.business_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Owner Name
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.owner_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Business Type
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.business_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PAN Number
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.pan_no}
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
                        {selectedVendor.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Website
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.business_website || "Not provided"}
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
                        {selectedVendor.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        City
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        State
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Postal Code
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedVendor.postal_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-600 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-600 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
