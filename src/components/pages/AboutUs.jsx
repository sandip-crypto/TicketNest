import React from "react";
import {
  Ticket,
  Shield,
  Headphones,
  Users,
  Star,
  Calendar,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import Layout from "../layout/Layout";

export const AboutUs = () => {
  const features = [
    {
      icon: <Ticket className="w-8 h-8 text-teal-600" />,
      title: "Easy Booking",
      description:
        "Our user-friendly interface allows you to effortlessly search and book tickets for a wide array of entertainment options.",
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Secure Transactions",
      description:
        "We utilize top-notch encryption and security measures to protect your personal information and payment details.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-teal-600" />,
      title: "Dedicated Support",
      description:
        "Our customer service team is always ready to assist you with any inquiries about event details or ticket issues.",
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "Inclusive Platform",
      description:
        "We cater to everyone, making entertainment accessible regardless of age or preference.",
    },
  ];

  const stats = [
    { number: "1M+", label: "Happy Customers" },
    { number: "50K+", label: "Events Hosted" },
    { number: "100+", label: "Venue Partners" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] opacity-10 bg-center bg-cover" />
          <div className="container relative px-4 py-24 mx-auto text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to TicketNest
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-teal-50">
              Your premier destination for seamless ticket booking experiences.
              Discover, book, and enjoy events that matter to you.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-teal-600">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 bg-gray-50">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose TicketNest?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We're committed to making your event booking experience
                exceptional
              </p>
            </div>
            <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative p-6 transition-shadow bg-white rounded-xl hover:shadow-lg group"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-teal-50 group-hover:bg-teal-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-24 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="px-6 py-12 bg-teal-600 rounded-2xl md:py-16 md:px-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Stay Updated with TicketNest
                </h2>
                <p className="mt-4 text-lg text-teal-100">
                  Subscribe to our newsletter for exclusive offers and the
                  latest event updates.
                </p>
                <form className="flex flex-col gap-4 mt-8 sm:flex-row sm:max-w-lg sm:mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 text-gray-900 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 font-medium text-teal-600 transition-colors bg-white rounded-lg hover:bg-teal-50"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
