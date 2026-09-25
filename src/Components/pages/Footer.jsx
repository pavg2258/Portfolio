import React from "react";
import "../page-css/Footer.css";
import { NavLink } from "react-router-dom";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Share2 } from "lucide-react";

import portfolioImg from "../../assets/portfolio-logo.svg";

const footerLinks = [
  { id: "HOME", route: "/", title: "Home" },
  { id: "ABOUT", route: "/about", title: "About" },
  { id: "SKILLS", route: "/skills", title: "Skills" },
  { id: "PROJECTS", route: "/projects", title: "Projects" },
  { id: "CONTACT", route: "/contact", title: "Contact" },
  { id: "CURRICULUM_VITAE", route: "/cv", title: "CV" },
];

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Glow Line */}
      <div className="footer-glow-line" aria-hidden="true"></div>

      <div className="footer-content">
        {/* Left — Brand */}
        <div className="footer-brand">
          <div className="footer-img-heading-container">
            <img src={portfolioImg} alt="Logo" className="footer-logo-img" />
            <h3 className="footer-logo">
              Innovex<span className="footer-logo-dot">.</span>
            </h3>
          </div>
          <p className="footer-brand-tagline">
            Securing systems by thinking like an attacker.
          </p>
        </div>

        {/* Center — Quick Links */}
        <div className="footer-links">
          <h4 className="footer-links-heading">
            <Link size={16} className="footer-heading-icon" /> Quick Links
          </h4>
          <ul className="footer-links-list">
            {footerLinks.map(eachLink => (
              <li key={eachLink.id}>
                <NavLink
                  to={eachLink.route}
                  end={eachLink.route === "/"}
                  className={({ isActive }) =>
                    `footer-link${isActive ? " active" : ""}`
                  }
                >
                  {eachLink.title}
                </NavLink>
              </li>
            ))}
            {/* <li><NavLink to="/about" className="footer-link">About</NavLink></li>
            <li><NavLink to="/skills" className="footer-link">Skills</NavLink></li>
            <li><NavLink to="/projects" className="footer-link">Projects</NavLink></li>
            <li><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
            <li><NavLink to="/cv" className="footer-link">CV</NavLink></li> */}
          </ul>
        </div>

        {/* Right — Social & Contact */}
        <div className="footer-social">
          <h4 className="footer-links-heading">
            <Share2 size={16} className="footer-heading-icon" /> Connect
          </h4>
          <div className="footer-social-icons">

            <div className="tooltip-container tooltip-trigger">
              <a
                href="https://in.linkedin.com/in/kottu-pavan-ganesh"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
                <span className="tooltip-text bottom">LinkedIn</span>
              </a>
            </div>

            <div className="tooltip-container tooltip-trigger">
              <a
                href="https://github.com/pavg2258"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
                <span className="tooltip-text bottom">GitHub</span>
              </a>
            </div>

            <div className="tooltip-container tooltip-trigger">
              <a
                href="mailto:kottupavang@gmail.com"
                className="footer-social-icon"
                aria-label="Email"
              >
                <MdEmail />
                <span className="tooltip-text bottom">Send Email</span>
              </a>
            </div>

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
