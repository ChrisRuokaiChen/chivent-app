import React, { useContext } from 'react';
import { CartContext }       from '../state/CartContext';
import { AuthContext }       from '../state/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CartPage() {
  const { items, updateQty, removeFromCart, total, checkout } = useContext(CartContext);
  const { user }    = useContext(AuthContext);
  const navigate    = useNavigate();

  if (!items.length) {
    return (
      <div style={{ padding: '6rem 1.5rem' }}>
        <h2>Your Cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ paddingTop: '6rem' }}>
      <h1>Shopping Cart</h1>

      {items.map(item => {
        const ev = item.event ?? item;
        const id = ev._id || ev.id;
        const qty = item.qty;
        const lineTotal = (ev.price || 0) * qty;

        return (
          <div key={id} className="cart-row">
            <img src={ev.imageUrl} alt={ev.title} />

            <div className="main">
              <Link to={`/events/${id}`} className="title">
                {ev.title}
              </Link>
              <p className="location">{ev.location}</p>
              <div className="qty-controls">
                <button onClick={()=>updateQty(id, qty-1)} disabled={qty<=1}>−</button>
                <span>{qty}</span>
                <button onClick={()=>updateQty(id, qty+1)}>+</button>
                <button className="delete" onClick={()=>removeFromCart(id)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="price">${lineTotal.toFixed(2)}</div>
          </div>
        );
      })}

      <div className="cart-summary">
        Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items):{' '}
        <strong>${total.toFixed(2)}</strong>
        <button className="checkout"
          onClick={() => {
            if (!user) return navigate('/signin');
            checkout().then(order =>
              navigate('/success', { state: { order } })
            );
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
