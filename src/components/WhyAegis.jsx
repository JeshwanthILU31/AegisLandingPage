import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';

const manifestoPrinciples = [
  {
    num: "01",
    title: "PRECISION",
    headline: "Zero tolerance for procedural or evidentiary ambiguity.",
    description: "Every dataset ingested, document reviewed, and artifact analyzed adheres to rigorous forensic standards. In litigation, regulatory inquiries, and incident triage, procedural exactness is the only foundation for defensible outcomes."
  },
  {
    num: "02",
    title: "EVIDENCE",
    headline: "Unbroken cryptographic chain of custody across every lifecycle.",
    description: "From volatile memory capture to final court-ready production sets, our methodologies guarantee mathematical integrity and complete traceability. Data integrity is never an assumption; it is continuously proven."
  },
  {
    num: "03",
    title: "STRUCTURE",
    headline: "Engineering clarity from high-density data complexity.",
    description: "Multi-terabyte repositories, complex contract portfolios, and distributed breaches cannot be handled with ad-hoc solutions. We build repeatable, disciplined workflows that isolate critical signals from noise."
  },
  {
    num: "04",
    title: "CONTINUITY",
    headline: "Sustaining operations through high-consequence disruption.",
    description: "Whether navigating active threat actor containment, tight court deadlines, or massive compliance audits, our operational posture ensures organizations maintain resilience and strategic control."
  }
];

export default function WhyAegis() {
  return (
    <section className="relative py-36 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24 sm:mb-32">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="WHY AEGIS // OPERATIONAL STANDARDS" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            The principles governing our work.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            Factual operational standards that govern every eDiscovery review, digital forensic investigation, and data governance workflow at Aegis.
          </p>
        </div>

        {/* EDITORIAL MANIFESTO (CLASSIC HIGH-CONTRAST TYPOGRAPHY) */}
        <div className="space-y-24 sm:space-y-36">
          {manifestoPrinciples.map((item) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline border-b border-white/[0.08] pb-20 sm:pb-28"
            >
              {/* Number & Massive Principle Name */}
              <div className="lg:col-span-6">
                <div className="font-mono text-xs text-[#00BFEF] tracking-[0.2em] mb-4 font-semibold">
                  PRINCIPLE // {item.num}
                </div>
                <h3 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F4F7FA] leading-none hover:text-[#00BFEF] transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Supporting Editorial Statement & Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <h4 className="font-display font-semibold text-xl sm:text-2xl text-[#F4F7FA] leading-snug">
                  {item.headline}
                </h4>
                <p className="text-base sm:text-lg text-[#91A0AE] leading-relaxed font-normal">
                  {item.description}
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-[#536575]">
                  <span>AEGIS STANDARD {item.num} / 04</span>
                  <span>·</span>
                  <span className="text-[#00BFEF]">VERIFIED DISCIPLINE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
