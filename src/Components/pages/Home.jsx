import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../page-css/Home.css";

import { NavLink } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "Cybersecurity Professional | Innovex Portfolio";
  }, []);

  return (
    <div className="home-container">

      {/* Cinematic Backlight - Blends perfectly with your dark background */}
      <div className="home-cinematic-backlight" aria-hidden="true"></div>

      <div className="home-content-container">

        {/* Premium Pre-Heading Accent */}
        <div className="home-pre-heading-container">
          <span className="home-accent-line"></span>
          <span className="home-pre-heading-text">INNOVEX PORTFOLIO</span>
          <span className="home-accent-line"></span>
        </div>

        <h1 className="home-heading">
          Cybersecurity<br />
          <span className="home-highlight">Professional</span>
        </h1>

        <div className="home-subtitle-container">
          <span className="home-role">Penetration Tester</span>
          <span className="home-role-dot"></span>
          <span className="home-role">Security Researcher</span>
          <span className="home-role-dot"></span>
          <span className="home-role">Bug Hunter</span>
        </div>

        <NavLink to={`/about`} className="home-cta-wrapper" tabIndex="-1">
          <button className="home-premium-btn">
            <span className="btn-text">Get Started</span>
            <div className="btn-glow-sweep"></div>
          </button>
        </NavLink>

      </div>
    </div>
  );
};

export default Home;