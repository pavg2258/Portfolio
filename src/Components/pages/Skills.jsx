import React, { useCallback, useEffect, useRef, useState } from "react";
import "../page-css/Skills.css";
import Footer from "./Footer";

import axios from "axios";

const no_skills_img = `https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png`;

/* ─── Category → emoji icon ───────────────────────────────── */
const categoryIcons = {
  offensive: "💀",
  penetration: "🎯",
  exploit: "🔥",
  "red team": "🔴",
  red: "🔴",
  security: "🔐",
  ctf: "🏁",
  osint: "🕵️",
  network: "🔗",
  web: "🌐",
  frontend: "🎨",
  backend: "🛠️",
  database: "🗄️",
  tools: "🧰",
  languages: "💻",
  cloud: "☁️",
  devops: "🚀",
  linux: "🐧",
  mobile: "📱",
  ai: "🤖",
  ml: "🧠",
  testing: "🧪",
  default: "⚡",
};

const getCategoryIcon = (category = "") => {
  const lower = category.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lower.includes(key)) return icon;
  }
  return categoryIcons.default;
};

/* ─── Category → CSS accent class ────────────────────────── */
const colorMap = [
  { keys: ["offensive", "exploit", "payload", "malware"], cls: "sk-red-orange" },
  { keys: ["penetration", "pen test", "pentest"], cls: "sk-crimson" },
  { keys: ["red team", "red"], cls: "sk-red" },
  { keys: ["security", "ctf", "osint"], cls: "sk-pink" },
  { keys: ["network", "protocol", "packet"], cls: "sk-blue" },
  { keys: ["web", "frontend", "css", "html", "react"], cls: "sk-cyan" },
  { keys: ["backend", "server", "api", "node", "express"], cls: "sk-teal" },
  { keys: ["database", "sql", "mongo", "db"], cls: "sk-green" },
  { keys: ["tools", "framework", "software"], cls: "sk-amber" },
  { keys: ["languages", "programming", "script"], cls: "sk-purple" },
  { keys: ["cloud", "aws", "azure", "gcp"], cls: "sk-sky" },
  { keys: ["devops", "docker", "ci", "cd", "pipeline"], cls: "sk-orange" },
  { keys: ["linux", "unix", "bash", "shell"], cls: "sk-lime" },
  { keys: ["mobile", "android", "ios", "flutter"], cls: "sk-violet" },
  { keys: ["ai", "ml", "machine", "deep", "neural"], cls: "sk-indigo" },
  { keys: ["testing", "qa", "debug"], cls: "sk-yellow" },
];

const getCategoryClass = (category = "") => {
  const lower = category.toLowerCase();
  for (const { keys, cls } of colorMap) {
    if (keys.some((k) => lower.includes(k))) return cls;
  }
  return "sk-cyan";
};

/* ─── Scroll-reveal hook (Intersection Observer) ──────────── */
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sk-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".sk-reveal");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
};

/* ─── Main Component ──────────────────────────────────────── */
const Skills = () => {
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const terminalRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    document.title = "Skills & Proficiencies | Innovex Portfolio";
    // Animated terminal cursor blink is CSS-only
  }, []);

  const onRetry = useCallback(() => getSkills(), []);

  /* Stats derived from data */
  const totalSkills = fetchedSkills.reduce(
    (acc, cat) => acc + (cat.items?.length || 0),
    0
  );

  /* Filter buttons */
  const filters = ["All", ...fetchedSkills.map((s) => s.category)];
  const visible =
    activeFilter === "All"
      ? fetchedSkills
      : fetchedSkills.filter((s) => s.category === activeFilter);

  return (
    <>
      <div className="skills-container">
        {/* ── Page hero ── */}
        <div className="sk-hero">
          {/* Ambient orbs */}
          <div className="sk-orb sk-orb-a" aria-hidden="true" />
          <div className="sk-orb sk-orb-b" aria-hidden="true" />

          <div className="sk-hero-badge">
            <span className="sk-hero-badge-dot" />
            Cybersecurity &amp; Development
          </div>
          <h1 className="skills-heading">Technical Skills</h1>
          <p className="skills-subtitle">
            Tools, languages &amp; technologies I actively use
          </p>

          {/* Terminal line */}
          <div className="sk-terminal" ref={terminalRef} aria-hidden="true">
            <span className="sk-terminal-prompt">~/skills#</span>
            <span className="sk-terminal-cmd"> ls -la --color=auto</span>
            <span className="sk-terminal-cursor" />
          </div>

          {/* Stats strip */}
          {/* {apiStatus === apiConstantStatus.success && ( */}
          <div className="sk-stats-strip">
            <div className="sk-stat">
              <span className="sk-stat-num">{fetchedSkills.length}</span>
              <span className="sk-stat-label">Categories</span>
            </div>
            <div className="sk-stat-divider" />
            <div className="sk-stat">
              <span className="sk-stat-num">{totalSkills}</span>
              <span className="sk-stat-label">Total Skills</span>
            </div>
            <div className="sk-stat-divider" />
            <div className="sk-stat">
              <span className="sk-stat-num">∞</span>
              <span className="sk-stat-label">Learning</span>
            </div>
          </div>
          {/* )} */}
        </div>

        {/* ── Content ── */}
        <div className="skill-grid">{fetchedSkills.length === 0 ? (
          <div className="no-skills-container">
            <img src={no_skills_img} alt="No Skills" className="no-skill-img" />
            <h2 className="no-skills-heading">No Skills Yet</h2>
            <p className="no-skills-description">No skills have been added yet.</p>
          </div>
        ) : (
          <>
            {/* ── Filter pills ── */}
            <div className="sk-filter-bar sk-reveal">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`sk-filter-pill ${activeFilter === f ? "sk-filter-active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f === "All" ? "🗂 All" : `${getCategoryIcon(f)} ${f}`}
                </button>
              ))}
            </div>

            {/* ── Cards grid ── */}
            <ul className="skill-item-container">
              {visible.map((eachItem, idx) => (
                <li
                  className={`skill-items ${getCategoryClass(eachItem.category)} sk-reveal`}
                  key={eachItem._id}
                  style={{ "--sk-delay": `${idx * 0.08}s` }}
                >
                  {/* Top accent bar */}
                  <div className="sk-card-accent-bar" aria-hidden="true" />

                  {/* Card header */}
                  <div className="skill-card-header">
                    <div className="skill-category-icon">
                      {getCategoryIcon(eachItem.category)}
                    </div>
                    <div className="sk-header-text">
                      <p className="skill-name">{eachItem.category}</p>
                    </div>
                    <span className="skill-count-badge">
                      {eachItem.items.length}{" "}
                      <span className="sk-badge-label">skills</span>
                    </span>
                  </div>

                  {/* Divider */}
                  <hr className="skills-hr-line" />

                  {/* Skill tags */}
                  <ul className="skill-level-container">
                    {eachItem.items.map((each, ti) => (
                      <li
                        key={each.name}
                        className="skill-level"
                        style={{ "--tag-delay": `${ti * 0.04}s` }}
                      >
                        {each.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Skills;
