import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
// Import icons from react-icons
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  // State to store form data and feedback messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes and update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to register a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );
      setMessage(response.data.message); // Set success message
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong"); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Page Heading */}
        <h2 className="text-3xl font-bold mb-6 font-serif text-center text-purple-400">
          Signup
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name Field */}
          <div className="relative">
            <FaUser
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            />
            <input
              type="text"
              name="name"
              placeholder="User Name"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="relative overflow-hidden w-full h-14 flex items-center justify-center bg-purple-600 text-white border border-white rounded-md transform transition-all duration-300 hover:translate-y-1.5"
          >
            <span className="text-lg font-semibold">Sign Up</span>
          </button>
        </form>

        {/* Navigation Link */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 underline hover:text-purple-500"
          >
            Login
          </Link>
        </p>

        {/* Feedback Message */}
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
