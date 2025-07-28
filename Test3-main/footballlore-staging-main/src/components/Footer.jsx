import React from 'react';
import {Link} from 'react-router-dom'
import './styles/Footer.css';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FootballLore</h3>
          <p>
            FootballLore brings you legendary football stories from across the globe. Relive iconic moments, epic comebacks, and unforgettable drama on the pitch.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 123 Stadium Road, London, UK</p>
          <p>📞 +44 20 7946 0958</p>
          <p>✉️ support@footballlore.com</p>
          <p>🌍 <a href="https://www.footballlore.com" target="_blank" rel="noopener noreferrer">www.footballlore.com</a></p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/submit-story">Submit</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 FootballLore. All rights reserved.</p>
      </div>
    </footer>
  );
}