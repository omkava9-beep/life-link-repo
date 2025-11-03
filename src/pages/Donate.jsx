import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Form.css';
import PageLayout from '../components/PageLayout'; // Import PageLayout

function Donate() {
  const [donationType, setDonationType] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to make a donation.');
      return;
    }
    if (donationType === 'organ') {
      setError('Please use the dedicated organ pledge form link below.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    let donationData = { contact, location, donationType };
    if (donationType === 'blood') {
      donationData.bloodGroup = bloodGroup;
    } else if (donationType === 'medicine') {
      donationData.medicineName = medicineName;
      donationData.expiryDate = expiryDate;
    }
    try {
      await api.post('/donations/create', donationData);
      setLoading(false);
      setSuccess('Donation registered successfully! Thank you.');
      setDonationType(''); setContact(''); setLocation(''); setBloodGroup(''); setMedicineName(''); setExpiryDate('');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Failed to submit donation.');
    }
  };

  return (
    <PageLayout> {/* Wrap content */}
      <div className="form-page">
        <div className="form-card">
          <h2>Donation Form</h2>
          <p className="form-subtitle">Register a blood or medicine donation.</p>
          
          {!isLoggedIn && (
            <div className="form-error-message">
              Please <Link to="/login">login</Link> to register a donation.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="contact">Contact Number</label>
            <input type="tel" id="contact" placeholder="Enter contact number" required
              value={contact} onChange={(e) => setContact(e.target.value)} />
            <label htmlFor="location">Location (City)</label>
            <input type="text" id="location" placeholder="Enter your location" required
              value={location} onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor="donationType">What do you want to donate?</label>
            <select id="donationType" required value={donationType}
              onChange={(e) => {
                setDonationType(e.target.value);
                setError('');
              }}>
              <option value="">-- Select --</option>
              <option value="blood">Blood</option>
              <option value="medicine">Medicine</option>
              <option value="organ">Organ (Pledge)</option>
            </select>

            {donationType === 'blood' && (
              <div className="form-section">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
            )}
            {donationType === 'medicine' && (
              <div className="form-section">
                <label htmlFor="medName">Medicine Name</label>
                <input type="text" id="medName" placeholder="Enter medicine name"
                  value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
                <label htmlFor="expDate">Expiry Date</label>
                <input type="date" id="expDate"
                  value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
            )}
            {donationType === 'organ' && (
              <div className="form-section" style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                  Organ donation is a detailed pledge. Please use our secure, dedicated form.
                </p>
                <Link to="/organ-form" className="submit-btn" style={{ 
                    marginTop: '15px', 
                    textDecoration: 'none',
                    display: 'block'
                  }}>
                  Go to Organ Pledge Form
                </Link>
              </div>
            )}
            
            {error && <p className="form-error-message">{error}</p>}
            {success && <p className="form-success-message">{success}</p>}

            {donationType !== 'organ' && (
              <button type="submit" className="submit-btn" disabled={loading || !isLoggedIn}>
                {loading ? 'Submitting...' : 'Submit Donation'}
              </button>
            )}
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default Donate;