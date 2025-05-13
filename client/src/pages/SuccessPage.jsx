import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SuccessPage() {
  const { state } = useLocation();
  const order     = state?.order;
  const time      = order
    ? new Date(order.createdAt).toLocaleString()
    : new Date().toLocaleString();

  return (
    <div style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <h1>Purchase Successful</h1>
      <p>Your order was placed on <strong>{time}</strong>.</p>
      <p>
        You can <Link to="/orders">view your orders</Link> anytime.
      </p>
    </div>
  );
}
