import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Browse.css';
import { FaMapMarkerAlt, FaUser, FaPhone } from 'react-icons/fa';
import PageLayout from '../components/PageLayout'; // <-- This was the fix

// Card component
function DonationCard({ donation }) {
  const { isLoggedIn, user } = useAuth();
  const [showContact, setShowContact] = useState(false);

  const getDetail = () => {
    if (donation.donationType === 'blood') {
      return `Blood Group: ${donation.bloodGroup}`;
    }
    if (donation.donationType === 'medicine') {
      return `Medicine: ${donation.medicineName}`;
    }
    return '';
  };

  return (
    <div className="browse-card">
      <div className={`card-header ${donation.donationType}`}>
        {donation.donationType}
      </div>
      <div className="card-body">
        <h3 className="card-detail">{getDetail()}</h3>
        <p className="card-info"><FaUser /> {donation.donorName}</p>
        <p className="card-info"><FaMapMarkerAlt /> {donation.location}</p>
        <p className="card-date">Posted: {new Date(donation.createdAt).toLocaleDateString()}</p>
        
        {/* "Show Contact" logic */}
        <div className="contact-section">
          {isLoggedIn && user._id !== donation.user ? (
            !showContact ? (
              <button className="contact-btn" onClick={() => setShowContact(true)}>
                Show Contact
              </button>
            ) : (
              <p className="contact-info"><FaPhone /> {donation.contact}</p>
            )
          ) : !isLoggedIn ? (
            <p className="contact-login-prompt">
              <Link to="/login">Login</Link> to see contact info
            </p>
          ) : (
             <p className="contact-login-prompt">This is your post.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Main page component
function BrowseDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const res = await api.get('/donations/all');
        
        let allDonations = res.data;
        if (isLoggedIn) {
           allDonations = allDonations.filter(item => item.user !== user._id);
        }
        setDonations(allDonations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donations", err);
        setLoading(false);
      }
    };
    fetchDonations();
  }, [isLoggedIn, user]);

  const filteredDonations = donations.filter(donation => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = (
      donation.donorName.toLowerCase().includes(query) ||
      donation.location.toLowerCase().includes(query) ||
      (donation.bloodGroup && donation.bloodGroup.toLowerCase().includes(query)) ||
      (donation.medicineName && donation.medicineName.toLowerCase().includes(query))
    );
    const matchesType = (
      filterType === 'all' || 
      donation.donationType === filterType
    );
    return matchesQuery && matchesType;
  });

  return (
    <PageLayout>
      <div className="page-container">
        <h1 className="page-title">Available <span>Donations</span></h1>
        
        <div className="filter-container">
          <input 
            type="text" 
            placeholder="Search by name, location, blood group..." 
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} 
          />
          <select 
            className="filter-select"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="blood">Blood</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>
        
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading donations...</p>
        ) : (
          <div className="browse-grid">
            {filteredDonations.length > 0 ? (
              filteredDonations.map(item => (
                <DonationCard 
                  key={item._id} 
                  donation={item} 
                />
              ))
            ) : (
              <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No donations match your criteria.</p>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default BrowseDonations;