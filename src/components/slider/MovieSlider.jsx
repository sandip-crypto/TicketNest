import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const MovieSlider = ({ movies, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const maxSlide = movies.length - slidesToShow;
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const touch = e.touches[0];
    const diff = touch.clientX - startX;

    // Swipe right (move to the previous slide)
    if (diff > 50) {
      prevSlide();
      setIsSwiping(false);
    }
    // Swipe left (move to the next slide)
    if (diff < -50) {
      nextSlide();
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <div
      className="relative w-full px-4 mx-auto max-w-7xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <h2 className="mb-5 text-2xl font-bold text-gray-800 ">{title}</h2>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2`}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
              <Link
                to={`/ticketnest/movie/${movie._id}`}
                key={movie._id}
                className="block transition duration-300 transform hover:scale-105"
              >
                {movie.thumbnail.startsWith("http") ? (
                  <img
                    loading="lazy"
                    src={movie.thumbnail}
                    alt={`Movie ${movie.title}`}
                    className="object-cover w-full h-[300px] mb-5 rounded-lg"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={`${API_URL}/${movie.thumbnail}`}
                    alt={`Movie ${movie.title}`}
                    className="object-cover w-full h-auto mb-10 rounded-lg"
                  />
                )}

                <span className="px-4 py-[0.10rem] rounded-md bg-teal-500 movietext-white font-sm absolute top-1 left-1">
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render the left arrow */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 p-2 text-gray-800 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full shadow-md top-1/2 hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {/* Conditionally render the right arrow */}
      {currentSlide < movies.length - slidesToShow && (
        <button
          onClick={nextSlide}
          className="absolute right-0 p-2 text-gray-800 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full shadow-md top-1/2 hover:bg-opacity-75"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
