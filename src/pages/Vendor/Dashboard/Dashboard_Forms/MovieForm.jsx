import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import TheaterLayoutManager from "./../Dashboard_Components/TheaterLayoutManager";
import HourFormatter from "../../../../components/HourFormatter";

const INITIAL_STATE = {
  type: "movie",
  location: {
    address: "",
    city: "",
  },
  numberOfScreens: "",
  screeningTimes: [],
  showtimes: [],
  screenType: "",
  layoutConfig: null,
  date: "",
  time: "",
};

const MovieForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [movie, setMovie] = useState(INITIAL_STATE);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/v1/movie/all-movies", {
          withCredentials: true,
        });
        if (response?.data && response.data?.movies) {
          setMovieData(response.data.movies);
          console.log("Fetched movies:", response.data.movies);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  }, []);

  const handleNestedInputChange = useCallback((e, parent) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [parent]: {
        ...prevMovie[parent],
        [name]: value,
      },
    }));
  }, []);

  const handleAddShowtime = useCallback(
    (e) => {
      e.preventDefault();
      if (movie.date && movie.time) {
        const time12Hour = HourFormatter(movie.time);

        setMovie((prevMovie) => ({
          ...prevMovie,
          showtimes: [
            ...prevMovie.showtimes,
            { date: movie.date, time: time12Hour },
          ],
          date: "",
          time: "",
        }));
      }
    },
    [movie.date, movie.time]
  );

  const handleLayoutConfirm = useCallback((layoutConfig) => {
    setMovie((prev) => ({
      ...prev,
      layoutConfig,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation checks

    if (!selectedMovieId) {
      setError("Please select a movie.");
      return;
    }

    if (!movie.layoutConfig) {
      setError("Please configure the theater layout before submitting.");
      return;
    }

    if (movie.showtimes.length === 0) {
      setError("Please add at least one showtime.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Send movie data to backend via axios
      const response = await axios.post(
        `/api/v1/movie/vendor/create-movie`,
        {
          movie,
          selectedMovieId, // Sending the movie data
        },
        {
          withCredentials: true,
        }
      );

      if (response?.data) {
        setSuccessMessage("Movie created successfully!");

        // Show the success message for 3 seconds and reset the form
        setTimeout(() => {
          setMovie(INITIAL_STATE); // Reset form to initial state
          setSuccessMessage("");
          location.reload(); // Optional, can be used to refresh the page after submission
        }, 3000); // Wait 3 seconds before resetting and refreshing
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create movie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 mx-auto my-5 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">Add New Movie</h2>

      <div className="w-full ">
        <select
          className="p-3 border rounded cursor-pointer w-[100%] max-w-96 dark:bg-gray-700 dark:text-gray-300"
          name="vendormovie"
          id="vendorMovie"
          required
          onChange={(e) => setSelectedMovieId(e.target.value)}
          value={selectedMovieId}
        >
          <option value="" disabled selected>
            Please select a movie
          </option>
          {movieData.map((movie) => (
            <option value={movie._id} key={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <label htmlFor="address" className="dark:text-gray-300">
            Address <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Theater Street Address, Building Name or Nearby Landmark"
            value={movie.location.address}
            onChange={(e) => handleNestedInputChange(e, "location")}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="dark:text-gray-300">
            City <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={movie.location.city}
            onChange={(e) => handleNestedInputChange(e, "location")}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="dark:text-gray-300" htmlFor="numberOfScreens">
            Number of Screens <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="numberOfScreens"
            placeholder="Number of Screens Available"
            value={movie.numberOfScreens}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="screenType" className="dark:text-gray-300">
            Screen Type <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="screenType"
            placeholder="Screen type (e.g.: IMAX, 3D, Regular, 4DX, Dolby Atmos, etc.)"
            value={movie.screenType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="dark:text-gray-300">
            Date <span className="text-red-500 ">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={movie.date}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="time" className="dark:text-gray-300">
            Time <span className="text-red-500 ">*</span>
          </label>
          <input
            type="time"
            name="time"
            value={movie.time}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleAddShowtime}
        className="w-full px-4 py-2 font-medium text-white transition-all duration-300 bg-teal-500 rounded-md hover:bg-teal-600"
      >
        <FaPlus className="inline-block mr-2" />
        Add Showtime
      </button>
      {movie.showtimes.length > 0 && (
        <div className="dark:text-gray-300">
          <h4 className="font-medium">Showtimes:</h4>
          <ul className="pl-5 list-disc">
            {movie.showtimes.map((showtime, index) => (
              <li key={index}>
                {showtime.date} at {showtime.time}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Theater Layout Manager */}
      <TheaterLayoutManager onLayoutConfirm={handleLayoutConfirm} />
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 text-sm text-green-500 bg-green-100 border border-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 font-medium text-white transition-all duration-300 bg-teal-500 rounded-md hover:bg-teal-600 disabled:opacity-50"
      >
        {isSubmitting ? "Adding Movie..." : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;
