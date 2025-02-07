import { useState, useEffect } from "react";
import axios from "axios";
import { parseISO, isBefore, isAfter, startOfDay } from "date-fns";
import MovieSlider from "../components/slider/MovieSlider";
import Carousel from "../components/slider/Carousel";

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Regular movies without vendor-specific details
  const [vendorMovies, setVendorMovies] = useState([]); // Vendor-specific movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/v1/movie/all-movies", {
          withCredentials: true,
        });
        if (response?.data && response.data?.movies) {
          setMovies(response.data.movies);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen text-xl text-red-500"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  // Get the current date (start of day to ignore time)
  const currentDate = startOfDay(new Date());

  // Filter movies into "Now Showing" and "Upcoming"
  const nowShowing = movies.filter((movie) => {
    const releaseDate = parseISO(movie.releaseDate);
    return isBefore(releaseDate, currentDate);
  });

  const upcomingMovies = movies.filter((movie) => {
    const releaseDate = parseISO(movie.releaseDate);
    return isAfter(releaseDate, currentDate);
  });

  // Merge vendor-specific data with regular movie data
  const mergedMovies = movies.map((movie) => {
    const vendorMovie = vendorMovies.find(
      (vendor) => vendor.movie._id === movie._id
    );
    return {
      ...movie,
      vendorData: vendorMovie || null, // Attach vendor-specific data
    };
  });

  return (
    <>
      <Carousel movies={upcomingMovies} />
      <div className="container px-4 py-8 mx-auto">
        {nowShowing.length > 0 ? (
          <MovieSlider movies={nowShowing} title="Now Playing Movies" />
        ) : (
          <p className="text-xl text-center text-gray-600">
            No movies are currently showing.
          </p>
        )}

        {upcomingMovies.length > 0 ? (
          <MovieSlider movies={upcomingMovies} title="Upcoming Movies" />
        ) : (
          <p className="mt-8 text-xl text-center text-gray-600">
            No upcoming movies at the moment.
          </p>
        )}
      </div>
    </>
  );
};

export default MovieList;
