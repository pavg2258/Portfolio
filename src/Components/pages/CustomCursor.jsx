import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — High-Performance Senior UI/UX Tactical Cyber Cursor
 * 
 * Performance Optimizations:
 * 1. 0ms Latency: Hardware-accelerated translate3d applied directly in mousemove.
 * 2. Ultra-Snappy Physics: High-velocity spring (0.52 lerp) for instant, locked-on tracking.
 * 3. Zero-Re-render Canvas Trail: Particle emissions drawn via GPU-accelerated canvas.
 *    No React useState churn on mousemove.
 * 4. Zero Filter Blur Overhead: Radial-gradient computed natively by GPU compositor.
 * 5. State Guarding: Only triggers React state changes when hover target status flips.
 */
const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState("");

  // Refs for 120fps direct hardware manipulation
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);
  const canvasRef = useRef(null);

  // Position & physics tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const lastTrailPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  // State guards to prevent unnecessary React re-renders on mousemove
  const hoverStateRef = useRef({ isHovering: false, type: "" });
  const particlesRef = useRef([]);

  useEffect(() => {
    // Disable on touch devices or reduced-motion environments
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    document.body.classList.add("has-custom-cursor");

    // Canvas setup for zero-overhead stardust trail
    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // High-performance 120fps physics loop
    const updatePhysics = () => {
      const { x: targetX, y: targetY } = mousePos.current;

      // Snappy physics spring (0.52 lerp = instant, sharp tracking with subtle cyber weight)
      const dx = targetX - ringPos.current.x;
      const dy = targetY - ringPos.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringPos.current.x += dx * 0.52;
        ringPos.current.y += dy * 0.52;
      } else {
        ringPos.current.x = targetX;
        ringPos.current.y = targetY;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      // Render canvas micro-particles without React re-render overhead
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const particles = particlesRef.current;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.055; // Fast clean fade

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${p.life * 0.75})`;
          ctx.shadowColor = "#00d4ff";
          ctx.shadowBlur = 6;
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    // Mouse Move Listener — ultra-fast execution
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };

      // Instant 0ms update for the laser dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);

      // Add trail particle if cursor moved fast enough
      const dist = Math.hypot(
        clientX - lastTrailPos.current.x,
        clientY - lastTrailPos.current.y
      );

      if (dist > 15) {
        if (particlesRef.current.length < 12) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.5 + 0.8;
          particlesRef.current.push({
            x: clientX,
            y: clientY,
            size: Math.random() * 2.2 + 1.2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1.0,
          });
        }
        lastTrailPos.current = { x: clientX, y: clientY };
      }

      // Update card-specific spotlight coordinates
      const targetCard = e.target.closest(
        ".cursor-card-spotlight, .project-card, .projects-sidebar-btn, .about-card, .skill-card, .contact-card, .projects-card-container, .about-value-item"
      );
      if (targetCard) {
        const rect = targetCard.getBoundingClientRect();
        targetCard.style.setProperty("--card-mouse-x", `${clientX - rect.left}px`);
        targetCard.style.setProperty("--card-mouse-y", `${clientY - rect.top}px`);
      }

      // Guarded Hover Detection (prevents React re-renders unless hover target changes)
      const interactiveEl = e.target.closest(
        "a, button, input, textarea, select, [role='button'], .home-premium-btn, .projects-sidebar-btn, .clickable, .nav-item-wrapper, .tech-chip, .stat-card"
      );

      const newIsHovering = Boolean(interactiveEl);
      let newHoverType = "";

      if (newIsHovering) {
        if (
          interactiveEl.classList.contains("btn-danger") ||
          interactiveEl.getAttribute("data-accent") === "danger"
        ) {
          newHoverType = "danger";
        } else if (interactiveEl.getAttribute("data-accent") === "pink") {
          newHoverType = "pink";
        } else {
          newHoverType = "interactive";
        }
      }

      if (
        newIsHovering !== hoverStateRef.current.isHovering ||
        newHoverType !== hoverStateRef.current.type
      ) {
        hoverStateRef.current = { isHovering: newIsHovering, type: newHoverType };
        setIsHovering(newIsHovering);
        setHoverType(newHoverType);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* 1. Fast Ambient Torch Spotlight (0-cost radial gradient) */}
      <div
        ref={spotlightRef}
        className={`cursor-ambient-spotlight ${isVisible ? "visible" : ""}`}
        aria-hidden="true"
      />

      {/* 2. High-Speed 120fps Canvas Particle Trail (Zero React churn) */}
      <canvas
        ref={canvasRef}
        className="cursor-trail-canvas"
        aria-hidden="true"
      />

      {/* 3. Ultra-Fast Tactical Cyber HUD Reticle */}
      <div
        ref={ringRef}
        className={`cyber-cursor-ring ${isVisible ? "visible" : ""} ${
          isHovering ? "cursor--hover" : ""
        } ${isClicking ? "cursor--clicking" : ""} ${
          hoverType ? `cursor--${hoverType}` : ""
        }`}
        aria-hidden="true"
      >
        <div className="cyber-cursor-notch notch-top"></div>
        <div className="cyber-cursor-notch notch-bottom"></div>
        <div className="cyber-cursor-notch notch-left"></div>
        <div className="cyber-cursor-notch notch-right"></div>
        {isClicking && <span className="cyber-cursor-click-ripple" />}
      </div>

      {/* 4. Instant Zero-Latency Laser Dot */}
      <div
        ref={dotRef}
        className={`cyber-cursor-dot ${isVisible ? "visible" : ""} ${
          isHovering ? "cursor--hover" : ""
        } ${isClicking ? "cursor--clicking" : ""}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
