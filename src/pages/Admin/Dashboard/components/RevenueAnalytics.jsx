import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

const eventPopularityData = [
  { name: "Concert A", popularity: 85 },
  { name: "Movie B", popularity: 70 },
  { name: "Theater C", popularity: 60 },
  { name: "Sports D", popularity: 90 },
  { name: "Comedy E", popularity: 75 },
];

const RevenueAnalytics = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
        Revenue Analytics
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Event Popularity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventPopularityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="popularity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
