import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Database, Lock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function Introduction() {
  return (
    <section id="about" className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="absolute -left-48 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#0D7892]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Label */}
        <div className="mb-12">
          <span className="tech-label">01 // INTRODUCTION</span>
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
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[1.18] text-[#F4F7FA] tracking-tight">
                Precision matters when the work involves sensitive data, complex legal processes and critical business decisions.
              </h2>
              
              <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#20D4FF] to-transparent" />
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
                className="introduction-spotlight-card relative overflow-hidden"
                spotlightColor="rgba(32, 212, 255, 0.14)"
              >
                {/* Subtle accent corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#20D4FF]/10 to-transparent pointer-events-none" />
                
                <p className="text-lg sm:text-xl text-[#F4F7FA] font-medium leading-relaxed mb-6">
                  We are a cybersecurity and incident response company specializing in helping organizations prepare for, respond to, and recover from cyber incidents and data breaches.
                </p>

                <p className="text-sm sm:text-base text-[#91A0AE] leading-relaxed">
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
              <div className="p-4 rounded-lg bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5">
                <div className="p-2 rounded bg-[#111D27] border border-[#20D4FF]/20 text-[#20D4FF] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-bold">Threat Containment</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Immediate blast-radius isolation & endpoint defense.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5">
                <div className="p-2 rounded bg-[#111D27] border border-[#20D4FF]/20 text-[#20D4FF] shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-bold">Forensic Discovery</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Root-cause attack reconstruction & artifact analysis.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5">
                <div className="p-2 rounded bg-[#111D27] border border-[#20D4FF]/20 text-[#20D4FF] shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-bold">Data Stewardship</h4>
                  <p className="text-xs text-[#91A0AE] mt-1 leading-relaxed">Defensible eDiscovery processing & PII identification.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0D1720]/60 border border-white/[0.06] flex items-start gap-3.5">
                <div className="p-2 rounded bg-[#111D27] border border-[#20D4FF]/20 text-[#20D4FF] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[#F4F7FA] font-bold">Operational Resilience</h4>
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
