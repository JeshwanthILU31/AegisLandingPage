import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Shield, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import AegisHeroBackground from './AegisHeroBackground';
import ParticleText from './ParticleText';
import FoldText from './FoldText';

export default function Hero({ onOpenContact }) {
  const scrollToServices = (e) => {
    e.preventDefault();
    const target = document.querySelector('#services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F7F9FB]">
      {/* Aegis Precision Field - Clean, Quiet, Enterprise Technical Background */}
      <AegisHeroBackground />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Light Theme Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E8F8FC] border border-[#B9E8F5] mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#00BFEF] animate-pulse" />
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#12324A] font-semibold">
              LEGAL · DATA · INCIDENT RESPONSE
            </span>
          </motion.div>

          {/* React Bits ParticleText Centerpiece (Larger text size) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl h-[220px] sm:h-[280px] md:h-[340px] mb-2 flex items-center justify-center"
          >
            <ParticleText
              text="Aegis Services"
              particleSize={2.2}
              density={4}
              color="#0B1724"
              highlightColor="#00BFEF"
              scatter={160}
              gatherDuration={1600}
              stagger={380}
              pointerRepel={35}
              repelRadius={120}
              idleDrift={0.5}
              trigger="mount"
              fontSize="clamp(3.8rem, 11vw, 7.5rem)"
              fontWeight={800}
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              glow={true}
            />
          </motion.div>

          {/* Main Editorial Headline using React Bits FoldText */}
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight leading-[1.08] text-center flex flex-col items-center justify-center mb-8 gap-1">
            <FoldText
              text="COMPLEX DATA."
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.4}
              fontSize="clamp(2rem, 5.5vw, 4.2rem)"
              fontWeight={900}
              color="#0B1724"
              className="font-display font-black tracking-tight"
            />
            <FoldText
              text="CRITICAL WORK."
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.4}
              fontSize="clamp(2rem, 5.5vw, 4.2rem)"
              fontWeight={900}
              color="#0B1724"
              className="font-display font-black tracking-tight"
            />
            <FoldText
              text="CLEAR OUTCOMES."
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.4}
              fontSize="clamp(2rem, 5.5vw, 4.2rem)"
              fontWeight={900}
              color="#00BFEF"
              className="font-display font-black tracking-tight"
            />
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#536575] max-w-2xl leading-relaxed mb-10 font-normal"
          >
            Aegis Services delivers legal operations, eDiscovery, document review, compliance, contract and data breach support for organizations handling complex and sensitive information.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#services"
              onClick={scrollToServices}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#00BFEF] text-[#06131D] font-display text-sm font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#00BFEF]/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF]"
            >
              <span>Explore Services</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-transparent border border-[#C8D5DC] text-[#0B1724] font-display text-sm font-medium uppercase tracking-wider hover:border-[#00BFEF] hover:bg-[#12324A]/[0.03] transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF]"
            >
              <span>Contact Aegis</span>
              <ArrowUpRight className="w-4 h-4 text-[#536575] group-hover:text-[#00BFEF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </motion.div>

          {/* Light Bottom Capability Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[#DCE5EA] w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
          >
            <div className="p-3.5 rounded-xl bg-white/[0.72] border border-[#DCE5EA] shadow-xs backdrop-blur-xs">
              <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-wider text-[#536575] mb-1">
                <Shield className="w-3.5 h-3.5 text-[#00BFEF]" />
                <span>Discipline</span>
              </div>
              <div className="text-xs font-semibold text-[#0B1724]">Forensic Soundness</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.72] border border-[#DCE5EA] shadow-xs backdrop-blur-xs">
              <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-wider text-[#536575] mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#00BFEF]" />
                <span>eDiscovery</span>
              </div>
              <div className="text-xs font-semibold text-[#0B1724]">Relativity · 4iG · Canopy</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.72] border border-[#DCE5EA] shadow-xs backdrop-blur-xs">
              <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-wider text-[#536575] mb-1">
                <Terminal className="w-3.5 h-3.5 text-[#00BFEF]" />
                <span>Incident Response</span>
              </div>
              <div className="text-xs font-semibold text-[#0B1724]">Rapid Forensic Triage</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.72] border border-[#DCE5EA] shadow-xs backdrop-blur-xs">
              <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-wider text-[#536575] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFEF]" />
                <span>Operational Lines</span>
              </div>
              <div className="text-xs font-semibold text-[#0B1724]">07 Verified Practices</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
