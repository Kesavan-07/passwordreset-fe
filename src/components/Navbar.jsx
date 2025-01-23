import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Import the desired icon from react-icons
import { FaHome } from "react-icons/fa"; // Example: Home icon

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in by verifying the token

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    // Navbar container with a dark theme, no shadow for the line below
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo or icon */}
      <Link
        to="/"
        className="text-2xl font-bold text-purple-400 hover:text-purple-500 transition duration-300 flex items-center"
      >
        {/* Use icon in place of "App" */}
        <FaHome size={24} className="mr-2" /> {/* Space the icon and text */}
      </Link>

      {/* Conditional rendering based on authentication status */}
      <div className="flex items-center space-x-4">
        {token ? (
          // Logout button for authenticated users
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
          >
            Logout
          </button>
        ) : (
          // Login button for unauthenticated users
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
