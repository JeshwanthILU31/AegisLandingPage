import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { servicesData } from '../data/services';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    practice: '07', // default Data Breach / Incident
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.organization) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      organization: '',
      practice: '07',
      message: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#081018]/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl bg-[#0D1720] border border-white/[0.12] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Top accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#20D4FF]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-[#111D27] border border-white/[0.08] text-[#91A0AE] hover:text-[#F4F7FA] hover:border-white/[0.2] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20D4FF]"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Shield className="w-4 h-4 text-[#20D4FF]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#20D4FF] font-semibold">
                  CONFIDENTIAL INQUIRY
                </span>
              </div>

              <h3 id="contact-modal-title" className="font-display font-bold text-2xl text-[#F4F7FA] mb-2">
                Contact Aegis Services
              </h3>
              
              <p className="text-xs text-[#91A0AE] leading-relaxed mb-6">
                Submit an inquiry regarding legal operations, eDiscovery processing, document review, or emergency incident response triage.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#F4F7FA] mb-1.5 font-medium">
                    Name / Point of Contact *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Representative Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111D27] border border-white/[0.08] text-sm text-[#F4F7FA] placeholder-[#5E7182] focus:outline-none focus:border-[#20D4FF] focus:ring-1 focus:ring-[#20D4FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#F4F7FA] mb-1.5 font-medium">
                    Organization / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Organization / Law Firm / Corporation"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111D27] border border-white/[0.08] text-sm text-[#F4F7FA] placeholder-[#5E7182] focus:outline-none focus:border-[#20D4FF] focus:ring-1 focus:ring-[#20D4FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#F4F7FA] mb-1.5 font-medium">
                    Practice Area / Inquiry Focus
                  </label>
                  <select
                    value={formData.practice}
                    onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111D27] border border-white/[0.08] text-sm text-[#F4F7FA] focus:outline-none focus:border-[#20D4FF] focus:ring-1 focus:ring-[#20D4FF] transition-all"
                  >
                    {servicesData.map((svc) => (
                      <option key={svc.id} value={svc.id} className="bg-[#0D1720] text-[#F4F7FA]">
                        {svc.id} - {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#F4F7FA] mb-1.5 font-medium">
                    Scope Details / Operational Summary
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe operational parameters or requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111D27] border border-white/[0.08] text-sm text-[#F4F7FA] placeholder-[#5E7182] focus:outline-none focus:border-[#20D4FF] focus:ring-1 focus:ring-[#20D4FF] transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#20D4FF] text-[#081018] font-display text-xs font-semibold uppercase tracking-wider hover:bg-[#4de3ff] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#20D4FF]/20"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-[#20D4FF]/10 border border-[#20D4FF]/40 text-[#20D4FF] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F4F7FA] mb-2">
                Inquiry Logged
              </h3>
              <p className="text-xs text-[#91A0AE] max-w-xs mx-auto leading-relaxed mb-6">
                Your communication has been registered in the operational intake stream. An Aegis representative will review the parameters provided.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded bg-[#111D27] border border-white/[0.1] text-xs font-display uppercase tracking-wider text-[#F4F7FA] hover:border-[#20D4FF]/40 transition-all"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
