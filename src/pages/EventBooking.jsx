import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/esewa_logo.png";

const EventBooking = ({ event }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id;

  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    ticketType: event.ticketTypes[0]?.type || "",
    quantity: 1,
    name: `${user?.username}`,
    email: `${user?.email}`,
    phone: `${user?.phoneNumber}`,
    paymentMethod: "",
  });

  // Find the selected ticket type object
  const selectedTicketType = event.ticketTypes.find(
    (ticket) => ticket.type === bookingDetails.ticketType
  );

  // Calculate total amount
  const totalAmount = selectedTicketType
    ? parseInt(selectedTicketType.price) * bookingDetails.quantity
    : 0;

  // Get maximum available quantity for selected ticket type
  const maxAvailableTickets = selectedTicketType?.quantity || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
      // Reset quantity if changing ticket type
      ...(name === "ticketType" && { quantity: 1 }),
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setBookingDetails((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/payment/initiate-event-payment",
        {
          ticketType: bookingDetails.ticketType,
          ticketQuantity: bookingDetails.quantity,
          event: event?._id,
          user: userId,
          itemId: uuidv4(),
          totalPrice: totalAmount.toString(),
        },
        {
          withCredentials: true,
        }
      );
      // Redirect to eSewa payment page
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const isPaymentRequired = totalAmount > 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div
            className={`flex-1 text-center ${
              step >= 1 ? "text-teal-600" : "text-gray-400"
            }`}
          >
            <div className="mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-current rounded-full">
                1
              </span>
            </div>
            <span className="text-sm">Details</span>
          </div>
          {isPaymentRequired && (
            <div
              className={`flex-1 text-center ${
                step >= 2 ? "text-teal-600" : "text-gray-400"
              }`}
            >
              <div className="mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-current rounded-full">
                  2
                </span>
              </div>
              <span className="text-sm">Payment</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">Booking Details</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Ticket Type
                </label>
                <select
                  name="ticketType"
                  value={bookingDetails.ticketType}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:border-teal-500 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Ticket Type</option>
                  {event.ticketTypes.map((ticket, index) => (
                    <option key={index} value={ticket.type}>
                      {ticket.type} - Rs. {ticket.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Number of Tickets
                </label>
                <select
                  name="quantity"
                  value={bookingDetails.quantity}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:border-teal-500 focus:ring-teal-500"
                  required
                >
                  {[...Array(Math.min(maxAvailableTickets, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  {maxAvailableTickets} tickets available
                </p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  disabled
                  required
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  disabled
                  required
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div className="p-4 rounded-lg md:col-span-2 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Selected Ticket</span>
                  <span className="font-medium">
                    {selectedTicketType?.type || "None selected"}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per Ticket</span>
                  <span className="font-medium">
                    Rs. {selectedTicketType?.price || 0}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">{bookingDetails.quantity}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold border-t">
                  <span>Total Amount</span>
                  <span>Rs. {totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <button
                type="button"
                onClick={() => {
                  isPaymentRequired
                    ? setStep(2)
                    : handleSubmit(new Event("submit"));
                  window.scrollTo(0, 0);
                }}
                className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  !bookingDetails.ticketType
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                }`}
                disabled={!bookingDetails.ticketType}
              >
                {isPaymentRequired ? "Continue to Payment" : "Complete Booking"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full px-4 py-2 text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {step === 2 && isPaymentRequired && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">Payment Method</h2>

            <div className="space-y-4">
              <label
                className={`relative flex p-4 bg-white border rounded-lg shadow-sm cursor-pointer focus:outline-none ${
                  bookingDetails.paymentMethod === "wallet"
                    ? "border-teal-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  className="sr-only"
                  onChange={handlePaymentMethodChange}
                />
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <img src={logo} alt="" className="mr-3 h-7 w-7" />
                    <span className="text-sm font-medium text-gray-900">
                      eSewa
                    </span>
                  </div>
                  {bookingDetails.paymentMethod === "wallet" && (
                    <span className="text-sm font-semibold text-teal-600">
                      Selected
                    </span>
                  )}
                </div>
              </label>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Ticket Type</span>
                  <span className="font-medium">
                    {selectedTicketType?.type || "None selected"}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per Ticket</span>
                  <span className="font-medium">
                    Rs. {selectedTicketType?.price || 0}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">{bookingDetails.quantity}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold border-t">
                  <span>Total Amount</span>
                  <span>Rs. {totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  !bookingDetails.paymentMethod
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                }`}
                disabled={!bookingDetails.paymentMethod}
              >
                Complete Payment
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EventBooking;
