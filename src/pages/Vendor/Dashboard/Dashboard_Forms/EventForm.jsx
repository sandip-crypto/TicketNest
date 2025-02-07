import React, { useCallback, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for the Snow theme
import { modules, editorStyles } from "../../../../components/ReactQuillUtils";
import convertTo12HourFormat from "../../../../components/HourFormatter";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const EventForm = () => {
  const { vendor } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    terms: "",
    startDate: "",
    endDate: "",
    city: "",
    address: "",
    category: "Conference",
    language: "Nepali",
    organizer: `${vendor?.business_name}`,
    portraitImage: null,
    landscapeImage: null,
    ticketPrice: "",
    ticketQuantity: "",
    status: "Scheduled",
    audience: "",
    startTime: "",
    endTime: "",
    speakers: "",
    sponsorships: "",
    maxAttendees: "",
    ageRestriction: "",
    refundPolicy: "",
    accessibilityOptions: [],
    ticketTypes: [{ type: "", price: "", quantity: "" }],
    virtualEventLink: "",
    previousEventLink: "",
    faq: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [landscapePreview, setLandscapePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = [...formData.ticketTypes];
    updatedTicketTypes[index][field] = value;
    setFormData({ ...formData, ticketTypes: updatedTicketTypes });
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticketTypes: [
        ...formData.ticketTypes,
        { type: "", price: "", quantity: "" },
      ],
    });
  };

  const removeTicketType = (index) => {
    const updatedTicketTypes = formData.ticketTypes.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, ticketTypes: updatedTicketTypes });
  };

  // Add a separate handler for ReactQuill
  const handleQuillChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prevData) => ({
      ...prevData,
      [name]: file, // Dynamically set either thumbnail or landscape based on the input field's name
    }));

    // Create an object URL for the image preview
    const previewUrl = URL.createObjectURL(file);
    if (name === "portraitImage") {
      setThumbnailPreview(previewUrl);
    } else if (name === "landscapeImage") {
      setLandscapePreview(previewUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartTime = convertTo12HourFormat(formData.startTime);
    const formattedEndTime = convertTo12HourFormat(formData.endTime);

    const updatedFormData = {
      ...formData,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      speakers: formData.speakers.split(",").map((speaker) => speaker.trim()),
      termsAndConditions: formData.termsAndConditions,
    };

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(updatedFormData).forEach((key) => {
        if (
          typeof updatedFormData[key] === "object" &&
          updatedFormData[key] !== null &&
          !(updatedFormData[key] instanceof File)
        ) {
          formDataToSend.append(key, JSON.stringify(updatedFormData[key]));
        } else if (
          updatedFormData[key] !== null &&
          !(updatedFormData[key] instanceof File)
        ) {
          formDataToSend.append(key, updatedFormData[key]);
        }
      });

      // Append file fields
      if (formData.portraitImage)
        formDataToSend.append("portraitImage", formData.portraitImage);
      if (formData.landscapeImage)
        formDataToSend.append("landscapeImage", formData.landscapeImage);

      // Log the FormData entries for debugging
      console.log("Form Data to Send:", Array.from(formDataToSend.entries()));

      const response = await axios.post(
        "/api/v1/event/create-event",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Event created:", response.data);
      alert("Event created successfully!");
      // Reset form or show success message
      setFormData((formData) => formData);
      setThumbnailPreview(null);
      setLandscapePreview(null);
      location.reload();
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to create event: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };
  const eventCategory = [
    "Conference",
    "Seminar",
    "Workshop",
    "Webinar",
    "Product Launch",
    "Networking Event",
    "Comedy Show",
    "Festival",
    "Trade Show",
    "Fundraiser",
    "Exhibition",
    "Charity Run",
  ];

  return (
    <div className="max-w-2xl min-h-screen py-8 mx-auto transition-colors duration-500 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl p-6 mx-auto transition-colors duration-500 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          Create an Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="title"
            >
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the event title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              required
            />
          </div>

          {/* Event Description */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="description"
            >
              Event Description <span className="text-red-500">*</span>
            </label>

            <ReactQuill
              id="description"
              name="description"
              value={formData.description}
              onChange={(value) => handleQuillChange(value, "description")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              placeholder="Enter the event description."
              required
            />
          </div>

          {/* Event Terms & Conditions */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="terms&conditions"
            >
              Event Terms & Conditions <span className="text-red-500">*</span>
            </label>

            <ReactQuill
              id="terms"
              name="terms"
              value={formData.terms}
              onChange={(value) => handleQuillChange(value, "terms")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              placeholder="Please mention Terms and Conditions for your events here."
              required
            />
          </div>

          {/* Event Language */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="language"
            >
              Event Language <span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Nepali">Nepali</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="date"
            >
              Event Date (Mention Start and End Date){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 space-x-2">
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 cursor-pointer mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mt-2 cursor-pointer text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />
            </div>
          </div>

          {/* Event time */}
          <div className="grid grid-cols-2 space-x-2">
            <div>
              <label
                className="block font-medium text-gray-800 dark:text-white"
                htmlFor="startTime"
              >
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />
            </div>

            <div>
              <label
                className="block font-medium text-gray-800 dark:text-white"
                htmlFor="endTime"
              >
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />
            </div>
          </div>

          {/* Event Venue */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="location"
            >
              Event Venue <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                placeholder="City name"
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />

              <input
                id="address"
                name="address"
                type="text"
                placeholder="Street Address, Building Name or Nearby Landmark"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                required
              />
            </div>
          </div>

          {/* Event Category */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="category"
            >
              Event Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              {eventCategory.map((event, index) => (
                <option key={index} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          {/* Event Organizer */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="organizer"
            >
              Event Organizer <span className="text-red-500">*</span>
            </label>
            <input
              id="organizer"
              name="organizer"
              type="text"
              value={formData.organizer}
              onChange={handleInputChange}
              placeholder="Enter the name of organizer"
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              required
            />
          </div>

          {/* Event Image  */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="portraitImage"
            >
              Event Image(thumbnail)/Portrait Image{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="portraitImage"
              name="portraitImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                setFormData((prev) => ({
                  ...prev,
                  portraitImage: e.target.files[0],
                }));
              }}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            {thumbnailPreview && (
              <div className="mt-2">
                <img
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Thumbnail Preview"
                  className="object-cover h-48 rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="landscapeImage"
            >
              Event Image/Landscape Image{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="landscapeImage"
              name="landscapeImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                setFormData((prev) => ({
                  ...prev,
                  landscapeImage: e.target.files[0],
                }));
              }}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            {landscapePreview && (
              <div className="mt-2">
                <img
                  src={landscapePreview || "/placeholder.svg"}
                  alt="Landscape Preview"
                  className="object-cover h-48 rounded-md"
                />
              </div>
            )}
          </div>

          {/* Ticket Types */}
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-medium dark:text-white">
              Ticket Types <span className="text-red-500">*</span>
            </h3>
            {formData.ticketTypes.map((ticket, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 md:gap-6"
              >
                <input
                  type="text"
                  placeholder="e.g., VIP, General"
                  value={ticket.type}
                  onChange={(e) =>
                    handleTicketTypeChange(index, "type", e.target.value)
                  }
                  className="p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Price (e.g, 100 or Free)"
                  value={ticket.price}
                  onChange={(e) =>
                    handleTicketTypeChange(index, "price", e.target.value)
                  }
                  className="p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                  required
                  min="0"
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g., 100 or unlimited)"
                  value={ticket.quantity}
                  onChange={(e) =>
                    handleTicketTypeChange(index, "quantity", e.target.value)
                  }
                  className="p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeTicketType(index)}
                  className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTicketType}
              className="px-4 py-2 mt-2 text-sm font-medium text-white transition-all duration-200 bg-green-500 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Add Ticket Type
            </button>
          </div>

          {/* Event Status */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="status"
            >
              Event Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>

          {/* Event Audience */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="audience"
            >
              Event Audience <span className="text-red-500">*</span>
            </label>

            <ReactQuill
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={(value) => handleQuillChange(value, "audience")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              placeholder="Describe the target audience for this event."
              required
            />
          </div>

          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="speakers"
            >
              Speakers (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              id="speakers"
              name="speakers"
              type="text"
              value={formData.speakers}
              onChange={handleInputChange}
              placeholder="Enter speaker names separated by commas"
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="sponsorships"
            >
              Sponsorship Opportunities
            </label>

            <ReactQuill
              id="sponsorships"
              name="sponsorships"
              value={formData.sponsorships}
              onChange={(value) => handleQuillChange(value, "sponsorships")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              placeholder="Please provide detailed information about your (custom) sponsorship package."
            />
          </div>

          {/* Maximum Attendees */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="maxAttendees"
            >
              Maximum Attendees <span className="text-red-500">*</span>
            </label>
            <input
              id="maxAttendees"
              name="maxAttendees"
              type="text"
              placeholder="e.g., 100 or Unlimited"
              value={formData.maxAttendees}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Age Restriction */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="ageRestriction"
            >
              Age Restriction <span className="text-red-500">*</span>
            </label>
            <input
              id="ageRestriction"
              name="ageRestriction"
              type="text"
              value={formData.ageRestriction}
              onChange={handleInputChange}
              placeholder="e.g., 18+, All Ages, etc."
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Refund Policy */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="refundPolicy"
            >
              Refund Policy <span className="text-red-500">*</span>
            </label>

            <ReactQuill
              id="refundPolicy"
              name="refundPolicy"
              placeholder="Enter the refund policy"
              value={formData.refundPolicy}
              onChange={(value) => handleQuillChange(value, "refundPolicy")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              required
            />
          </div>

          {/* Accessibility Options */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-white">
              Accessibility Options
            </label>
            <div className="mt-2 space-y-2">
              {[
                "Wheelchair Access",
                "Sign Language Interpreter",
                "Assistive Listening Devices",
              ].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={option}
                    name="accessibilityOptions"
                    type="checkbox"
                    value={option}
                    checked={formData.accessibilityOptions.includes(option)}
                    onChange={(e) => {
                      const updatedOptions = e.target.checked
                        ? [...formData.accessibilityOptions, option]
                        : formData.accessibilityOptions.filter(
                            (item) => item !== option
                          );
                      setFormData({
                        ...formData,
                        accessibilityOptions: updatedOptions,
                      });
                    }}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label
                    htmlFor={option}
                    className="block ml-2 text-sm text-gray-900 dark:text-white"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Virtual Event Link */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="virtualEventLink"
            >
              Virtual Event Link (if applicable)
            </label>
            <input
              id="virtualEventLink"
              name="virtualEventLink"
              type="url"
              value={formData.virtualEventLink}
              onChange={handleInputChange}
              placeholder="https://..."
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Demo or any Previous Event Link */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="previousEventLink"
            >
              Any Demo/Previous Event Link (if available)
            </label>
            <input
              id="previousEventLink"
              name="previousEventLink"
              type="url"
              value={formData.previousEventLink}
              onChange={handleInputChange}
              placeholder="https://..."
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* FAQ */}
          <div>
            <label
              className="block font-medium text-gray-800 dark:text-white"
              htmlFor="faq"
            >
              Frequently Asked Questions
            </label>

            <ReactQuill
              id="faq"
              name="faq"
              value={formData.faq}
              onChange={(value) => handleQuillChange(value, "faq")}
              modules={modules} // Add custom toolbar here
              style={
                (editorStyles.container,
                editorStyles.toolbar,
                editorStyles.toolbar)
              }
              className={`w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              placeholder="Enter FAQs in a Q&A format."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white transition-all duration-300 bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
