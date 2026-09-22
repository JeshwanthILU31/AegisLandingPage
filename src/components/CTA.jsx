import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ShinyText from './ShinyText';

export default function CTA({ onOpenContact }) {
  return (
    <section id="contact" className="relative py-40 sm:py-48 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00BFEF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Section Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="ENGAGE AEGIS SERVICES" 
                className="font-mono text-xs uppercase tracking-[0.25em] font-medium"
                speed={4}
              />
            </div>
          </motion.div>

          {/* Large Minimal Editorial Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-[#F4F7FA] mb-10"
          >
            WHEN THE WORK IS COMPLEX,<br />
            <span className="text-[#00BFEF]">CLARITY MATTERS.</span>
          </motion.h2>

          {/* Minimal Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-[#91A0AE] max-w-2xl leading-relaxed mb-12 font-normal"
          >
            Consult with our specialized practice leaders regarding eDiscovery, legal operations, and forensic incident response requirements.
          </motion.p>

          {/* Single Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onOpenContact}
              className="px-10 py-4.5 rounded bg-[#00BFEF] text-[#06131D] font-display text-sm font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all duration-200 inline-flex items-center gap-2 shadow-xl shadow-[#00BFEF]/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF] cursor-pointer"
            >
              <span>Contact Aegis Services</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Minimal Technical Footer Rule */}
          <div className="mt-28 pt-8 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#536575]">
            <span>STRICT OPERATIONAL INTEGRITY</span>
            <span>END-TO-END DATA STEWARDSHIP</span>
            <span>RAPID RESPONSE READINESS</span>
          </div>

        </div>

      </div>
    </section>
  );
}
