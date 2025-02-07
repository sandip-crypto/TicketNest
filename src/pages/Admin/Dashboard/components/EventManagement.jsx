import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaCheck, FaTimes, FaFilm } from "react-icons/fa";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieForm, setMovieForm] = useState({
    type: "movie",
    title: "",
    genre: "",
    description: "",
    releaseDate: "",
    duration: "",
    language: "",
    directors: "",
    thumbnail: null,
    landscape: null,
    rating: "",
    cast: {
      leadActors: "",
      supportingActors: "",
    },
    trailer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [landscapePreview, setLandscapePreview] = useState(null);

  // Fetch events awaiting review and approval
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/v1/event/all-events", {
          withCredentials: true,
        });
        setEvents(data.events || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  // Fetch movies for centralized movie listing
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("/api/v1/movie/all-movies", {
          withCredentials: true,
        });
        setMovies(data.movies || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  // Handle changes in the movie form input
  const handleMovieFormChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setMovieForm((prevMovie) => ({
        ...prevMovie,
        [name]: file,
      }));
      const previewUrl = URL.createObjectURL(file);
      if (name === "thumbnail") {
        setThumbnailPreview(previewUrl);
      } else if (name === "landscape") {
        setLandscapePreview(previewUrl);
      }
    } else if (name === "leadActors" || name === "supportingActors") {
      setMovieForm((prevMovie) => ({
        ...prevMovie,
        cast: {
          ...prevMovie.cast,
          [name]: value,
        },
      }));
    } else {
      setMovieForm((prevMovie) => ({
        ...prevMovie,
        [name]: value,
      }));
    }
  }, []);

  // Handle movie form submission
  const handleMovieFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all text fields
      Object.keys(movieForm).forEach((key) => {
        if (key !== "thumbnail" && key !== "landscape" && key !== "cast") {
          formData.append(key, movieForm[key]);
        }
      });

      // Append nested cast object
      formData.append("leadActors", movieForm.cast.leadActors);
      formData.append("supportingActors", movieForm.cast.supportingActors);

      // Append file fields
      if (movieForm.thumbnail)
        formData.append(
          "thumbnail",
          movieForm.thumbnail,
          movieForm.thumbnail.name
        );
      if (movieForm.landscape)
        formData.append(
          "landscape",
          movieForm.landscape,
          movieForm.landscape.name
        );

      const response = await axios.post(
        "/api/v1/movie/admin/create-movie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        alert("Movie created successfully!");
        setMovieForm({
          type: "movie",
          title: "",
          genre: "",
          description: "",
          releaseDate: "",
          duration: "",
          language: "",
          directors: "",
          thumbnail: null,
          landscape: null,
          rating: "",
          cast: {
            leadActors: "",
            supportingActors: "",
          },
          trailer: "",
        });
        setThumbnailPreview(null);
        setLandscapePreview(null);
        // Refresh the movie list
      } else {
        throw new Error(response?.data?.message || "Failed to create movie");
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      alert(error.message || "Failed to create movie. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter events by status
  const handleStatusFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Safeguard for empty arrays to prevent errors
  const filteredEvents = Array.isArray(events)
    ? events.filter((event) => {
        if (selectedStatus === "All") return true;
        return event.status === selectedStatus;
      })
    : [];

  const filteredSearchEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle approve and reject events (these functions need to be implemented)
  const handleApproveEvent = async (eventId) => {
    // Implement the logic to approve an event
    console.log("Approve event:", eventId);
  };

  const handleRejectEvent = async (eventId) => {
    // Implement the logic to reject an event
    console.log("Reject event:", eventId);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Event & Movie Management
      </h1>
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="mt-4 mb-4">
          <input
            type="text"
            placeholder="Search Events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-gray-400"
          />
        </div>

        {/* Filter by Status */}
        <div className="mt-4 mb-4">
          <select
            onChange={handleStatusFilterChange}
            value={selectedStatus}
            className="p-2 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-400"
          >
            <option value="All">All Events</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Event List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Events Awaiting Approval
        </h2>
        <div className="mt-4 bg-white rounded-md shadow-sm dark:bg-gray-700">
          {filteredSearchEvents.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Event Name</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSearchEvents.map((event) => (
                  <tr key={event._id}>
                    <td className="px-4 py-2">{event.name}</td>
                    <td className="px-4 py-2">{event.status}</td>
                    <td className="px-4 py-2">
                      {event.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApproveEvent(event._id)}
                            className="px-4 py-2 text-white bg-green-500 rounded-md"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleRejectEvent(event._id)}
                            className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No events to review at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Movie Creation Form */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create New Movie
        </h2>
        <div className="p-4 mt-4 bg-white rounded-md shadow-sm dark:bg-gray-700">
          <form onSubmit={handleMovieFormSubmit}>
            {/* Movie Form Inputs */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={movieForm.title}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Movie Title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Genre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="genre"
                  value={movieForm.genre}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Movie Genre (e.g.: Action, Comedy, Drama, Thriller, Horror, Romance, etc.)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Release Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={movieForm.releaseDate}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={movieForm.duration}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., 2h 30min"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  name="language"
                  value={movieForm.language}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-300"
                  required
                >
                  <option value="">Select Language</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Nepali">Nepali</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Director(s) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="directors"
                  value={movieForm.directors}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Write name of director(s)"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Rating <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rating"
                  value={movieForm.rating}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., G, U, PG, PG-13, R, S, UA, A, NC-17, etc."
                  required
                />
              </div>

              {/* Cast Inputs */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Lead Actors <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="leadActors"
                  value={movieForm.cast.leadActors}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Mention lead actors (comma-separated)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Supporting Actors <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="supportingActors"
                  value={movieForm.cast.supportingActors}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Mention supporting actors (comma-separated)"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={movieForm.description}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Write a brief movie description"
                  rows={5}
                  required
                />
              </div>
              {/* File Inputs */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Thumbnail/Poster Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md cursor-pointer dark:text-white"
                  required
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail Preview"
                      className="object-cover h-48 rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Landscape Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="landscape"
                  accept="image/*"
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md cursor-pointer dark:text-white"
                  required
                />
                {landscapePreview && (
                  <div className="mt-2">
                    <img
                      src={landscapePreview || "/placeholder.svg"}
                      alt="Landscape Preview"
                      className="object-cover w-full h-48 rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Trailer URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="trailer"
                  value={movieForm.trailer}
                  onChange={handleMovieFormChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  placeholder="https://..."
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-200 bg-teal-600 rounded-md hover:bg-teal-700"
              >
                <FaFilm /> {isSubmitting ? "Creating Movie..." : "Create Movie"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Movie List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Centralized Movie Listing
        </h2>
        <div className="mt-4 bg-white rounded-md shadow-sm dark:bg-gray-700">
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie._id} className="px-4 py-2 border-b">
                  <strong>{movie.title}</strong> - {movie.genre} - Released on{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No movies listed yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
