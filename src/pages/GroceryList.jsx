import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const categories = [
  { id: "all", name: "All" },
  { id: "beverages", name: "Beverages" },
  { id: "popcorn", name: "PopCorn" },
  { id: "snacks", name: "Snacks" },
  { id: "extra", name: "Extra" },
  { id: "meal", name: "Meal" },
  { id: "icecream", name: "Ice Cream" },
];

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();

  useEffect(() => {
    fetchGroceries();
  }, [selectedCategory]);

  const fetchGroceries = async () => {
    try {
      const url =
        selectedCategory === "all"
          ? "/api/v1/grocery/all-groceries"
          : `/api/v1/grocery/category/${selectedCategory}`;

      const response = await axios.get(url);
      setGroceries(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch items");
      setLoading(false);
    }
  };

  const filteredGroceries = groceries.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
        {error}
      </div>
    );

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Food & Beverages</h1>
            <Link
              to="/ticketnest/checkout"
              className="px-6 py-2 text-white transition-colors bg-teal-500 rounded-full hover:bg-teal-600"
            >
              Skip to checkout →
            </Link>
          </div>

          {/* Search and Categories */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for foods and beverages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-black border border-teal-500 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <svg
                className="absolute right-4 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex pb-2 space-x-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-teal-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Items */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGroceries.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden transition-transform bg-gray-800 rounded-lg shadow-lg hover:scale-105"
              >
                <img
                  src={`${API_URL}/${item.image}`}
                  alt={item.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mb-4 text-gray-400">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-500">
                      NPR {item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 text-white transition-colors bg-teal-500 rounded-full hover:bg-teal-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          {cart.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700 md:w-96 md:right-auto">
              <h2 className="mb-4 text-xl font-bold text-white">
                My F&B Order
              </h2>
              <div className="mb-4 space-y-4 overflow-y-auto max-h-96">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        loading="lazy"
                        src={`${API_URL}/${item.image}`}
                        alt={item.name}
                        className="object-cover w-12 h-12 rounded"
                      />
                      <div>
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <p className="text-teal-500">
                          NPR {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-500"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between mb-4 text-white">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">NPR {total.toFixed(2)}</span>
                </div>
                <Link
                  to="/ticketnest/checkout"
                  className="block w-full py-3 font-bold text-center text-white transition-colors bg-teal-500 rounded-full hover:bg-teal-600"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GroceryList;
