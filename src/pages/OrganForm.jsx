import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Form.css';
import './OrganForm.css';
import PageLayout from '../components/PageLayout';

function OrganForm() {
  const { isLoggedIn, user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dob: '',
    contact: '',
    address: '',
    bloodGroup: '',
    relativeName: '',
    relativeRelationship: '',
    relativeContact: '',
  });
  const [organs, setOrgans] = useState({});
  const [tissues, setTissues] = useState({});

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;
    if (type === 'organ') {
      setOrgans({ ...organs, [name]: checked });
    } else {
      setTissues({ ...tissues, [name]: checked });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to make a pledge.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    const pledgeData = {
      ...formData,
      pledgerName: user.name,
      organsToPledge: organs,
      tissuesToPledge: tissues,
    };
    try {
      await api.post('/pledges/create', pledgeData);
      setLoading(false);
      setSuccess('Your pledge has been recorded successfully. Thank you for this incredible gift.');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Failed to submit pledge.');
    }
  };

  return (
    <PageLayout>
      <div className="page-container">
        <div className="form-card organ-form-card">
          <h2>Organ Donation Pledge</h2>
          <p className="form-subtitle">For Organs / Tissue Pledging</p>
          
          {!isLoggedIn && (
            <div className="form-error-message" style={{marginBottom: '20px'}}>
              Please <Link to="/login">login</Link> to make a pledge.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleTextChange} />
            <label>Contact Number</label>
            <input type="tel" name="contact" placeholder="Enter WhatsApp Number" onChange={handleTextChange} required />
            <label>Address for Correspondence</label>
            <input type="text" name="address" placeholder="Address" onChange={handleTextChange} />
            <label>Blood Group (if known)</label>
            <input type="text" name="bloodGroup" placeholder="Enter Blood Group" onChange={handleTextChange} />

            <label>Please Tick Organs to Pledge</label>
            <div className="checkbox-group">
              <label><input type="checkbox" name="Heart" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Heart</label>
              <label><input type="checkbox" name="Lungs" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Lungs</label>
              <label><input type="checkbox" name="Kidney" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Kidney</label>
              <label><input type="checkbox" name="Liver" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Liver</label>
              <label><input type="checkbox" name="Pancreas" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Pancreas</label>
              <label><input type="checkbox" name="Intestine" onChange={(e) => handleCheckboxChange(e, 'organ')} /> Intestine</label>
              <label><input type="checkbox" name="All" onChange={(e) => handleCheckboxChange(e, 'organ')} /> All</label>
            </div>

            <label>Please Tick Tissues to Pledge</label>
            <div className="checkbox-group">
              <label><input type="checkbox" name="Cornea" onChange={(e) => handleCheckboxChange(e, 'tissue')} /> Cornea/Eye Balls</label>
              <label><input type="checkbox" name="Skin" onChange={(e) => handleCheckboxChange(e, 'tissue')} /> Skin</label>
              <label><input type="checkbox" name="Bones" onChange={(e) => handleCheckboxChange(e, 'tissue')} /> Bones</label>
              <label><input type="checkbox" name="HeartValves" onChange={(e) => handleCheckboxChange(e, 'tissue')} /> Heart Valves</label>
              <label><input type="checkbox" name="All" onChange={(e) => handleCheckboxChange(e, 'tissue')} /> All</label>
            </div>
            
            <h3>Details of Relative</h3>
            <label>Name</label>
            <input type="text" name="relativeName" placeholder="Relative Name" onChange={handleTextChange} />
            <label>Relationship</label>
            <input type="text" name="relativeRelationship" placeholder="Relationship" onChange={handleTextChange} />
            <label>Contact Number</label>
            <input type="tel" name="relativeContact" placeholder="Contact Number" onChange={handleTextChange} />
            
            <div className="notes">
              <b>Note:</b><br />
              1. Organ donation is a family decision. Discuss your choice with your family.<br />
              2. Keep a copy of this form and inform your family about your wishes.<br />
            </div>

            {error && <p className="form-error-message">{error}</p>}
            {success && <p className="form-success-message">{success}</p>}

            <button type="submit" className="submit-btn" disabled={loading || !isLoggedIn}>
              {loading ? 'Submitting Pledge...' : 'Submit Pledge'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
export default OrganForm;