import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenContact, currentPath = '/', onNavigate }) {
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
    { name: 'Careers', href: '/careers' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/careers') {
      if (onNavigate) {
        onNavigate('/careers');
      } else {
        window.history.pushState({}, '', '/careers');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.startsWith('#')) {
      if (currentPath !== '/') {
        if (onNavigate) {
          onNavigate('/');
        } else {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentPath !== '/') {
      if (onNavigate) {
        onNavigate('/');
      } else {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFFFF] border-b border-[#E2E8F0] py-3.5 shadow-sm'
          : 'bg-[#FFFFFF] py-4 border-b border-[#E2E8F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF]"
            aria-label="Aegis Data Services LLP Home"
          >
            <img
              src="/assets/aegis-data-services-logo.png"
              alt="AEGIS Data Services LLP"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-full px-4 py-1.5 shadow-2xs" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = (link.href === '/careers' && currentPath === '/careers');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs uppercase tracking-wider font-medium px-3.5 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00BFEF] ${
                    isActive
                      ? 'text-[#00BFEF] bg-[#F1F5F9] font-semibold'
                      : 'text-[#071525] hover:text-[#00BFEF] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="relative group overflow-hidden rounded px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#06131D] bg-[#00BFEF] hover:bg-[#25ccf7] transition-colors duration-200 shadow-sm shadow-[#00BFEF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
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
              className="p-2 rounded bg-[#FFFFFF] border border-[#E2E8F0] text-[#071525] hover:text-[#00BFEF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFEF] cursor-pointer"
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
            className="md:hidden border-b border-[#E2E8F0] bg-[#FFFFFF] px-4 pt-3 pb-6 shadow-lg"
          >
            <div className="flex flex-col space-y-1 divide-y divide-[#E2E8F0]">
              {navLinks.map((link) => {
                const isActive = (link.href === '/careers' && currentPath === '/careers');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between py-3 text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-[#00BFEF] font-semibold'
                        : 'text-[#071525] hover:text-[#00BFEF]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#00BFEF]" />
                  </a>
                );
              })}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 text-center text-xs uppercase tracking-wider font-semibold rounded bg-[#00BFEF] text-[#06131D] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
