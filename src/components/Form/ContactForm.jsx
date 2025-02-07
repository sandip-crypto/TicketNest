import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Layout from "../layout/Layout";

export const ContactForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/v1/contact/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/ticketnest/explore/home";
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="w-full max-w-md p-8 space-y-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-teal-100 rounded-full">
            <CheckCircle2 className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Message Sent!
          </h2>
          <p className="text-gray-600">{message}</p>
          <p className="text-sm text-gray-500">
            Redirecting you to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="w-full max-w-lg">
          <div className="px-8 pt-8 pb-16 mt-6 bg-white shadow-xl rounded-2xl">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full">
                <MessageSquare className="w-8 h-8 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-2 text-gray-600">
                We'd love to hear from you. Send us a message!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={data.username}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-3 pl-10 pr-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-3 pl-10 pr-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={data.subject}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-3 pl-10 pr-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={data.message}
                      onChange={handleInputChange}
                      required
                      className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Tell us what you need help with..."
                    />
                  </div>
                </div>
              </div>

              {status === "error" && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="relative flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-colors bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Additional Contact Info */}
          <div className="px-8 py-6 mt-6 mb-10 bg-white shadow-lg rounded-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Us</h3>
                <a
                  href="mailto:support@ticketnest.com"
                  className="block mt-1 text-sm text-teal-600 hover:text-teal-500"
                >
                  support@ticketnest.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Office Hours
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Sunday - Friday, 9am - 6pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactForm;
