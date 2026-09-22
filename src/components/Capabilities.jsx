import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ShinyText from './ShinyText';

const capabilityIndex = [
  {
    number: "01",
    title: "LEGAL OPERATIONS",
    category: "Infrastructure & Process",
    desc: "Strategic operational infrastructure, workflow optimization, technology roadmap execution, and departmental process governance.",
    metrics: "Process Governance & Automation"
  },
  {
    number: "02",
    title: "eDISCOVERY & LITIGATION",
    category: "Forensic Data & Processing",
    desc: "End-to-end electronic discovery, forensic evidence collection, high-throughput processing, and court-ready productions.",
    metrics: "Relativity · 4iG · Canopy"
  },
  {
    number: "03",
    title: "LEGAL & COMPLIANCE",
    category: "Governance & Risk",
    desc: "Structured compliance frameworks, regulatory readiness audits, cross-border data transfer protocols, and risk documentation.",
    metrics: "Regulatory Audit & Policy Architecture"
  },
  {
    number: "04",
    title: "HR & RECRUITMENT",
    category: "Specialized Talent Placement",
    desc: "Specialized placement of vetted professionals across high-stakes legal technology, litigation support, forensic data, and cybersecurity.",
    metrics: "Technical Competency Vetting"
  },
  {
    number: "05",
    title: "DOCUMENT REVIEW",
    category: "Analysis & Classification",
    desc: "High-accuracy managed document review supervised by experienced project managers and specialized attorneys utilizing CAL machine learning.",
    metrics: "Continuous Active Learning (CAL)"
  },
  {
    number: "06",
    title: "CONTRACT SOLUTIONS",
    category: "Lifecycle & Extraction",
    desc: "Comprehensive contract digitization, extraction of critical commercial obligations, risk assessment, and template modernization.",
    metrics: "Obligation & Exposure Extraction"
  },
  {
    number: "07",
    title: "DATA BREACH SUPPORT",
    category: "Incident & Forensic Triage",
    desc: "Rapid-response digital forensics, incident containment, threat investigation, PII exposure mining, and regulatory notification support.",
    metrics: "Rapid Forensic Triage & Recovery"
  }
];

export default function Capabilities({ onOpenContact }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="capabilities" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="06 // FULL CAPABILITIES INDEX" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Comprehensive operational directory.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            A full-spectrum index of specialized legal operations, eDiscovery, and cybersecurity practices.
          </p>
        </div>

        {/* TYPOGRAPHIC INDEX ROWS (CLASSIC LUXURY EDITORIAL ROWS) */}
        <div className="divide-y divide-white/[0.1] border-t border-b border-white/[0.1]">
          {capabilityIndex.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={onOpenContact}
                className="group py-8 sm:py-10 transition-all duration-300 cursor-pointer relative px-2 sm:px-4 hover:bg-white/[0.015]"
              >
                {/* Subtle Cyan Bottom Line Accent on Hover */}
                {isHovered && (
                  <motion.div
                    layoutId="capHoverLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00BFEF]"
                    transition={{ duration: 0.2 }}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  
                  {/* Row Number & Category */}
                  <div className="lg:col-span-2 flex items-center gap-4">
                    <span className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                      isHovered ? 'text-[#00BFEF]' : 'text-[#536575]'
                    }`}>
                      {item.number}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#728495]">
                      {item.category}
                    </span>
                  </div>

                  {/* Large Typography Title */}
                  <div className="lg:col-span-5">
                    <h3 className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight transition-all duration-200 ${
                      isHovered ? 'text-[#00BFEF] translate-x-1' : 'text-[#F4F7FA]'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <div className="lg:col-span-4">
                    <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                      isHovered ? 'text-[#C5D2DC]' : 'text-[#728495]'
                    }`}>
                      {item.desc}
                    </p>
                    <div className="text-[11px] font-mono text-[#00BFEF]/70 mt-1">
                      {item.metrics}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="lg:col-span-1 flex justify-end">
                    <div className={`p-2.5 rounded-full border transition-all duration-200 ${
                      isHovered 
                        ? 'bg-[#00BFEF] border-[#00BFEF] text-[#081018] scale-110 shadow-md shadow-[#00BFEF]/30' 
                        : 'border-white/[0.1] text-[#536575]'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
