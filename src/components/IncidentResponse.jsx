import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { incidentCapabilities } from '../data/incident';
import { ArrowUpRight, Terminal, Shield, ChevronRight, Check } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';
import DecryptedText from './DecryptedText';

const consolePhases = [
  {
    id: 'detect',
    code: 'PHASE-01',
    name: 'DETECT',
    headline: 'Signal Verification & Triage Activation',
    description: 'Immediate evaluation of anomalous telemetry, detection alerts, and potential indicators of compromise to determine breach scope and activate structured triage protocols.',
    actions: [
      'Initial artifact acquisition & volatile state preservation',
      'Severity classification & command channel establishment',
      'Engagement of specialized forensic investigation team'
    ],
    safeguards: 'Forensic integrity protocols engaged immediately.'
  },
  {
    id: 'investigate',
    code: 'PHASE-02',
    name: 'INVESTIGATE',
    headline: 'Deep Forensic Discovery & Attack Path Reconstruction',
    description: 'Systematic examination of forensic disk images, event log repositories, and network telemetry to identify root-cause intrusion vectors and lateral movement history.',
    actions: [
      'Disk and memory image artifact extraction',
      'Attacker persistence mechanism identification',
      'Timeline reconstruction of unauthorized access'
    ],
    safeguards: 'Cryptographic hash verification maintained on all artifacts.'
  },
  {
    id: 'contain',
    code: 'PHASE-03',
    name: 'CONTAIN',
    headline: 'Blast Radius Isolation & Threat Eradication',
    description: 'Surgical isolation of compromised endpoints, revocation of compromised credentials, firewall rule enforcement, and elimination of threat actor persistence.',
    actions: [
      'Host isolation and lateral segmentation verification',
      'Compromised credential rotation & session termination',
      'Malicious binary and script eradication'
    ],
    safeguards: 'Defensible containment without evidence destruction.'
  },
  {
    id: 'recover',
    code: 'PHASE-04',
    name: 'RECOVER',
    headline: 'Sanitized System Restoration & Operational Validation',
    description: 'Controlled restoration of critical network systems and databases from verified clean states, followed by continuous integrity telemetry and validation testing.',
    actions: [
      'Verified clean image rebuild & data restoration',
      'High-frequency telemetry & integrity validation',
      'Controlled operational re-entry of business workloads'
    ],
    safeguards: 'Full environment validation prior to production re-entry.'
  },
  {
    id: 'strengthen',
    code: 'PHASE-05',
    name: 'STRENGTHEN',
    headline: 'Post-Incident Analysis & Regulatory Evidence',
    description: 'Comprehensive debriefing, compilation of executive-ready forensic reports, identification of exposed PII/data subjects, and regulatory notification documentation.',
    actions: [
      'Comprehensive digital forensics technical report',
      'Exposed data mining & regulatory notification support',
      'Remediation roadmap & security hardening architecture'
    ],
    safeguards: 'Court-defensible documentation and regulatory alignment.'
  }
];

export default function IncidentResponse({ onOpenContact }) {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const activePhase = consolePhases[activePhaseIdx];

  return (
    <section className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00BFEF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="05 // INCIDENT RESPONSE CONSOLE" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4.2}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Methodical containment & digital forensics lifecycle.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            A structured operational console representing the forensic lifecycle deployed when organizations face complex security compromises and data exposure.
          </p>
        </div>

        {/* INCIDENT RESPONSE CONSOLE DECK */}
        <SpotlightCard 
          className="border border-white/[0.08] bg-[#0A121A]/95 p-6 sm:p-10 mb-20 shadow-2xl relative overflow-hidden"
          spotlightColor="rgba(32, 212, 255, 0.1)"
        >
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00BFEF]" />
              <span className="text-[#F4F7FA] tracking-widest uppercase font-semibold">WORKFLOW CONSOLE // STAGES 01–05</span>
            </div>
            <div className="text-[#536575]">
              FRAMEWORK: FORENSIC INVESTIGATION & BREACH MITIGATION
            </div>
          </div>

          {/* Phase Selector Track */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] my-6">
            {consolePhases.map((phase, idx) => {
              const isActive = activePhaseIdx === idx;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIdx(idx)}
                  className={`p-4 text-left transition-all relative group cursor-pointer ${
                    isActive ? 'bg-[#00BFEF]/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Top Active Line */}
                  {isActive && (
                    <motion.div
                      layoutId="consolePhaseTopBar"
                      className="absolute top-0 left-0 right-0 h-0.5 bg-[#00BFEF]"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                  <div className={`font-mono text-[10px] tracking-widest mb-1 transition-colors ${
                    isActive ? 'text-[#00BFEF]' : 'text-[#536575]'
                  }`}>
                    {phase.code}
                  </div>
                  <div className={`font-display text-sm sm:text-base font-bold tracking-tight transition-colors ${
                    isActive ? 'text-[#F4F7FA]' : 'text-[#728495] group-hover:text-[#C5D2DC]'
                  }`}>
                    {phase.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Display Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Phase Overview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs text-[#00BFEF] uppercase tracking-[0.2em] flex items-center gap-2">
                  <span>{activePhase.code} //</span>
                  <DecryptedText text={activePhase.name} speed={30} />
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#F4F7FA] tracking-tight">
                  {activePhase.headline}
                </h3>
                <p className="text-base text-[#91A0AE] leading-relaxed font-normal">
                  {activePhase.description}
                </p>
                <div className="pt-2">
                  <span className="font-mono text-xs text-[#536575] bg-white/[0.03] px-3 py-1.5 border border-white/[0.06] inline-block">
                    SAFEGUARD: {activePhase.safeguards}
                  </span>
                </div>
              </div>

              {/* Action Vector Matrix */}
              <div className="lg:col-span-6 lg:pl-6 lg:border-l lg:border-white/[0.08] space-y-4">
                <div className="font-mono text-xs text-[#728495] uppercase tracking-[0.18em]">
                  Phase Actions & Protocols
                </div>
                <div className="space-y-3">
                  {activePhase.actions.map((act, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.05]">
                      <Check className="w-4 h-4 text-[#00BFEF] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#C5D2DC] font-normal leading-relaxed">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Console Bottom Status */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-[#536575]">
            <span>INCIDENT PROTOCOL EXECUTION</span>
            <button
              onClick={onOpenContact}
              className="text-[#00BFEF] hover:text-[#4de3ff] flex items-center gap-1.5 font-display text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Incident Response Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </SpotlightCard>

        {/* Structured Technical Discipline Ledger (Classic Editorial Layout) */}
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#728495] mb-6 pb-2 border-b border-white/[0.08]">
            Forensic & Incident Response Capabilities Ledger
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-white/[0.06]">
            {incidentCapabilities.slice(0, 8).map((cap) => (
              <div key={cap.number} className="py-4.5 flex items-start justify-between gap-4 border-b border-white/[0.06] hover:bg-white/[0.01] px-2 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-[#00BFEF] font-semibold">{cap.number}</span>
                    <span className="font-display text-sm font-semibold text-[#F4F7FA]">{cap.title}</span>
                  </div>
                  <p className="text-xs text-[#91A0AE] font-normal leading-relaxed pl-7">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
