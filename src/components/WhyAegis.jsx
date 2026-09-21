import React from 'react';
import { motion } from 'framer-motion';
import { whyAegisData } from '../data/whyAegis';
import { Shield, Check } from 'lucide-react';

export default function WhyAegis() {
  return (
    <section className="relative py-28 bg-[#081018] border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0D7892]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <span className="tech-label">07 // WHY AEGIS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-tight">
            A disciplined approach to complex work.
          </h2>
          <p className="text-sm sm:text-base text-[#91A0AE] mt-4 leading-relaxed">
            Factual principles governing our operational delivery, forensic precision, and information security standards.
          </p>
        </div>

        {/* 7 Factual Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyAegisData.map((item, idx) => (
            <div
              key={item.number}
              className={`p-7 rounded-2xl bg-[#0D1720] border border-white/[0.08] hover:border-[#20D4FF]/40 transition-all duration-300 flex flex-col justify-between group ${
                idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-[#20D4FF] px-2.5 py-1 rounded bg-[#111D27] border border-white/[0.06]">
                    PRINCIPLE {item.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7892] group-hover:bg-[#20D4FF] transition-colors" />
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4F7FA] mb-2 group-hover:text-[#20D4FF] transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-[#20D4FF]/80 mb-4 font-medium">
                  {item.headline}
                </div>

                <p className="text-xs sm:text-sm text-[#91A0AE] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-[#5E7182]">
                <span>VERIFIED STANDARD</span>
                <span className="text-[#20D4FF]">0{idx + 1} / 07</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
