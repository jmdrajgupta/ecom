import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedin, FaGooglePlay, FaApple } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between space-y-8 md:space-y-0">
        {/* Logo and Description */}
        <div className="w-full md:w-1/4">
          <h2 className="text-2xl font-bold">khetan Jindal<span className="text-green-500">@</span></h2>
          <p className="mt-2">Company some details here like ecommerce ads.</p>
          <div className="flex mt-4 space-x-4">
            <FaFacebookF className="hover:text-blue-500 transition duration-300" />
            <FaTwitter className="hover:text-blue-400 transition duration-300" />
            <FaWhatsapp className="hover:text-green-500 transition duration-300" />
            <FaLinkedin className="hover:text-blue-700 transition duration-300" />
          </div>
        </div>

        {/* Customer Care Links */}
        <div className="w-full md:w-1/6">
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Help Center</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">How to Buy</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Returns and Refunds</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Terms and Conditions</li>
          </ul>
        </div>

        {/* About Us Links */}
        <div className="w-full md:w-1/6">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">About Bennebos</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">About Our Group</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Our Blog</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Our Apps</li>
          </ul>
        </div>

        {/* Our Service Links */}
        <div className="w-full md:w-1/6">
          <h3 className="text-lg font-semibold mb-4">Our Service</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Import and Export</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Products Service</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Sell Service</li>
            <li className="hover:text-gray-400 transition duration-300 cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Download Apps */}
        <div className="w-full md:w-1/4 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Download Apps</h3>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
              <FaGooglePlay className="mr-2" /> Download By Google Play
            </a>
            <a href="#" className="flex items-center bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
              <FaApple className="mr-2" /> Download By App Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
