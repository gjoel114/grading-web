import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import FrontEndGradingForm from "./FrontEndGradingForm";
import MISGradingForm from "./MISGradingForm";
import HCIGradingForm from "./HCIGradingForm";
import SavedRecords from "./SavedRecords";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <div className="container mt-4">
            <Routes>
              <Route path="/frontend" element={<FrontEndGradingForm />} />
              <Route path="/mis" element={<MISGradingForm />} />
              <Route path="/hci" element={<HCIGradingForm />} />
              <Route path="/saved-records" element={<SavedRecords />} />
              <Route path="/" element={<WelcomePage />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      )}
    </>
  );
}

function WelcomePage() {
  return (
    <div className="text-center">
      <h2 className="mb-4">Welcome to the Course Grading System</h2>
      <p>Select a course from the navigation bar to start grading.</p>
      <img
  src="/grading-picture.png"
  alt="grading"
  className="mt-3"
  style={{ width: "250px" }}
/>

    </div>
  );
}
