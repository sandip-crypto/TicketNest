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
} from "react-icons/fa";

const initialEvents = [
  {
    id: 1,
    type: "movie",
    name: "Inception",
    thumbnail: "/placeholder.svg?height=100&width=100",
    trailer: "https://example.com/inception-trailer",
    description:
      "A thief who enters the dreams of others to steal secrets from their subconscious.",
    price: 12.99,
    totalSeats: 100,
    bookedSeats: [],
    date: "2023-06-20",
    time: "20:00",
  },
  {
    id: 2,
    type: "theater",
    name: "Hamilton",
    thumbnail: "/placeholder.svg?height=100&width=100",
    description: "A musical about American Founding Father Alexander Hamilton.",
    price: 89.99,
    totalSeats: 200,
    bookedSeats: [],
    date: "2023-06-25",
    time: "19:30",
  },
  {
    id: 3,
    type: "game",
    name: "NBA Finals",
    thumbnail: "/placeholder.svg?height=100&width=100",
    description:
      "The championship series of the National Basketball Association.",
    price: 150,
    totalSeats: 20000,
    bookedSeats: [],
    date: "2023-06-22",
    time: "21:00",
  },
  {
    id: 4,
    type: "concert",
    name: "Taylor Swift Concert",
    thumbnail: "/placeholder.svg?height=100&width=100",
    description: "Taylor Swift's latest world tour.",
    price: 120,
    totalSeats: 50000,
    bookedSeats: [],
    date: "2023-07-15",
    time: "20:00",
  },
];

const VendorDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState(initialEvents);
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
  });
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([
      ...events,
      { ...newEvent, id: events.length + 1, bookedSeats: [] },
    ]);
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
    });
    setShowAddEvent(false);
  };

  const handleRemoveEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const renderSeatLayout = (event) => {
    const seats = [];
    for (let i = 0; i < event.totalSeats; i++) {
      seats.push(
        <button
          key={i}
          className={`w-6 h-6 m-1 text-xs font-bold rounded-md ${
            event.bookedSeats.includes(i)
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={() => {
            const updatedEvent = { ...event };
            if (updatedEvent.bookedSeats.includes(i)) {
              updatedEvent.bookedSeats = updatedEvent.bookedSeats.filter(
                (seat) => seat !== i
              );
            } else {
              updatedEvent.bookedSeats.push(i);
            }
            setEvents(
              events.map((e) => (e.id === event.id ? updatedEvent : e))
            );
          }}
          aria-label={`Seat ${i + 1}`}
        >
          {i + 1}
        </button>
      );
    }
    return seats;
  };

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((event) => event.type === activeTab);

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
              <div
                className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50"
                id="my-modal"
              >
                <div className="relative p-5 mx-auto bg-white border rounded-md shadow-lg top-20 w-96 dark:bg-gray-800">
                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Add New Event
                    </h3>
                    <form onSubmit={handleAddEvent} className="mt-2 text-left">
                      <select
                        value={newEvent.type}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, type: e.target.value })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      >
                        <option value="movie">Movie</option>
                        <option value="theater">Theater</option>
                        <option value="game">Game</option>
                        <option value="concert">Concert</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Event Name"
                        value={newEvent.name}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, name: e.target.value })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Thumbnail URL"
                        value={newEvent.thumbnail}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            thumbnail: e.target.value,
                          })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      {newEvent.type === "movie" && (
                        <input
                          type="text"
                          placeholder="Trailer URL"
                          value={newEvent.trailer}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              trailer: e.target.value,
                            })
                          }
                          className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        />
                      )}
                      <textarea
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      ></textarea>
                      <input
                        type="number"
                        placeholder="Price"
                        value={newEvent.price}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, price: e.target.value })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Total Seats"
                        value={newEvent.totalSeats}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            totalSeats: e.target.value,
                          })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                        className="w-full p-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <div className="items-center px-4 py-3">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          Add Event
                        </button>
                      </div>
                    </form>
                    <button
                      onClick={() => setShowAddEvent(false)}
                      className="w-full px-4 py-2 mt-2 text-base font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Close
                    </button>
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
                      Date: {event.date} at {event.time}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      Type: {event.type}
                    </p>
                    {event.type === "movie" && event.trailer && (
                      <a
                        href={event.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Watch Trailer
                      </a>
                    )}
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="inline-flex items-center px-3 py-2 mt-2 ml-2 text-sm font-medium leading-4 text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 text-md dark:text-white">
                        Seat Layout
                      </h4>
                      <div className="flex flex-wrap mt-2 overflow-y-auto max-h-40">
                        {renderSeatLayout(event)}
                      </div>
                    </div>
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
