import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth(); // Access user data from AuthContext
  const [userData, setUserData] = useState({
    name: user?.username,
    email: user?.email,
    role: user?.role,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    console.log("Updated user:", userData);
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Profile
      </h1>
      <div className="mt-4">
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="name"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {userData.name}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <strong>Role:</strong> {userData.role}
              </p>
              <button
                className="px-4 py-2 mt-4 font-bold text-white bg-teal-500 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        <div className="p-6 mt-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Change Password
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="current-password"
              >
                Current Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="current-password"
                type="password"
                placeholder="Enter your current password"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="new-password"
                type="password"
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="confirm-password"
              >
                Confirm New Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
