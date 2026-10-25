import React, { useEffect } from "react";
import "../page-css/About.css";

import { NavLink } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBomb,
  FaNetworkWired,
  FaTerminal,
  FaShieldAlt,
  FaGraduationCap,
  FaBrain,
  FaShareAlt,
  FaPaperPlane,
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
            {/* Pre-Heading Caption */}
            {/* <div className="about-tiny-heading-wrapper">
              <span className="about-tiny-line" aria-hidden="true"></span>
              <span className="about-tiny-heading">Personal Overview</span>
              <span className="about-tiny-line" aria-hidden="true"></span>
            </div> */}

            <h1 className="about-heading">About Me</h1>
            <h1 className="about-hero-heading">
              Offensive Security{" "}
              <span className="about-highlight">Specialist</span>
            </h1>
            <div className="about-hero-subtitle-container">
              <span className="about-hero-role">Red Team Enthusiast</span>
              <span className="about-hero-role-dot" aria-hidden="true" />
              <span className="about-hero-role">Ethical Hacker</span>
              <span className="about-hero-role-dot" aria-hidden="true" />
              <span className="about-hero-role">Security Researcher</span>
            </div>
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

        {/* Values / Core Principles Section */}
        <div className="about-values-section">
          <div className="about-values-header-wrapper">
            <span className="about-values-eyebrow">Guiding Philosophy</span>
            <h2 className="about-values-title">Core Principles</h2>
          </div>

          <div className="about-values-grid">
            <div className="about-value-item principle-cyan">
              <div className="about-value-header">
                <div className="about-value-icon-box">
                  <FaShieldAlt />
                </div>
                <span className="about-value-number">// 01</span>
              </div>
              <div className="about-value-body">
                <span className="about-value-tag">Integrity &amp; Scope</span>
                <h3 className="about-value-title-text">Ethical Focus</h3>
                <p className="about-value-desc">
                  Operating strictly with authorized permission and defined scope, ensuring every test identifies vulnerabilities responsibly without disrupting systems.
                </p>
              </div>
              <div className="about-value-corner-accent" aria-hidden="true" />
            </div>

            <div className="about-value-item principle-amber">
              <div className="about-value-header">
                <div className="about-value-icon-box">
                  <FaGraduationCap />
                </div>
                <span className="about-value-number">// 02</span>
              </div>
              <div className="about-value-body">
                <span className="about-value-tag">Hands-on Labs</span>
                <h3 className="about-value-title-text">Continuous Learning</h3>
                <p className="about-value-desc">
                  Staying ahead of evolving threats through daily hands-on practice, analyzing real-world vulnerabilities, and building skills in CTF labs.
                </p>
              </div>
              <div className="about-value-corner-accent" aria-hidden="true" />
            </div>

            <div className="about-value-item principle-red">
              <div className="about-value-header">
                <div className="about-value-icon-box">
                  <FaBrain />
                </div>
                <span className="about-value-number">// 03</span>
              </div>
              <div className="about-value-body">
                <span className="about-value-tag">Attack Vectors</span>
                <h3 className="about-value-title-text">Creative Thinking</h3>
                <p className="about-value-desc">
                  Thinking like an attacker to uncover hidden logic flaws and unconventional paths that automated scanners and standard defenses often overlook.
                </p>
              </div>
              <div className="about-value-corner-accent" aria-hidden="true" />
            </div>

            <div className="about-value-item principle-green">
              <div className="about-value-header">
                <div className="about-value-icon-box">
                  <FaShareAlt />
                </div>
                <span className="about-value-number">// 04</span>
              </div>
              <div className="about-value-body">
                <span className="about-value-tag">Community</span>
                <h3 className="about-value-title-text">Knowledge Sharing</h3>
                <p className="about-value-desc">
                  Documenting research, sharing actionable write-ups, and collaborating with developers and peers to build safer, more resilient software.
                </p>
              </div>
              <div className="about-value-corner-accent" aria-hidden="true" />
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
              <FaPaperPlane className="cta-icon-plane" aria-hidden="true" />
              <span>Get In Touch</span>
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
