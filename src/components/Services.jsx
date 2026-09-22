import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/services';
import { ArrowUpRight, Check, ChevronRight, Shield, Terminal, Cpu } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';
import DecryptedText from './DecryptedText';

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
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="OUR SERVICES // 07 CORE DISCIPLINES" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4.5}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Disciplined capabilities built for complex legal & technical demands.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            Select an operational practice area to inspect technical deliverables, methodologies, and deployment scope.
          </p>
        </div>

        {/* Master-Detail Operations Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT: Numbered Vertical Service Index */}
          <div 
            ref={listRef} 
            className="lg:col-span-5 flex flex-col space-y-2" 
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
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group w-full p-4 sm:p-5 text-left transition-all duration-200 flex items-center justify-between border relative cursor-pointer ${
                    isActive 
                      ? 'bg-[#0D1720] border-[#00BFEF]/40 text-[#F4F7FA] shadow-lg shadow-[#00BFEF]/5' 
                      : 'bg-transparent border-white/[0.05] text-[#728495] hover:bg-white/[0.02] hover:border-white/[0.1] hover:text-[#C5D2DC]'
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#00BFEF]"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className={`font-mono text-xs sm:text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#00BFEF]' : 'text-[#4A5D6E] group-hover:text-[#91A0AE]'
                    }`}>
                      {svc.id}
                    </span>
                    <div>
                      <div className={`font-display text-base sm:text-lg font-medium tracking-tight transition-colors ${
                        isActive ? 'text-[#F4F7FA] font-semibold' : 'text-[#8598A8] group-hover:text-[#F4F7FA]'
                      }`}>
                        {svc.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#536575] mt-0.5">
                        {svc.category}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-all duration-200 shrink-0 ${
                    isActive ? 'text-[#00BFEF] translate-x-1' : 'text-transparent group-hover:text-[#4A5D6E]'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* RIGHT: Large Active Service Detail Canvas */}
          <div className="lg:col-span-7">
            <SpotlightCard
              className="h-full p-8 sm:p-10 bg-[#0D1720]/90 border border-white/[0.08] shadow-2xl flex flex-col justify-between relative overflow-hidden"
              spotlightColor="rgba(32, 212, 255, 0.12)"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  id={`service-panel-${activeService.id}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${activeService.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Metadata Strip with DecryptedText */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-8">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00BFEF]" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00BFEF]">
                          PRACTICE {activeService.id} // {activeService.category}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-[#536575]">
                        <DecryptedText 
                          text={`CODE: ${activeService.code}`} 
                          speed={40}
                          animateOn="view"
                        />
                      </div>
                    </div>

                    {/* Large Editorial Title */}
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-[#F4F7FA] tracking-tight leading-tight mb-5">
                      {activeService.title}
                    </h3>

                    {/* Detailed Description */}
                    <p className="text-base sm:text-lg text-[#91A0AE] leading-relaxed font-normal mb-8">
                      {activeService.details}
                    </p>

                    {/* Key Deliverables Matrix */}
                    <div className="mb-8">
                      <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#728495] mb-4">
                        Core Operational Deliverables
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeService.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 p-2.5 bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-[#C5D2DC]">
                            <Check className="w-4 h-4 text-[#00BFEF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Platforms / Workflows Applied */}
                    {activeService.technologies && (
                      <div className="pt-6 border-t border-white/[0.06]">
                        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#728495] mb-3">
                          Applied Workflows & Integrated Platforms
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeService.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="font-mono text-xs text-[#91A0AE] px-3 py-1.5 bg-[#111D27] border border-white/[0.08]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Inquiry Action Link */}
                  <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[#536575] font-mono">
                      DEPLOYMENT // ON-DEMAND READINESS
                    </span>
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BFEF] text-[#06131D] text-xs sm:text-sm font-display font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all duration-200 shadow-md shadow-[#00BFEF]/20 group cursor-pointer"
                    >
                      <span>Inquire About {activeService.title}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
