import React, { useEffect, useState, useRef } from "react";
import "../page-css/Skills.css";
import Footer from "./Footer";

/* ─── Extended Color Palette (pick any for new categories) ──────────────────
   COLORS.red, COLORS.pink, COLORS.blue, COLORS.cyan, COLORS.green,
   COLORS.sky, COLORS.purple, COLORS.violet, COLORS.amber, COLORS.orange,
   COLORS.rose, COLORS.teal, COLORS.lime, COLORS.indigo, COLORS.fuchsia
   ──────────────────────────────────────────────────────────────────────── */
export const COLORS = {
  red: "var(--error-red)",
  pink: "var(--pink-accent)",
  blue: "var(--blue-accent)",
  cyan: "var(--cyan-glow)",
  green: "var(--success-green)",
  sky: "var(--accent-soft)",
  purple: "var(--sk-purple)",
  violet: "var(--sk-violet)",
  amber: "var(--sk-amber)",
  orange: "var(--sk-orange)",
  rose: "var(--sk-rose)",
  teal: "var(--sk-teal)",
  lime: "var(--sk-lime)",
  indigo: "var(--sk-indigo)",
  fuchsia: "var(--sk-fuchsia)",
};

/* ─── Static Skills Data ──────────────────────────────────── */
const skillsData = [
  {
    _id: "cat-3",
    category: "Offensive Security",
    colorVar: COLORS.red,
    items: ["Kali Linux", "Privilege Escalation", "Social Engineering", "Vulnerability Assessment", "Exploit Development", "Post Exploitation", "Bug Bounty Recon"],
  },
  {
    _id: "cat-1",
    category: "Penetration Testing",
    colorVar: COLORS.pink,
    items: ["Burp Suite", "Metasploit", "Nmap", "Nikto", "SQLMap", "Hydra", "John the Ripper"],
  },
  {
    _id: "cat-2",
    category: "Network Infrastructure",
    colorVar: COLORS.amber,
    items: ["Wireshark", "TCP/IP Protocol", "VPN Tunneling", "Packet Analysis", "Scapy"],
  },
  {
    _id: "cat-4",
    category: "Frontend UI/UX",
    colorVar: COLORS.cyan,
    items: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Responsive Web Design"],
  },
  {
    _id: "cat-5",
    category: "Backend & API",
    colorVar: COLORS.green,
    items: ["Node.js", "Express.js", "RESTful APIs", "Python", "Flask", "Authentication (JWT)"],
  },
  {
    _id: "cat-10",
    category: "DevOps & Automation",
    colorVar: COLORS.sky,
    items: ["Git & GitHub", "CI/CD Pipelines"],
  },
];

