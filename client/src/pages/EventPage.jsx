// client/src/pages/EventPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios                         from 'axios';
import { CartContext }               from '../state/CartContext';
import { AuthContext }               from '../state/AuthContext';

export default function EventPage() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user }      = useContext(AuthContext);
  const navigate      = useNavigate();

  /* fetch the event */
  useEffect(() => {
    axios.get(`/api/events/${id}`)
         .then(res => setEv(res.data))
         .catch(console.error);
  }, [id]);

  if (!ev) return <p style={{ padding: '6rem 1.5rem' }}>Loading…</p>;

  /* date / time formatting */
  const start = new Date(ev.startDateTime);
  const end   = new Date(ev.endDateTime);
  const date  = start.toLocaleDateString();
  const time  = `${start.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                – ${end.toLocaleTimeString([],   { hour:'2-digit', minute:'2-digit' })}`;

  /* button click → sign‑in or add */
  function handleAdd() {
    if (!user) return navigate('/signin');
    addToCart(ev);
  }

  return (
    <div className="event-page">
      {/* ----- Hero header ----- */}
      <header
        className="event-header"
        style={{ backgroundImage: `url(${ev.imageUrl})` }}
      >
        <div className="info">
          <h1>{ev.title}</h1>
          <p className="date">{date}</p>
          <p className="time">{time}</p>
          <p className="location">{ev.location}</p>
        </div>
      </header>

      {/* ----- Body two‑column layout ----- */}
      <div className="event-body">
        <div className="event-content">
          {/* LEFT: Details */}
          <div className="event-details">
            <h2>Details</h2>
            <p className="details-text">
              {ev.details ?? ev.description ?? ''}
            </p>
          </div>

          {/* RIGHT: Sticky purchase box */}
          <div className="event-sidebar">
            <div className="purchase">
              <span className="price">
                {ev.price > 0 ? `$${ev.price.toFixed(2)}` : 'FREE'}
              </span>
              <button onClick={handleAdd}>
                {user ? 'Add to Cart' : 'Sign In to Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
