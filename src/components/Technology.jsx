import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ediscoveryTechnologies, ediscoveryPipeline } from '../data/technology';
import { Database, Cpu, FileCheck, Share2, ArrowRight, Layers, Binary, ShieldAlert } from 'lucide-react';

const iconMap = {
  Database: Database,
  Cpu: Cpu,
  FileCheck: FileCheck,
  Share2: Share2
};

export default function Technology() {
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  return (
    <section id="technology" className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0D7892]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="tech-label">03 // EDISCOVERY TECHNOLOGY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
            Technology-enabled workflows for complex discovery and litigation support.
          </h2>
          <p className="text-sm sm:text-base text-[#91A0AE] mt-4 leading-relaxed">
            Platforms and technologies integrated into the eDiscovery capability to support processing, review, and production workflows.
          </p>
        </div>

        {/* Visual Pipeline: Collection -> Processing -> Review -> Production */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#20D4FF]">
                PIPELINE ARCHITECTURE
              </span>
              <span className="text-xs text-[#5E7182]">| Cryptographic Chain of Custody</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#91A0AE]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#20D4FF]" />
                Live Node
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0D7892]" />
                Data Ingestion
              </span>
            </div>
          </div>

          {/* Desktop / Tablet Horizontal Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {ediscoveryPipeline.map((step, idx) => {
              const IconComponent = iconMap[step.icon] || Layers;
              const isSelected = activePipelineStep === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`cursor-pointer rounded-xl p-6 border transition-all duration-300 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-[#0D1720] border-[#20D4FF]/50 shadow-lg shadow-[#20D4FF]/10'
                      : 'bg-[#081018]/80 border-white/[0.08] hover:bg-[#0D1720]/50 hover:border-white/[0.15]'
                  }`}
                >
                  {/* Subtle top indicator */}
                  <div
                    className={`h-1 w-full absolute top-0 left-0 transition-colors ${
                      isSelected ? 'bg-[#20D4FF]' : 'bg-transparent group-hover:bg-[#0D7892]'
                    }`}
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-[#111D27] border border-white/[0.06] text-[#20D4FF] group-hover:border-[#20D4FF]/40 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#5E7182] group-hover:text-[#20D4FF]">
                      PHASE {step.step}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#20D4FF] mb-1 font-semibold">
                    {step.phase}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[#F4F7FA] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#91A0AE] leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#5E7182]">
                    <span>{step.metrics}</span>
                    {idx < ediscoveryPipeline.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#0D7892] hidden md:block group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmed Technologies / Platforms Cards */}
        <div>
          <div className="mb-6">
            <h3 className="font-display font-semibold text-xl text-[#F4F7FA] flex items-center gap-2.5">
              <Binary className="w-5 h-5 text-[#20D4FF]" />
              Integrated eDiscovery Technologies & Platforms
            </h3>
            <p className="text-xs text-[#91A0AE] mt-1">
              Platforms deployed across processing, analytic segmentation, and PII exposure workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ediscoveryTechnologies.map((tech, idx) => (
              <div
                key={tech.id}
                className="p-7 rounded-2xl bg-[#0D1720] border border-white/[0.08] hover:border-[#20D4FF]/30 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Tech Wordmark Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#5E7182]">
                      PLATFORM 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#111D27] border border-white/[0.06] text-[#20D4FF]">
                      {tech.type}
                    </span>
                  </div>

                  {/* Clean text-based wordmark */}
                  <div className="font-display font-bold text-2xl tracking-wider text-[#F4F7FA] group-hover:text-[#20D4FF] transition-colors mb-2">
                    {tech.name}
                  </div>
                  <div className="text-xs font-mono text-[#20D4FF]/90 mb-4">
                    {tech.tagline}
                  </div>

                  <p className="text-xs text-[#91A0AE] leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-5 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-display uppercase tracking-wider text-[#F4F7FA] font-bold mb-2">
                    Capability Integration:
                  </div>
                  {tech.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-[#91A0AE]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20D4FF]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
