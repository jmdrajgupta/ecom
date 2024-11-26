// Carousel.js
import React, { useState, useEffect } from "react";
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';

import Image1 from "../assets/FB_IMG_1724496890962.jpg";
import Image2 from "../assets/FB_IMG_1724496903455.jpg";
import Image3 from "../assets/FB_IMG_1724496936939.jpg";
import Image4 from "../assets/FB_IMG_1724496938853.jpg";

const Carousel = () => {
  const images = [Image1, Image2, Image3, Image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 2000); // Auto-slide every 2 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="group absolute top-1/2 left-5 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition duration-300 ease-in-out hover:scale-110 shadow-lg flex items-center justify-center"
      >
        <span className="inline-block transition-transform duration-500 group-hover:-rotate-180">
          <AiOutlineLeft className="h-5 w-5 text-white" />
        </span>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="group absolute top-1/2 right-5 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition duration-300 ease-in-out hover:scale-110 shadow-lg flex items-center justify-center"
      >
        <span className="inline-block transition-transform duration-500 group-hover:rotate-180">
          <AiOutlineRight className="h-5 w-5 text-white" />
        </span>
      </button>

      {/* Images */}
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="min-w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 cursor-pointer rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gray-800 w-4 h-4"
                : "bg-gray-400 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
