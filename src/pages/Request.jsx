import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Form.css';
import PageLayout from '../components/PageLayout'; // Import PageLayout

function Request() {
  const [requestType, setRequestType] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [bloodGroup, setBloodGroup] = useState('');
  const [unitsNeeded, setUnitsNeeded] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [organNeeded, setOrganNeeded] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to make a request.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    const requestData = {
      contact, location, requestType, urgency,
      bloodGroup, unitsNeeded, medicineName,
      organNeeded, hospitalName
    };
    try {
      await api.post('/requests/create', requestData);
      setLoading(false);
      setSuccess('Request submitted successfully! We will connect you soon.');
      setRequestType(''); setContact(''); setLocation(''); setBloodGroup('');
      setUnitsNeeded(''); setMedicineName(''); setOrganNeeded(''); setHospitalName('');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Failed to submit request.');
    }
  };

  return (
    <PageLayout> {/* Wrap content */}
      <div className="form-page">
        <div className="form-card">
          <h2>Request Help</h2>
          <p className="form-subtitle">Let us know what you need.</p>
          
          {!isLoggedIn && (
            <div className="form-error-message">
              Please <Link to="/login">login</Link> to make a request.
            </div>
          )}
          
          <form id="requestForm" onSubmit={handleSubmit}>
            <label htmlFor="contact">Contact Number</label>
            <input type="tel" id="contact" placeholder="Enter your contact number" required
              value={contact} onChange={(e) => setContact(e.target.value)} />
            <label htmlFor="location">Location (City)</label>
            <input type="text" id="location" placeholder="Enter your city or area" required
              value={location} onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor="type">Request Type</label>
            <select id="type" required value={requestType}
              onChange={(e) => setRequestType(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="blood">Blood</option>
              <option value="medicine">Medicine</option>
              <option value="organ">Organ</option>
            </select>

            {requestType === 'blood' && (
              <div className="form-section">
                <label>Blood Group</label>
                <input type="text" placeholder="e.g., O+ or AB-"
                  value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
                <label>Number of Units</label>
                <input type="number" placeholder="Enter required units"
                  value={unitsNeeded} onChange={(e) => setUnitsNeeded(e.target.value)} />
              </div>
            )}
            {requestType === 'medicine' && (
              <div className="form-section">
                <label>Medicine Name</label>
                <input type="text" placeholder="Enter medicine name"
                  value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
              </div>
            )}
            {requestType === 'organ' && (
              <div className="form-section">
                <label>Organ Needed</label>
                <input type="text" placeholder="e.g., Kidney, Heart"
                  value={organNeeded} onChange={(e) => setOrganNeeded(e.target.value)} />
                <label>Hospital Name</label>
                <input type="text" placeholder="Enter hospital name"
                  value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
              </div>
            )}
            
            <label>Urgency Level</label>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
              <option>Normal</option>
              <option>Urgent</option>
              <option>Critical</option>
            </select>

            {error && <p className="form-error-message">{error}</p>}
            {success && <p className="form-success-message">{success}</p>}

            <button type="submit" className="submit-btn alt" disabled={loading || !isLoggedIn}>
              {loading ? 'Submitting...' : 'Submit Urgent Request'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
export default Request;