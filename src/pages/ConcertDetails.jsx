import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Tag,
  User,
  ChevronDown,
  ChevronUp,
  Ticket,
  Guitar,
  DoorClosed,
  Armchair,
  Globe,
} from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import { GiEntryDoor } from "react-icons/gi";
import Layout from "../components/layout/Layout";
import ConcertBooking from "./ConcertBooking";
import RenderContent from "../components/RenderContent";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const ConcertDetails = () => {
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(
          `/api/v1/concert/single-concert/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data, " data from backend");
        setConcert(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching concert:", error);
        setError("Failed to fetch concert details");
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-red-500">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!concert) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-gray-700">Not Found</h2>
            <p className="text-gray-600">Concert not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {showBooking ? (
          <div className="container px-4 py-8 mx-auto">
            <ConcertBooking concert={concert} />
          </div>
        ) : (
          <>
            <div className="relative h-[70vh] overflow-hidden">
              <img
                src={
                  concert.landscape.startsWith("http")
                    ? concert.landscape
                    : `${API_URL}/${concert.landscape}`
                }
                alt={concert.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 text-center text-white">
                  <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                    {concert.title}
                  </h1>
                  <p className="max-w-2xl mx-auto text-lg opacity-90">
                    {concert.artist}
                  </p>
                </div>
              </div>
            </div>

            <div className="container px-4 py-8 mx-auto -mt-10">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="p-6 bg-white rounded-lg shadow-lg">
                    <div className="grid gap-6 mb-8 sm:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Date
                          </p>
                          <p className="text-gray-900">
                            {new Date(
                              concert.availableShows[0].date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Time
                          </p>
                          <p className="text-gray-900">
                            {concert.availableShows[0].time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Location
                          </p>
                          <p className="text-gray-900">
                            {concert.venue}, {concert.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Language
                          </p>
                          <p className="text-gray-900">{concert.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Music className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Genre
                          </p>
                          <p className="text-gray-900">{concert.genre}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Organizer
                          </p>
                          <p className="text-gray-900">{concert.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GiEntryDoor className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Age Restriction
                          </p>
                          <p className="text-gray-900">
                            {concert.ageRestriction}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Guitar className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Performing Artist/Band
                          </p>
                          <p className="text-gray-900">{concert.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DoorClosed className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Door Time
                          </p>
                          <p className="text-gray-900">
                            <span>Be at the venue before</span>{" "}
                            <span className="italic font-bold">
                              {concert.doorTime}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Armchair className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Total Seats
                          </p>
                          <p className="text-gray-900">
                            {concert.totalSeats
                              ? concert.totalSeats
                              : "Not Specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {["description", "terms"].map((section) => (
                        <div key={section} className="border rounded-lg">
                          <button
                            onClick={() => toggleSection(section)}
                            className="flex items-center justify-between w-full p-4 text-left"
                          >
                            <div className="flex items-center space-x-2">
                              {section === "description" && (
                                <Tag className="w-5 h-5 text-teal-500" />
                              )}
                              {section === "terms" && (
                                <FaQuestion className="w-5 h-5 text-teal-500" />
                              )}
                              <span className="text-lg font-semibold capitalize">
                                {section === "terms"
                                  ? "Terms and Conditions"
                                  : section}
                              </span>
                            </div>
                            {expandedSection === section ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {expandedSection === section && (
                            <div className="p-4 pt-0">
                              <RenderContent content={concert[section]} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="sticky p-6 bg-white rounded-lg shadow-lg top-4">
                    <div className="flex items-center mb-4 space-x-2">
                      <Ticket className="w-6 h-6 text-teal-500" />
                      <h2 className="text-xl font-bold">Ticket Information</h2>
                    </div>
                    <div className="p-4 mb-4 rounded-lg bg-gray-50">
                      {concert.ticketTypes.map((ticket, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-sm text-gray-500">{ticket.type}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            Rs. {ticket.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            Available: {ticket.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowBooking(true);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-200 bg-teal-500 rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                      Book Tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ConcertDetails;
