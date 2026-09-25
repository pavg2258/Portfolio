import React, { useEffect, useState } from "react";
import "../page-css/Projects.css";

import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";

/* ─── Project Data ─────────────────────────────────────────── */
const projectData = [
  {
    id: uuidv4(),
    projectName: "Chat Application",
    projectTitle:
      "Developed a feature-rich real-time chat application with a modern and robust backend architecture. The app enables users to exchange ideas with reactions instantly.",
    projectDescription: [
      "• Secure Authentication — Implemented JWT-based email/password login with protected routes and session management.",
      "• Contact & User Management — Built functionality to add/remove contacts, manage user profiles, and initiate one-on-one chats.",
      "• Smart User Search — Designed a real-time search to discover and connect with registered users instantly.",
      "• Real-Time Messaging — Engineered instant communication using Socket.IO with:",
      "    o Live typing indicators and read receipts",
      "    o Online/offline presence status",
      "    o Unread message counters per conversation",
      "• Rich Message Features — Enhanced UX with:",
      "    o Emoji reactions via an interactive picker",
      "    o Instant message deletion",
      "    o Persistent chat history stored in MongoDB",
      "• Media Sharing — Enabled seamless image upload and sharing within conversations.",
      "• Privacy Controls — Implemented block/unblock functionality to restrict message access between users.",
      "• Push Notifications — Configured cross-device alerts to notify users of new messages in real time.",
      "• Profile Customization — Allowed users to update display names, bios, and profile avatars.",
    ],
    endDate: "2025-06",
    projectLink: "",
    technologies: "ReactJS, NodeJS, ExpressJS, MongoDB",
  },
  {
    id: uuidv4(),
    projectName: "Doctors Appointment",
    projectTitle:
      "The doctor's appointment application simplifies the booking process by offering a user-friendly platform where patients can easily book appointments and consult the doctor.",
    projectDescription: [
      "• Role-Based Authentication — Developed separate, secure login flows for Admin, Doctor, and Patient roles with route-level access control.",
      "• Automated Welcome Emails — Integrated email notifications to greet newly registered patients automatically on sign-up.",
      "• Admin Dashboard — Empowered administrators with:",
      "    o Full appointment management (view, approve, reject)",
      "    o Doctor roster management (add/remove doctors)",
      "    o Real-time system-wide oversight",
      "• Doctor Portal — Provided doctors with:",
      "    o Post-consultation appointment approval/rejection",
      "    o Self-service profile editing",
      "• Patient Experience — Delivered patients a smooth end-to-end journey including:",
      "    o Doctor discovery with search and filter capabilities",
      "    o Real-time slot availability checks before booking",
      "    o Visual indicators for already-booked or disabled slots",
      "    o Appointment history and tracking",
      "    o Flexible payment options: online and offline fee collection",
      "    o Appointment cancellation and profile management",
      "• Responsive Design — Built a fully responsive UI ensuring a seamless experience across mobile, tablet, and desktop platforms.",
    ],
    endDate: "2025-04",
    projectLink: "",
    technologies: "ReactJS, NodeJS, ExpressJS, MongoDB",
  },
].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

/* ─── Tech Chip Colors ─────────────────────────────────────── */
const techColors = [
  { bg: "rgba(97,218,251,0.12)", border: "rgba(97,218,251,0.4)", color: "#61dafb" },
  { bg: "rgba(104,211,145,0.12)", border: "rgba(104,211,145,0.4)", color: "#68d391" },
  { bg: "rgba(252,211,77,0.12)", border: "rgba(252,211,77,0.4)", color: "#fcd34d" },
  { bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.4)", color: "#a78bfa" },
];

/* ─── Helpers ──────────────────────────────────────────────── */
const TechChips = ({ techString }) => (
  <div className="projects-tech-chips">
    {techString.split(",").map((t, i) => {
      const s = techColors[i % techColors.length];
      return (
        <span
          key={i}
          className="projects-tech-chip"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
        >
          {t.trim()}
        </span>
      );
    })}
  </div>
);

