"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Terminal, Shield, Code2 } from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Systems Hacked (Ethically)", icon: <Terminal className="text-cyber-cyan w-6 h-6" /> },
    { label: "Vulnerabilities Found", icon: <Code2 className="text-cyber-blue w-6 h-6" /> },
    { label: "Project Maked", value: "19", icon: <Shield className="text-cyber-cyan w-6 h-6" /> },
  ];

  return (
    <section className="relative w-full py-32 bg-transparent" id="about">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader title="System Profile" subtitle="01 // About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-300 font-sans text-lg leading-relaxed"
          >
            <p>
              <span className="text-cyber-cyan font-semibold">INIT_ABOUT: </span> 
              Halo, saya <strong className="text-white">Jourdan Hutagalung</strong>. Mahasiswa ilmu komputer dengan Keinginan besar dalam mengeksplorasi titik temu antara pengembangan perangkat lunak (Software Engineering) dan keamanan sistem (Cybersecurity).
            </p>
            <p>
              Saya tidak sekadar menulis kode; saya mendesain arsitektur yang tangguh, merakit lapisan keamanan, dan memastikan setiap sistem yang saya bangun dapat bertahan dari berbagai bentuk eksploitasi. Fokus saya mencakup keamanan jaringan, pengujian penetrasi, dan pengembangan aplikasi web yang berkinerja tinggi.
            </p>
            <div className="pt-4">
              <button className="interactive group flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                [ Unduh Resume ]
                <motion.span 
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </button>
            </div>
          </motion.div>

          {/* Right: Floating Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/0 to-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-black/50 border border-white/5">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm font-sans text-gray-400 uppercase tracking-wider">{stat.label}</div>
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
