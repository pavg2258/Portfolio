import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../page-css/Navbar.css";

import portfolioImg from "../../assets/portfolio-logo.jpg";

const navLinks = [
  { id: "HOME", route: "/", title: "Home" },
  { id: "ABOUT", route: "/about", title: "About" },
  { id: "SKILLS", route: "/skills", title: "Skills" },
  { id: "PROJECTS", route: "/projects", title: "Projects" },
  { id: "CONTACT", route: "/contact", title: "Contact" },
  { id: "CURRICULUM_VITAE", route: "/cv", title: "CV" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo-menu-container">

        {/* Left: Your Original Logo Design */}
        <div className="navbar-logo-container">
          <NavLink exact to="/" className="navbar-logo-link-container">
            <img src={portfolioImg} alt="Logo" className="navbar-logo" />
            <p className="navbar-logo-name">Innovex</p>
          </NavLink>
        </div>

        {/* Center: Your Original Desktop Menu */}
        <ul className="navbar-menu-list-container">
          {navLinks.map((eachLink) => (
            <li key={eachLink.id} className="nav-item-wrapper">
              <NavLink
                exact={eachLink.route === "/"}
                to={eachLink.route}
                className="navbar-menu-item"
                activeClassName="active"
              >
                {eachLink.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Mobile Hamburger Toggle (Hidden on Desktop) */}
        <div
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay (Hidden on Desktop) */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          {navLinks.map((eachLink) => (
            <li key={`mobile-${eachLink.id}`}>
              <NavLink
                exact={eachLink.route === "/"}
                to={eachLink.route}
                className="mobile-menu-item"
                activeClassName="active"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {eachLink.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;