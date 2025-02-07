import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/layout/Layout";
import { MdEventSeat } from "react-icons/md";

const LOCK_DURATION = 60000; // 1 minute in milliseconds
const BOOKED_SEATS_STORAGE_KEY = "ticketnest_booked_seats";

const TicketBooking = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [lockedSeats, setLockedSeats] = useState(new Map());
  const [bookedSeats, setBookedSeats] = useState(new Map());
  const [bookingTimer, setBookingTimer] = useState(null);
  const { movieId, vendorId } = useParams();
  const navigate = useNavigate();

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/v1/movie/${movieId}/vendor/${vendorId}`,
        { withCredentials: true }
      );
      if (!response.data) throw new Error("No data received");
      setMovieDetails(response.data);
      initializeBookedSeats(response.data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError(err.response?.data?.message || "Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  }, [movieId, vendorId]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const initializeBookedSeats = (data) => {
    const storedBookedSeats =
      JSON.parse(localStorage.getItem(BOOKED_SEATS_STORAGE_KEY)) || {};
    const initialBookedSeats = new Map(Object.entries(storedBookedSeats));

    data.layoutConfig.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.seats.forEach((seat) => {
          if (seat.isBooked) {
            const key = `${seat.bookedDate}-${seat.bookedTime}`;
            if (!initialBookedSeats.has(key)) {
              initialBookedSeats.set(key, new Set());
            }
            initialBookedSeats.get(key).add(seat.id);
          }
        });
      });
    });

    setBookedSeats(initialBookedSeats);
    saveBookedSeatsToLocalStorage(initialBookedSeats);
  };

  const saveBookedSeatsToLocalStorage = (bookedSeatsMap) => {
    const bookedSeatsObject = Object.fromEntries(
      Array.from(bookedSeatsMap.entries()).map(([key, value]) => [
        key,
        Array.from(value),
      ])
    );
    localStorage.setItem(
      BOOKED_SEATS_STORAGE_KEY,
      JSON.stringify(bookedSeatsObject)
    );
  };

  useEffect(() => {
    if (movieDetails && selectedSeats.length > 0) {
      const price = selectedSeats.reduce((total, seatId) => {
        const section = movieDetails.layoutConfig.sections.find((section) =>
          section.rows.some((row) =>
            row.seats.some((seat) => seat.id === seatId)
          )
        );
        const seat = section?.rows
          .flatMap((row) => row.seats)
          .find((seat) => seat.id === seatId);
        return total + (seat?.price || 0);
      }, 0);
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [selectedSeats, movieDetails]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime("");
    setSelectedSeats([]);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    setSelectedSeats([]);
  };

  const getDateTimeKey = useCallback(() => {
    return `${selectedDate}-${selectedTime}`;
  }, [selectedDate, selectedTime]);

  const isSeatLocked = useCallback(
    (seatId) => {
      const key = `${getDateTimeKey()}-${seatId}`;
      const lockExpiration = lockedSeats.get(key);
      return lockExpiration && Date.now() < lockExpiration;
    },
    [getDateTimeKey, lockedSeats]
  );

  const isSeatBooked = useCallback(
    (seatId) => {
      const dateTimeKey = getDateTimeKey();
      const bookedSeatsForDateTime = bookedSeats.get(dateTimeKey);
      return bookedSeatsForDateTime
        ? bookedSeatsForDateTime.has(seatId)
        : false;
    },
    [getDateTimeKey, bookedSeats]
  );

  const isSeatAvailable = useCallback(
    (seatId) => {
      const dateTimeKey = getDateTimeKey();
      const bookedSeatsForDateTime = bookedSeats.get(dateTimeKey);
      if (bookedSeatsForDateTime && bookedSeatsForDateTime.has(seatId)) {
        const showDateTime = new Date(`${selectedDate}T${selectedTime}`);
        const currentTime = new Date();
        const timeDifference = showDateTime.getTime() - currentTime.getTime();
        const minutesDifference = timeDifference / (1000 * 60);
        return minutesDifference <= 30 && minutesDifference > 0;
      }
      return true;
    },
    [getDateTimeKey, bookedSeats, selectedDate, selectedTime]
  );

  const handleSeatSelection = (seat) => {
    if (isSeatBooked(seat.id) || !isSeatAvailable(seat.id)) return;
    if (isSeatLocked(seat.id)) return;

    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat.id)
        ? prevSeats.filter((s) => s !== seat.id)
        : [...prevSeats, seat.id]
    );
  };

  const lockSeats = (seatIds) => {
    const expirationTime = Date.now() + LOCK_DURATION;
    const dateTimeKey = getDateTimeKey();

    setLockedSeats((prevLocks) => {
      const newLocks = new Map(prevLocks);
      seatIds.forEach((seatId) => {
        const key = `${dateTimeKey}-${seatId}`;
        newLocks.set(key, expirationTime);
      });
      return newLocks;
    });
  };

  const releaseLockedSeats = useCallback(
    (seatIds) => {
      const dateTimeKey = getDateTimeKey();
      setLockedSeats((prevLocks) => {
        const newLocks = new Map(prevLocks);
        seatIds.forEach((seatId) => {
          newLocks.delete(`${dateTimeKey}-${seatId}`);
        });
        return newLocks;
      });
    },
    [getDateTimeKey]
  );

  const handleBooking = async () => {
    try {
      setIsBooking(true);
      lockSeats(selectedSeats);

      let timeRemaining = 60;
      const timer = setInterval(() => {
        timeRemaining -= 1;
        setBookingTimer(timeRemaining);
        if (timeRemaining <= 0) {
          clearInterval(timer);
          releaseLockedSeats(selectedSeats);
          setBookingTimer(null);
          setIsBooking(false);
        }
      }, 1000);

      const bookingData = {
        movieId,
        vendorId,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        totalPrice,
      };

      const response = await axios.post(
        `/api/v1/booking/create-booking`,
        bookingData,
        { withCredentials: true }
      );

      if (response.data && response.data.booking) {
        clearInterval(timer);
        setBookingTimer(null);

        const dateTimeKey = getDateTimeKey();
        setBookedSeats((prev) => {
          const newBookedSeats = new Map(prev);
          if (!newBookedSeats.has(dateTimeKey)) {
            newBookedSeats.set(dateTimeKey, new Set());
          }
          const dateTimeSeats = newBookedSeats.get(dateTimeKey);
          selectedSeats.forEach((seatId) => {
            dateTimeSeats.add(seatId);
          });
          return newBookedSeats;
        });

        saveBookedSeatsToLocalStorage(bookedSeats);

        setSelectedSeats([]);
        alert("Booking successful!");
        // navigate(`/ticketnest/booking/confirmation/${response.data.booking._id}`);
      } else {
        throw new Error("Invalid booking response");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      const errorMessage =
        error.response?.data?.message || "Booking failed. Please try again.";
      alert(errorMessage);
      releaseLockedSeats(selectedSeats);

      if (error.response?.status === 401) {
        navigate("/login", {
          state: {
            from: `/ticketnest/book/${movieId}/${vendorId}`,
            message: "Please log in to book tickets",
          },
        });
      }
    } finally {
      setIsBooking(false);
      setBookingTimer(null);
    }
  };

  const getSeatStatus = (seat) => {
    if (isSeatBooked(seat.id) && !isSeatAvailable(seat.id)) return "booked";
    if (isSeatLocked(seat.id)) return "locked";
    if (selectedSeats.includes(seat.id)) return "selected";
    return "available";
  };

  const getSeatStyles = (status) => {
    switch (status) {
      case "booked":
        return "bg-yellow-400 text-yellow-700 cursor-not-allowed pointer-events-none select-none opacity-100";
      case "locked":
        return "bg-red-200 text-red-600 cursor-not-allowed pointer-events-none select-none opacity-50";
      case "selected":
        return "bg-gray-500 text-white";
      default:
        return "bg-teal-500 text-white hover:bg-teal-600";
    }
  };

  const SeatComponent = ({ seat, rowName }) => {
    const status = getSeatStatus(seat);
    const styles = getSeatStyles(status);

    return (
      <button
        key={seat.id}
        onClick={() => handleSeatSelection(seat)}
        disabled={status === "booked" || status === "locked"}
        className={`
          w-8 h-8 flex items-center justify-center rounded
          transition-colors duration-200
          ${styles}
          disabled:cursor-not-allowed
        `}
        aria-label={`Seat ${rowName}${seat.number} - ${status}`}
      >
        <MdEventSeat className="w-6 h-6" />
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-red-600 rounded-lg bg-red-50">{error}</div>
      </div>
    );
  }

  if (!movieDetails || !movieDetails.vendor) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-gray-600 rounded-lg bg-gray-50">
          No movie details found
        </div>
      </div>
    );
  }

  const { movie, vendor, showtimes, layoutConfig } = movieDetails;

  return (
    <Layout>
      <div className="container px-4 py-4 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h1 className="mb-4 text-2xl font-bold">
                Book Tickets for {movie.title}
              </h1>
              <p className="mb-2 text-lg">Vendor: {vendor.business_name}</p>
              <p className="text-gray-600">Duration: {movie.duration}</p>
              <p className="text-gray-600">Genre: {movie.genre}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Select Date:</label>
                <select
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a date</option>
                  {Object.keys(showtimes).map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Select Time:</label>
                <select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedDate}
                >
                  <option value="">Select a time</option>
                  {selectedDate &&
                    showtimes[selectedDate].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 font-medium">Seat Status Guide:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MdEventSeat className="w-6 h-6 text-white bg-teal-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEventSeat className="w-6 h-6 text-white bg-gray-500" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEventSeat className="w-6 h-6 text-yellow-700 bg-yellow-400" />
                  <span>
                    Booked (Unavailable until 30 minutes before show start)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEventSeat className="w-6 h-6 text-red-600 bg-red-200" />
                  <span>Temporarily Locked</span>
                </div>
              </div>
            </div>
          </div>

          {selectedDate && selectedTime && (
            <div className="p-4 bg-gray-100 border rounded-lg">
              <h2 className="mb-4 text-xl font-semibold">Select Seats</h2>

              <div className="flex flex-col items-center justify-center mb-3 h-100vh">
                <h3 className="text-lg font-semibold">Screen</h3>
                <svg
                  width="300"
                  height="21"
                  viewBox="0 0 300 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 9C10 9 56 0 150 0C244 0 290 9 290 9L300 21C300 21 246 14 150 14C54 14 0 21 0 21L10 9Z"
                    fill="url(#gradient)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="147.916"
                      y1="2.5"
                      x2="147.916"
                      y2="23.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#008080"></stop>
                      <stop
                        offset="0.083"
                        stopColor="#008080"
                        stopOpacity="0.94"
                      ></stop>
                      <stop
                        offset="0.682"
                        stopColor="#00bfff"
                        stopOpacity="0.54"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mb-4 space-y-2">
                {layoutConfig.sections.map((section) => (
                  <div key={section.name} className="p-4 border rounded">
                    <h3 className="mb-2 font-medium">{section.name}</h3>
                    <p className="mb-2 text-sm text-gray-600">
                      Base Price: Rs. {section.basePrice}
                    </p>
                    <div className="grid gap-4">
                      {section.rows.map((row) => (
                        <div key={row.name} className="flex items-center gap-2">
                          <span className="w-8 text-sm font-medium text-center">
                            {row.name}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {row.seats.map((seat) => (
                              <SeatComponent
                                key={seat.id}
                                seat={seat}
                                rowName={row.name}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSeats.length > 0 && (
                <div className="p-4 mt-4 space-y-2 border-t">
                  <h3 className="font-medium">Selected Seats:</h3>
                  <p>{selectedSeats.join(", ").replace(/-(?=\d)/g, "")}</p>
                  <p className="text-lg font-semibold">
                    Total Price: Rs. {totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-red-700 transition-all duration-200 bg-red-100 rounded-md hover:bg-red-200"
          >
            Go Back
          </button>
          <button
            onClick={handleBooking}
            disabled={
              !selectedDate ||
              !selectedTime ||
              selectedSeats.length === 0 ||
              isBooking
            }
            className="px-6 py-2 text-white transition-all duration-200 bg-teal-500 rounded-md hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isBooking ? "Processing..." : "Book Now"}
          </button>
        </div>

        {bookingTimer !== null && (
          <div className="mt-4 text-lg font-semibold text-red-600">
            Time Remaining: {bookingTimer} seconds
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketBooking;
