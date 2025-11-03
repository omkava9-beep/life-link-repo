import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaHeartbeat, FaHandsHelping } from 'react-icons/fa';
import './Home.css';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import PageLayout from '../components/PageLayout'; // Import PageLayout

function Home() {
  return (
    <PageLayout> {/* Wrap content */}
      <div className="home-page-wrapper">
        {/* --- HERO SECTION --- */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Link to <span>Life</span>
            </h1>
            <p className="hero-subtitle">Connecting hearts, donating hope, and saving lives.</p>
            <div className="hero-cta-buttons">
              <Link to="/donate" className="btn btn-primary-hero">Donate Now</Link>
              <Link to="/request" className="btn btn-secondary-hero">Request Help</Link>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <FadeIn>
          <section className="how-it-works">
            <h2 className="section-title">How LifeLink Works</h2>
            <div className="steps-container">
              <FadeIn delay={0}>
                <div className="step-card">
                  <FaUserPlus className="step-icon" />
                  <h3>1. Register</h3>
                  <p>Create a secure account to join our trusted community of donors and recipients.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="step-card">
                  <FaHeartbeat className="step-icon" />
                  <h3>2. Donate</h3>
                  <p>Pledge a donation—be it blood, medicine, or an organ—and become a hero.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="step-card">
                  <FaHandsHelping className="step-icon" />
                  <h3>3. Request</h3>
                  <p>Submit a request, and we'll connect you with our network of compassionate donors.</p>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        {/* --- ABOUT SNIPPET SECTION --- */}
        <FadeIn>
          <section className="about-snippet">
            <div className="about-snippet-content">
              <h2 className="section-title">Our Mission</h2>
              <p>
                To bridge the gap between donors and recipients by fostering a community driven by empathy,
                trust, and social responsibility — ensuring that help is always just a click away.
              </p>
              <Link to="/about" className="btn btn-primary-hero">Learn More About Us</Link>
            </div>
          </section>
        </FadeIn>

        <Footer />
      </div>
    </PageLayout> 
  );
}

export default Home;