import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/all-users", {
          withCredentials: true,
        });

        if (data?.users) {
          setUsers(data.users);
          setUserCount(data.users.length - 1);
        } else {
          setError("No users found");
        }
      } catch (error) {
        setError("Failed to fetch users");
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/all-vendors", {
          withCredentials: true,
        });

        if (data?.vendors) {
          setVendors(data.vendors);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVendors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(() => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/auth/user/register", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data.success) {
        console.log("User added Successfully", response.data);

        navigate("/ticketnest/user/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
        User Management
      </h1>
      <div className="p-4 mb-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400">
        <h2 className="mb-4 text-xl font-semibold">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
            <option value="Support Staff">Support Staff</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 text-white transition-all duration-300 bg-teal-500 rounded hover:bg-teal-600 "
          >
            {isLoading ? (
              <>
                Signing up...
                <svg className="w-5 h-5 ml-2 animate-spin" viewBox="0 0 24 24">
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
              "Add User"
            )}
          </button>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
      <div className="p-4 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">
          User List
          {/* <span className="px-4 ml-5 bg-teal-500 rounded dark:text-white">
            Total Users: {userCount}
          </span> */}
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </td>
                <td>{user.email}</td>
                <td style={getRoleStyles(user.role)}>
                  {user.role.toUpperCase()}
                </td>
              </tr>
            ))}

            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.owner_name}</td>
                <td>{vendor.email}</td>
                <td style={getRoleStyles(vendor.role)}>
                  {vendor.role.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to return styles based on the role
function getRoleStyles(role) {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return { backgroundColor: "#1e40af", color: "white" }; // Blue for Admin
    case "USER":
      return { backgroundColor: "#10b981", color: "white" }; // Green for User
    case "VENDOR":
      return { backgroundColor: "#f59e0b", color: "white" }; // Yellow for Vendor
    default:
      return { backgroundColor: "#e5e7eb", color: "black" }; // Default background
  }
}

export default UserManagement;
