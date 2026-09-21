import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#technology' },
    { name: 'Approach', href: '#approach' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#0B1724]/[0.08] py-3.5 shadow-sm shadow-[#0B1724]/5'
          : 'bg-white/60 backdrop-blur-xs py-4 border-b border-[#0B1724]/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF]"
            aria-label="Aegis Services Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#EEF3F6] border border-[#DCE5EA] flex items-center justify-center group-hover:border-[#00BFEF] transition-colors duration-200">
              <Shield className="w-4 h-4 text-[#00BFEF]" strokeWidth={2} />
              <div className="absolute inset-0 rounded-lg bg-[#00BFEF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-[0.18em] text-sm text-[#0B1724] group-hover:text-[#00BFEF] transition-colors">
                AEGIS SERVICES
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#536575] -mt-0.5">
                Legal · Data · Response
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-[#0B1724]/[0.08] rounded-full px-4 py-1.5 shadow-2xs backdrop-blur-xs" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-wider font-medium text-[#536575] hover:text-[#0B1724] px-3.5 py-1.5 rounded-full transition-all hover:bg-[#0B1724]/[0.03] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00BFEF]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="relative group overflow-hidden rounded px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#06131D] bg-[#00BFEF] hover:bg-[#25ccf7] transition-colors duration-200 shadow-sm shadow-[#00BFEF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FA]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Contact
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-white border border-[#DCE5EA] text-[#0B1724] hover:text-[#00BFEF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#0B1724]/[0.08] bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-lg"
          >
            <div className="flex flex-col space-y-1 divide-y divide-[#0B1724]/[0.05]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-3 text-sm uppercase tracking-wider text-[#536575] hover:text-[#0B1724] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#00BFEF]" />
                </a>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 text-center text-xs uppercase tracking-wider font-semibold rounded bg-[#00BFEF] text-[#06131D] flex items-center justify-center gap-2 shadow-sm"
                >
                  Contact Aegis
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
