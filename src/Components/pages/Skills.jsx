import React, { useEffect, useRef, useState } from "react";
import "../page-css/Skills.css";
import Footer from "./Footer";

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

/* ─── Static Skills Data ──────────────────────────────────── */
const skillsData = [
  {
    _id: "cat-1",
    category: "Penetration Testing",
    items: [
      { name: "Burp Suite" },
      { name: "Metasploit" },
      { name: "Nmap" },
      { name: "OWASP ZAP" },
      { name: "Nikto" },
      { name: "SQLMap" },
      { name: "Hydra" },
      { name: "John the Ripper" },
    ],
  },
  {
    _id: "cat-2",
    category: "Network Security",
    items: [
      { name: "Wireshark" },
      { name: "TCP/IP" },
      { name: "DNS" },
      { name: "Firewalls" },
      { name: "VPN" },
      { name: "IDS/IPS" },
      { name: "Packet Analysis" },
    ],
  },
  {
    _id: "cat-3",
    category: "Offensive Security",
    items: [
      { name: "Kali Linux" },
      { name: "Privilege Escalation" },
      { name: "Social Engineering" },
      { name: "Vulnerability Assessment" },
      { name: "Exploit Development" },
      { name: "Post Exploitation" },
    ],
  },
  {
    _id: "cat-4",
    category: "Web Frontend",
    items: [
      { name: "React.js" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Bootstrap" },
      { name: "Responsive Design" },
    ],
  },
  {
    _id: "cat-5",
    category: "Backend Development",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "Python" },
      { name: "Flask" },
    ],
  },
  {
    _id: "cat-6",
    category: "Database",
    items: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "NoSQL" },
    ],
  },
  {
    _id: "cat-7",
    category: "Programming Languages",
    items: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "Bash" },
    ],
  },
  {
    _id: "cat-8",
    category: "Security Tools",
    items: [
      { name: "Nessus" },
      { name: "Hashcat" },
      { name: "Aircrack-ng" },
      { name: "Gobuster" },
      { name: "Dirb" },
      { name: "Netcat" },
      { name: "Enum4linux" },
    ],
  },
  {
    _id: "cat-9",
    category: "Linux & OS",
    items: [
      { name: "Kali Linux" },
      { name: "Ubuntu" },
      { name: "Parrot OS" },
      { name: "Windows Server" },
      { name: "Shell Scripting" },
    ],
  },
  {
    _id: "cat-10",
    category: "DevOps & Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Vite" },
    ],
  },
  {
    _id: "cat-11",
    category: "CTF & Labs",
    items: [
      { name: "TryHackMe" },
      { name: "HackTheBox" },
      { name: "PicoCTF" },
      { name: "OverTheWire" },
      { name: "VulnHub" },
    ],
  },
];

/* ─── Main Component ──────────────────────────────────────── */
const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const terminalRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    document.title = "Skills & Proficiencies | Innovex Portfolio";
  }, []);

  /* Stats derived from data */
  const totalSkills = skillsData.reduce(
    (acc, cat) => acc + (cat.items?.length || 0),
    0
  );

  /* Filter buttons */
  const filters = ["All", ...skillsData.map((s) => s.category)];
  const visible =
    activeFilter === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeFilter);

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
              <span className="sk-stat-num">{skillsData.length}</span>
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
        <div className="skill-grid">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Skills;
