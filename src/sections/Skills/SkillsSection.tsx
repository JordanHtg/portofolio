"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiThreedotjs, 
  SiFramer, 
  SiNodedotjs, 
  SiGo, 
  SiPostgresql, 
  SiRedis, 
  SiDocker, 
  SiLinux,
  SiHtml5,
  SiCss,
  SiJavascript
} from "react-icons/si";
import { FaShieldAlt, FaNetworkWired, FaLock } from "react-icons/fa";

const skillCategories = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "HTML5", icon: <SiHtml5 className="w-8 h-8 text-[#E34F26]" /> },
      { name: "CSS3", icon: <SiCss className="w-8 h-8 text-[#1572B6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-8 h-8 text-[#F7DF1E]" /> },
      { name: "React 19", icon: <SiReact className="w-8 h-8 text-[#61DAFB]" /> },
      { name: "Next.js 15", icon: <SiNextdotjs className="w-8 h-8 text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="w-8 h-8 text-[#3178C6]" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" /> },
      { name: "Three.js", icon: <SiThreedotjs className="w-8 h-8 text-white" /> },
      { name: "Framer", icon: <SiFramer className="w-8 h-8 text-white" /> },
    ],
    color: "from-cyber-cyan",
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8 text-[#339933]" /> },
      { name: "Go", icon: <SiGo className="w-8 h-8 text-[#00ADD8]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8 text-[#4169E1]" /> },
      { name: "Redis", icon: <SiRedis className="w-8 h-8 text-[#DC382D]" /> },
      { name: "Docker", icon: <SiDocker className="w-8 h-8 text-[#2496ED]" /> },
      { name: "Linux", icon: <SiLinux className="w-8 h-8 text-[#FCC624]" /> },
    ],
    color: "from-cyber-blue",
  },
  {
    title: "Cybersecurity",
    skills: [
      { name: "Penetration Testing", icon: <FaShieldAlt className="w-8 h-8 text-red-500" /> },
      { name: "Cryptography", icon: <FaLock className="w-8 h-8 text-yellow-500" /> },
      { name: "Network Security", icon: <FaNetworkWired className="w-8 h-8 text-blue-400" /> },
      { name: "Reverse Engineering", icon: <FaShieldAlt className="w-8 h-8 text-purple-500" /> },
    ],
    color: "from-red-500",
  },
];

export function SkillsSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden" id="skills">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader title="Technical Arsenal" subtitle="02 // Capabilities" />

        <div className="flex flex-col gap-12 mt-12 md:mt-16 relative">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col"
            >
              <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-6 pl-4 border-l-2 border-cyber-cyan">
                {category.title}
              </h4>
              
              {/* Marquee Container */}
              <div className="relative w-full flex overflow-hidden mask-horizontal group">
                <motion.div
                  className="flex gap-6 whitespace-nowrap py-4"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20 + idx * 5, // different speeds for different tracks
                      ease: "linear",
                    },
                  }}
                >
                  {/* We duplicate the skills array to create a seamless loop */}
                  {[...category.skills, ...category.skills, ...category.skills].map((skill, sIdx) => (
                    <div
                      key={`${skill.name}-${sIdx}`}
                      className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-cyber-cyan hover:bg-white/10 transition-all cursor-default min-w-max hover:scale-105"
                    >
                      {skill.icon}
                      <span className="text-lg font-sans font-medium text-white">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
