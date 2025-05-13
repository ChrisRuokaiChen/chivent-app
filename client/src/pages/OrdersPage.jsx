import React, { useEffect, useState } from 'react';
import axios                          from 'axios';
import { Link }                       from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(r => setOrders(r.data));
  }, []);

  if (!orders.length) {
    return <p style={{ padding:'6rem 1.5rem' }}>No past orders.</p>;
  }

  return (
    <div style={{ padding:'6rem 1.5rem' }}>
      <h1>Your Orders</h1>
      {orders.map(o => (
        <div key={o._id} style={{ marginBottom:'2rem' }}>
          <h2>Order on {new Date(o.createdAt).toLocaleString()}</h2>
          <ul>
            {o.items.map(({ event, qty }) => (
              <li key={event._id} style={{ margin:'0.5rem 0' }}>
                <Link to={`/events/${event._id}`}>{event.title}</Link>
                {' — '}
                {qty} × ${event.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
