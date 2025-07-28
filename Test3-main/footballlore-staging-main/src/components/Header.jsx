import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo"><Link to="/" className="nav-link">FootballLore</Link></div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/stories" className="nav-link">Stories</Link>
        <Link to="/events" className="nav-link">Events</Link>
        <Link to="/submit-story" className="nav-link ghost-button">Submit</Link>
      </nav>
    </header>
  );
}