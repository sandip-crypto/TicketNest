import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/v1/auth/auth-check", {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        if (res.data.user) {
          setUser(res.data.user); // Set user data if authenticated
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // If there's an error, reset user state
      } finally {
        setIsPending(false); // Update pending state after fetching
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const checkVendor = async () => {
      try {
        const res = await axios.get("/api/v1/auth/vendor-check", {
          withCredentials: true,
        });

        if (res.data.vendor) {
          setVendor(res.data.vendor);
        } else {
          setVendor(null);
        }
      } catch (error) {
        console.error("Error fetching vendor", error);
        setVendor(null);
      } finally {
        setIsPending(false); // Update pending state after fetching
      }
    };
    checkVendor();
  }, []);

  // Handle logout
  const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear user data from state
      setVendor(null); // Clear vendor data from state
      // Optionally redirect to login page (e.g., using react-router)
      window.location.href = "/ticketnest/explore/home"; // Or use `history.push('/login')` if using react-router
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isPending) {
    return <></>; // Show a loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, vendor, isPending, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
