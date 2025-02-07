import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Ticket,
  History,
  Star,
  Activity,
  CreditCard,
  Filter,
  ChevronRight,
  CheckCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import Layout from "./../../../components/layout/Layout";
import { useAuth } from "../../../context/AuthContext";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { logout, user } = useAuth();

  const handleConfirmLogout = () => {
    logout();
  };

  const users = {
    name: user?.username,
    ticketsPurchased: 15,
    upcomingEvents: 3,
    totalSpent: 1250,
    profileCompletion: 75,
    memberSince: "2023",
    favoriteCategories: ["Concert", "Sports"],
  };

  const categories = ["all", "Concert", "Sports", "Theatre", "Movie", "Art"];

  const upcomingEvents = [
    {
      id: 1,
      name: "Summer Music Festival",
      date: "2023-07-15",
      time: "14:00",
      location: "Central Park",
      type: "Concert",
      price: 150,
      image: "https://source.unsplash.com/random/800x600/?concert",
    },
    {
      id: 2,
      name: "NBA Finals Game 7",
      date: "2023-06-18",
      time: "19:30",
      location: "Madison Square Garden",
      type: "Sports",
      price: 300,
      image: "https://source.unsplash.com/random/800x600/?basketball",
    },
    {
      id: 3,
      name: "Hamilton",
      date: "2023-08-05",
      time: "20:00",
      location: "Broadway Theatre",
      type: "Theatre",
      price: 200,
      image: "https://source.unsplash.com/random/800x600/?theatre",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      event: "Summer Music Festival",
      amount: 150,
      date: "2023-06-10",
      status: "completed",
    },
    {
      id: 2,
      event: "NBA Finals Game 7",
      amount: 300,
      date: "2023-06-08",
      status: "completed",
    },
  ];

  const activityTimeline = [
    {
      id: 1,
      action: "Purchased tickets",
      event: "Summer Music Festival",
      date: "2023-06-10",
    },
    {
      id: 2,
      action: "Added to favorites",
      event: "Hamilton",
      date: "2023-06-09",
    },
  ];

  const toggleFavorite = (eventId) => {
    setFavoriteEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = upcomingEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || event.type === selectedCategory)
  );

  const ProfileCompletionCard = () => (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-2 text-lg font-semibold">Profile Completion</h3>
      <div className="w-full h-2 mb-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-teal-500 rounded-full"
          style={{ width: `${users.profileCompletion}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {users.profileCompletion}% complete
      </p>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container p-4 mx-auto">
          {/* User Profile Section */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={`https://source.unsplash.com/random/200x200/?portrait`}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Welcome back, {users.name}!
                  </h2>
                  <p className="text-gray-600">
                    Member since {users.memberSince}
                  </p>
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">
                    {users.ticketsPurchased}
                  </p>
                  <p className="text-sm text-gray-600">Tickets</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {users.upcomingEvents}
                  </p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    ${users.totalSpent}
                  </p>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <ProfileCompletionCard />
              <nav className="sticky p-4 bg-white rounded-lg shadow-md top-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("upcoming")}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        activeTab === "upcoming"
                          ? "bg-teal-100 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Upcoming Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("activity")}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        activeTab === "activity"
                          ? "bg-teal-100 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Activity className="w-5 h-5 mr-2" />
                      Activity
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("transactions")}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        activeTab === "transactions"
                          ? "bg-teal-100 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Transactions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        activeTab === "settings"
                          ? "bg-teal-100 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("logout")}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        activeTab === "logout"
                          ? "bg-teal-100 text-teal-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className="lg:col-span-3">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-semibold">
                    {activeTab === "upcoming" && "Upcoming Events"}
                    {activeTab === "activity" && "Recent Activity"}
                    {activeTab === "transactions" && "Recent Transactions"}
                    {activeTab === "settings" && "Account Settings"}
                    {activeTab === "logout" && "Logout Confirmation"}
                  </h2>
                  {activeTab === "upcoming" && (
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {activeTab === "upcoming" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-md hover:scale-105"
                      >
                        <div className="relative">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="object-cover w-full h-48"
                          />
                          <button
                            onClick={() => toggleFavorite(event.id)}
                            className="absolute p-2 transition-colors duration-200 bg-white rounded-full top-2 right-2 hover:bg-gray-100"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                favoriteEvents.includes(event.id)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {event.name}
                            </h3>
                            <span className="text-lg font-bold text-teal-600">
                              ${event.price}
                            </span>
                          </div>
                          <p className="flex items-center mb-2 text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.date} at {event.time}
                          </p>
                          <p className="flex items-center mb-2 text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </p>
                          <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-800 bg-teal-100 rounded-full">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "activity" && (
                  <div className="space-y-4">
                    {activityTimeline.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start p-4 rounded-lg bg-gray-50"
                      >
                        <Activity className="w-5 h-5 mt-1 mr-3 text-teal-500" />
                        <div>
                          <p className="font-medium">
                            {activity.action} - {activity.event}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "transactions" && (
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-teal-500" />
                          <div>
                            <p className="font-medium">{transaction.event}</p>
                            <p className="text-sm text-gray-600">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-teal-600">
                            ${transaction.amount}
                          </p>
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-white rounded-lg shadow-md">
                      <h3 className="mb-4 text-xl font-semibold">
                        Personal Information
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            defaultValue={users.name}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow-md">
                      <h3 className="mb-4 text-xl font-semibold">
                        Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          Email notifications for new events
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          SMS notifications for ticket updates
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          Newsletter subscription
                        </label>
                      </div>
                    </div>

                    <button className="px-6 py-2 font-bold text-white transition-colors duration-200 bg-teal-500 rounded-lg hover:bg-teal-600">
                      Save Changes
                    </button>
                  </div>
                )}

                {activeTab === "logout" && (
                  <div className="p-6 text-center bg-white rounded-lg">
                    <LogOut className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h3 className="mb-4 text-xl font-semibold">
                      Are you sure you want to logout?
                    </h3>
                    <p className="mb-6 text-gray-600">
                      You will be securely logged out of your account
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleConfirmLogout}
                        disabled={isLoading}
                        className="px-6 py-2 font-bold text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        {isLoading ? (
                          <>
                            Logging out...
                            <svg
                              className="w-5 h-5 ml-2 animate-spin"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </>
                        ) : (
                          "Yes,Logout"
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("upcoming")}
                        className="px-6 py-2 font-bold transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
