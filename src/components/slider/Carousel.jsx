import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Carousel = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null); // Fixed the ref type

  const updateWidth = useCallback(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  // Update slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
      updateWidth();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateWidth]);

  useEffect(() => {
    updateWidth();
  }, [updateWidth]);

  // Go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  // Go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const renderMovies = () => {
    const items = [...movies, ...movies.slice(0, slidesToShow)];
    return items.map((movie, index) => (
      <motion.div
        key={`${movie._id}-${index}`}
        className="flex-shrink-0"
        style={{ width: `${100 / slidesToShow}%` }}
      >
        <Link
          to={`/ticketnest/movie/${movie._id}`}
          className="block transition duration-300 transform"
        >
          <img
            loading="lazy"
            src={
              movie.thumbnail.startsWith("http")
                ? movie.thumbnail
                : `${API_URL}/${movie.thumbnail}`
            }
            alt={`Movie ${movie.title}`}
            className="object-cover w-full h-[300px] mb-5"
          />
        </Link>
      </motion.div>
    ));
  };

  return (
    <div className="relative w-full max-w-full px-4 mx-auto overflow-hidden">
      <motion.div
        ref={carousel}
        className="overflow-hidden cursor-grab"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 0 }}
          animate={{ x: -(currentSlide * (100 / slidesToShow)) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {renderMovies()}
        </motion.div>
      </motion.div>

      {/* Left arrow button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 p-2 text-gray-800 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full shadow-md top-1/2 hover:bg-opacity-75"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      {/* Right arrow button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 p-2 text-gray-800 transition-all transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full shadow-md top-1/2 hover:bg-opacity-75"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Carousel;
