

import React from 'react';
import { FaShoppingCart, FaHandshake, FaGlobe, FaQuoteLeft } from 'react-icons/fa';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-5xl font-bold mb-10 text-blue-600 animate-pulse">About Us</h1>
      
      {/* Our Story Section */}
      <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg mb-12 w-11/12 md:w-2/3 lg:w-1/2">
        <FaShoppingCart className="text-6xl mb-4 text-green-500" />
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-center text-lg">
          Founded with a mission to provide quality products, our e-commerce journey started in a small garage. Today, we've grown into a trusted brand with customers worldwide. Our commitment to quality and customer satisfaction has been the driving force behind our success.
        </p>
      </div>

      {/* Our Values Section */}
      <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg mb-12 w-11/12 md:w-2/3 lg:w-1/2">
        <FaHandshake className="text-6xl mb-4 text-blue-500" />
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <p className="text-center text-lg">
          Integrity, innovation, and customer-centricity are the core values that guide us. We believe in doing business the right way, fostering creativity, and always prioritizing our customers’ needs.
        </p>
      </div>

      {/* Customer Testimonials Section */}
      <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        <FaQuoteLeft className="text-6xl mb-4 text-red-500" />
        <h2 className="text-3xl font-semibold mb-4">Customer Testimonials</h2>

        {/* Testimonial 1 */}
        <div className="mb-8">
          <p className="italic text-lg">
            "This is the best shopping experience I've ever had. The products are top-notch, and the customer service is outstanding. Highly recommend!"
          </p>
          <p className="text-right mt-4 font-bold">- Jane Doe</p>
        </div>

        {/* Testimonial 2 */}
        <div className="mb-8">
          <p className="italic text-lg">
            "I love the variety of products available. The website is easy to navigate, and my orders always arrive on time."
          </p>
          <p className="text-right mt-4 font-bold">- John Smith</p>
        </div>

        {/* Testimonial 3 */}
        <div>
          <p className="italic text-lg">
            "Excellent quality and fast delivery. I am a repeat customer and will continue to be one!"
          </p>
          <p className="text-right mt-4 font-bold">- Emily Johnson</p>
        </div>
      </div>
    </div>
  );
};

export default About;
