import React, { useEffect, useState } from "react";
import axios from "axios";
// Import icons from react-icons
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";

function MyProfile() {
  const [user, setUser] = useState(null); // State to store user data

  // Fetch user profile when the component is mounted
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
          }
        );
        setUser(response.data.user); // Set user data in state
      } catch (error) {
        console.error(error); // Log any errors
      }
    };
    fetchProfile();
  }, []);

  return (
    // Page container with a dark theme and gradient background
    <div className="min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* User greeting */}
      {user ? (
        <div className="text-center mt-10">
          <p className="text-4xl font-mono">
            HEY 👋{" "}
            <span className="text-purple-400 font-extrabold">{user.name}</span>
          </p>
          <p className="font-mono mt-2">WELCOME TO YOUR PROFILE PAGE</p>
          <p className="font-mono">HERE YOU CAN EDIT YOUR PROFILE</p>
          <p className="font-mono">AND ALSO UPLOAD YOUR PROFILE PHOTO</p>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">Loading...</p>
      )}

      {/* Profile Details */}
      <div className="p-6 mt-10 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          Profile Information
        </h2>
        {user ? (
          <div className="text-gray-300">
            <p className="mb-2 flex items-center">
              <FaUser className="mr-2 text-purple-400" size={18} />
              Name: <span className="text-white">{user.name}</span>
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-purple-400" size={18} />
              Email: <span className="text-white">{user.email}</span>
            </p>
          </div>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          <button className="w-full rounded-full px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center">
            <FaEdit className="mr-2" size={20} />
            Edit Profile
          </button>
          <button className="w-full rounded-full px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 flex items-center justify-center">
            <FaSignOutAlt className="mr-2" size={20} />
            Logout
          </button>
          <button className="w-full rounded-full px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
            <FaCamera className="mr-2" size={20} />
            Upload Profile Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
