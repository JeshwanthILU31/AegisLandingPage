import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Database, Lock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';

export default function Introduction() {
  return (
    <section id="about" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden">
      {/* Background Decorative Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute -left-48 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00BFEF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Label */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
            <ShinyText 
              text="01 // INTRODUCTION & MANDATE" 
              className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
              speed={4}
            />
          </div>
        </div>

        {/* Editorial Two-Column Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Large Editorial Statement */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[#F4F7FA] tracking-tight">
                Precision matters when the work involves sensitive data, complex legal processes, and critical business decisions.
              </h2>
              
              <div className="mt-8 h-[2px] w-24 bg-gradient-to-r from-[#00BFEF] to-transparent" />
            </motion.div>
          </div>

          {/* Right Column: Structured Context & Core Focus */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                className="introduction-spotlight-card relative overflow-hidden p-8 bg-[#0D1720]/90 border border-white/[0.08] shadow-xl"
                spotlightColor="rgba(32, 212, 255, 0.12)"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00BFEF]/10 to-transparent pointer-events-none" />
                
                <p className="text-lg sm:text-xl text-[#F4F7FA] font-medium leading-relaxed mb-5">
                  We are a cybersecurity and incident response company specializing in helping organizations prepare for, respond to, and recover from cyber incidents and data breaches.
                </p>

                <p className="text-sm sm:text-base text-[#91A0AE] leading-relaxed font-normal">
                  Our team provides end-to-end incident response services designed to rapidly identify threats, contain attacks, investigate security incidents, and support secure recovery.
                </p>
              </SpotlightCard>
            </motion.div>

            {/* Core Domain Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="p-4.5 bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5 hover:border-[#00BFEF]/30 transition-colors">
                <div className="p-2 bg-[#111D27] border border-[#00BFEF]/20 text-[#00BFEF] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-semibold">Threat Containment</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Immediate blast-radius isolation & endpoint defense.</p>
                </div>
              </div>

              <div className="p-4.5 bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5 hover:border-[#00BFEF]/30 transition-colors">
                <div className="p-2 bg-[#111D27] border border-[#00BFEF]/20 text-[#00BFEF] shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-semibold">Forensic Discovery</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Root-cause attack reconstruction & artifact analysis.</p>
                </div>
              </div>

              <div className="p-4.5 bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5 hover:border-[#00BFEF]/30 transition-colors">
                <div className="p-2 bg-[#111D27] border border-[#00BFEF]/20 text-[#00BFEF] shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-semibold">Data Stewardship</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Defensible eDiscovery processing & PII identification.</p>
                </div>
              </div>

              <div className="p-4.5 bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5 hover:border-[#00BFEF]/30 transition-colors">
                <div className="p-2 bg-[#111D27] border border-[#00BFEF]/20 text-[#00BFEF] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-semibold">Operational Resilience</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Sanitized system restoration & continuous hardening.</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
