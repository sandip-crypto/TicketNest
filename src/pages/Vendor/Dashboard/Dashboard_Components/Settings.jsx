import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../../../../context/AuthContext";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const { logout, vendor } = useAuth();

  const [profile, setProfile] = useState({
    name: `${vendor?.owner_name}`,
    email: `${vendor?.email}`,
    profilePicture:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // States to toggle visibility for both new and confirm password
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  useEffect(() => {
    // Load theme from local storage
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  // Handle Profile Update
  const handleProfileUpdate = () => {
    setLoading(true);
    // Simulate API call to update the profile
    setTimeout(() => {
      setLoading(false);
      setNotification("Profile updated successfully!");
      setTimeout(() => setNotification(""), 3000);
    }, 1000);
  };

  // Handle Password Change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setNotification("Passwords do not match!");
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    setLoading(true);
    // Simulate API call for password change
    setTimeout(() => {
      setLoading(false);
      setNotification("Password changed successfully!");
      setTimeout(() => setNotification(""), 3000);
    }, 1000);
  };

  // Handle Profile Picture Upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmLogout = () => {
    setShowConfirmModal(false);
    logout();
  };

  return (
    <div className="min-h-screen p-6 transition-colors bg-gray-100 dark:bg-gray-900">
      {/* Notification */}
      {notification && (
        <div className="p-4 mb-4 text-white bg-green-500 rounded-md">
          {notification}
        </div>
      )}

      {/* Settings Tabs */}
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Profile
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mt-2 dark:text-white"
                />
                {profile.profilePicture && (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 mt-2 rounded-full"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:border-gray-600 bg-gray-50 dark:text-white dark:bg-gray-700 focus:outline-none"
                  required
                />
              </div>
              <button
                onClick={handleProfileUpdate}
                className={`px-4 py-2 mt-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 dark:bg-teal-800 dark:hover:bg-teal-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Security
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={isNewPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:border-gray-600 bg-gray-50 dark:text-white dark:bg-gray-700 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 top-[55%] right-3"
                    onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                  >
                    {isNewPasswordVisible ? (
                      <GoEyeClosed className="dark:text-white" />
                    ) : (
                      <RxEyeOpen className="dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:border-gray-600 bg-gray-50 dark:text-white dark:bg-gray-700 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 top-[55%] right-3"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  >
                    {isConfirmPasswordVisible ? (
                      <GoEyeClosed className="dark:text-white" />
                    ) : (
                      <RxEyeOpen className="dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <button
                onClick={handlePasswordChange}
                className={`px-4 py-2 mt-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 dark:bg-teal-800 dark:hover:bg-teal-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800 -xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Appearance
            </h2>
            <div className="mt-4">
              <div className="flex items-center">
                <label className="mr-4 text-gray-700 dark:text-gray-300">
                  Dark Mode
                </label>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Notifications
            </h2>
            <div className="mt-4">
              <div className="flex items-center">
                <label className="mr-4 text-gray-700 dark:text-gray-300">
                  Enable Notifications
                </label>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>

          {/* Account Management Section */}
          <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Account Management
            </h2>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => alert("Account deactivated")}
                className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700"
              >
                Deactivate Account
              </button>

              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-4 py-2 mt-4 text-white rounded-md bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-800 dark:hover:bg-cyan-700"
              >
                Logout
              </button>
              {showConfirmModal && (
                <ConfirmationModal
                  message={"Are you sure you want to logout?"}
                  onCancel={() => setShowConfirmModal(false)}
                  onConfirm={handleConfirmLogout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
