import React, { useEffect } from "react";
import "../page-css/About.css";

import { NavLink } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBomb,
  FaNetworkWired,
  FaTerminal,
} from "react-icons/fa";

import Footer from "./Footer";

const About = () => {
  useEffect(() => {
    document.title = "About Me | Innovex Portfolio";
  }, []);

  return (
    <>
      <div className="about-page-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <div className="about-hero-content">
            <h1 className="about-heading">About Me</h1>
            <h1 className="about-hero-heading">
              Offensive Security{" "}
              <span className="about-highlight">Specialist</span>
            </h1>
            <p className="about-hero-subtitle">
              Red Team Enthusiast | Ethical Hacker | Security Researcher
            </p>
          </div>
        </div>

        {/* Main About Section */}
        <div className="about-main-section">
          {/* Left Content */}
          <div className="about-left-content">
            <div className="about-card">
              {/* Decorative layers */}
              <div className="about-card-texture" aria-hidden="true" />
              <div className="about-card-sheen" aria-hidden="true" />

              {/* Status badge */}
              <div className="about-card-badge">
                <span className="about-card-badge-dot" />
                Red Team Operator
              </div>

              <h2 className="about-section-title">Who I Am</h2>
              <p className="about-description-text">
                I'm a passionate beginner Red Team operator on a mission to
                master offensive security techniques and think like an attacker.
                I'm actively learning penetration testing, social engineering,
                and exploitation methods to help organizations identify and fix
                vulnerabilities before real attackers find them.
              </p>
              <p className="about-description-text">
                My journey in Red Teaming has just begun, and I'm dedicated to
                building hands-on skills through practice labs, CTF challenges,
                and real-world scenarios. I believe understanding attack vectors
                is the key to building stronger defenses and creating more
                secure systems.
              </p>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="about-right-content">
            <div className="about-highlights-grid">
              <div className="about-highlight-card">
                <div className="about-highlight-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Reconnaissance</h3>
                <p>
                  Gathering information and identifying targets systematically
                </p>
              </div>

              <div className="about-highlight-card">
                <div className="about-highlight-icon">
                  <FaBomb />
                </div>
                <h3>Exploitation</h3>
                <p>
                  Learning to craft and deliver precise exploits responsibly
                </p>
              </div>

              <div className="about-highlight-card">
                <div className="about-highlight-icon">
                  <FaNetworkWired />
                </div>
                <h3>Lateral Movement</h3>
                <p>Understanding network traversal and privilege escalation</p>
              </div>

              <div className="about-highlight-card">
                <div className="about-highlight-icon">
                  <FaTerminal />
                </div>
                <h3>Post-Exploitation</h3>
                <p>Maintaining access and gathering intelligence ethically</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-values-section">
          <h2 className="about-values-title">Core Principles</h2>
          <div className="about-values-grid">
            <div className="about-value-item">
              <div className="about-value-number">01</div>
              <h3>Ethical Focus</h3>
              <p>Always operating within legal and authorized boundaries</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-number">02</div>
              <h3>Continuous Learning</h3>
              <p>Constantly evolving skills through CTF challenges and labs</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-number">03</div>
              <h3>Creative Thinking</h3>
              <p>Finding unconventional solutions and attack vectors</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-number">04</div>
              <h3>Knowledge Sharing</h3>
              <p>Exchange of information, skills, and expertise to help others learn and grow.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          {/* Decorative layers */}
          <div className="cta-grid-texture" aria-hidden="true" />
          {/* <div className="about-cta-inner-sheen" aria-hidden="true" /> */}

          {/* Live badge */}
          <div className="about-cta-badge">
            <span className="about-cta-badge-dot" />
            Open to Collaborate
          </div>

          <h2>Let's Test Security Together</h2>
          <p>
            Interested in discussing Red Team strategies, sharing security
            insights, or collaborating on ethical hacking projects? Let's
            connect!
          </p>

          <div className="about-cta-buttons-row">
            <NavLink to="/contact" className="about-cta-button">
              Get In Touch
            </NavLink>
            <NavLink to="/projects" className="about-cta-button-ghost">
              View Projects
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
