import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  Play,
  Clock,
  Star,
  Calendar,
  Film,
  Languages,
  ArrowLeft,
  X,
  Ticket,
} from "lucide-react";
import { motion } from "framer-motion";
import convertToEmbedURL from "../components/ConvertToEmbedURL";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const MovieDetails = () => {
  const [singleMovie, setSingleMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  // const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/movie/single-movie/${id}`, {
          withCredentials: true,
        });
        setSingleMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-6 text-red-600 shadow-sm bg-red-50 rounded-xl">
          <p className="text-lg font-medium">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 mt-4 space-x-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen bg-gray-900">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            {singleMovie.landscape.startsWith("http") ? (
              <img
                loading="lazy"
                src={singleMovie.landscape}
                alt={`Movie ${singleMovie.title}`}
                className="object-cover w-full h-[300px] mb-5 rounded-lg"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                loading="lazy"
                src={`${API_URL}/${singleMovie.landscape}`}
                alt={singleMovie.title}
                className="object-cover w-full h-[300px] mb-5 rounded-lg"
                style={{ objectFit: "cover" }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              {singleMovie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400" />
                {singleMovie.rating}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                {singleMovie.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                {new Date(singleMovie.releaseDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Film className="w-5 h-5" />
                {singleMovie.genre}
              </span>
              <span className="flex items-center gap-1">
                <Languages className="w-5 h-5" />
                {singleMovie.language}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setShowTrailer(true)}
                className="inline-flex items-center px-6 py-3 space-x-2 text-lg font-semibold text-white transition-colors rounded-lg bg-rose-600 hover:bg-rose-700"
              >
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
              <Link
                to={`/ticketnest/movie/${id}/available-vendors`}
                className="inline-flex items-center px-6 py-3 space-x-2 text-lg font-semibold text-white transition-colors bg-green-700 rounded-lg hover:bg-green-600"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="container px-4 py-12 mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-6 bg-gray-800 rounded-xl">
                <h2 className="mb-4 text-2xl font-bold text-white">Synopsis</h2>
                <p className="text-gray-300">{singleMovie.description}</p>
              </div>

              <div className="p-6 bg-gray-800 rounded-xl">
                <h2 className="mb-4 text-2xl font-bold text-white">Cast</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-rose-500">
                      Lead Actors
                    </h3>
                    <p className="text-gray-300">
                      {singleMovie.cast.leadActors}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-500">
                      Supporting Cast
                    </h3>
                    <p className="text-gray-300">
                      {singleMovie.cast.supportingActors}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-800 rounded-xl">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  Production
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-rose-500">
                      Director(s)
                    </h3>
                    <p className="text-gray-300">{singleMovie.directors}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-full max-w-5xl mx-4">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute p-2 text-white transition-colors bg-red-600 rounded-full -top-4 -right-4 hover:bg-red-700"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="overflow-hidden rounded-xl">
                <iframe
                  src={convertToEmbedURL(singleMovie.trailer)}
                  title="Movie Trailer"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="container px-4 py-8 mx-auto">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 space-x-2 text-white transition-colors rounded-lg bg-rose-600 hover:bg-rose-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