/* ─── 5 Penetration Testing Commands ──────────────────────── */
const terminalCommands = [
  "nmap -sC -sV -p- -T4 target.com",
  "gobuster dir -u https://target.com -w wordlist.txt",
  "sqlmap -u \"http://target.com/?id=1\" --dbs",
  "ffuf -w subdomains.txt -u https://FUZZ.target.com",
  "msfconsole -q -x \"use exploit/multi/handler\""
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillsData[0]);
  const [isFading, setIsFading] = useState(false);
  const scrollRef = useRef(null);

  const scrollTabs = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Terminal Typing State
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayedCmd, setDisplayedCmd] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    document.title = "My Core Skills | Innovex Portfolio";
  }, []);

  // Terminal Typewriter Effect Logic
  useEffect(() => {
    let timeout;
    const currentCommand = terminalCommands[cmdIndex];

    if (isTyping) {
      if (displayedCmd.length < currentCommand.length) {
        timeout = setTimeout(() => {
          setDisplayedCmd(currentCommand.slice(0, displayedCmd.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayedCmd.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedCmd(displayedCmd.slice(0, -1));
        }, 20);
      } else {
        setCmdIndex((prev) => (prev + 1) % terminalCommands.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedCmd, isTyping, cmdIndex]);

  const handleCategoryHover = (category) => {
    if (category._id !== activeCategory._id) {
      setIsFading(true);
      setTimeout(() => {
        setActiveCategory(category);
        setIsFading(false);
      }, 150);
    }
  };

  return (
    <>
      <section className="sk-fluid-wrapper">
        <div className="sk-ambient-glow" style={{ background: activeCategory.colorVar }} />

        <div className="sk-container">

          {/* ── TOP SECTION: Centered Header & Terminal ── */}
          <div className="sk-top-header">

            {/* --- TECHNICAL OVERVIEW --- */}
            <div className="sk-tiny-heading-wrapper">
              <span className="sk-tiny-line"></span>
              <span className="sk-tiny-heading">Technical Overview</span>
              <span className="sk-tiny-line"></span>
            </div>

            {/* Main Title & Glowing Underline */}
            <div className="sk-title-wrapper">
              <h1 className="sk-main-title">My Core Skills</h1>
              <div className="sk-heading-rule" />
            </div>

            {/* Authentic Kali Linux Terminal */}
            <div className="sk-linux-terminal" aria-hidden="true">
              <div className="sk-term-topbar">
                <span className="sk-term-dot dot-red"></span>
                <span className="sk-term-dot dot-yellow"></span>
                <span className="sk-term-dot dot-green"></span>
              </div>
              <div className="sk-term-content">
                <div className="term-line">
                  <span className="term-bracket">┌──(</span>
                  <span className="term-user">KPG㉿innovex</span>
                  <span className="term-bracket">)-[</span>
                  <span className="term-path">~/Commands</span>
                  <span className="term-bracket">]</span>
                </div>
                <div className="term-line">
                  <span className="term-bracket">└─</span>
                  <span className="term-prompt">$</span>
                  <span className="term-cmd"> {displayedCmd}</span>
                  <span className="term-cursor" />
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM SECTION: Asymmetric Data-Flow Layout ── */}
          <div className="sk-layout-columns">

            {/* Left: Giant Typography Nav */}
            <div className="sk-category-column">
              <div className="sk-category-scroll-wrapper">
                <button className="sk-scroll-arrow left" onClick={() => scrollTabs("left")} aria-label="Scroll left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                
                <nav className="sk-category-list" ref={scrollRef}>
                  {skillsData.map((cat) => {
                    const isActive = activeCategory._id === cat._id;
                    return (
                      <button
                        key={cat._id}
                        className={`sk-category-trigger ${isActive ? "active" : ""}`}
                        onMouseEnter={() => handleCategoryHover(cat)}
                        onClick={() => handleCategoryHover(cat)}
                        style={{ "--cat-color": cat.colorVar }}
                        aria-selected={isActive}
                      >
                        <span className="sk-trigger-text">{cat.category}</span>
                        {isActive && <span className="sk-active-indicator" />}
                      </button>
                    );
                  })}
                </nav>

                <button className="sk-scroll-arrow right" onClick={() => scrollTabs("right")} aria-label="Scroll right">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Right: Premium Skill Matrix */}
            <div className="sk-skills-column">
              <div className={`sk-skills-canvas ${isFading ? "fading" : "visible"}`}>

                {/* Dot grid decoration */}
                <div className="sk-canvas-grid" aria-hidden="true" />

                {/* Giant faded watermark */}
                <div className="sk-canvas-watermark" aria-hidden="true">
                  {activeCategory.category}
                </div>

                {/* Category label */}
                <div className="sk-canvas-header">
                  <span className="sk-canvas-label" style={{ color: activeCategory.colorVar }}>
                    <span className="sk-label-dash" />
                    {activeCategory.category}
                  </span>
                  <span className="sk-canvas-count" style={{ color: activeCategory.colorVar }}>
                    {String(activeCategory.items.length).padStart(2, "0")} skills
                  </span>
                </div>

                {/* ── HOLOGRAPHIC NEURAL CORE SKILLS ── */}
                <div className="sk-neural-grid">
                  {activeCategory.items.map((skill, index) => (
                    <div
                      key={`${activeCategory._id}-${skill}`}
                      className="sk-neural-node"
                      style={{
                        "--node-delay": `${index * 0.06}s`,
                        "--node-color": activeCategory.colorVar,
                      }}
                    >
                      {/* Left: Glowing Core */}
                      <div className="sk-node-core">
                        <div className="sk-core-pulse" />
                        <div className="sk-core-solid" />
                      </div>
                      
                      {/* Middle: Content */}
                      <div className="sk-node-content">
                        <span className="sk-node-text">{skill}</span>
                      </div>

                      {/* Right: Hex Decorator */}
                      <div className="sk-node-hex" />

                      {/* Laser Shimmer Overlay */}
                      <div className="sk-node-shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Skills;