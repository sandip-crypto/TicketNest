import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const date = new Date().getFullYear();

const data = [
  { name: "Jan", sales: 4000, bookings: 2400 },
  { name: "Feb", sales: 3000, bookings: 1398 },
  { name: "Mar", sales: 2000, bookings: 9800 },
  { name: "Apr", sales: 2780, bookings: 3908 },
  { name: "May", sales: 1890, bookings: 4800 },
  { name: "Jun", sales: 2390, bookings: 3800 },
  { name: "Jul", sales: 3490, bookings: 4300 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen p-6 transition-colors bg-gray-100 dark:bg-gray-900">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-gray-500 dark:text-gray-400">
          <button className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
            View All Analytics
          </button>
        </div>
      </div>

      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Sales */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Total Sales
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            $50,238
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            +15% from last month
          </p>
        </div>

        {/* Movie Bookings */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Movie Bookings
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            3,524
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            +10% from last month
          </p>
        </div>

        {/* Concert Bookings */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Concert Bookings
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            1,205
          </p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            -5% from last month
          </p>
        </div>

        {/* Theatre Bookings */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Theatre Bookings
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            2,039
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            +12% from last month
          </p>
        </div>
      </div>

      {/* Graphs or Detailed Analytics */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Sales Overview Chart */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Overview Chart */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Bookings Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Combined Sales and Bookings Chart */}
        <div className="p-6 transition transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 dark:bg-gray-800 dark:hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Sales & Bookings
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {date} TicketNest. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Analytics;
