import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../page-css/home.css";

import { NavLink } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "Cybersecurity Professional | Innovex Portfolio";
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-content-container">
          <h1>Cybersecurity Professional</h1>
          <p className="home-content-subtitle">
            Penetration Tester | Security Researcher | Bug Hunter
          </p>
          <NavLink to={`/about`} className={`home-page-to-about-page`}><button className="home-btn">Get Started</button></NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
