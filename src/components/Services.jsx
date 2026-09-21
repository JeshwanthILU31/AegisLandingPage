import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/services';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, ChevronDown, Sparkles } from 'lucide-react';

export default function Services({ onOpenContact }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = servicesData[activeIdx];
  const listRef = useRef(null);

  // Keyboard navigation support for accessibility
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
    <section id="services" className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0D7892]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid-dense opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="tech-label">02 // SERVICES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
            Capabilities built around complex work.
          </h2>
          <p className="text-sm sm:text-base text-[#91A0AE] mt-4 leading-relaxed">
            Select an operational practice area to inspect technical deliverables, methodologies, and deployment scope.
          </p>
        </div>

        {/* Desktop & Tablet Interactive Explorer */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Navigation Column */}
          <div ref={listRef} className="lg:col-span-5 flex flex-col space-y-2.5" role="tablist" aria-label="Aegis Services Explorer">
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
                  className={`group relative text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20D4FF] flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0D1720] border-[#20D4FF]/40 shadow-lg shadow-black/40'
                      : 'bg-[#081018]/60 border-white/[0.06] hover:bg-[#0D1720]/70 hover:border-white/[0.12]'
                  }`}
                >
                  {/* Left Cyan Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="serviceActiveIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[#20D4FF] rounded-r-full shadow-[0_0_12px_#20D4FF]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 pl-2">
                    <span
                      className={`font-display text-xs font-mono font-bold tracking-wider transition-colors ${
                        isActive ? 'text-[#20D4FF]' : 'text-[#5E7182] group-hover:text-[#91A0AE]'
                      }`}
                    >
                      {svc.id}
                    </span>
                    <div>
                      <div
                        className={`font-display font-medium text-base transition-colors ${
                          isActive ? 'text-[#F4F7FA] font-semibold' : 'text-[#91A0AE] group-hover:text-[#F4F7FA]'
                        }`}
                      >
                        {svc.title}
                      </div>
                      <div className="text-[11px] text-[#5E7182] tracking-wider uppercase mt-0.5">
                        {svc.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono transition-all ${
                        isActive
                          ? 'bg-[#20D4FF]/10 text-[#20D4FF] border border-[#20D4FF]/30'
                          : 'bg-white/[0.02] text-[#5E7182] border border-transparent'
                      }`}
                    >
                      {svc.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Dynamic Detail Panel */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl bg-[#0D1720] border border-white/[0.08] p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              
              {/* Subtle dynamic background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#20D4FF]/10 via-[#0D7892]/5 to-transparent pointer-events-none" />
              
              {/* Giant background watermark index */}
              <div className="absolute -bottom-8 -right-4 font-display font-black text-9xl text-white/[0.02] select-none pointer-events-none">
                {activeService.id}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  id={`service-panel-${activeService.id}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${activeService.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header meta */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-[#111D27] border border-[#20D4FF]/30 text-[#20D4FF] text-xs font-mono font-semibold">
                          PRACTICE {activeService.id}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#91A0AE] font-display">
                          {activeService.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#5E7182]">
                        SEC-LEVEL: OPERATIONAL
                      </span>
                    </div>

                    {/* Title & Overview */}
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4F7FA] tracking-tight mb-4">
                      {activeService.title}
                    </h3>
                    
                    <p className="text-base text-[#20D4FF] font-medium leading-relaxed mb-6">
                      {activeService.shortDesc}
                    </p>

                    <p className="text-sm text-[#91A0AE] leading-relaxed mb-8">
                      {activeService.details}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mb-8">
                      <h4 className="text-xs font-display uppercase tracking-widest text-[#F4F7FA] font-bold mb-4 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#20D4FF]" />
                        Key Operational Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeService.deliverables.map((item, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-[#111D27]/70 border border-white/[0.04] flex items-start gap-2.5 text-xs text-[#F4F7FA]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#20D4FF] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer of Detail Panel: Tech Stack & Action */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-display uppercase tracking-wider text-[#91A0AE] mb-2 flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-[#20D4FF]" />
                        Platform & Execution Focus
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeService.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded bg-[#081018] border border-white/[0.08] text-[11px] font-mono text-[#91A0AE]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={onOpenContact}
                      className="px-5 py-2.5 rounded bg-[#20D4FF] text-[#081018] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#4de3ff] transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-[#20D4FF]/20"
                    >
                      <span>Inquire Practice</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Mobile Touch-Friendly Accordion View */}
        <div className="lg:hidden space-y-3">
          {servicesData.map((svc, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={svc.id}
                className="rounded-xl bg-[#0D1720] border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#20D4FF]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-mono text-xs font-bold text-[#20D4FF]">
                      {svc.id}
                    </span>
                    <div>
                      <div className="font-display font-medium text-sm text-[#F4F7FA]">
                        {svc.title}
                      </div>
                      <div className="text-[10px] text-[#91A0AE] uppercase tracking-wider mt-0.5">
                        {svc.category}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#91A0AE] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#20D4FF]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-5 pt-1 border-t border-white/[0.04]"
                    >
                      <p className="text-xs text-[#20D4FF] font-medium mb-3">
                        {svc.shortDesc}
                      </p>
                      <p className="text-xs text-[#91A0AE] leading-relaxed mb-4">
                        {svc.details}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="text-[11px] font-display uppercase tracking-wider text-[#F4F7FA] font-bold">
                          Deliverables:
                        </div>
                        {svc.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-[#F4F7FA]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#20D4FF] shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {svc.technologies.slice(0, 2).map((t, ti) => (
                            <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111D27] text-[#91A0AE]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={onOpenContact}
                          className="px-3 py-1.5 rounded bg-[#20D4FF] text-[#081018] text-[11px] font-display font-semibold uppercase tracking-wider"
                        >
                          Inquire
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
