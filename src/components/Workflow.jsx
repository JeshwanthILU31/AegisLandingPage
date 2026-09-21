import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflowModes } from '../data/workflow';
import { GitCommit, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity, Terminal } from 'lucide-react';

export default function Workflow() {
  const [activeMode, setActiveMode] = useState('general'); // 'general' | 'incident'
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const currentModeData = workflowModes[activeMode];
  const activeStep = currentModeData.steps[activeStepIdx] || currentModeData.steps[0];

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setActiveStepIdx(0);
  };

  return (
    <section id="approach" className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0D7892]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid-dense opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="tech-label">04 // APPROACH</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
              From complexity to clarity.
            </h2>
            <p className="text-sm sm:text-base text-[#91A0AE] mt-3 leading-relaxed">
              Operational frameworks engineered to convert high-volume uncertainty into structured, verifiable deliverables.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-xl bg-[#0D1720] border border-white/[0.08] backdrop-blur-sm self-start lg:self-auto">
            <button
              onClick={() => handleModeChange('general')}
              className={`px-5 py-2.5 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeMode === 'general'
                  ? 'bg-[#20D4FF] text-[#081018] shadow-md shadow-[#20D4FF]/20'
                  : 'text-[#91A0AE] hover:text-[#F4F7FA]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              General Services
            </button>
            <button
              onClick={() => handleModeChange('incident')}
              className={`px-5 py-2.5 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeMode === 'incident'
                  ? 'bg-[#20D4FF] text-[#081018] shadow-md shadow-[#20D4FF]/20'
                  : 'text-[#91A0AE] hover:text-[#F4F7FA]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Incident Response
            </button>
          </div>
        </div>

        {/* Horizontal Stepper Architecture */}
        <div className="relative mb-12">
          
          {/* Connecting Line across desktop steps */}
          <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-white/[0.08] z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#20D4FF] via-[#0D7892] to-transparent"
              style={{
                width: `${((activeStepIdx + 1) / currentModeData.steps.length) * 100}%`
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Steps Node Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {currentModeData.steps.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              const isCompleted = idx < activeStepIdx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20D4FF] ${
                    isSelected
                      ? 'bg-[#0D1720] border-[#20D4FF]/60 shadow-lg shadow-[#20D4FF]/10'
                      : 'bg-[#081018]/80 border-white/[0.06] hover:bg-[#0D1720]/60 hover:border-white/[0.12]'
                  }`}
                >
                  {/* Node Icon / Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#20D4FF] text-[#081018] shadow-[0_0_12px_#20D4FF]'
                          : isCompleted
                          ? 'bg-[#0D7892] text-[#F4F7FA]'
                          : 'bg-[#111D27] text-[#5E7182] group-hover:text-[#91A0AE]'
                      }`}
                    >
                      {step.number}
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider ${
                        isSelected ? 'text-[#20D4FF]' : 'text-[#5E7182]'
                      }`}
                    >
                      STAGE {step.number}
                    </span>
                  </div>

                  <div>
                    <div
                      className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                        isSelected ? 'text-[#F4F7FA]' : 'text-[#91A0AE] group-hover:text-[#F4F7FA]'
                      }`}
                    >
                      {step.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detailed Stage Inspection Box */}
        <div className="rounded-2xl bg-[#0D1720] border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle Stage index watermark */}
          <div className="absolute top-4 right-8 font-display font-black text-8xl text-white/[0.02] select-none pointer-events-none">
            {activeStep.number}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeMode}-${activeStep.number}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                
                <div className="lg:max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#111D27] border border-[#20D4FF]/30 text-[#20D4FF] font-mono text-xs font-semibold">
                      STAGE {activeStep.number} // {activeStep.name.toUpperCase()}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#91A0AE] font-mono">
                      {currentModeData.title}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4F7FA] mb-4 tracking-tight">
                    {activeStep.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#91A0AE] leading-relaxed mb-6">
                    {activeStep.details}
                  </p>
                </div>

                {/* Deliverables box */}
                <div className="lg:w-80 shrink-0 p-5 rounded-xl bg-[#111D27] border border-white/[0.06]">
                  <div className="text-xs font-display uppercase tracking-widest text-[#20D4FF] font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Stage Artifacts & Deliverables
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-[#F4F7FA] leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#20D4FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
