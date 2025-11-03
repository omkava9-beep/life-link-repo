import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Browse.css';
import { FaMapMarkerAlt, FaUser, FaPhone } from 'react-icons/fa';
import PageLayout from '../components/PageLayout'; // <-- This was the fix

// Card component
function RequestCard({ request }) {
  const { isLoggedIn, user } = useAuth();
  const [showContact, setShowContact] = useState(false);
  
  const getDetail = () => {
    if (request.requestType === 'blood') {
      return `Needs: ${request.bloodGroup} Blood (${request.unitsNeeded || 0} units)`;
    }
    if (request.requestType === 'medicine') {
      return `Needs: ${request.medicineName}`;
    }
    if (request.requestType === 'organ') {
      return `Needs: ${request.organNeeded} (at ${request.hospitalName})`;
    }
    return '';
  };

  return (
    <div className="browse-card">
      <div className={`card-header ${request.requestType} ${request.urgency.toLowerCase()}`}>
        {request.requestType}
        <span className="urgency-pill">{request.urgency}</span>
      </div>
      <div className="card-body">
        <h3 className="card-detail">{getDetail()}</h3>
        <p className="card-info"><FaUser /> {request.requesterName}</p>
        <p className="card-info"><FaMapMarkerAlt /> {request.location}</p>
        <p className="card-date">Posted: {new Date(request.createdAt).toLocaleDateString()}</p>
        
        {/* "Show Contact" logic */}
        <div className="contact-section">
          {isLoggedIn && user._id !== request.user ? (
            !showContact ? (
              <button className="contact-btn" onClick={() => setShowContact(true)}>
                Show Contact
              </button>
            ) : (
              <p className="contact-info"><FaPhone /> {request.contact}</p>
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
function BrowseRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get('/requests/all');
        
        let allRequests = res.data;
        if (isLoggedIn) {
          allRequests = allRequests.filter(item => item.user !== user._id);
        }
        setRequests(allRequests);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests", err);
        setLoading(false);
      }
    };
    fetchRequests();
  }, [isLoggedIn, user]);

  const filteredRequests = requests.filter(request => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = (
      request.requesterName.toLowerCase().includes(query) ||
      request.location.toLowerCase().includes(query) ||
      (request.bloodGroup && request.bloodGroup.toLowerCase().includes(query)) ||
      (request.medicineName && request.medicineName.toLowerCase().includes(query)) ||
      (request.organNeeded && request.organNeeded.toLowerCase().includes(query)) ||
      (request.hospitalName && request.hospitalName.toLowerCase().includes(query))
    );
    const matchesType = (
      filterType === 'all' || 
      request.requestType === filterType
    );
    const matchesUrgency = (
      filterUrgency === 'all' ||
      request.urgency === filterUrgency
    );
    return matchesQuery && matchesType && matchesUrgency;
  });

  return (
    <PageLayout>
      <div className="page-container">
        <h1 className="page-title">Open <span>Requests</span></h1>
        
        <div className="filter-container">
          <input 
            type="text" 
            placeholder="Search by name, location, item..." 
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
            <option value="organ">Organ</option>
          </select>
          <select 
            className="filter-select"
            value={filterUrgency}
            onChange={e => setFilterUrgency(e.target.value)}
          >
            <option value="all">All Urgencies</option>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading requests...</p>
        ) : (
          <div className="browse-grid">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(item => (
                <RequestCard 
                  key={item._id} 
                  request={item} 
                />
              ))
            ) : (
              <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No requests match your criteria.</p>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default BrowseRequests;