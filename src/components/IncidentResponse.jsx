import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { incidentStages, incidentCapabilities } from '../data/incident';
import {
  ShieldAlert,
  SearchCode,
  HardDrive,
  Bug,
  Crosshair,
  Lock,
  Activity,
  RefreshCw,
  FileText,
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  Flame,
  Terminal
} from 'lucide-react';

const incidentIconMap = {
  ShieldAlert,
  SearchCode,
  HardDrive,
  Bug,
  Crosshair,
  Lock,
  Activity,
  RefreshCw,
  FileText,
  ShieldCheck
};

export default function IncidentResponse({ onOpenContact }) {
  const [activeNetworkStage, setActiveNetworkStage] = useState(0);

  return (
    <section className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0D7892]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="tech-label">05 // DATA BREACH SUPPORT</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
            Incident response, from detection to resilience.
          </h2>
          <p className="text-sm sm:text-base text-[#91A0AE] mt-4 leading-relaxed">
            A structured approach to cyber incidents — combining digital forensics, threat investigation, and security remediation to help organizations understand the impact and restore operations with confidence.
          </p>
        </div>

        {/* Visual Incident Network: INCIDENT -> INVESTIGATION -> EVIDENCE -> CONTAINMENT -> RECOVERY */}
        <div className="mb-20 p-6 sm:p-8 rounded-2xl bg-[#0D1720] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#20D4FF] font-semibold">
                INCIDENT TRAJECTORY NETWORK
              </span>
              <p className="text-xs text-[#91A0AE] mt-0.5">
                Sequential forensic response & operational containment topology
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#111D27] text-[11px] font-mono text-[#20D4FF] border border-[#20D4FF]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D4FF] animate-pulse" />
              HOTLINE READY
            </span>
          </div>

          {/* Connected Network Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {incidentStages.map((stage, idx) => {
              const isSelected = activeNetworkStage === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveNetworkStage(idx)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#111D27] border-[#20D4FF]/60 shadow-lg shadow-[#20D4FF]/10'
                      : 'bg-[#081018]/70 border-white/[0.06] hover:bg-[#111D27]/60 hover:border-white/[0.12]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isSelected ? 'text-[#20D4FF]' : 'text-[#5E7182]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      {idx < incidentStages.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#0D7892] hidden md:block" />
                      )}
                    </div>

                    <div
                      className={`font-display font-bold text-sm tracking-wider uppercase mb-1.5 ${
                        isSelected ? 'text-[#20D4FF]' : 'text-[#F4F7FA]'
                      }`}
                    >
                      {stage.name}
                    </div>

                    <p className="text-[11px] text-[#91A0AE] leading-snug">
                      {stage.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/[0.04] text-[10px] font-mono text-[#5E7182]">
                    {stage.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmed 10 Capabilities Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-semibold text-2xl text-[#F4F7FA]">
                Confirmed Incident & Forensics Capabilities
              </h3>
              <p className="text-xs text-[#91A0AE] mt-1">
                Ten disciplined operational proficiencies deployed across digital investigations and breach containment.
              </p>
            </div>
            <span className="text-xs font-mono text-[#20D4FF] px-2.5 py-1 rounded bg-[#0D1720] border border-white/[0.08]">
              10 CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {incidentCapabilities.map((cap) => {
              const IconComp = incidentIconMap[cap.icon] || ShieldAlert;

              return (
                <div
                  key={cap.number}
                  className="p-5 rounded-xl bg-[#0D1720] border border-white/[0.08] hover:border-[#20D4FF]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded bg-[#111D27] border border-white/[0.06] text-[#20D4FF] group-hover:border-[#20D4FF]/30 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-[#5E7182]">
                        {cap.number}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-sm text-[#F4F7FA] mb-2 leading-snug group-hover:text-[#20D4FF] transition-colors">
                      {cap.title}
                    </h4>

                    <p className="text-xs text-[#91A0AE] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
