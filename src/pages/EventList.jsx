import React, { useState, useEffect } from "react";
import axios from "axios";
import EventSlider from "../components/slider/EventSlider";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "Kathmandu";
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/event/all-events", {
        withCredentials: true,
      });
      if (response?.data) {
      }
      setEvents(response.data);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const currentDate = new Date();

  // Function to filter events by city and date
  const filterEventsByCity = (event) => {
    const eventCity = event?.city?.toLowerCase();
    return eventCity === selectedCity.toLowerCase(); // Only include events matching the selected city
  };

  const nowShowing = events.filter(
    (event) =>
      new Date(event.startDate) <= currentDate && filterEventsByCity(event) // Filter by date and city
  );

  const upcomingEvents = events.filter(
    (event) =>
      new Date(event.startDate) > currentDate && filterEventsByCity(event) // Filter by date and city
  );
  if (loading) {
    return " ";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        {nowShowing.length > 0 ? (
          <EventSlider events={nowShowing} title="Now Showing Events" />
        ) : (
          <p className="text-xl text-center text-gray-600">
            No events are currently showing.
          </p>
        )}

        {upcomingEvents.length > 0 ? (
          <EventSlider events={upcomingEvents} title="Upcoming Events" />
        ) : (
          <p className="mt-8 text-xl text-center text-gray-600">
            No upcoming events at the moment.
          </p>
        )}
      </div>
    </>
  );
};

export default EventList;
