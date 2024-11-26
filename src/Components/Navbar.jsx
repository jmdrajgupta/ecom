import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Home from '../Home';
import Contact from './Contact';
import RegistrationForm from '../User/RegistrationForm';
import ShoppingCart from './ShoppingCart';
import LoginForm from '../User/LoginForm';
import { Routes, Route } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope, FaBars, FaTimes, FaCog, FaBoxOpen } from 'react-icons/fa';

import ProductCard from './ProductCard';
import Profile from '../User/Profile';
import OrderHistory from './OrderHistory';
import Cart from './Cart';

// Import the image
import logo from '../assets/WhatsApp Image 2024-10-24 at 15.12.21_89b3dc9b.jpg';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (userDropdownOpen) {
      timer = setTimeout(() => {
        setUserDropdownOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [userDropdownOpen]);

  return (
    <>
      <nav className=" p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with increased size and hover effect */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 w-auto transition-transform duration-300 transform hover:scale-110 cursor-pointer" 
            />
          </div>
          <div className="md:hidden">
            <button onClick={toggleNav} className="text-white focus:outline-none">
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className={`md:flex items-center space-x-6 ${navOpen ? 'block' : 'hidden'} md:block`}>
            {/* Navbar links with black text and hover effect */}
            <Link to="/" className="text-black flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/contact" className="text-black flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
              <FaEnvelope />
              <span>Contact</span>
            </Link>
            <Link to="/about" className="text-black flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
              <FaUser />
              <span>About Us</span>
            </Link>
            <Link to="/login" className="text-black flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
              <FaUser />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/product-card" element={<ProductCard />} />
        <Route path="/shopping/:productId" element={<ShoppingCart />} />
        <Route path="/catalog" element={<ProductCard />} />
        <Route path="/account-settings" element={<Profile />} />
        <Route path="/my-orders" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Navbar;






