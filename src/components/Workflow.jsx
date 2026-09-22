import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';

const approachStages = [
  {
    step: "01",
    phase: "UNDERSTAND",
    headline: "Scope Definition & Objective Alignment",
    details: "Assess operational parameters, data landscapes, regulatory constraints, and matter requirements to establish an immutable procedural baseline before any data manipulation occurs.",
    deliverables: ["Matter charter & scoping protocol", "Data source inventory & custody mapping", "Timeline & resource allocation schedule"]
  },
  {
    step: "02",
    phase: "ORGANIZE",
    headline: "Data Architecture & Protocol Setup",
    details: "Structure incoming electronic data, verify cryptographic chain of custody, configure processing environments, and deploy tailored analytical parameters.",
    deliverables: ["Secure data repository provisioning", "Forensic hash verification & deduplication", "Custom review coding manuals & protocols"]
  },
  {
    step: "03",
    phase: "REVIEW",
    headline: "Rigorous Analysis & Quality Verification",
    details: "Execute disciplined review cycles utilizing supervised machine learning (CAL), concept clustering, and multi-tier statistical quality control sampling.",
    deliverables: ["Tiered attorney review execution", "Statistical QC validation audits", "Exception & anomaly logging reports"]
  },
  {
    step: "04",
    phase: "SUPPORT",
    headline: "Operational Delivery & Intermediary Reporting",
    details: "Provide continuous technical advisory, progress telemetry, intermediate extracts, and cross-functional coordination with counsel and operational leaders.",
    deliverables: ["Matter progression telemetry", "Privilege logs & redaction matrices", "Ongoing technical & legal advisory briefings"]
  },
  {
    step: "05",
    phase: "RESOLVE",
    headline: "Final Output & Defensible Delivery",
    details: "Deliver finalized, court-ready productions, verified compliance documentation, audit trail certifications, and post-project data disposition debriefs.",
    deliverables: ["Court-compliant defensible production files", "Full audit trail certification documentation", "Secure data return & archival protocol"]
  }
];

export default function Workflow() {
  return (
    <section id="approach" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00BFEF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="04 // FORENSIC INVESTIGATION TIMELINE" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            A linear progression from complexity to clarity.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            A continuous operational continuum engineered to transform high-volume uncertainty into structured, verifiable deliverables.
          </p>
        </div>

        {/* Vertical Tracing Timeline */}
        <div className="relative border-l border-white/[0.12] ml-4 sm:ml-8 pl-8 sm:pl-16 space-y-16 sm:space-y-24">
          
          {approachStages.map((stage, idx) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Tracer Node */}
              <div className="absolute -left-[41px] sm:-left-[73px] top-1 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#081018] border-2 border-[#00BFEF] flex items-center justify-center shadow-md shadow-[#00BFEF]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00BFEF] group-hover:scale-150 transition-transform duration-200" />
                </div>
              </div>

              {/* Stage Content Card Deck */}
              <div className="p-6 sm:p-8 bg-[#0D1720]/80 border border-white/[0.07] hover:border-[#00BFEF]/30 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  
                  {/* Left: Step Identifier & Stage Name */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00BFEF] mb-2 font-semibold">
                      <span>STAGE {stage.step}</span>
                      <span className="text-[#4A5D6E]">/ 05</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#F4F7FA] group-hover:text-[#00BFEF] transition-colors">
                      {stage.phase}
                    </h3>
                    <div className="text-xs sm:text-sm font-medium text-[#728495] mt-1 font-mono">
                      {stage.headline}
                    </div>
                  </div>

                  {/* Right: Narrative & Verified Deliverables */}
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#91A0AE] leading-relaxed font-normal">
                      {stage.details}
                    </p>

                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#536575] mb-3">
                        Phase Deliverables & Verification
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stage.deliverables.map((item, dIdx) => (
                          <div 
                            key={dIdx}
                            className="text-xs text-[#C5D2DC] font-mono py-2.5 px-3 border-l-2 border-[#00BFEF]/60 bg-white/[0.02]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
