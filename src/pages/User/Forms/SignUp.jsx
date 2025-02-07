import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, Eye, EyeOff } from "lucide-react";
import backgroundImage from "../../../assets/images/bg_signin.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import Layout from "../../../components/layout/Layout";
// import { useAuth } from "../../../context/AuthContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  // const { user } = useAuth();

  // if (user) {
  //   window.location.href = "/ticketnest/explore/home";
  // }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation to check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    setIsLoading(true);

    // Handle the phone number in the form data (which includes the country code)
    const dataToSubmit = {
      ...formData,
      phoneNumber: formData.phone, // Phone is already in the international format (e.g., +1 555 123 4567)
    };

    console.log("Form submitted:", dataToSubmit);

    try {
      const response = await axios.post(
        "/api/v1/auth/user/register",
        dataToSubmit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data.success) {
        console.log("User Registered Successfully", response.data);

        navigate("/ticketnest/user/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
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
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
              {/* Username */}
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="sr-only">
                  Mobile Number
                </label>
                <PhoneInput
                  international
                  defaultCountry="NP"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, phone: value }))
                  }
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile Number"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  max={new Date().toISOString().split("T")[0]} // Ensure the date cannot be in the future
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 z-20 flex items-center px-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 z-20 flex items-center px-2"
                >
                  {showConfirmPassword ? (
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
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-teal-600 border border-transparent rounded-md group hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-base"
              >
                {isLoading ? (
                  <>
                    Signing up...
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
                  "Sign up"
                )}
              </button>
            </div>
          </form>
          <p className="mt-2 text-sm text-center text-gray-300 sm:text-base">
            Already have an account?{" "}
            <Link
              to="/ticketnest/user/sign-in"
              className="font-medium text-teal-400 hover:text-teal-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