/** Parses the flat string array into a nested bullet structure */
const parseLines = (lines) => {
  const result = [];
  let current = null;
  lines.forEach((raw) => {
    const line = raw.trimEnd();
    const isBullet = line.trimStart().startsWith("•");
    const isSub = /^\s+o\s/.test(line);
    if (isBullet) {
      if (current) result.push(current);
      current = { text: line.trimStart().replace(/^•\s*/, ""), subs: [] };
    } else if (isSub) {
      if (current) current.subs.push(line.replace(/^\s+o\s/, ""));
      else result.push({ text: line.replace(/^\s+o\s/, ""), subs: [] });
    } else if (line.trim()) {
      if (current) result.push(current);
      current = { text: line.trim(), subs: [] };
    }
  });
  if (current) result.push(current);
  return result;
};

const DescriptionList = ({ lines }) => {
  const items = parseLines(lines);
  return (
    <ul className="projects-desc-list">
      {items.map((item, i) => (
        <li key={i} className="projects-desc-item">
          <div className="projects-desc-row">
            <span className="projects-desc-bullet">▸</span>
            <span className="projects-desc-text">{item.text}</span>
          </div>
          {item.subs.length > 0 && (
            <ul className="projects-desc-sublist">
              {item.subs.map((sub, j) => (
                <li key={j} className="projects-desc-subitem">
                  <span className="projects-desc-subbullet">◦</span>
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

/* ─── Page Component ───────────────────────────────────────── */
const Projects = () => {
  const [projects] = useState(projectData);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    document.title = "My Projects | Innovex Portfolio";
  }, []);

  const active = projects[activeIdx];

  return (
    <>
      {/* Ambient Background */}
      <div className="projects-bg-orbs" aria-hidden="true">
        <div className="projects-orb projects-orb-1" />
        <div className="projects-orb projects-orb-2" />
        <div className="projects-orb projects-orb-3" />
      </div>

      <div className="my-projects-container">
        {/* Page Header */}
        <div className="projects-page-header">
          <p className="projects-page-eyebrow">PORTFOLIO</p>
          <h1 className="my-projects-heading">My Projects</h1>
          <div className="projects-heading-rule" />
          <p className="projects-page-subtitle">
            A collection of things I&apos;ve built &mdash; from ideas to fully shipped products.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="no-projects-container">
            <span className="no-projects-icon">📁</span>
            <p className="no-projects-description">No projects yet.</p>
          </div>
        ) : (
          /* ── Single Unified Card ── */
          <div className="projects-unified-card">

            {/* LEFT — project selector sidebar */}
            <aside className="projects-sidebar">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  id={`project-tab-${i}`}
                  className={`projects-sidebar-btn${activeIdx === i ? " active" : ""}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="projects-sidebar-num">0{i + 1}</span>
                  <span className="projects-sidebar-name">{p.projectName}</span>
                  {activeIdx === i && <span className="projects-sidebar-arrow">›</span>}
                </button>
              ))}
            </aside>

            {/* RIGHT — content panel */}
            <div className="projects-panel" key={active.id}>

              {/* Header */}
              <div className="projects-panel-header">
                <div className="projects-panel-title-row">
                  <h2 className="projects-list-heading">{active.projectName}</h2>
                  {active.projectLink && (
                    <NavLink
                      to={active.projectLink}
                      target="_blank"
                      className="projects-list-project-link"
                    >
                      <span className="projects-link-arrow">↗</span>View Live
                    </NavLink>
                  )}
                </div>
                <span className="projects-date-badge">
                  {active.endDate
                    ? new Date(active.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                    : "Ongoing"}
                </span>
              </div>

              <div className="projects-card-divider" />

              {/* Summary */}
              <p className="projects-list-short-description">{active.projectTitle}</p>

              {/* Tech Stack */}
              <div className="projects-tech-row">
                <span className="projects-tech-label">Tech Stack</span>
                <TechChips techString={active.technologies} />
              </div>

              <div className="projects-card-divider" />

              {/* Features */}
              <div className="projects-list-description-container">
                <h3 className="projects-list-description-heading">
                  <span className="projects-desc-heading-bar" />
                  Features &amp; Highlights
                </h3>
                <div className="projects-list-description">
                  <DescriptionList lines={active.projectDescription} />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Projects;
