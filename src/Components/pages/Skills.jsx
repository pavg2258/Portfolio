import React, { useEffect, useState } from "react";
import "../page-css/Skills.css";
import Footer from "./Footer";

/* ─── Static Skills Data ──────────────────────────────────── */
const skillsData = [
  {
    _id: "cat-3",
    category: "Offensive Security",
    colorVar: "var(--error-red)",
    items: ["Kali Linux", "Privilege Escalation", "Social Engineering", "Vulnerability Assessment", "Exploit Development", "Post Exploitation", "Bug Bounty Recon"],
  },
  {
    _id: "cat-1",
    category: "Penetration Testing",
    colorVar: "var(--pink-accent)",
    items: ["Burp Suite", "Metasploit", "Nmap", "Nikto", "SQLMap", "Hydra", "John the Ripper"],
  },
  {
    _id: "cat-2",
    category: "Network Infrastructure",
    colorVar: "var(--blue-accent)",
    items: ["Wireshark", "TCP/IP Protocol", "VPN Tunneling", "Packet Analysis", "Scapy"],
  },
  {
    _id: "cat-4",
    category: "Frontend UI/UX",
    colorVar: "var(--cyan-glow)",
    items: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Responsive Web Design"],
  },
  {
    _id: "cat-5",
    category: "Backend & API",
    colorVar: "var(--success-green)",
    items: ["Node.js", "Express.js", "RESTful APIs", "Python", "Flask", "Authentication (JWT)"],
  },
  {
    _id: "cat-10",
    category: "DevOps & Automation",
    colorVar: "var(--accent-soft)",
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
        timeout = setTimeout(() => setIsTyping(false), 2500);
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
              <nav className="sk-category-list">
                {skillsData.map((cat) => {
                  const isActive = activeCategory._id === cat._id;
                  return (
                    <button
                      key={cat._id}
                      className={`sk-category-trigger ${isActive ? "active" : ""}`}
                      onMouseEnter={() => handleCategoryHover(cat)}
                      onClick={() => handleCategoryHover(cat)}
                      style={{ "--cat-color": cat.colorVar }}
                    >
                      <span className="sk-trigger-text">{cat.category}</span>
                      {isActive && <span className="sk-active-indicator" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right: Borderless Floating Nodes */}
            <div className="sk-skills-column">
              <div className={`sk-skills-canvas ${isFading ? "fading" : "visible"}`}>
                <h2
                  className="sk-canvas-title"
                  style={{ color: activeCategory.colorVar, textShadow: `0 0 20px ${activeCategory.colorVar}40` }}
                >
                  {activeCategory.category}
                </h2>

                <div className="sk-nodes-container">
                  {activeCategory.items.map((skill, index) => (
                    <div
                      key={`${activeCategory._id}-${skill}`}
                      className="sk-skill-node"
                      style={{
                        "--node-delay": `${index * 0.05}s`,
                        "--node-color": activeCategory.colorVar
                      }}
                    >
                      <span className="sk-node-bullet"></span>
                      <span className="sk-node-text">{skill}</span>
                      <div className="sk-node-trail"></div>
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