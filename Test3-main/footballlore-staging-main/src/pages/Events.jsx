import React, { useState } from 'react';
import events from '../assets/events';
import EventCard from '../components/EventCard';

export default function Events() {
  const [rsvped, setRsvped] = useState({});

  const handleRSVP = (id) => {
    setRsvped((prev) => ({ ...prev, [id]: true }));
    alert('RSVP confirmed!');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-headline font-bold mb-8 text-center">Upcoming Events</h1>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          onRSVP={() => handleRSVP(event.id)}
        />
      ))}
    </div>
  );
} 