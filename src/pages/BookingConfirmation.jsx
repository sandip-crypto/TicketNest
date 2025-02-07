import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas"; // Import html2canvas

const BookingConfirmation = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `/api/v1/booking/get-booking/${bookingId}`,
          {
            withCredentials: true,
          }
        );
        setBooking(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch booking details");
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const downloadImage = () => {
    const element = document.getElementById("html-content");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "booking-confirmation.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
    <div id="html-content" className="container max-w-2xl px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Booking Confirmation
        </h1>

        <div className="space-y-4">
          <div className="p-4 border border-green-200 rounded-md bg-green-50">
            <p className="text-green-700">Booking Status: {booking.status}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{booking.movie.title}</h2>
            <p>Vendor: {booking.vendor.business_name}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Seats: {booking.seats.join(", ")}</p>
            <p className="text-lg font-semibold">
              Total Price: ${booking.totalPrice}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t">
            <p className="mb-2 text-sm text-gray-600">
              Please arrive at least 15 minutes before the show time. Show this
              confirmation page at the counter.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="px-6 py-2 text-white transition-all duration-200 bg-teal-500 rounded-md hover:bg-teal-600"
          >
            Back to Home
          </Link>
          <button
            onClick={downloadImage}
            className="px-6 py-2 ml-4 text-white transition-all duration-200 bg-teal-500 rounded-md hover:bg-teal-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
