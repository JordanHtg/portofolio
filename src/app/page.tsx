"use client";

import { HeroSection } from "@/sections/Hero/HeroSection";
import { AboutSection } from "@/sections/About/AboutSection";
import { SkillsSection } from "@/sections/Skills/SkillsSection";
import { ProjectsSection } from "@/sections/Projects/ProjectsSection";
import { ExperienceSection } from "@/sections/Experience/ExperienceSection";
import { CertificatesSection } from "@/sections/Certificates/CertificatesSection";
import { ContactSection } from "@/sections/Contact/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { CyberScene } from "@/components/3d/CyberScene";
import { useSecretMode } from "@/store/useSecretMode";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { isSecretMode, setSecretMode } = useSecretMode();

  return (
    <main className="relative flex flex-col min-h-screen bg-transparent">
      {/* Global 3D Background - Always Rendered */}
      <CyberScene />

      {/* Secret Mode Return Button */}
      <AnimatePresence>
        {isSecretMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[100]"
          >
            <button
              onClick={() => setSecretMode(false)}
              className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyber-cyan text-cyber-cyan font-sans tracking-widest uppercase hover:bg-cyber-cyan hover:text-black transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Kembali ke Realitas
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal Website Content */}
      <AnimatePresence>
        {!isSecretMode && (
          <motion.div
            key="normal-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full flex flex-col z-10"
          >
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificatesSection />
            <ContactSection />
            
            {/* Hidden Button above Footer */}
            <div className="w-full flex justify-center py-12 relative z-20">
              <button 
                onClick={() => setSecretMode(true)}
                className="opacity-20 hover:opacity-100 px-6 py-2 text-xs font-sans tracking-widest text-cyber-cyan border border-cyber-cyan/30 rounded-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
              >
                [ INIT_SECRET_PROTOCOL ]
              </button>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
