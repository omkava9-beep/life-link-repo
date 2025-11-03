import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './MyProfile.css';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaHandHoldingHeart } from 'react-icons/fa';
import PageLayout from '../components/PageLayout'; // Import PageLayout
import { motion, AnimatePresence } from 'framer-motion';

function MyProfile() {
  const { user } = useAuth();
  const [myDonations, setMyDonations] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError('You must be logged in to view this page.');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const [donationsRes, requestsRes] = await Promise.all([
          api.get('/donations/my-donations'),
          api.get('/requests/my-requests')
        ]);
        
        setMyDonations(donationsRes.data);
        setMyRequests(requestsRes.data);
        setLoading(false);

      } catch (err) {
        setError('Failed to fetch your data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="page-container fade-in-on-load"><h1 className="page-title">Loading Profile...</h1></div>;
  }

  return (
    <PageLayout> {/* Wrap content */}
      <div className="page-container">
        <h1 className="page-title">Welcome, <span>{user?.name}</span></h1>
        
        {error && <p className="form-error-message">{error}</p>}
        
        <div className="profile-grid">
          {/* --- My Donations Section --- */}
          <div className="profile-card">
            <h2 className="profile-card-title"><FaHandHoldingHeart /> My Donations</h2>
            {myDonations.length > 0 ? (
              <ul className="history-list">
                <AnimatePresence>
                  {myDonations.map((item, index) => (
                    <motion.li 
                      key={item._id}
                      className="history-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="item-type">{item.donationType}</span>
                      <span className="item-detail">
                        {item.donationType === 'blood' ? item.bloodGroup : item.medicineName}
                      </span>
                      <span className="item-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <p className="no-items">You have not made any donations yet. <Link to="/donate">Donate Now</Link></p>
            )}
          </div>
          
          {/* --- My Requests Section --- */}
          <div className="profile-card">
            <h2 className="profile-card-title"><FaBoxOpen /> My Requests</h2>
            {myRequests.length > 0 ? (
              <ul className="history-list">
                <AnimatePresence>
                  {myRequests.map((item, index) => (
                    <motion.li 
                      key={item._id}
                      className="history-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="item-type">{item.requestType}</span>
                      <span className="item-detail">
                        {item.requestType === 'blood' ? item.bloodGroup : 
                         item.requestType === 'medicine' ? item.medicineName : item.organNeeded}
                      </span>
                      <span className="item-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <p className="no-items">You have no active requests. <Link to="/request">Request Help</Link></p>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default MyProfile;