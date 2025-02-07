import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  CircleUserRound,
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AllEvents = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isArchiveOpen, setArchiveOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState("Movies");

  // Data states
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    language: "",
    date: "",
    sortBy: "title",
    sortOrder: "asc",
  });

  const { vendor } = useAuth();

  const tabs = ["Movies", "Events", "Concerts", "Theatres", "Sports"];

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "";
        switch (activeTab) {
          case "Movies":
            endpoint = "/api/v1/movie/get-movie-by-vendor";
            break;
          case "Events":
            endpoint = "/api/v1/event/get-event-by-vendor";
            break;
          case "Concerts":
            endpoint = "/api/v1/concert/get-concert-by-vendor";
            break;
          case "Theatre":
            endpoint = "/api/v1/theatre/get-theatre-by-vendor";
            break;
          case "Sports":
            endpoint = "/api/v1/sports/get-sports-by-vendor";
            break;
        }

        const response = await axios.get(endpoint, {
          withCredentials: true,
        });

        console.log(response.data);
        const data = response.data[activeTab.toLowerCase()] || [];
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
      }
    };

    fetchData();
  }, [activeTab]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...items];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Genre filter
    if (filters.genre) {
      filtered = filtered.filter((item) => item.genre === filters.genre);
    }

    // Language filter
    if (filters.language) {
      filtered = filtered.filter((item) => item.language === filters.language);
    }

    // Date filter
    if (filters.date) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.releaseDate || item.startDate)
          .toISOString()
          .split("T")[0];
        return itemDate === filters.date;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];

      if (typeof aValue === "string") {
        return filters.sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, items]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = `/api/v1/${activeTab.toLowerCase()}/${id}`;
      await axios.delete(endpoint, { withCredentials: true });
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error(`Error deleting ${activeTab}:`, error);
    }
  };

  const handleArchive = () => {};

  const location = useLocation();

  if (location.pathname !== "/ticketnest/vendor/dashboard") {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex mb-6 space-x-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px text-sm font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "text-cyan-600 border-b-2 border-cyan-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Profile Image */}
        <div className="absolute right-0 top-1 sm:right-5 md:right-5 lg:right-10 lg:top-1.5">
          {vendor.profilePic ? (
            <>
              <img
                src={`${API_URL}/${vendor?.profilePic || "/placeholder.png"}`}
                alt={`${vendor?.owner_name.split(" ")[0]} profile`}
                title={`${vendor?.owner_name.split(" ")[0]} profile`}
                className="w-12 h-12 transition-all duration-200 rounded-full cursor-pointer opacity-80 hover:opacity-100 dark:opacity-100"
              />
            </>
          ) : (
            <>
              <CircleUserRound
                strokeWidth={0.75}
                className="w-12 h-12 text-gray-700 transition-all duration-200 rounded-full cursor-pointer dark:text-gray-300"
              />

             
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 mb-6 g rid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
        {/* Search */}

        <div className="relative ">
          <Search className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-lg dark:bg-gray-900 dark:text-gray-400"
          />
        </div>

        {/* Genre */}

        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
          className="p-2 border rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-400"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
        </select>

        {/* Language */}

        <select
          value={filters.language}
          onChange={(e) => handleFilterChange("language", e.target.value)}
          className="p-2 border rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-400"
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Nepali">Nepali</option>
        </select>

        {/* Release Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="p-2 border rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-400"
        />

        {/*  Sorting by different options */}
        <div className="flex space-x-2">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="flex-1 p-2 border rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-400"
          >
            <option value="title">Title</option>
            <option value="releaseDate">Date</option>
            <option value="rating">Rating</option>
          </select>

          <button
            onClick={() =>
              handleFilterChange(
                "sortOrder",
                filters.sortOrder === "asc" ? "desc" : "asc"
              )
            }
            className="p-2 border rounded-lg dark:text-white"
          >
            {filters.sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <p className="text-xl">No {activeTab.toLowerCase()} found</p>
          <p className="mt-2">
            Create some {activeTab.toLowerCase()} to see them here
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-400 ">
          <table className="w-full ">
            <thead className="bg-gray-100 shadow-sm dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Title
                </th>
                {activeTab === "Movies" ? (
                  <>
                    {" "}
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      Rating
                    </th>
                  </>
                ) : (
                  <></>
                )}

                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  {activeTab === "Movies" ? "Genre" : "Category"}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Language
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  {activeTab === "Movies" ? "Release Date" : "Start Date"}
                </th>

                {activeTab === "Events" && (
                  <>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      End Date
                    </th>
                  </>
                )}

                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">{item.title}</td>

                  {activeTab === "Movies" ? (
                    <>
                      <td className="px-6 py-4">{item.rating}</td>
                    </>
                  ) : (
                    <></>
                  )}

                  <td className="px-6 py-4">{item.genre || item.category}</td>
                  <td className="px-6 py-4">{item.language}</td>

                  {activeTab === "Events" ? (
                    <>
                      <td className="px-6 py-4">
                        {new Date(item.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(item.endDate).toLocaleDateString()}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        {new Date(item.releaseDate).toLocaleDateString()}
                      </td>
                    </>
                  )}

                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditOpen(true)}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      {isEditOpen && (
                        <ConfirmationModal
                          message={`Are you sure you want to edit this ${activeTab.slice(
                            0,
                            -1
                          )}? `}
                          onCancel={() => setEditOpen(false)}
                          // onConfirm={}
                        />
                      )}

                      <button
                        onClick={() => setArchiveOpen(true)}
                        className="px-3 py-1 text-sm border rounded-md text-cyan-600 border-cyan-600 hover:bg-cyan-50"
                      >
                        Archive
                      </button>
                      {isArchiveOpen && (
                        <ConfirmationModal
                          message={`Are you sure you want to archive this ${activeTab.slice(
                            0,
                            -1
                          )}? `}
                          onCancel={() => setArchiveOpen(false)}
                          // onConfirm={handleArchive}
                        />
                      )}
                      <button
                        onClick={() => setDeleteOpen(true)}
                        className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                      {isDeleteOpen && (
                        <ConfirmationModal
                          message={`This action cannot be undone. This action truly erase data from the database, including all associated files, metadata, etc.
                          Are you sure you want to delete this ${activeTab.slice(
                            0,
                            -1
                          )} ?
                          
                          `}
                          onCancel={() => setDeleteOpen(false)}
                          // onConfirm={}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 dark:bg-gray-900 sm:px-6">
        <div className="flex items-center">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 text-sm border rounded-md cursor-pointer dark:bg-gray-900 dark:text-gray-400"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        <div className="flex justify-center flex-1">
          <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border cursor-pointer rounded-l-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-900 dark:text-gray-400"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm cursor-pointer dark:bg-gray-900 dark:text-gray-400 font-medium border ${
                  currentPage === page
                    ? "z-10 bg-blue-50 border-blue-100 text-blue-700"
                    : "text-gray-500 bg-white hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border cursor-pointer rounded-r-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-900 dark:text-gray-400"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
