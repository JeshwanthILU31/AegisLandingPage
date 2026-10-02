import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, CheckCircle2, AlertTriangle, X, Search, ArrowUpRight } from 'lucide-react';
import { jobService } from '../services/jobService';

export default function AdminDashboard({ onLogout, onNavigateCareers }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    department: 'Legal Operations',
    location: 'Hybrid / Bangalore',
    employmentType: 'Full-Time',
    description: '',
    requirements: '',
    isActive: true
  });

  const loadJobs = async () => {
    try {
      const data = await jobService.getJobs();
      setJobs(data || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const showNotification = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Legal Operations',
      location: 'Hybrid / Bangalore',
      employmentType: 'Full-Time',
      description: '',
      requirements: '',
      isActive: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || 'Legal Operations',
      location: job.location || 'Hybrid / Bangalore',
      employmentType: job.employmentType || 'Full-Time',
      description: job.description || '',
      requirements: job.requirements || '',
      isActive: job.isActive !== false
    });
    setIsFormOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    try {
      if (editingJob) {
        const res = await jobService.updateJob(editingJob.id, formData);
        if (res.success) {
          showNotification(`Job "${formData.title}" updated successfully`);
          await loadJobs();
          setIsFormOpen(false);
        } else {
          showNotification(res.error || 'Failed to update job', 'error');
        }
      } else {
        const res = await jobService.createJob(formData);
        if (res.success) {
          showNotification(`Job "${formData.title}" created successfully`);
          await loadJobs();
          setIsFormOpen(false);
        } else {
          showNotification(res.error || 'Failed to create job', 'error');
        }
      }
    } catch {
      showNotification('Error saving job. Please retry.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (job) => {
    try {
      const newStatus = !job.isActive;
      const res = await jobService.updateJob(job.id, { isActive: newStatus });
      if (res.success) {
        showNotification(`Job "${job.title}" is now ${newStatus ? 'Active' : 'Inactive'}`);
        await loadJobs();
      } else {
        showNotification(res.error || 'Failed to update status', 'error');
      }
    } catch {
      showNotification('Error toggling status', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingJob) return;
    try {
      const res = await jobService.deleteJob(deletingJob.id);
      if (res.success) {
        showNotification(`Job "${deletingJob.title}" removed permanently`);
        setDeletingJob(null);
        await loadJobs();
      } else {
        showNotification(res.error || 'Failed to delete job', 'error');
      }
    } catch {
      showNotification('Error deleting job', 'error');
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = jobs.filter(j => j.isActive).length;
  const inactiveCount = jobs.length - activeCount;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#071525] font-sans antialiased">
      
      {/* Top Admin Header */}
      <header className="bg-[#FFFFFF] border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aegis-data-services-logo.png"
              alt="AEGIS Data Services LLP"
              className="h-8 w-auto object-contain"
            />
            <div className="h-5 w-px bg-[#E2E8F0] hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider uppercase text-[#071525]">
                Careers Management
              </span>
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                Admin Control Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateCareers}
              className="px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-display uppercase tracking-wider text-[#071525] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Public Careers</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00BFEF]" />
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] text-xs font-display uppercase tracking-wider text-[#991B1B] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Notification Alert */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-xl text-xs font-medium flex items-center justify-between shadow-xs ${
                feedback.type === 'error'
                  ? 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B]'
                  : 'bg-[#F0FDF4] border border-[#86EFAC] text-[#166534]'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{feedback.msg}</span>
              </div>
              <button onClick={() => setFeedback(null)} className="text-current opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Total Postings</div>
            <div className="font-display font-bold text-3xl text-[#071525] mt-1">{jobs.length}</div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#166534]">Active / Published</div>
            <div className="font-display font-bold text-3xl text-[#166534] mt-1">{activeCount}</div>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Draft / Inactive</div>
            <div className="font-display font-bold text-3xl text-[#64748B] mt-1">{inactiveCount}</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, department, or location..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071525] placeholder-[#94A3B8] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF]"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#071525] hover:bg-[#00BFEF] text-[#FFFFFF] hover:text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD JOB</span>
          </button>
        </div>

        {/* Job Listings Table */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-2xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs font-mono text-[#64748B]">
              Loading job postings from secure repository...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#64748B]">
              No job postings match your filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    <th className="py-3.5 px-6 font-semibold">Job Title & ID</th>
                    <th className="py-3.5 px-4 font-semibold">Department</th>
                    <th className="py-3.5 px-4 font-semibold">Location / Type</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-[#F8FAFC]/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-display font-semibold text-sm text-[#071525]">
                          {job.title}
                        </div>
                        <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                          {job.id} · Posted {job.postedDate || 'Recent'}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-[#475569]">
                        <span className="bg-[#F1F5F9] px-2 py-1 rounded text-[11px] font-medium border border-[#E2E8F0]">
                          {job.department}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-[#475569]">
                        <div>{job.location}</div>
                        <div className="text-[11px] text-[#94A3B8]">{job.employmentType}</div>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleActive(job)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold cursor-pointer transition-all ${
                            job.isActive
                              ? 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#BBF7D0]'
                              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          {job.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{job.isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(job)}
                            className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#071525] hover:text-[#00BFEF] hover:border-[#00BFEF] transition-all cursor-pointer"
                            title="Edit Job"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingJob(job)}
                            className="p-1.5 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] hover:bg-[#FEE2E2] transition-all cursor-pointer"
                            title="Delete Job"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* JOB CREATION / EDIT MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-[#071525]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#071525] uppercase">
                    {editingJob ? 'EDIT JOB POSTING' : 'ADD NEW JOB'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {editingJob ? `Modifying posting ${editingJob.id}` : 'Create a new public career opportunity'}
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#071525]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="space-y-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Legal Operations Associate"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="e.g. Legal Operations / Technology"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                      Employment Type
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF]"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Project-Based">Project-Based</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Hybrid / Bangalore"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                    Role Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe operational responsibilities and scope of work..."
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                    Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Key competencies, technical certifications, and domain experience..."
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-[#CBD5E1] text-[#00BFEF] focus:ring-[#00BFEF] w-4 h-4"
                    />
                    <span className="text-xs font-display uppercase tracking-wider text-[#071525] font-semibold">
                      Mark as Active (Visible in public Careers listings)
                    </span>
                  </label>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-[#64748B] hover:text-[#071525] font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-lg bg-[#071525] hover:bg-[#00BFEF] text-[#FFFFFF] hover:text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'SAVING...' : editingJob ? 'SAVE CHANGES' : 'ADD JOB'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingJob(null)}
              className="fixed inset-0 bg-[#071525]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-lg text-center text-[#071525] uppercase mb-2">
                Delete Job Posting?
              </h3>

              <p className="text-xs text-[#64748B] text-center leading-relaxed mb-6">
                Are you sure you want to delete <strong className="text-[#071525]">"{deletingJob.title}"</strong> ({deletingJob.id})? This action will permanently remove the record from the repository.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingJob(null)}
                  className="px-5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-[#64748B] hover:text-[#071525] font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-[#FFFFFF] font-display text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
