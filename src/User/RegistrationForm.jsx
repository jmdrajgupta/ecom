import React, { useState } from "react";
import { auth, addUserToFirestore } from "../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import React Toastify CSS
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import specific icons

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    let isValid = true;

    // Validate username
    if (!username) {
      toast.error("Username is required.");
      isValid = false;
    }

    // Validate email
    if (!email) {
      toast.error("Email is required.");
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Improved regex for email
      if (!emailRegex.test(email)) {
        toast.error("Email is invalid.");
        isValid = false;
      }
    }

    // Validate password
    if (!password) {
      toast.error("Password is required.");
      isValid = false;
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/; // Updated regex
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must contain at least one letter, one number, one special character, and be at least 6 characters long."
        );
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    const { username, email, password } = formData;

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store additional user data in Firestore
      await addUserToFirestore(userId, username);

      // Clear form and show success toast notification
      setFormData({ username: "", email: "", password: "" });
      toast.success("Registration successful!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please log in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please enter a valid email.");
      } else {
        toast.error("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <MdVisibilityOff className="h-5 w-5 text-gray-600" /> : <MdVisibility className="h-5 w-5 text-gray-600" />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default RegistrationForm;
