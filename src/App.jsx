import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectStats from './components/ProjectStats';
import Services from './components/Services';
import Technology from './components/Technology';
import WhyAegis from './components/WhyAegis';
import CTA from './components/CTA';
import Careers from './components/Careers';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? (window.location.pathname === '/careers' ? '/careers' : '/') : '/'
  );
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname === '/careers' ? '/careers' : '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    const normalized = path === '/careers' ? '/careers' : '/';
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#081018] text-[#F4F7FA] font-sans antialiased selection:bg-[#00BFEF]/20 selection:text-[#00BFEF]">
      {/* Navbar */}
      <Navbar
        onOpenContact={handleOpenContact}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <main>
        {currentPath === '/careers' ? (
          <Careers onOpenContact={handleOpenContact} />
        ) : (
          <>
            {/* Hero Section */}
            <Hero onOpenContact={handleOpenContact} />

            {/* Project Stats Section */}
            <ProjectStats />

            {/* 01 The 7 Core Services Explorer */}
            <Services onOpenContact={handleOpenContact} />

            {/* 02 eDiscovery Technology Architecture */}
            <Technology />

            {/* 03 Operational Principles / Why Aegis */}
            <WhyAegis />

            {/* 04 Final Call to Action */}
            <CTA onOpenContact={handleOpenContact} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={handleOpenContact}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Contact Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
      />
    </div>
  );
}
