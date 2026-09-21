import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050B10] border-t border-white/[0.08] pt-16 pb-12 relative overflow-hidden text-xs text-[#91A0AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0D1720] border border-[#00BFEF]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#00BFEF]" />
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-[0.16em] text-[#F4F7FA]">
                  AEGIS SERVICES
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#536575]">
                  Precision Data & Legal Operations
                </div>
              </div>
            </div>

            <p className="text-xs text-[#728495] leading-relaxed max-w-sm pt-2">
              End-to-end eDiscovery, digital forensics, legal operations, and incident response support for organizations handling complex and sensitive data.
            </p>

            <div className="text-[11px] font-mono text-[#536575] pt-2">
              DISCIPLINE · FORENSIC SOUNDNESS · DATA STEWARDSHIP
            </div>
          </div>

          {/* Practice Areas (Col 5-8) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#F4F7FA] font-medium mb-3">
              Practice Areas
            </div>
            <ul className="space-y-2 text-xs">
              {[
                'Legal Operations',
                'eDiscovery & Litigation',
                'Legal & Compliance',
                'HR & Recruitment',
                'Managed Document Review',
                'Contract Solutions',
                'Data Breach Support'
              ].map((practice, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="text-[#91A0AE] hover:text-[#00BFEF] transition-colors"
                  >
                    {practice}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Platforms (Col 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#F4F7FA] font-medium mb-3">
              Technology
            </div>
            <ul className="space-y-2 text-xs">
              {[
                'Relativity',
                '4iG',
                'Canopy',
                'CAL Machine Learning',
                'Forensic Imaging'
              ].map((tech, i) => (
                <li key={i}>
                  <a
                    href="#technology"
                    onClick={(e) => handleNavClick(e, '#technology')}
                    className="text-[#91A0AE] hover:text-[#00BFEF] transition-colors"
                  >
                    {tech}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement & Navigation (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#F4F7FA] font-medium mb-3">
              Engagement
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenContact}
                  className="text-[#00BFEF] hover:text-[#4de3ff] font-medium transition-colors cursor-pointer"
                >
                  Contact Aegis
                </button>
              </li>
              <li>
                <a
                  href="#approach"
                  onClick={(e) => handleNavClick(e, '#approach')}
                  className="text-[#91A0AE] hover:text-[#00BFEF] transition-colors"
                >
                  Investigation Approach
                </a>
              </li>
              <li>
                <a
                  href="#capabilities"
                  onClick={(e) => handleNavClick(e, '#capabilities')}
                  className="text-[#91A0AE] hover:text-[#00BFEF] transition-colors"
                >
                  Capabilities Index
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="text-[#91A0AE] hover:text-[#00BFEF] transition-colors"
                >
                  About Aegis
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#536575]">
          <div>
            &copy; {new Date().getFullYear()} Aegis Services. All rights reserved. Strict client confidentiality.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#91A0AE] transition-colors cursor-default">Privacy Protocol</span>
            <span>·</span>
            <span className="hover:text-[#91A0AE] transition-colors cursor-default">Terms of Engagement</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#91A0AE] hover:text-[#00BFEF] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
