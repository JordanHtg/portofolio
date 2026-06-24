"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";

const rotatingRoles = [
  "Programmer",
  "Junior Programmer",
  "IT Enthusiast"
];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3000); // Ganti teks setiap 3 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-0">


      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cyber-cyan font-sans tracking-widest uppercase mb-4 text-sm font-semibold"
          >
            System Rebooting // Identity Found
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold text-white mb-6 glow-text tracking-tight"
          >
            JOURDAN <br/>
            HUTAGALUNG
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-2 md:gap-4 text-base md:text-xl text-gray-400 font-sans mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span>Cybersecurity Enthusiast</span>
            </div>
            <span className="hidden md:block">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
              <span>Software Engineer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-10 flex items-center gap-3 font-sans"
          >
            <span className="text-gray-400 text-lg md:text-xl">Currently exploring as a</span>
            <div className="relative inline-block h-8 overflow-hidden min-w-[200px] md:min-w-[250px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 text-cyber-cyan font-bold tracking-wider text-lg md:text-xl"
                >
                  {rotatingRoles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll Down</span>
        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-cyber-cyan to-transparent"
          animate={{ height: ["0rem", "3rem", "0rem"], y: [0, 10, 20] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
