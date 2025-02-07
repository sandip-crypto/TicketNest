import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/layout/Layout";
import {
  Building2,
  MapPin,
  Clapperboard,
  Loader2,
  AlertCircle,
  Tv,
  Clock,
  Ticket,
} from "lucide-react";

const AssociatedVendorsForAMovie = () => {
  const { movieId } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `/api/v1/movie/${movieId}/all-vendors`
        );
        setVendors(response.data.vendors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError("Failed to fetch vendors");
        setLoading(false);
      }
    };

    fetchVendors();
  }, [movieId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">Loading vendors...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="max-w-md p-6 mx-auto text-center bg-white rounded-lg shadow-lg">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="mb-2 text-xl font-bold text-gray-900">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-[40vh] overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl px-4 mx-auto text-center text-white">
              <Clapperboard className="w-16 h-16 mx-auto mb-6 text-teal-400" />
              <h1 className="mb-4 text-4xl font-bold">Available Theaters</h1>
              <p className="text-lg text-gray-300">
                Choose from our partner theaters to book your movie experience
              </p>
            </div>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto -mt-20 max-w-7xl">
          {vendors.length === 0 ? (
            <div className="max-w-2xl p-8 mx-auto text-center bg-white rounded-lg shadow-lg">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No Theaters Available
              </h3>
              <p className="text-gray-600">
                There are currently no theaters showing this movie.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                          {vendor.vendor.business_name}
                        </h3>
                        <div className="flex items-center mb-2 text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                          <span>{vendor.location.city}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-teal-50">
                        <Tv className="w-6 h-6 text-teal-500" />
                      </div>
                    </div>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-teal-500" />
                        <span>Multiple showtimes available</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Ticket className="w-4 h-4 mr-2 text-teal-500" />
                        <span>{vendor.numberOfScreens} Screens</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Building2 className="w-4 h-4 mr-2 text-teal-500" />
                        <span>{vendor.screenType}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {" "}
                            Rs.
                          </p>
                        </div>
                        <button
                          className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-teal-500 rounded-lg hover:bg-teal-600"
                          onClick={() => {
                            // Redirect logic to book tickets
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AssociatedVendorsForAMovie;
