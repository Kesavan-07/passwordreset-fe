import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// Import the desired icons from react-icons
import { FaEnvelope, FaLock, FaLink } from "react-icons/fa"; // Envelope for email, Lock for password, Link for the reset password link

function Login() {
  // State to hold form data and any feedback messages
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Update state when form inputs change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      setMessage(response.data.message); // Display server message
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      navigate("/profile"); // Redirect to profile page after successful login
    } catch (error) {
      // Handle error and display appropriate message
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // Center the login form on the page with a dark theme
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        {/* Login Heading */}
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="relative">
            <FaEnvelope
              className="absolute left-3 top-3 text-gray-500"
              size={20}
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

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative overflow-hidden w-full h-14 flex items-center justify-center bg-purple-600 text-white border border-white rounded-md transform transition-all duration-300 hover:translate-y-1.5"
          >
            <span className="text-lg font-semibold">Login</span>
          </button>

          {/* Links for Signup and Reset Password */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-purple-400 hover:text-purple-500 underline"
              >
                Sign up
              </Link>
            </p>
            <p className="text-gray-400">
              Forgot password?{" "}
              <Link
                to={"/reset-password"}
                className="text-purple-400 hover:text-purple-500 underline"
              >
                <FaLink className="inline-block mr-1" size={14} />{" "}
                {/* Link icon */}
                Click here
              </Link>
            </p>
          </div>
        </form>
        {/* Display server message if any */}
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
