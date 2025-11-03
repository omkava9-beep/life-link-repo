import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Form.css';
import PageLayout from '../components/PageLayout'; // Import PageLayout

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email, newPassword });
      setLoading(false);
      setSuccess(res.data.message || "Password updated successfully!");
      setEmail('');
      setNewPassword('');

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Failed to reset password.');
    }
  };

  return (
    <PageLayout> {/* Wrap content */}
      <div className="form-page">
        <div className="form-card">
          <h2>Forgot Password?</h2>
          <p className="form-subtitle">
            Enter your email and a new password.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
              
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" placeholder="Enter new strong password" required
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            {error && <p className="form-error-message">{error}</p>}
            {success && <p className="form-success-message">{success}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="form-extra-links">
            Remembered your password? <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ForgotPassword;