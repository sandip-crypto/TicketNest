import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Globe,
  Ticket,
  User,
  ChevronDown,
  ChevronUp,
  ReceiptText,
} from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import { GiEntryDoor } from "react-icons/gi";
import Layout from "../components/layout/Layout";
import EventBooking from "./EventBooking";
import RenderContent from "../components/RenderContent";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/v1/event/single-event/${id}`, {
          withCredentials: true,
        });
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to fetch event details");
        setLoading(false);
      }
    };

    fetchEvent();
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

  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-gray-700">Not Found</h2>
            <p className="text-gray-600">Event not found</p>
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
            <EventBooking event={event} />
          </div>
        ) : (
          <>
            <div className="relative h-[70vh] overflow-hidden">
              {event.landscapeImage.startsWith("http") ? (
                <>
                  <img
                    src={event.landscapeImage}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </>
              ) : (
                <>
                  <img
                    src={`${API_URL}/${event.landscapeImage}`}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </>
              )}

              <div className="absolute inset-0 bg-black/40 bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 text-center text-white">
                  <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                    {event.title}
                  </h1>
                  <p className="max-w-2xl mx-auto text-lg opacity-90">
                    <RenderContent content={event.description} />
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
                            {new Date(event.startDate).toLocaleDateString()} -{" "}
                            {new Date(event.endDate).toLocaleDateString()}
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
                            {event.startTime} - {event.endTime}
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
                            {event.address}, {event.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Tag className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Category
                          </p>
                          <p className="text-gray-900">{event.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Language
                          </p>
                          <p className="text-gray-900">{event.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-teal-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Organizer
                          </p>
                          <p className="text-gray-900">{event.organizer}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="border rounded-lg ">
                        <button
                          onClick={() => toggleSection("speakers")}
                          className="flex items-center justify-between w-full p-4 text-left"
                        >
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-teal-500" />
                            <span className="text-lg font-semibold">
                              Speakers
                            </span>
                          </div>
                          {expandedSection === "speakers" ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {expandedSection === "speakers" && (
                          <div className="p-4 pt-0">
                            <ul className="space-y-2">{event.speakers}</ul>
                          </div>
                        )}
                      </div>

                      {["audience", "ageRestriction", "refundPolicy"].map(
                        (section) => (
                          <div key={section} className="border rounded-lg">
                            <button
                              onClick={() => toggleSection(section)}
                              className="flex items-center justify-between w-full p-4 text-left"
                            >
                              <div className="flex items-center space-x-2">
                                {/* Adding icons for each section */}
                                {section === "audience" && (
                                  <FaPeopleGroup className="w-5 h-5 text-teal-500" />
                                )}

                                {section === "refundPolicy" && (
                                  <RiRefund2Line className="w-5 h-5 text-teal-500" />
                                )}
                                {section === "ageRestriction" && (
                                  <GiEntryDoor className="w-5 h-5 text-teal-500" />
                                )}
                                <span className="text-lg font-semibold capitalize">
                                  {section.split(/(?=[A-Z])/).join(" ")}{" "}
                                  {/* This will capitalize the words */}
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
                                <p className="text-gray-600">
                                  <RenderContent content={event[section]} />
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      )}

                      {event.sponsorships && (
                        <div className="border rounded-lg">
                          <button
                            onClick={() => toggleSection("sponsorships")}
                            className="flex items-center justify-between w-full p-4 text-left"
                          >
                            <div className="flex items-center space-x-2">
                              <BiSolidOffer className="w-5 h-5 text-teal-500" />
                              <span className="text-lg font-semibold">
                                Sponsorship Opportunities
                              </span>
                            </div>
                            {expandedSection === "sponsorships" ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {expandedSection === "sponsorships" && (
                            <div className="p-4 pt-0">
                              <p className="text-gray-600">
                                <RenderContent content={event.sponsorships} />
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {event.terms && (
                        <div className="border rounded-lg">
                          <button
                            onClick={() => toggleSection("terms")}
                            className="flex items-center justify-between w-full p-4 text-left"
                          >
                            <div className="flex items-center space-x-2">
                              <ReceiptText className="w-4 h-4 text-teal-500" />

                              <span className="text-lg font-semibold">
                                Terms and Conditions
                              </span>
                            </div>
                            {expandedSection === "terms" ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 " />
                            )}
                          </button>
                          {expandedSection === "terms" && (
                            <div className="p-4 pt-0">
                              <p className="text-gray-600">
                                {" "}
                                <RenderContent content={event.terms} />
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {event.faq && (
                        <div className="border rounded-lg">
                          <button
                            onClick={() => toggleSection("faq")}
                            className="flex items-center justify-between w-full p-4 text-left"
                          >
                            <div className="flex items-center space-x-2">
                              <FaQuestion className="w-4 h-4 text-teal-500" />

                              <span className="text-lg font-semibold">FAQ</span>
                            </div>
                            {expandedSection === "faq" ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 " />
                            )}
                          </button>
                          {expandedSection === "faq" && (
                            <div className="p-4 pt-0">
                              <p className="text-gray-600">
                                {" "}
                                <RenderContent content={event.faq} />
                              </p>
                            </div>
                          )}
                        </div>
                      )}
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
                      {event.ticketTypes.map((ticket, index) => (
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

export default EventDetails;
