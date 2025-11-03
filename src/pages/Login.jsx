import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Form.css';
import PageLayout from '../components/PageLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      setLoading(false);
      login(response.data.user, response.data.token);
      navigate('/my-profile');

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Login failed.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <PageLayout>
      <div className="form-page">
        <div className="form-card">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Log in to manage your donations and requests.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" placeholder="you@example.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" placeholder="••••••••" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            
            {error && <p className="form-error-message">{error}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="form-extra-links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="form-extra-links">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default Login;