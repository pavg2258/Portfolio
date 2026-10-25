import React, { useEffect } from "react";
import "../page-css/NotFound.css";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | Innovex";
  }, []);

  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="Not Found"
        className="not-found-img"
      />
      <h1 className="not-found-heading-status-code">404</h1>
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        Oops! The page you are looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
