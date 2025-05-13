import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../state/AuthContext';

export default function SignInPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }               = useContext(AuthContext);
  const navigate                = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign-in failed');
    }
  }

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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

        <button type="submit">Sign In</button>

        <p className="form-footer">
          New user? <Link to="/signup">Sign Up</Link>
        </p>

        <p className="form-footer">
          or <Link to="/">Back to Home</Link>
        </p>
      </form>
    </div>
  );
}
