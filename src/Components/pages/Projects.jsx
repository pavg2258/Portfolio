import React, { useEffect, useState } from "react";
import "../page-css/Projects.css";

import Footer from "./Footer";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "My Projects | Innovex Portfolio";
  }, []);

  return (
    <>
      <div className="my-projects-container">
        <h1 className="my-projects-heading">My Projects</h1>
        {projects && projects.length === 0 ? (
          <div className="no-projects-container">
            <p className="no-projects-description">
              No projects yet. Create your first project using the form! 📁
            </p>
          </div>
        ) : (
          <ul className="projects-list-details-container">
            {projects.map((each) => (
              <li className="projects-list" key={each._id}>
                <div className="projects-stream-dot"></div>
                <div className="projects-list-heading-date-container">
                  <div className="projects-list-heading-link-container">
                    <h1 className="projects-list-heading">
                      {each?.projectName}
                    </h1>
                    {each?.projectLink && (
                      <NavLink
                        to={each?.projectLink}
                        target="_blank"
                        className="projects-list-project-link"
                      >
                        Link
                      </NavLink>
                    )}
                  </div>
                  <div className="projects-end-date-btn-container">
                    <p className="projects-list-date">
                      {each?.endDate
                        ? new Date(each.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })
                        : "No end date"}
                    </p>
                  </div>
                </div>
                <p className="projects-list-short-description">
                  {each?.projectTitle}
                </p>
                <p className="projects-list-tech-stack-label">
                  Technologies:
                  <span className="projects-list-tech-stack">
                    {each?.technologies}
                  </span>
                </p>
                <div className="projects-list-description-container">
                  <h1 className="projects-list-description-heading">Description: </h1>
                  <p className="projects-list-description">
                    {each?.projectDescription}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Projects;
