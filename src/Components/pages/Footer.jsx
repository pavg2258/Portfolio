import React from "react";
import "../page-css/Footer.css";
import { NavLink } from "react-router-dom";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Glow Line */}
      <div className="footer-glow-line" aria-hidden="true"></div>

      <div className="footer-content">
        {/* Left — Brand */}
        <div className="footer-brand">
          <h3 className="footer-logo">
            Innovex<span className="footer-logo-dot">.</span>
          </h3>
          <p className="footer-brand-tagline">
            Securing systems by thinking like an attacker.
          </p>
        </div>

        {/* Center — Quick Links */}
        <div className="footer-links">
          <h4 className="footer-links-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li><NavLink to="/" className="footer-link">Home</NavLink></li>
            <li><NavLink to="/about" className="footer-link">About</NavLink></li>
            <li><NavLink to="/skills" className="footer-link">Skills</NavLink></li>
            <li><NavLink to="/projects" className="footer-link">Projects</NavLink></li>
            <li><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
            <li><NavLink to="/cv" className="footer-link">CV</NavLink></li>
          </ul>
        </div>

        {/* Right — Social & Contact */}
        <div className="footer-social">
          <h4 className="footer-links-heading">Connect</h4>
          <div className="footer-social-icons">
            <a
              href="https://in.linkedin.com/in/kottu-pavan-ganesh"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/pavg2258"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:kottupavang@gmail.com"
              className="footer-social-icon"
              aria-label="Email"
            >
              <MdEmail />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {date} Innovex. All rights reserved.
        </p>
        <p className="footer-built-with">
          Built with <span className="footer-heart">❤</span> & passion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
