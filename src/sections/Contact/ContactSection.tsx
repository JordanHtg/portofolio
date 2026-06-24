"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Send, Mail, Code, Briefcase } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="relative w-full py-32 bg-transparent" id="contact">
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <SectionHeader title="Establish Connection" subtitle="06 // Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-heading font-bold text-white mb-6">Let's build something secure together.</h3>
            <p className="text-gray-400 font-sans mb-10 text-lg">
              Tertarik untuk kolaborasi, proyek freelance, atau diskusi seputar keamanan jaringan dan arsitektur web? Kirimkan pesan!
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@jourdan.com" className="flex items-center gap-4 text-gray-300 hover:text-cyber-cyan transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-cyber-cyan/50 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-sans">2305010002@wbi.ac.id</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-cyber-cyan transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-cyber-cyan/50 transition-colors">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-lg font-sans">github.com/JordanHtg</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-cyber-cyan transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-cyber-cyan/50 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-lg font-sans">linkedin.com/in/jourdanh</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans text-cyber-cyan uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  placeholder="Full Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans text-cyber-cyan uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  placeholder="username@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans text-cyber-cyan uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  placeholder="Masukkan Pesan Anda..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={formState !== "idle"}
                className="interactive relative overflow-hidden w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-300 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "idle" && (
                  <span className="flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </span>
                )}
                {formState === "submitting" && "Encrypting & Sending..."}
                {formState === "success" && "Message Delivered!"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
