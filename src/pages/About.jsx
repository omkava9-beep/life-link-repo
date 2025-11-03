import React from 'react';
import './About.css';
// import Footer from '../components/Footer'; // <-- REMOVED
import FadeIn from '../components/FadeIn';
import PageLayout from '../components/PageLayout';

const developerAvatar = "https://avatar.iran.liara.run/public/boy";

function About() {
  return (
    <PageLayout>
      {/* This div applies the centered margin to the page title */}
      <div className="page-container"> 
        <h1 className="page-title">About <span>LifeLink</span></h1>
      </div>

      <FadeIn>
        {/* We apply page-container again to this section for centering */}
        <div className="page-container">
          <div className="about-box">
            <h2>Connecting Hearts, Saving Lives</h2>
            <p>
              <span className="highlight">LifeLink</span> is a compassionate initiative dedicated to creating a seamless and efficient digital platform for <strong>blood, medicine, or organ donation</strong>. We believe in the power of community and technology to save lives. Our mission is to connect donors with recipients quickly, safely, and reliably, ensuring that no one is left without hope in their time of need.
            </p>

            <div className="mission-vision">
              <div className="card">
                <h3>Our Mission</h3>
                <p>To bridge the gap between donors and recipients by fostering a community driven by empathy, trust, and social responsibility — ensuring that help is always just a click away.</p>
              </div>
              <div className="card">
                <h3>Our Vision</h3>
                <p>To become a global digital network where no life is lost due to the unavailability of resources — a future where compassion and technology unite for humanity’s well-being.</p>
              </div>
            </div>
          </div>
        </div>
        
      </FadeIn>
        
        <FadeIn>
          <div className="team-section page-container"> {/* <-- Added page-container */}
            <h2 className="section-title">Meet The Developer</h2>
            <div className="team-members">
              <div className="member">
                <img src={developerAvatar} alt="Developer Om Kava" />
                <h4>Om kava</h4>
                <p>Developer of this whole website</p>
              </div>
            </div>
          </div>
        </FadeIn>
      
      {/* <Footer /> REMOVED */}
    </PageLayout>
  );
}

export default About;