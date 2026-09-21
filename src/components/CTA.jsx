import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Terminal, ArrowRight } from 'lucide-react';

export default function CTA({ onOpenContact }) {
  return (
    <section id="contact" className="relative py-32 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Radial and Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0D7892]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-4xl mx-auto">
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1720] border border-[#20D4FF]/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#20D4FF] animate-pulse" />
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#20D4FF] font-semibold">
              CONTACT AEGIS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-[#F4F7FA] mb-8">
            WHEN THE WORK IS<br />
            COMPLEX,<br />
            <span className="text-[#20D4FF] text-glow">
              CLARITY MATTERS.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#91A0AE] max-w-2xl mx-auto leading-relaxed mb-10">
            Explore how Aegis Services can support your legal, data, operational and incident-response needs.
          </p>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-10 py-4 rounded bg-[#20D4FF] text-[#081018] font-display text-sm font-semibold uppercase tracking-wider hover:bg-[#4de3ff] transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#20D4FF]/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20D4FF]"
            >
              <span>Contact Aegis</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Factual Disclaimer Ribbon */}
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-[#5E7182]">
            <span>STRICT OPERATIONAL INTEGRITY</span>
            <span>·</span>
            <span>END-TO-END DATA STEWARDSHIP</span>
            <span>·</span>
            <span>RAPID RESPONSE READINESS</span>
          </div>

        </div>

      </div>
    </section>
  );
}
