import React from 'react';
import { motion } from 'framer-motion';
import { Cog, Users, Briefcase, UserCheck } from 'lucide-react';
import CountUp from './CountUp';
import ShinyText from './ShinyText';

export default function ProjectStats() {
  const stats = [
    {
      icon: Cog,
      value: 100,
      suffix: '+',
      label: 'Incidents',
      sublabel: 'Forensically Contained & Resolved'
    },
    {
      icon: Users,
      value: 50,
      suffix: '+',
      label: 'Clients',
      sublabel: 'Enterprises & AmLaw Law Firms'
    },
    {
      icon: Briefcase,
      value: 400,
      suffix: '+',
      label: 'Projects',
      sublabel: 'eDiscovery & Legal Operations'
    },
    {
      icon: UserCheck,
      value: 600,
      suffix: '+',
      label: 'Subject Matter Resources',
      sublabel: 'Vetted Technical Specialists'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00BFEF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="PROVEN SCALE & TRACK RECORD" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] text-[#F4F7FA]"
            >
              Project Stats You Can’t Ignore!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-[#91A0AE] leading-relaxed font-normal"
            >
              Our hybrid services and software solutions utilize the latest technologies to help companies overcome the complexities that come with responding to business events. What sets us apart from everyone else is these unmatched project figures.
            </motion.p>
          </div>

          {/* Right Column: 2x2 Stats Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border border-white/[0.08] bg-[#0D1720]/80 backdrop-blur-sm">
              
              {/* Top Row: Stat 0 & Stat 1 */}
              <div className="p-8 sm:p-10 flex items-start gap-5 border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors">
                <div className="p-3 bg-[#111D27] border border-white/[0.08] text-[#00BFEF] shrink-0 mt-1">
                  <Cog className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
                </div>
                <div>
                  <div className="font-display font-black text-4xl sm:text-5xl text-[#00BFEF] tracking-tight leading-none mb-2">
                    <CountUp to={100} duration={2} suffix="+" />
                  </div>
                  <div className="font-display font-bold text-lg text-[#F4F7FA]">
                    Incidents
                  </div>
                  <div className="text-xs text-[#91A0AE] mt-0.5 font-normal">
                    Contained & Remediated
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-5 border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors">
                <div className="p-3 bg-[#111D27] border border-white/[0.08] text-[#00BFEF] shrink-0 mt-1">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-black text-4xl sm:text-5xl text-[#00BFEF] tracking-tight leading-none mb-2">
                    <CountUp to={50} duration={2} suffix="+" />
                  </div>
                  <div className="font-display font-bold text-lg text-[#F4F7FA]">
                    Clients
                  </div>
                  <div className="text-xs text-[#91A0AE] mt-0.5 font-normal">
                    Enterprises & AmLaw Firms
                  </div>
                </div>
              </div>

              {/* Bottom Row: Stat 2 & Stat 3 */}
              <div className="p-8 sm:p-10 flex items-start gap-5 hover:bg-white/[0.02] transition-colors">
                <div className="p-3 bg-[#111D27] border border-white/[0.08] text-[#00BFEF] shrink-0 mt-1">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-black text-4xl sm:text-5xl text-[#00BFEF] tracking-tight leading-none mb-2">
                    <CountUp to={400} duration={2} suffix="+" />
                  </div>
                  <div className="font-display font-bold text-lg text-[#F4F7FA]">
                    Projects
                  </div>
                  <div className="text-xs text-[#91A0AE] mt-0.5 font-normal">
                    eDiscovery & Legal Ops
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-5 hover:bg-white/[0.02] transition-colors">
                <div className="p-3 bg-[#111D27] border border-white/[0.08] text-[#00BFEF] shrink-0 mt-1">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-black text-4xl sm:text-5xl text-[#00BFEF] tracking-tight leading-none mb-2">
                    <CountUp to={600} duration={2} suffix="+" />
                  </div>
                  <div className="font-display font-bold text-lg text-[#F4F7FA]">
                    Subject Matter Resources
                  </div>
                  <div className="text-xs text-[#91A0AE] mt-0.5 font-normal">
                    Vetted Technical Specialists
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
