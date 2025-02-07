import React, { useState } from "react";
import axios from "axios";

const AddGrocery = () => {
  const [grocery, setGrocery] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrocery((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setGrocery((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (
      !grocery.name ||
      !grocery.price ||
      !grocery.description ||
      !grocery.category ||
      !grocery.image
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      for (const key in grocery) {
        formData.append(key, grocery[key]);
      }

      const response = await axios.post(
        "/api/v1/grocery/create-grocery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response && response.data) {
        setSuccessMessage("Grocery item added successfully!");
        setGrocery({
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add grocery item"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 mx-auto my-5 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Add Grocery Item
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={grocery.name}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={grocery.price}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={grocery.description}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      ></textarea>

      <select
        name="category"
        value={grocery.category}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-md cursor-pointer dark:bg-gray-700 dark:text-white"
        required
      >
        <option value="">Select Category</option>
        <option value="Snacks">Snacks</option>
        <option value="Beverages">Beverages</option>
        <option value="Candy">Candy</option>
        <option value="Popcorn">Popcorn</option>
      </select>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="image"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Item Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-sm text-green-500 bg-green-100 border border-green-200 rounded-md">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 font-medium text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-green-600"
      >
        {isSubmitting ? "Adding Item..." : "Add Grocery Item"}
      </button>
    </form>
  );
};

export default AddGrocery;
