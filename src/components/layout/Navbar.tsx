"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSecretMode } from "@/store/useSecretMode";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isSecretMode } = useSecretMode();

  return (
    <AnimatePresence>
      {!isSecretMode && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <div className="container mx-auto px-6">
            <div className={`flex items-center justify-between rounded-full px-6 py-4 transition-all duration-300 ${
              scrolled ? "glass shadow-lg" : "bg-transparent"
            }`}>
              {/* Logo */}
              <a href="#" className="text-xl font-heading font-bold text-white tracking-widest glow-text">
                JH<span className="text-cyber-cyan">.</span>
              </a>

              {/* Links (Desktop) */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-sans font-medium text-gray-300 hover:text-cyber-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Resume CTA */}
              <div className="hidden md:block">
                <button className="interactive px-6 py-2 border border-cyber-cyan text-cyber-cyan text-sm font-bold uppercase tracking-wider rounded-full hover:bg-cyber-cyan hover:text-black transition-colors">
                  Resume
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button className="text-white hover:text-cyber-cyan">
                  ☰
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
