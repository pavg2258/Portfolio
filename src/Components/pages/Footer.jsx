import React from "react";
import "../page-css/Footer.css";

import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div className="footer-container">
      <FaRegCopyright size={16} className="footer-icon" />
      <p className="footer-description">
        {date} Innovex. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
