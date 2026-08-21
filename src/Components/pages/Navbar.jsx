import React, { useState } from "react";
import "../page-css/navbar.css";
import { NavLink } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import portfolioImg from "../../assets/portfolio-logo.jpg";

const navLinks = [
  {
    id: "HOME",
    route: "/",
    title: "Home",
  },
  {
    id: "ABOUT",
    route: "/about",
    title: "About",
  },
  {
    id: "SKILLS",
    route: "/skills",
    title: "Skills",
  },
  {
    id: "PROJECTS",
    route: "/projects",
    title: "Projects",
  },
  {
    id: "CONTACT",
    route: "/contact",
    title: "Contact",
  },
  {
    id: "CURRICULUM_VITAE",
    route: "/cv",
    title: "CV",
  },
];

const Navbar = () => {
  // const [hoveredThemeBtn, setHoveredThemeBtn] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-logo-menu-container">
        <div className="navbar-logo-container">
          <a href="/" className="navbar-logo-link-container">
            <img src={portfolioImg} alt="Logo" className="navbar-logo" />
            <p className="navbar-logo-name">Innovex</p>
          </a>
        </div>
        <ul className="navbar-menu-list-container">
          {navLinks.map((eachLink) => (
            <NavLink
              key={eachLink.id}
              to={eachLink.route}
              title={eachLink.title}
              className="navbar-menu-item"
              activeClassName="active"
            >
              <li key={eachLink.id}>{eachLink.title}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      {/* <button
        className="navbar-light-dark-btn"
        onMouseEnter={() => setHoveredThemeBtn(true)}
        onMouseLeave={() => setHoveredThemeBtn(false)}
      >
        {isLightMode ? (
          <>
            {hoveredThemeBtn ? (
              <MdLightMode size={25} />
            ) : (
              <MdOutlineLightMode size={25} />
            )}
          </>
        ) : (
          <>
            {hoveredThemeBtn ? (
              <MdDarkMode size={25} />
            ) : (
              <MdOutlineDarkMode size={25} />
            )}
          </>
        )}
      </button> */}
    </div>
  );
};

export default Navbar;
