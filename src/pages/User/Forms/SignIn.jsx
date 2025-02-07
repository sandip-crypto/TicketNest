import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Eye, EyeOff } from "lucide-react";
import backgroundImage from "../../../assets/images/bg_signin.png";
import axios from "axios";
import Layout from "./../../../components/layout/Layout";
import { useAuth } from "../../../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  if (user) {
    window.location.href = "/ticketnest/explore/home";
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/v1/auth/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response && response.data.success) {
        const role = response.data.user.role.toLowerCase();
        console.log(`User Role: ${role}`);

        if (role === "admin") {
          console.log("Redirecting to admin dashboard...");
          window.location.href = "/ticketnest/admin/dashboard";
        } else {
          console.log("Redirecting to user dashboard...");
          window.location.href = "/ticketnest/user/dashboard";
        }
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center bg-[#1a2e29] bg-opacity-90 bg-cover bg-center bg-blend-overlay"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="w-full max-w-md p-6 space-y-8 bg-white shadow-lg sm:p-10 bg-opacity-10 backdrop-blur-lg rounded-xl">
          <div className="text-center">
            <Link
              to="/ticketnest/explore/home"
              className="flex items-center justify-center gap-2"
            >
              <Ticket className="w-10 h-10 text-teal-400" />
              <span className="text-3xl font-bold text-white">
                Ticket<span className="text-teal-400">Nest</span>
              </span>
            </Link>
            <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Sign in to your account
            </h2>
          </div>

          {error && (
            <div
              className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 py-2 -space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 z-20 flex items-center px-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    Signing in...
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
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-sm text-center text-gray-300 ">
            Don't have an account?{" "}
            <Link
              to="/ticketnest/user/sign-up"
              className="font-medium text-teal-400 hover:text-teal-500"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-center text-gray-300 ">
            Want to become a vendor?{" "}
            <Link
              to="/ticketnest/vendor/sign-up"
              className="italic text-teal-500 hover:underline"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
