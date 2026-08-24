import React, { useEffect, useState } from "react";
import "./App.css";

import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Components/pages/Home";
import NotFound from "./Components/pages/NotFound";
import Contact from "./Components/pages/Contact";
import CV from "./Components/pages/CV";
import Navbar from "./Components/pages/Navbar";
import Skills from "./Components/pages/Skills";
import About from "./Components/pages/About";
import Projects from "./Components/pages/Projects";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

const App = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Floating particles animation
        const interval = setInterval(() => {
            setParticles((prev) =>
                [
                    ...prev,
                    {
                        id: Date.now(),
                        x: Math.random() * 100,
                        y: 100,
                        vy: Math.random() * 2 + 0.5,
                        opacity: Math.random() * 0.5 + 0.2,
                    },
                ].slice(-10),
            ); // Keep only 10 particles
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <HashRouter>
                <Routes>
                    {/* Normal Routes with Navbar */}
                    <Route element={<Layout />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/skills" element={<Skills />} />
                        <Route exact path="/projects" element={<Projects />} />
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path="/cv" element={<CV />} />
                    </Route>

                    {/* Not Found (without Navbar) */}
                    <Route exact path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={1}
                toastClassName="custom-toast"
            />

            {/* Floating Particles Animation */}
            <div className="particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            opacity: p.opacity,
                            transform: `translateX(${p.vx || 0}px) translateY(${p.vy || 0
                                }px)`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
