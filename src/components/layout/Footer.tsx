"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-transparent relative z-10 text-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-gray-500 font-sans text-sm"
        >
          &copy; {new Date().getFullYear()} Jourdan Hutagalung. All rights reserved.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="flex items-center gap-6 text-sm text-gray-500 font-sans"
        >
          <a href="#" className="hover:text-cyber-cyan transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyber-cyan transition-colors">Terms of Service</a>
        </motion.div>
      </div>
    </footer>
  );
}
