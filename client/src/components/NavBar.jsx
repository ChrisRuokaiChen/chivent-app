import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../state/AuthContext';
import { CartContext } from '../state/CartContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { items }       = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">Chivent</Link>
        <div className="nav-links">
          {!user && <Link to="/signin" className="nav-link">Sign In</Link>}
          {user && (
            <>
              <Link to="/cart" className="nav-link">
                Cart ({items.length})
              </Link>
              <div className="user-menu">
                <span className="username">
                  Hello, {user.email.split('@')[0]}
                </span>
                <div className="dropdown">
                  <Link to="/account" className="dropdown-item">Account</Link>
                  <Link to="/orders"  className="dropdown-item">Orders</Link>
                  <button onClick={logout} className="dropdown-item">
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
