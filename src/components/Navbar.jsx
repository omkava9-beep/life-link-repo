import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <FaHeartbeat className="navbar-icon" />
          LifeLink
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu} end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/browse-donations" className="nav-link" onClick={closeMobileMenu}>
              Find Donations
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/browse-requests" className="nav-link" onClick={closeMobileMenu}>
              Find Requests
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/organ-form" className="nav-link" onClick={closeMobileMenu}>
              Pledge Organs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/donate" className="nav-link" onClick={closeMobileMenu}>
              Donate
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/request" className="nav-link" onClick={closeMobileMenu}>
              Request
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>
              About
            </NavLink>
          </li>
          
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink to="/my-profile" className="nav-link" onClick={closeMobileMenu}>
                  My Profile
                </NavLink>
              </li>
              <li className="nav-item-cta">
                <button className="nav-link-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item-cta">
                <Link to="/login" className="nav-link-btn" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item-cta primary">
                <Link to="/register" className="nav-link-btn" onClick={closeMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;