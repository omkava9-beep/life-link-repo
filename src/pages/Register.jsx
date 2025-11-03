import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './Form.css';
import PageLayout from '../components/PageLayout'; // Import PageLayout

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      setLoading(false);
      alert('Registration successful! Please log in.');
      navigate('/login');

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Registration failed.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <PageLayout> {/* Wrap content */}
      <div className="form-page">
        <div className="form-card">
          <h2>Create Account</h2>
          <p className="form-subtitle">Join our community to save lives.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text" id="name" placeholder="Enter your full name" required
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" placeholder="you@example.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" placeholder="Create a strong password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password" id="confirmPassword" placeholder="Confirm your password" required
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            {error && <p className="form-error-message">{error}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="form-extra-links">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default Register;