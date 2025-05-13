import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ ev }) {
  return (
    <Link to={`/events/${ev._id || ev.id}`} className="card">
      <img src={ev.imageUrl} alt={ev.title} />

      {/* Default info: title, date, location */}
      <div className="info">
        <h3>{ev.title}</h3>
        <p className="date">{new Date(ev.startDateTime).toLocaleDateString()}</p>
        <p className="location">{ev.location}</p>
      </div>

      {/* Hover overlay: description / date/time / price */}
      <div className="hover-desc">
        <p className="desc">{ev.description}</p>
        <p className="datetime">
          {new Date(ev.startDateTime).toLocaleString()} –{' '}
          {new Date(ev.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="price">
          {ev.price > 0 ? `$${ev.price.toFixed(2)}` : 'FREE'}
        </p>
      </div>
    </Link>
  );
}
