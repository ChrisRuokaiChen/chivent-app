// client/src/components/EventsGrid.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

export default function EventsGrid() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading');    
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/events');
        setEvents(response.data);
        setStatus('loaded');
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setErrorMessage(err.message);
        setStatus('error');
      }
    })();
  }, []);

  if (status === 'loading') {
    return <p className="p-4 text-center">Loading events…</p>;
  }

  if (status === 'error') {
    return (
      <p className="p-4 text-center text-red-600">
        Error loading events: {errorMessage}
      </p>
    );
  }

  if (events.length === 0) {
    return <p className="p-4 text-center">No events available at this time.</p>;
  }

  return (
    <section id="events" className="grid">
      {events.map(ev => (
        <EventCard key={ev.id} ev={ev} />
      ))}
    </section>
  );
}
