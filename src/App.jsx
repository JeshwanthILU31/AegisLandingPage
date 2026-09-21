import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Services from './components/Services';
import Technology from './components/Technology';
import Workflow from './components/Workflow';
import IncidentResponse from './components/IncidentResponse';
import Capabilities from './components/Capabilities';
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
    <div className="min-h-screen bg-[#081018] text-[#F4F7FA] font-sans antialiased selection:bg-[#20D4FF]/20 selection:text-[#20D4FF]">
      {/* Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* Hero Section */}
        <Hero onOpenContact={handleOpenContact} />

        {/* 01 Introduction */}
        <Introduction />

        {/* 02 Services Explorer */}
        <Services onOpenContact={handleOpenContact} />

        {/* 03 eDiscovery Technology */}
        <Technology />

        {/* 04 Approach / Workflow */}
        <Workflow />

        {/* 05 Data Breach Support */}
        <IncidentResponse onOpenContact={handleOpenContact} />

        {/* 06 Capabilities Bento */}
        <Capabilities onOpenContact={handleOpenContact} />

        {/* 07 Why Aegis */}
        <WhyAegis />

        {/* 08 Final CTA */}
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
