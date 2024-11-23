import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaSearch,
  FaSignOutAlt,
  FaPlus,
  FaUsers,
  FaTicketAlt,
  FaFilm,
  FaCalendar,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaTheaterMasks,
  FaGamepad,
  FaMusic,
  FaEdit,
} from "react-icons/fa";
import TheaterLayoutManager from "../../TheaterLayoutManager";
import { initialEvents } from "./Dashboard/initialEvents";

const VendorDashboard = () => {
  const [darkMode, setDarkMode] = useState(
    // Check localStorage for a stored value
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store the darkMode state in localStorage on change
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : initialEvents;
  });
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    type: "movie",
    name: "",
    thumbnail: "",
    trailer: "",
    description: "",
    price: "",
    totalSeats: "",
    date: "",
    time: "",
    cast: "",
    venue: "",
    availableShows: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const [layoutConfig, setLayoutConfig] = useState(null);
  const [isLayoutConfirmed, setIsLayoutConfirmed] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!isLayoutConfirmed) {
      // alert("Please confirm the layout before adding the event.");
      return;
    }
    const eventToAdd = {
      ...newEvent,
      id: events.length + 1,
      bookedSeats: [],
      layoutConfig,
    };
    const updatedEvents = [...events, eventToAdd];
    setEvents(updatedEvents);
    setNewEvent({
      type: "movie",
      name: "",
      thumbnail: "",
      trailer: "",
      description: "",
      price: "",
      totalSeats: "",
      date: "",
      time: "",
      cast: "",
      venue: "",
      availableShows: [],
    });
    setLayoutConfig(null);
    setIsLayoutConfirmed(false);
    setShowAddEvent(false);
  };

  const handleRemoveEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setNewEvent(eventToEdit);
    setShowAddEvent(true);
  };

  const handleAddShow = () => {
    const newShow = { date: newEvent.date, time: newEvent.time };
    setNewEvent({
      ...newEvent,
      availableShows: [...newEvent.availableShows, newShow],
      date: "",
      time: "",
    });
  };

  const handleLayoutConfirm = (config) => {
    setLayoutConfig(config);
    setIsLayoutConfirmed(true);
  };

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((event) => event.type === activeTab);

  const renderEventTypeFields = () => {
    switch (newEvent.type) {
      case "movie":
        return (
          <>
            <input
              type="text"
              placeholder="Trailer URL"
              value={newEvent.trailer}
              onChange={(e) =>
                setNewEvent({ ...newEvent, trailer: e.target.value })
              }
              className="w-full p-3 mt-3 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Cast (comma-separated)"
              value={newEvent.cast}
              onChange={(e) =>
                setNewEvent({ ...newEvent, cast: e.target.value })
              }
              className="w-full p-3 mt-3 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </>
        );
      case "theater":
        return (
          <input
            type="text"
            placeholder="Venue"
            value={newEvent.venue}
            onChange={(e) =>
              setNewEvent({ ...newEvent, venue: e.target.value })
            }
            className="w-full p-3 mt-3 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        );
      default:
        return null;
    }
  };

  const renderSeatLayout = (layout) => {
    return (
      <div
        className="grid max-w-full gap-1 overflow-auto max-h-60"
        style={{
          gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
        }}
      >
        {layout.seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-sm ${
              seat.status === "removed"
                ? "bg-transparent"
                : "bg-blue-500 text-white"
            }`}
          >
            {seat.status !== "removed" && `${seat.row}-${seat.column}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Vendor Dashboard
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 lg:hidden dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close sidebar</span>
              <FaBars className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                activeTab === "all"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaTicketAlt className="w-5 h-5 mr-4" />
              All Events
            </button>
            <button
              onClick={() => setActiveTab("movie")}
              className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                activeTab === "movie"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaFilm className="w-5 h-5 mr-4" />
              Movies
            </button>
            <button
              onClick={() => setActiveTab("theater")}
              className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                activeTab === "theater"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaTheaterMasks className="w-5 h-5 mr-4" />
              Theater
            </button>
            <button
              onClick={() => setActiveTab("game")}
              className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                activeTab === "game"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaGamepad className="w-5 h-5 mr-4" />
              Games
            </button>
            <button
              onClick={() => setActiveTab("concert")}
              className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                activeTab === "concert"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaMusic className="w-5 h-5 mr-4" />
              Concerts
            </button>
            <hr className="border-gray-200 dark:border-gray-700" />
            <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaUsers className="w-5 h-5 mr-4" />
              Users
            </button>
            <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaDollarSign className="w-5 h-5 mr-4" />
              Sales
            </button>
            <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaChartBar className="w-5 h-5 mr-4" />
              Analytics
            </button>
            <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaCog className="w-5 h-5 mr-4" />
              Settings
            </button>
          </nav>
          <div className="px-4 py-6">
            <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaSignOutAlt className="w-5 h-5 mr-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 lg:ml-64">
        {/* Navbar */}
        <nav className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 lg:hidden dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="sr-only">Open sidebar</span>
                <FaBars className="w-6 h-6" />
              </button>
              <div className="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search events"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-1 ml-3 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <FaSun className="w-6 h-6" />
                  ) : (
                    <FaMoon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Add Event Button */}
            <button
              onClick={() => setShowAddEvent(true)}
              className="px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPlus className="inline-block mr-2" />
              Add Event
            </button>

            {/* Add Event Form */}
            {showAddEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-full max-w-4xl mx-auto my-6">
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Add New Event
                      </h3>
                      <button
                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                        onClick={() => setShowAddEvent(false)}
                      >
                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative flex-auto p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                      <form onSubmit={handleAddEvent} className="space-y-4">
                        <select
                          value={newEvent.type}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, type: e.target.value })
                          }
                          className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                          required
                        >
                          <option value="movie">Movie</option>
                          <option value="theater">Theater</option>
                          <option value="game">Game</option>
                          <option value="concert">Concert</option>
                          <option value="event">Event</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Event Name"
                          value={newEvent.name}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, name: e.target.value })
                          }
                          className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                          required
                        />
                        <div>
                          <label
                            htmlFor="thumbnail"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Thumbnail
                          </label>
                          <input
                            type="file"
                            id="thumbnail"
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                thumbnail: e.target.files[0],
                              })
                            }
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        {renderEventTypeFields()}
                        <textarea
                          placeholder="Description"
                          value={newEvent.description}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                          required
                        ></textarea>
                        <input
                          type="number"
                          placeholder="Price"
                          value={newEvent.price}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, price: e.target.value })
                          }
                          className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                          required
                        />
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                          <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, date: e.target.value })
                            }
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white sm:w-1/2"
                            required
                          />
                          <input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, time: e.target.value })
                            }
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white sm:w-1/2"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddShow}
                          className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                          Add Show
                        </button>
                        {newEvent.availableShows.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                              Available Shows:
                            </h4>
                            <ul className="space-y-2">
                              {newEvent.availableShows.map((show, index) => (
                                <li
                                  key={index}
                                  className="p-2 bg-gray-100 rounded-md dark:bg-gray-700"
                                >
                                  {show.date} at {show.time}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                            Seat Layout (Optional)
                          </h4>
                          <TheaterLayoutManager
                            onLayoutConfirm={handleLayoutConfirm}
                          />
                          {isLayoutConfirmed && (
                            <p className="mt-2 text-sm text-green-600">
                              Layout confirmed and ready to be added to the
                              event.
                            </p>
                          )}
                        </div>
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => setShowAddEvent(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          >
                            Add Event
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Event List */}
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800"
                >
                  <img
                    className="object-cover w-full h-48"
                    src={event.thumbnail}
                    alt={event.name}
                  />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {event.name}
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {event.description}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      Price: ${event.price}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      Type: {event.type}
                    </p>
                    {event.type === "movie" && (
                      <>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                          Cast: {event.cast}
                        </p>
                        {event.trailer && (
                          <a
                            href={event.trailer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Watch Trailer
                          </a>
                        )}
                      </>
                    )}
                    {event.type === "theater" && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        Venue: {event.venue}
                      </p>
                    )}
                    <div className="mt-2">
                      <h4 className="font-medium text-gray-900 text-md dark:text-white">
                        Available Shows:
                      </h4>
                      <ul className="mt-1 space-y-1">
                        {event.availableShows &&
                        event.availableShows.length > 0 ? (
                          event.availableShows.map((show, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-500 dark:text-gray-300"
                            >
                              {show.date} at {show.time}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500 dark:text-gray-300">
                            {event.date} at {event.time}
                          </li>
                        )}
                      </ul>
                    </div>
                    {event.layoutConfig ? (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 text-md dark:text-white">
                          Seat Layout:
                        </h4>
                        <div className="p-2 mt-2 overflow-x-auto bg-gray-100 rounded-md dark:bg-gray-700">
                          {renderSeatLayout(event.layoutConfig)}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 text-md dark:text-white">
                          No Seat Layout Chosen
                        </h4>
                      </div>
                    )}
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium leading-4 text-yellow-700 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="inline-flex items-center px-3 py-2 mt-4 ml-2 text-sm font-medium leading-4 text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handlePublishEvent()}
                      className="inline-flex items-center px-3 py-2 mt-4 ml-2 text-sm font-medium leading-4 text-blue-700 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
