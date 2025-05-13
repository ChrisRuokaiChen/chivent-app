import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../state/AuthContext';

export default function SignUpPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }               = useContext(AuthContext);
  const navigate                = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign-up failed');
    }
  }

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
          />
        </label>

        <button type="submit">Sign Up</button>

        <p className="form-footer">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>

        <p className="form-footer">
          or <Link to="/">Back to Home</Link>
        </p>
      </form>
    </div>
  );
}
