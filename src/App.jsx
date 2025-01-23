import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/login";
import Profile from "./components/MyProfile";
import ResetPassword from "./components/ResetPassword";
import NewPassword from "./components/NewPassword";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MyProfile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/newpassword/:token" element={<NewPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
