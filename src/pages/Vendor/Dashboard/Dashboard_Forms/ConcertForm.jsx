import React, { useCallback, useState } from "react";
import HourFormatter from "../../../../components/HourFormatter";
import { useAuth } from "../../../../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for the Snow theme
import { modules, editorStyles } from "../../../../components/ReactQuillUtils";
import axios from "axios";

const ConcertForm = () => {
  const { vendor } = useAuth();

  const [concert, setConcert] = useState({
    type: "concert",
    title: "",
    thumbnail: "",
    landscape: "",
    description: "",
    artist: "",
    genre: "",
    terms: "",
    venue: "",
    organizer: `${vendor?.business_name}`,
    city: "",
    date: "",
    time: "",
    doorTime: "",
    ageRestriction: "",
    language: "",
    ticketTypes: [{ type: "", price: "", quantity: "" }],
    totalSeats: "",
    availableShows: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [landscapePreview, setLandscapePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConcert({ ...concert, [name]: value });
  };

  // Add a separate handler for ReactQuill
  const handleQuillChange = (value, name) => {
    setConcert((prevConcert) => ({
      ...prevConcert,
      [name]: value,
    }));
  };

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    const file = files[0];

    setConcert((prevConcert) => ({
      ...prevConcert,
      [name]: file, // Dynamically set either thumbnail or landscape based on the input field's name
    }));

    // Create an object URL for the image preview
    const previewUrl = URL.createObjectURL(file);
    if (name === "thumbnail") {
      setThumbnailPreview(previewUrl);
    } else if (name === "landscape") {
      setLandscapePreview(previewUrl);
    }
  }, []);

  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = [...concert.ticketTypes];
    updatedTicketTypes[index][field] = value;
    setConcert({ ...concert, ticketTypes: updatedTicketTypes });
  };

  const addTicketType = () => {
    setConcert({
      ...concert,
      ticketTypes: [
        ...concert.ticketTypes,
        { type: "", price: "", quantity: "" },
      ],
    });
  };

  const removeTicketType = (index) => {
    const updatedTicketTypes = concert.ticketTypes.filter(
      (_, i) => i !== index
    );
    setConcert({ ...concert, ticketTypes: updatedTicketTypes });
  };

  const handleAddShow = useCallback(
    (e) => {
      e.preventDefault();
      if (concert.date && concert.time) {
        const time12Hour = HourFormatter(concert.time);

        setConcert((prevConcert) => ({
          ...prevConcert,
          availableShows: [
            ...prevConcert.availableShows,
            { date: concert.date, time: time12Hour },
          ],
          date: "",
          time: "",
        }));
      } else {
        setNotification("Please select a valid future date and time.");
        setTimeout(() => setNotification(""), 3000);
      }
    },
    [concert.date, concert.time]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDoorOpenTime = HourFormatter(concert.doorTime);
    const updatedConcertData = {
      ...concert,
      doorTime: formattedDoorOpenTime,
    };

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(updatedConcertData).forEach((key) => {
        if (key === "availableShows" || key === "ticketTypes") {
          // For arrays, stringify them
          formDataToSend.append(key, JSON.stringify(updatedConcertData[key]));
        } else if (
          typeof updatedConcertData[key] !== "object" &&
          updatedConcertData[key] !== null
        ) {
          formDataToSend.append(key, updatedConcertData[key]);
        }
      });

      // Append file fields
      if (concert.thumbnail)
        formDataToSend.append("thumbnail", concert.thumbnail);
      if (concert.landscape)
        formDataToSend.append("landscape", concert.landscape);

      // Log the FormData entries for debugging
      console.log("Form Data to Send:", Array.from(formDataToSend.entries()));

      const response = await axios.post(
        "/api/v1/concert/create-concert",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Concert created:", response.data);
      alert("Concert created successfully!");
      // Reset form or show success message
      setConcert((prevConcert) => ({
        ...prevConcert,
        title: "",
        thumbnail: "",
        landscape: "",
        description: "",
        artist: "",
        genre: "",
        terms: "",
        venue: "",
        city: "",
        date: "",
        time: "",
        doorTime: "",
        ageRestriction: "",
        ticketTypes: [{ type: "", price: "", quantity: "" }],
        totalSeats: "",
        availableShows: [],
      }));
      setThumbnailPreview(null);
      setLandscapePreview(null);
    } catch (error) {
      console.error(
        "Error creating concert: ",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to create concert: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 mx-auto my-5 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Add New Concert
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Concert Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Concert Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={concert.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter concert title"
            required
          />
        </div>

        {/* Thumbnail Image */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Thumbnail/Portrait Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
            required
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="object-cover h-48 mt-2 rounded-md"
            />
          )}
        </div>

        {/* Landscape Image */}
        <div>
          <label
            htmlFor="landscape"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Landscape Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="landscape"
            name="landscape"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
            required
          />
          {landscapePreview && (
            <img
              src={landscapePreview}
              alt="Landscape Preview"
              className="object-cover h-48 mt-2 rounded-md"
            />
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Concert Description <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            id="description"
            name="description"
            value={concert.description}
            onChange={(value) => handleQuillChange(value, "description")}
            modules={modules} // Add custom toolbar here
            style={
              (editorStyles.container,
              editorStyles.toolbar,
              editorStyles.toolbar)
            }
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter concert description"
            required
          />
        </div>
        {/* Terms and Conditions */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Terms and Conditions <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            id="terms"
            name="terms"
            value={concert.terms}
            onChange={(value) => handleQuillChange(value, "terms")}
            modules={modules} // Add custom toolbar here
            style={
              (editorStyles.container,
              editorStyles.toolbar,
              editorStyles.toolbar)
            }
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter concert's terms and conditions"
            required
          />
        </div>

        {/* Artist/Band Name */}
        <div>
          <label
            htmlFor="artist"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Artist/Band Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={concert.artist}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter artist/band name"
            required
          />
        </div>

        {/* Music Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Music Genre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={concert.genre}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter music genre"
            required
          />
        </div>
        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Music Language <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="language"
            name="language"
            value={concert.language}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter music language"
            required
          />
        </div>

        {/* Organizer */}
        <div>
          <label
            htmlFor="organizer"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Organizer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={concert.organizer}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter the name of organizer"
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label
            htmlFor="venue"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Venue <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={concert.venue}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter venue"
            required
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={concert.city}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter City"
            required
          />
        </div>

        {/* Total Seats */}
        <div>
          <label
            htmlFor="totalSeats"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Total Seats
          </label>
          <input
            type="text"
            id="totalSeats"
            name="totalSeats"
            value={concert.totalSeats}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter total seats"
          />
        </div>

        <div>
          <label
            htmlFor="doorTime"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Door Opening Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="doorTime"
            name="doorTime"
            value={concert.doorTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Age Restriction */}
        <div>
          <label
            htmlFor="ageRestriction"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Age Restriction <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ageRestriction"
            name="ageRestriction"
            value={concert.ageRestriction}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="e.g., 18+, All Ages"
            required
          />
        </div>
      </div>

      {/* Ticket Types */}
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-medium dark:text-white">
          Ticket Types <span className="text-red-500">*</span>
        </h3>
        {concert.ticketTypes.map((ticket, index) => (
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

      {/* Available Shows */}
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-medium dark:text-white">
          Available Shows <span className="text-red-500">*</span>
        </h3>
        <div className="flex mb-2 space-x-2">
          <input
            type="date"
            name="date"
            value={concert.date}
            onChange={handleInputChange}
            className="flex-1 p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
          />
          <input
            type="time"
            name="time"
            value={concert.time}
            onChange={handleInputChange}
            className="flex-1 p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={handleAddShow}
            className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-green-500 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Add Show
          </button>
        </div>
        {notification && (
          <div className="p-2 mb-4 italic text-white bg-red-500 rounded-md">
            {notification}
          </div>
        )}
        {concert.availableShows.length > 0 && (
          <ul className="mt-2 space-y-2">
            {concert.availableShows.map((show, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md dark:bg-gray-700"
              >
                {show.date} at {show.time}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 text-sm font-medium text-white transition-all duration-200 bg-teal-500 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Concert"}
      </button>
    </form>
  );
};

export default ConcertForm;
