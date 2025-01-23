import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// Import icons from react-icons
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function NewPassword() {
  const { token } = useParams(); // Extract the reset token from the URL
  const [password, setPassword] = useState(""); // State to store the new password
  const [message, setMessage] = useState(""); // State to store success or error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Hook to programmatically navigate to another route

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send new password to the server
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/newpassword/${token}`,
        { password }
      );
      setMessage(response.data.message); // Display success message from the server
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      // Handle errors and display an appropriate message
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // Center the form with updated styling
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-6 sm:px-0">
      <div className="max-w-md w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        {/* Page Heading */}
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Set New Password
        </h2>
        {/* Form to input new password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold transition-colors duration-300 flex items-center justify-center"
          >
            <FaLock className="mr-2" size={20} />
            Reset Password
          </button>
        </form>
        {/* Display message if present */}
        {message && (
          <p className="mt-4 text-center text-green-400">{message}</p>
        )}
        {/* Link back to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-500 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
