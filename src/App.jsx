import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectStats from './components/ProjectStats';
import Services from './components/Services';
import Technology from './components/Technology';
import WhyAegis from './components/WhyAegis';
import CTA from './components/CTA';
import Careers from './components/Careers';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { jobService } from './services/jobService';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const verify = async () => {
      const valid = await jobService.verifyAuth();
      setIsAuthenticated(valid);
      setAuthChecking(false);
    };

    verify();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
  };

  // Route: /admin/login
  if (currentPath === '/admin/login') {
    if (isAuthenticated) {
      handleNavigate('/admin');
      return null;
    }
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          handleNavigate('/admin');
        }}
        onNavigateHome={() => handleNavigate('/')}
      />
    );
  }

  // Route: /admin (Protected)
  if (currentPath === '/admin') {
    if (authChecking) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-mono text-xs text-[#64748B]">
          Verifying security authorization...
        </div>
      );
    }
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            handleNavigate('/admin');
          }}
          onNavigateHome={() => handleNavigate('/')}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={async () => {
          await jobService.logout();
          setIsAuthenticated(false);
          handleNavigate('/admin/login');
        }}
        onNavigateCareers={() => handleNavigate('/careers')}
      />
    );
  }

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
