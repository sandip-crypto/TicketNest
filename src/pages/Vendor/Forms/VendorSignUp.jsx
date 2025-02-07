import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import backgroundImage from "../../../assets/images/bg_signin.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const VendorSignUp = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();

  const { vendor } = useAuth();

  if (vendor) {
    window.location.href = "/ticketnest/explore/home";
  }

  const handleNavigation = (route) => {
    // Scroll to the top
    window.scrollTo(0, 0);
    // Navigate to the specified route
    navigate(route);
  };

  const [formData, setFormData] = useState({
    business_name: "",
    owner_name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: "",
    profilePic: null,
    address: "",
    business_type: "",
    city: "",
    state: "",
    country: "Nepal",
    postal_code: "",
    business_website: "",
    pan_no: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation on change
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email format");
      } else {
        setEmailError(""); // Clear the error if the email is valid
      }
    }

    // Password validation on change
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 6 characters long, contain at least one number, one letter, and one uppercase letter."
        );
      } else {
        setPasswordError(""); // Clear the error if the password is valid
      }
    }

    // Confirm password validation on change
    if (name === "confirm_password") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError(""); // Clear the error if passwords match
      }
    }

    // Update the formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submission
    if (emailError || passwordError || confirmPasswordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Remove confirm_password from data before sending it
    const { confirm_password, ...dataToSend } = formData;

    const data = new FormData();
    for (const key in dataToSend) {
      data.append(key, dataToSend[key]);
    }

    try {
      const response = await axios.post("/api/v1/auth/vendor/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response && response.data.success) {
        window.location.href = "/ticketnest/vendor/sign-in";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const renderBasicInformation = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Basic Information</h3>

      <div>
        <label
          htmlFor="business_name"
          className="block text-sm font-medium text-gray-200"
        >
          Business Name <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="business_name"
          name="business_name"
          value={formData.business_name}
          onChange={handleChange}
          required
          placeholder="Enter your business name"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label
          htmlFor="owner_name"
          className="block text-sm font-medium text-gray-200"
        >
          Owner's Name <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="owner_name"
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          required
          placeholder="Enter owner's name"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          Email <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
        <p className="italic text-red-500">{emailError}</p>
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-200"
        >
          Contact <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Enter your contact number"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-200"
        >
          Address <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Enter your address"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-200"
        >
          Password <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
        <p className="italic text-red-500">{passwordError}</p>
        <button
          type="button"
          onClick={() => togglePasswordVisibility("password")}
          className="absolute text-gray-400 right-3 top-8"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <label
          htmlFor="confirm_password"
          className="block text-sm font-medium text-gray-200"
        >
          Confirm Password <span className="font-bold text-red-500">*</span>
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirm_password}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
        <p className="italic text-red-500">{confirmPasswordError}</p>
        <button
          type="button"
          onClick={() => togglePasswordVisibility("confirm_password")}
          className="absolute text-gray-400 right-3 top-8"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div>
        <label
          htmlFor="profilePic"
          className="block text-sm font-medium text-gray-200"
        >
          Upload your Profile Picture
        </label>
        <input
          id="profilePic"
          name="profilePic"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full px-3 py-2 mt-1 text-white placeholder-gray-400 border border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />

        {preview && (
          <div className="mt-2">
            <img
              src={preview || "/placeholder.svg"}
              alt="Thumbnail Preview"
              className="object-cover h-48 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Business Details</h3>
      <div>
        <label
          htmlFor="business_type"
          className="block text-sm font-medium text-gray-200"
        >
          Business Type
        </label>
        <input
          id="business_type"
          name="business_type"
          value={formData.business_type}
          onChange={handleChange}
          required
          placeholder="Enter your business type"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-200"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-200"
          >
            State
          </label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            placeholder="Enter your state"
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="postal_code"
            className="block text-sm font-medium text-gray-200"
          >
            Postal Code
          </label>
          <input
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            placeholder="Enter your postal code"
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-200"
          >
            Country
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            readOnly
            placeholder="Your Country"
            className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="business_website"
          className="block text-sm font-medium text-gray-200"
        >
          Business Website (Optional)
        </label>
        <input
          id="business_website"
          name="business_website"
          value={formData.business_website}
          onChange={handleChange}
          placeholder="Enter your business website"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );

  const renderVerificationDocuments = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">
        Verification Documents
      </h3>
      <div>
        <label
          htmlFor="pan_no"
          className="block text-sm font-medium text-gray-200"
        >
          PAN (Permanent Account Number)
        </label>
        <input
          id="pan_no"
          name="pan_no"
          value={formData.pan_no}
          onChange={handleChange}
          required
          placeholder="Enter your PAN number"
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-[#1a2e29] bg-opacity-90 bg-cover bg-center bg-blend-overlay p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="w-full max-w-2xl p-6 space-y-8 bg-white shadow-lg sm:p-10 bg-opacity-10 backdrop-blur-lg rounded-xl">
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
              Vendor Registration
            </h2>
            <p className="mt-2 text-sm text-gray-300 sm:text-base">
              Complete the form below to register as a vendor.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  step >= i ? "bg-teal-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && renderBasicInformation()}
            {step === 2 && renderBusinessDetails()}
            {step === 3 && renderVerificationDocuments()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-teal-400 transition-colors bg-transparent border border-teal-400 rounded hover:bg-teal-400 hover:text-white"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 ml-auto text-white transition-colors bg-teal-400 rounded hover:bg-teal-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 ml-auto text-white transition-colors bg-teal-400 rounded hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>

          <p className="mt-2 text-sm text-center text-gray-300 sm:text-base">
            Already have an account?{" "}
            <button
              className="font-medium text-teal-400 hover:text-teal-500"
              onClick={() => handleNavigation("/ticketnest/vendor/sign-in")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default VendorSignUp;
