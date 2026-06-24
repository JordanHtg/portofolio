"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-cyber-cyan mb-3">
          {subtitle}
        </h2>
        <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight glow-text">
          {title}
        </h3>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}
