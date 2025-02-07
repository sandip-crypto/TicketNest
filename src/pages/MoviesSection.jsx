import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Calendar, Filter, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RenderContent from "../components/RenderContent";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const MoviessSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    status: "",
    search: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const genres = ["All", "Action", "Romance", "Thriller", "Sci-fi", "Comedy"];
  const languages = ["All", "Nepali", "Hindi", "English"];
  const status = ["All", "Now Showing", "Upcoming"];

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/movie/filtered-movies`, {
        params: {
          page: currentPage,
          limit: 10,
          ...filters,
        },
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      console.log("Updated Filters:", newFilters); // Log the updated filters
      return newFilters;
    });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      language: "",
      search: "",
      status: "",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.genre || filters.language || filters.search || filters.status;

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
        {/* Filters */}
        <div className="px-4 py-2 mb-8 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center px-3 py-1 text-sm text-gray-600 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </button>
            )}
          </div>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="w-full">
              <label
                htmlFor="search"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Search Movies
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent default form submission
                      // fetchMovies(); // Trigger search
                    }
                  }}
                  placeholder="Search by title or description..."
                  className="block w-full py-2 pl-3 pr-10 text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Search
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Genre */}
            <div className="w-full">
              <label
                htmlFor="genre"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <div className="relative">
                <select
                  id="genre"
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="block w-full py-2 pl-3 pr-10 text-base border-2 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre === "All" ? "" : genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="w-full">
              <label
                htmlFor="language"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <div className="relative">
                <select
                  id="language"
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  className="block w-full py-2 pl-3 pr-10 text-base border-2 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                >
                  {languages.map((language) => (
                    <option
                      key={language}
                      value={language === "All" ? "" : language}
                    >
                      {language}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="w-full">
              <label
                htmlFor="status"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full py-2 pl-3 pr-10 text-base border-2 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                >
                  {status.map((status, index) => (
                    <option key={index} value={status === "All" ? "" : status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Movie List */}
        <div className="min-h-[400px]">
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-xl text-gray-600">No Movies found </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 mt-4 text-sm text-white transition-colors bg-teal-500 rounded-md hover:bg-teal-600"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md"
                >
                  {movie.thumbnail.startsWith("http") ? (
                    <>
                      <img
                        loading="lazy"
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="object-cover w-full h-48"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        loading="lazy"
                        src={`${API_URL}/${
                          movie.thumbnail || "placeholder.png"
                        }`}
                        alt={movie.title}
                        className="object-cover w-full h-48"
                      />
                    </>
                  )}

                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 text-xl font-semibold line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                      <RenderContent content={movie.description} />
                    </p>
                    <div className="flex items-center justify-between mt-auto text-sm text-gray-500">
                      <span>
                        {format(parseISO(movie.releaseDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    <Link
                      to={`/ticketnest/movie/${movie._id}`}
                      className="w-full px-4 py-2 mt-4 text-center text-white transition-all duration-200 bg-teal-500 rounded hover:bg-teal-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {movies.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page numbers */}
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === page + 1
                      ? "z-10 bg-teal-50 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default MoviessSection;
