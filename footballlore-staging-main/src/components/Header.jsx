import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { userType } from "../pages/dashboard/FootballLore";

export default function Header() {
  // Added static usertype
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="nav-link">
          FootballLore
        </Link>
      </div>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>

        {/* if usertype is Admin then only Dashboard navigation visible  */}
        {userType === "Admin" && (
          <Link to="/dashboard/footballlore" className="nav-link">
            Dashboard
          </Link>
        )}

        <Link to="/stories" className="nav-link">
          Stories
        </Link>

        <Link to="/events" className="nav-link">
          Events
        </Link>
        <Link to="/matches" className="nav-link">
          Sponsor
        </Link>
        <Link to="/submit-story" className="nav-link ghost-button">
          Submit
        </Link>
      </nav>
    </header>
  );
}
