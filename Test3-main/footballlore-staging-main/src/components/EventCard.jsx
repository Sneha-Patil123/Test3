import React from 'react';
import './styles/EventCard.css';

function formatEventDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function EventCard({ title, date, location, onRSVP }) {
  return (
    <div className="event-card">
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <div className="event-date">{formatEventDate(date)}</div>
        <div className="event-location">{location}</div>
      </div>
      <button
        className="event-rsvp-btn"
        onClick={onRSVP}
        aria-label={`RSVP for ${title} on ${formatEventDate(date)} at ${location}`}
      >
        RSVP
      </button>
    </div>
  );
}