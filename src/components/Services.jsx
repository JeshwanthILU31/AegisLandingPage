import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/services';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';

export default function Services({ onOpenContact }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = servicesData[activeIdx];
  const listRef = useRef(null);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % servicesData.length;
      setActiveIdx(next);
      const buttons = listRef.current?.querySelectorAll('button');
      if (buttons && buttons[next]) buttons[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + servicesData.length) % servicesData.length;
      setActiveIdx(prev);
      const buttons = listRef.current?.querySelectorAll('button');
      if (buttons && buttons[prev]) buttons[prev].focus();
    }
  };

  return (
    <section id="services" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Ambient Depth */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00BFEF]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00BFEF]">
              02 // OPERATIONAL SERVICES
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Disciplined capabilities built for complex demands.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            Select an operational practice area to inspect technical deliverables, methodologies, and deployment scope.
          </p>
        </div>

        {/* Master-Detail Operations Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-t border-b border-white/[0.08] py-10">
          
          {/* LEFT: Numbered Vertical Service Index */}
          <div 
            ref={listRef} 
            className="lg:col-span-5 flex flex-col divide-y divide-white/[0.06]" 
            role="tablist" 
            aria-label="Aegis Services Directory"
          >
            {servicesData.map((svc, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={svc.id}
                  role="tab"
                  id={`service-tab-${svc.id}`}
                  aria-selected={isActive}
                  aria-controls={`service-panel-${svc.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group w-full py-5 text-left transition-all duration-200 flex items-center justify-between outline-none relative ${
                    isActive ? 'text-[#F4F7FA]' : 'text-[#728495] hover:text-[#C5D2DC]'
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceBar"
                      className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 bg-[#00BFEF]"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className={`font-mono text-xs sm:text-sm font-medium transition-colors ${
                      isActive ? 'text-[#00BFEF]' : 'text-[#4A5D6E] group-hover:text-[#91A0AE]'
                    }`}>
                      {svc.id}
                    </span>
                    <span className={`font-display text-lg sm:text-xl font-medium tracking-tight transition-colors ${
                      isActive ? 'text-[#F4F7FA] font-semibold' : 'text-[#728495] group-hover:text-[#F4F7FA]'
                    }`}>
                      {svc.title}
                    </span>
                  </div>

                  <div className="flex items-center pl-2">
                    <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                      isActive ? 'text-[#00BFEF] translate-x-1' : 'text-transparent group-hover:text-[#4A5D6E]'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Large Active Service Detail Canvas */}
          <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-white/[0.08]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                id={`service-panel-${activeService.id}`}
                role="tabpanel"
                aria-labelledby={`service-tab-${activeService.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between min-h-[480px]"
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-8">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00BFEF]">
                      PRACTICE {activeService.id} // {activeService.category}
                    </span>
                    <span className="font-mono text-xs text-[#536575]">
                      REF: {activeService.code}
                    </span>
                  </div>

                  {/* Large Editorial Title */}
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-[#F4F7FA] tracking-tight leading-tight mb-6">
                    {activeService.title}
                  </h3>

                  {/* Detailed Description */}
                  <p className="text-base sm:text-lg text-[#91A0AE] leading-relaxed font-normal mb-8 max-w-2xl">
                    {activeService.details}
                  </p>

                  {/* Key Deliverables Matrix */}
                  <div className="mb-10">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#728495] mb-4">
                      Core Operational Deliverables
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {activeService.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#C5D2DC]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Platforms / Workflows Applied */}
                  {activeService.technologies && (
                    <div className="pt-6 border-t border-white/[0.06]">
                      <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#728495] mb-3">
                        Applied Workflows & Tooling
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeService.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="font-mono text-xs text-[#91A0AE] px-2.5 py-1 bg-white/[0.03] border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Inquiry Action Link */}
                <div className="pt-10 mt-10 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-[#536575] font-mono">
                    Operational deployment available on demand
                  </span>
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center gap-2 text-sm font-display font-medium text-[#00BFEF] hover:text-[#4de3ff] transition-colors group cursor-pointer"
                  >
                    <span>Inquire About {activeService.title}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
