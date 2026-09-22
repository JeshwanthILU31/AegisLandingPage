import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectStats from './components/ProjectStats';
import Services from './components/Services';
import Technology from './components/Technology';
import WhyAegis from './components/WhyAegis';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#081018] text-[#F4F7FA] font-sans antialiased selection:bg-[#00BFEF]/20 selection:text-[#00BFEF]">
      {/* Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
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
      </main>

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Contact Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
      />
    </div>
  );
}
