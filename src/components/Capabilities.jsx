import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Scale, Search, FileCheck, Shield, FileSignature, Users, ShieldAlert, Cpu } from 'lucide-react';

export default function Capabilities({ onSelectService, onOpenContact }) {
  return (
    <section className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0D7892]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="tech-label">06 // CAPABILITIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
            A full-spectrum service portfolio.
          </h2>
          <p className="text-sm sm:text-base text-[#91A0AE] mt-4 leading-relaxed">
            Asymmetric deployment models designed for high-density legal, data, and security demands.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]">
          
          {/* Card 1: Legal Operations (Large Span: col-span-2) */}
          <div className="md:col-span-2 rounded-2xl bg-[#0D1720] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#20D4FF]/10 to-transparent pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#5E7182] group-hover:text-[#20D4FF]">
                  01 // INFRASTRUCTURE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                Legal Operations
              </h3>
              <p className="text-xs sm:text-sm text-[#91A0AE] leading-relaxed max-w-md">
                Strategic operational infrastructure, workflow optimization, and process management for corporate legal departments and law firms.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">Process Governance & Automation</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 2: eDiscovery (Span: col-span-1 or 2 on lg) */}
          <div className="md:col-span-1 lg:col-span-2 rounded-2xl bg-[#111D27] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#0D7892]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#0D1720] border border-white/[0.06] text-[#20D4FF]">
                  <Search className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#20D4FF]">
                  02 // EDISCOVERY
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                eDiscovery & Litigation Services
              </h3>
              <p className="text-xs sm:text-sm text-[#91A0AE] leading-relaxed">
                Integrated processing & analytics powered by Relativity, 4iG, and Canopy for high-stakes dispute resolution.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">Relativity · 4iG · Canopy</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 3: Document Review (Tall Card / row-span-1) */}
          <div className="md:col-span-1 rounded-2xl bg-[#0D1720] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#5E7182]">
                  03
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                Managed Document Review
              </h3>
              <p className="text-xs text-[#91A0AE] leading-relaxed">
                Supervised attorney review teams, continuous active learning, privilege defense, and defensible quality control.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">CAL & TAR Models</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF]" />
            </div>
          </div>

          {/* Card 4: Compliance (Span: col-span-1) */}
          <div className="md:col-span-1 rounded-2xl bg-[#0D1720] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#5E7182]">
                  04
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                Legal & Compliance Support
              </h3>
              <p className="text-xs text-[#91A0AE] leading-relaxed">
                Regulatory audit readiness, multi-jurisdictional compliance protocols, and risk documentation matrices.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">Audit Readiness</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF]" />
            </div>
          </div>

          {/* Card 5: Contract Solutions (Span: col-span-1) */}
          <div className="md:col-span-1 rounded-2xl bg-[#0D1720] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                  <FileSignature className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#5E7182]">
                  05
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                Contract Solutions
              </h3>
              <p className="text-xs text-[#91A0AE] leading-relaxed">
                Legacy portfolio abstraction, covenant & liability extraction, and structured contract repository modernization.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">Obligation Mining</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF]" />
            </div>
          </div>

          {/* Card 6: HR & Recruitment (Span: col-span-1) */}
          <div className="md:col-span-1 rounded-2xl bg-[#0D1720] border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-[#20D4FF]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#5E7182]">
                  06
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                HR & Recruitment
              </h3>
              <p className="text-xs text-[#91A0AE] leading-relaxed">
                Specialized talent deployment across legal technology, forensic analysts, and incident response personnel.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5E7182]">Domain Vetting</span>
              <ArrowUpRight className="w-4 h-4 text-[#91A0AE] group-hover:text-[#20D4FF]" />
            </div>
          </div>

          {/* Card 7: Data Breach Support (Large Highlight Card: col-span-1 md:col-span-3 lg:col-span-4) */}
          <div className="md:col-span-3 lg:col-span-4 rounded-2xl bg-gradient-to-r from-[#0D1720] via-[#111D27] to-[#0D1720] border border-[#20D4FF]/30 p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#20D4FF]/60 transition-all duration-300 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#20D4FF]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-[#20D4FF]/10 text-[#20D4FF] text-xs font-mono font-semibold border border-[#20D4FF]/30">
                  07 // INCIDENT OPERATIONS
                </span>
                <span className="text-xs uppercase tracking-wider text-[#91A0AE] font-mono">
                  Cyber Incident & Forensics
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                Data Breach Support
              </h3>
              <p className="text-xs sm:text-sm text-[#91A0AE] leading-relaxed">
                Rapid-response digital forensics, threat hunting, compromise assessment, malware investigation, and regulatory notification support.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded bg-[#20D4FF] text-[#081018] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#4be3ff] transition-all flex items-center gap-2 shadow-lg shadow-[#20D4FF]/20"
              >
                <span>Request Incident Triage</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
