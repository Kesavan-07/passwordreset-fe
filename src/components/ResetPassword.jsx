import React, { useState } from "react";
import axios from "axios";
// Import icons from react-icons
import { FaEnvelope, FaLock } from "react-icons/fa";

function ResetPassword() {
  const [email, setEmail] = useState(""); // State to store the entered email
  const [message, setMessage] = useState(""); // State to store success or error messages

  // Handle form submission to request a password reset link
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the email to the backend to request a reset link
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resetpassword`,
        { email }
      );
      setMessage(response.data.message); // Display success message from the server
    } catch (error) {
      // Handle errors and display appropriate error messages
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // Container for the reset password form
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Page heading */}
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Reset Password
        </h2>
        {/* Reset password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <FaEnvelope size={20} className="text-purple-400 absolute left-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="relative overflow-hidden w-full h-14 flex items-center justify-center bg-purple-600 text-white border border-white rounded-md transform transition-all duration-300 hover:translate-y-1.5"
          >
            <span className="text-lg font-semibold">Send Reset Link</span>
          </button>
        </form>
        {/* Display message */}
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
