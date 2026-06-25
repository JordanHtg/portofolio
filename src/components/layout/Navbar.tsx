"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSecretMode } from "@/store/useSecretMode";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <a 
                  href="https://card-ar-ruby.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="interactive inline-block px-6 py-2 border border-cyber-cyan text-cyber-cyan text-sm font-bold uppercase tracking-wider rounded-full hover:bg-cyber-cyan hover:text-black transition-colors"
                >
                  Travel to AR-Card
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-cyber-cyan p-2 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                  <nav className="flex flex-col p-6 gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-sans font-medium text-gray-300 hover:text-cyber-cyan transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <a 
                        href="https://card-ar-ruby.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="inline-block w-full text-center px-6 py-3 border border-cyber-cyan text-cyber-cyan text-sm font-bold uppercase tracking-wider rounded-full hover:bg-cyber-cyan hover:text-black transition-colors"
                      >
                        Travel to AR-Card
                      </a>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
