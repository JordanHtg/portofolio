"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import React, { MouseEvent, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Sunset Zero-Longue",
    description: "A-Frame Project Multiplayer Game - Dengan Tema Sunset & Bangun Ruang",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/JordanHtg/sunset-longue.git",
    demo: "https://jordanhtg.github.io/sunset-longue/",
  },
  {
    title: "Secure Vault API",
    description: "Microservice arsitektur untuk penyimpanan data terenkripsi end-to-end yang tahan terhadap serangan kuantum.",
    tech: ["Go", "gRPC", "PostgreSQL", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    title: "Nexus Cyber Dashboard",
    description: "Dashboard interaktif untuk memonitor lalu lintas jaringan dan ancaman keamanan secara live.",
    tech: ["React", "TypeScript", "TailwindCSS", "Zustand"],
    github: "#",
    demo: "#",
  },
  {
    title: "Quantum Key Distribution",
    description: "Simulasi QKD protocol (BB84) menggunakan visualisasi node interaktif untuk edukasi keamanan kriptografi.",
    tech: ["Vue.js", "WebSockets", "Node.js"],
    github: "#",
    demo: "#",
  }
];

function ProjectCard({ project, isActive }: { project: typeof projects[0], isActive: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={false}
      animate={{ 
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? "blur(0px)" : "blur(4px)"
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative w-[320px] h-[380px] md:w-[360px] md:h-[400px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl flex-shrink-0 snap-center flex flex-col cursor-pointer hover:scale-[1.02] hover:border-cyber-cyan/50 transition-all`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.2),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="flex-grow">
        <h3 className="relative z-10 text-xl md:text-2xl font-bold font-heading text-white mb-4 line-clamp-2">
          {project.title}
        </h3>
        <p className="relative z-10 text-gray-400 mb-6 font-sans text-sm md:text-base line-clamp-4">
          {project.description}
        </p>
        
        <div className="relative z-10 flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] md:text-xs px-2 py-1 rounded bg-white/5 text-cyber-cyan border border-white/10">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] md:text-xs px-2 py-1 rounded bg-white/5 text-cyber-cyan border border-white/10">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 mt-auto">
        <a href={project.github} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
          <FaGithub className="w-5 h-5" /> Github Repositories
        </a>
        <a href={project.demo} className="flex items-center gap-2 text-sm text-cyber-cyan hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" /> Live Demo
        </a>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      // Lebar card + gap. Card width = 320px md:360px. Gap = 32px (gap-8).
      const itemWidth = window.innerWidth >= 768 ? 360 + 32 : 320 + 32;
      const centerIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(centerIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = window.innerWidth >= 768 ? 360 + 32 : 320 + 32;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth"
      });
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const scrollRight = () => {
    if (activeIndex < projects.length - 1) scrollToIndex(activeIndex + 1);
  };

  return (
    <section className="relative w-full py-32 bg-transparent overflow-hidden" id="projects">
      <div className="container relative z-10 mx-auto px-6 mb-8">
        <SectionHeader title="Github Projects" subtitle="03 // Projects" />
          
        {/* Navigation Arrows for Desktop */}
        <div className="hidden md:flex justify-end gap-4 -mt-8">
          <button 
            onClick={scrollLeft}
            disabled={activeIndex === 0}
            className={`p-3 rounded-full border transition-colors ${
              activeIndex === 0 
                ? "bg-transparent border-white/5 text-gray-600 cursor-not-allowed" 
                : "bg-white/5 border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan text-white"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            disabled={activeIndex === projects.length - 1}
            className={`p-3 rounded-full border transition-colors ${
              activeIndex === projects.length - 1 
                ? "bg-transparent border-white/5 text-gray-600 cursor-not-allowed" 
                : "bg-white/5 border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan text-white"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="relative w-full">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto py-12 snap-x snap-mandatory hide-scrollbar px-[calc(50vw-160px)] md:px-[calc(50vw-180px)]"
        >
          {projects.map((project, idx) => (
            <div key={project.title} onClick={() => scrollToIndex(idx)}>
              <ProjectCard 
                project={project} 
                isActive={idx === activeIndex} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
