"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const experiences = [
  {
    role: "Cybersecurity Intern",
    company: "TechSecure Indonesia",
    duration: "Jan 2026 - Present",
    description: "Melakukan vulnerability assessment dan penetration testing pada infrastruktur internal perusahaan. Membantu mengamankan API endpoint dari serangan injeksi SQL dan XSS.",
  },
  {
    role: "Frontend Developer Freelance",
    company: "Creative Studio",
    duration: "Jul 2025 - Dec 2025",
    description: "Membangun antarmuka web responsif dan animasi berkinerja tinggi menggunakan React dan Framer Motion. Mengintegrasikan RESTful API dengan arsitektur headless CMS.",
  },
  {
    role: "IT Assistant",
    company: "BRI Jalan Rajawali",
    duration: "Mar 2024 - Jun 2025",
    description: "Menjadi IT Assistant yang membantu dalam operasi website dan input data kartu ke website.",
  },
];

export function ExperienceSection() {
  return (
    <section className="relative w-full py-32 bg-transparent" id="experience">
      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <SectionHeader title="Operation Log" subtitle="04 // Experience" />

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-cyber-cyan rounded-full shadow-[0_0_10px_#00F0FF] -translate-x-1/2 mt-6 md:mt-0 z-10" />

                {/* Content Box */}
                <div className={`w-full pl-8 md:pl-0 md:w-[45%] ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyber-cyan/50 transition-colors">
                    <span className="text-cyber-cyan font-sans text-sm font-semibold tracking-wider block mb-2">
                      {exp.duration}
                    </span>
                    <h4 className="text-2xl font-heading font-bold text-white mb-1">
                      {exp.role}
                    </h4>
                    <h5 className="text-gray-400 font-sans mb-4">
                      {exp.company}
                    </h5>
                    <p className="text-gray-300 font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
