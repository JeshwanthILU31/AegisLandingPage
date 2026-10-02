import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Briefcase, Sparkles, Users, TrendingUp, Target, Building2, MapPin, Clock } from 'lucide-react';

export default function Careers({ onOpenContact }) {
  const scrollToPositions = (e) => {
    e.preventDefault();
    const target = document.querySelector('#open-positions');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whyAegisPillars = [
    {
      icon: Target,
      title: "Meaningful Work",
      description: "Work on complex, high-impact matters where accuracy and reliability matter."
    },
    {
      icon: TrendingUp,
      title: "Learn & Grow",
      description: "Build expertise across legal operations, data, technology, and business processes."
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work closely with experienced teams and contribute to practical solutions."
    },
    {
      icon: Sparkles,
      title: "Make an Impact",
      description: "Your work directly supports clients and strengthens how critical operations are delivered."
    }
  ];

  // Configurable job openings data structure
  const jobOpenings = [
    {
      id: "JOB-01",
      title: "Legal Operations Associate",
      department: "Legal Operations",
      location: "Hybrid / On-Site",
      type: "Full-Time",
      description: "Support high-volume legal department workflows, vendor coordination, process automation, and operational performance reporting."
    },
    {
      id: "JOB-02",
      title: "Data Operations Analyst",
      department: "Data & Analytics",
      location: "Hybrid / On-Site",
      type: "Full-Time",
      description: "Analyze, structure, and process complex multi-terabyte data collections for corporate legal departments and litigation readiness."
    },
    {
      id: "JOB-03",
      title: "eDiscovery Analyst",
      department: "eDiscovery & Litigation",
      location: "Hybrid / On-Site",
      type: "Full-Time",
      description: "Execute forensically defensible data ingestion, processing, indexing, analytics, and court-ready production generation on industry-standard platforms."
    },
    {
      id: "JOB-04",
      title: "Software Engineer",
      department: "Technology & Tools",
      location: "Hybrid / Remote",
      type: "Full-Time",
      description: "Build and maintain internal tools, workflow automation pipelines, and data integration utilities supporting enterprise legal operations."
    },
    {
      id: "JOB-05",
      title: "Business Operations Associate",
      department: "Corporate Operations",
      location: "Hybrid / On-Site",
      type: "Full-Time",
      description: "Coordinate cross-functional project deliverables, client communications, resource tracking, and operational quality assurance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#071525] font-sans antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#00BFEF]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] mb-6 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#00BFEF]" />
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#071525] font-semibold">
              CAREERS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-[#071525] mb-6 uppercase"
          >
            BUILD YOUR CAREER <br className="hidden sm:inline" />
            <span className="text-[#00BFEF]">WITH AEGIS</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed mb-10 font-normal"
          >
            Join a team working at the intersection of legal operations, data, technology, and incident response.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#open-positions"
              onClick={scrollToPositions}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#00BFEF] text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm shadow-[#00BFEF]/20 cursor-pointer"
            >
              <span>VIEW OPEN POSITIONS</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#FFFFFF] border border-[#E2E8F0] text-[#071525] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <span>CONTACT US</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. WHY AEGIS SECTION */}
      <section className="relative py-24 sm:py-32 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 sm:mb-18 text-center sm:text-left">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#071525] tracking-tight uppercase">
              WHY WORK WITH AEGIS?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3 leading-relaxed">
              We provide a disciplined operational environment where precision, continuous learning, and practical problem-solving are valued across every engagement.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyAegisPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-7 shadow-2xs hover:border-[#00BFEF]/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#00BFEF] mb-5">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>

                    <h3 className="font-display font-semibold text-lg text-[#071525] mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. OPEN POSITIONS SECTION */}
      <section id="open-positions" className="relative py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#071525] tracking-tight uppercase">
                OPEN POSITIONS
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-2">
                Explore active opportunities across our legal operations, data, eDiscovery, and technology teams.
              </p>
            </div>
            
            <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] font-medium">
              {jobOpenings.length} Positions Available
            </span>
          </div>

          {/* Job Listings */}
          {jobOpenings && jobOpenings.length > 0 ? (
            <div className="space-y-4">
              {jobOpenings.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#00BFEF]/50 rounded-xl p-6 sm:p-7 shadow-2xs transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display font-semibold text-lg sm:text-xl text-[#071525]">
                        {job.title}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#00BFEF] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0] font-semibold">
                        {job.id}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#00BFEF]" />
                        {job.department}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00BFEF]" />
                        {job.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00BFEF]" />
                        {job.type}
                      </span>
                    </div>

                    <p className="text-sm text-[#475569] leading-relaxed pt-1">
                      {job.description}
                    </p>
                  </div>

                  <div className="pt-2 md:pt-0 flex-shrink-0">
                    <button
                      onClick={onOpenContact}
                      className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#071525] hover:bg-[#00BFEF] text-[#FFFFFF] hover:text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                    >
                      <span>APPLY NOW</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* 4. NO CURRENT OPENINGS STATE FALLBACK */
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-10 text-center max-w-2xl mx-auto">
              <Briefcase className="w-10 h-10 text-[#64748B] mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-[#071525] mb-2 uppercase">
                NO OPEN POSITIONS RIGHT NOW
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Don't see the right opportunity? We're always interested in hearing from talented people.
              </p>
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded bg-[#00BFEF] text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all inline-flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <span>SEND YOUR RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Fallback Candidate Banner */}
          <div className="mt-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-display font-semibold text-base sm:text-lg text-[#071525]">
                Don't see the right opportunity?
              </h4>
              <p className="text-sm text-[#64748B]">
                We're always interested in hearing from talented people. Submit your background to our talent network.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 rounded bg-[#FFFFFF] border border-[#E2E8F0] text-[#071525] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#F1F5F9] hover:border-[#CBD5E1] transition-all inline-flex items-center gap-2 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <span>SEND YOUR RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. CULTURE / CLOSING CTA */}
      <section className="relative py-24 sm:py-32 bg-[#FFFFFF] overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.15] text-[#071525] mb-4 uppercase">
            READY TO DO WORK THAT MATTERS?
          </h2>

          <p className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed mb-8 font-normal">
            Tell us where your skills can make an impact.
          </p>

          <button
            onClick={onOpenContact}
            className="px-10 py-4 rounded bg-[#00BFEF] text-[#06131D] font-display text-sm font-semibold uppercase tracking-wider hover:bg-[#25ccf7] transition-all duration-200 inline-flex items-center gap-2 shadow-md shadow-[#00BFEF]/20 group cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>
      </section>

    </div>
  );
}
