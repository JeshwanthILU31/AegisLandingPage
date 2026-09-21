import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#technology' },
    { name: 'Approach', href: '#approach' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#081018] border-t border-white/[0.08] py-16 relative overflow-hidden text-xs text-[#91A0AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0D1720] border border-[#20D4FF]/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#20D4FF]" />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-[0.16em] text-[#F4F7FA]">
                AEGIS SERVICES
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#5E7182]">
                Legal Technology · Data Operations · Incident Response
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#20D4FF] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenContact}
              className="hover:text-[#20D4FF] transition-colors font-medium text-[#F4F7FA]"
            >
              Contact
            </button>
          </nav>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded bg-[#0D1720] border border-white/[0.08] hover:border-[#20D4FF]/40 text-[#91A0AE] hover:text-[#20D4FF] transition-all flex items-center gap-2 group"
            aria-label="Scroll back to top"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider">Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#5E7182]">
          <div>
            © {new Date().getFullYear()} Aegis Services. All rights reserved.
          </div>
          <div>
            Disciplined execution across complex data and incident lifecycles.
          </div>
        </div>

      </div>
    </footer>
  );
}
