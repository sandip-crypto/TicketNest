import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { X, Music } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RenderContent from "../components/RenderContent";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const ConcertsSection = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(
    localStorage.getItem("selectedCity") || "Kathmandu"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: "",
    startDate: "",
    endDate: "",
    search: "",
  });

  const fetchConcerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/concert/filtered-concerts`, {
        params: {
          page: currentPage,
          limit: 12,
          ...filters,
          city,
        },
      });
      setConcerts(response.data.concerts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch concerts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, city]);

  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      startDate: "",
      endDate: "",
      search: "",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container p-4 mx-auto min-h-[calc(100vh-200px)]">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Concerts in {city}
        </h1>

        {/* Filters */}
        <div className="p-4 mb-8 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <X className="inline-block w-4 h-4 mr-2" />
                Clear Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search concerts..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange("genre", e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Genres</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
            </select>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Concert List */}
        {concerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Music className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-xl text-gray-600">No concerts found</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {concerts.map((concert) => (
              <div
                key={concert._id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <img
                  src={
                    concert.thumbnail.startsWith("http")
                      ? concert.thumbnail
                      : `${API_URL}/${concert.thumbnail}`
                  }
                  alt={concert.title}
                  className="object-cover w-full h-48"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold line-clamp-2">
                    {concert.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                    <RenderContent content={concert.description} />
                  </p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>
                      {format(
                        parseISO(concert.availableShows[0].date),
                        "MMM d, yyyy"
                      )}
                    </span>
                    <span className="truncate">{concert.city}</span>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={`/ticketnest/concert/${concert._id}`}
                    className="block w-full px-4 py-2 text-center text-white transition-all duration-200 bg-teal-500 rounded hover:bg-teal-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {concerts.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav
              className="inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-2 text-sm font-medium ${
                    currentPage === page + 1
                      ? "z-10 bg-teal-50 border-teal-500 text-teal-600"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                  } border`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ConcertsSection;
