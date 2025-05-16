
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Course Grading</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/frontend">Front-End</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mis">MIS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hci">HCI</Link>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={onLogout}>Log Out</button>
        </div>
        <Link className="nav-link" to="/saved-records">
  Saved Records
</Link>
      </div>
    </nav>
  );
}
//
