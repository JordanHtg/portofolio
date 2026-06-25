"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { X, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2025",
    image: "/grid.svg", // Placeholder, we will use styled div instead of actual image if none exists
    url: "#"
  },
  {
    id: 2,
    title: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "/grid.svg",
    url: "#"
  },
  {
    id: 3,
    title: "Frontend Web Development React",
    issuer: "Coursera",
    date: "2024",
    image: "/grid.svg",
    url: "#"
  }
];

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section className="relative w-full py-32 bg-transparent" id="certificates">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader title="Credentials" subtitle="05 // Certificates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-xl cursor-pointer group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-cyber-dark/80 flex items-center justify-center border border-white/5 group-hover:border-cyber-cyan/30 transition-colors">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="relative z-10 text-center p-4">
                  <h4 className="text-xl font-heading font-bold text-white mb-2">{cert.title}</h4>
                  <p className="text-cyber-cyan text-sm">{cert.issuer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
              >
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-50 p-3 rounded-full bg-black/50 text-white hover:text-cyber-cyan hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="aspect-[4/3] sm:aspect-video w-full bg-cyber-dark relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                  <div className="relative z-10 text-center p-8">
                    <h3 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">{selectedCert.title}</h3>
                    <p className="text-xl text-cyber-cyan mb-2">{selectedCert.issuer}</p>
                    <p className="text-gray-400 mb-8">Issued: {selectedCert.date}</p>
                    <a 
                      href={selectedCert.url}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan/10 text-cyber-cyan rounded-full border border-cyber-cyan/50 hover:bg-cyber-cyan hover:text-black transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Verify Credential
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
