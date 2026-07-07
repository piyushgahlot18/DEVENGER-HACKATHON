import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle, Plus, Search, Bot, Clock, ChevronDown, X, Camera, Sparkles, CheckCircle
} from 'lucide-react';
import { PageTransition } from '../components/ui/PageTransition';
import { Badge, statusBadge, priorityBadge } from '../components/ui/Badge';
import { mockComplaints } from '../data/mockData';
import type { Complaint } from '../types';

const categories = ['Public Infrastructure', 'Roads & Transport', 'Water & Sanitation', 'Food & Civil Supplies', 'Electricity', 'Healthcare', 'Education', 'Law & Order'];

const ComplaintTimeline = ({ complaint }: { complaint: Complaint }) => (
  <div className="space-y-0">
    {complaint.timeline.map((event, i) => (
      <div key={event.id} className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            i === complaint.timeline.length - 1
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
          }`}>
            <CheckCircle className="w-4 h-4" />
          </div>
          {i < complaint.timeline.length - 1 && (
            <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 my-1" />
          )}
        </div>
        <div className={`pb-6 ${i === complaint.timeline.length - 1 ? '' : ''}`}>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{event.event}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{event.description}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(event.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {event.actor}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const NewComplaintModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAISummary = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setAiSummary(`AI Analysis: Citizen reports "${formData.title}" under the ${formData.category} category. The complaint has been automatically categorized as medium priority. Based on similar complaints, estimated resolution time is 7-14 working days. The relevant department has been identified for this type of issue.`);
    setLoading(false);
    setStep(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">File a Complaint</h2>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 rounded-full flex-1 transition-all ${s <= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} style={{ width: '60px' }} />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Complaint Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="Brief title of your complaint"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="">Select a category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe your complaint in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.category}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Add Evidence →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer group">
                <Camera className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload photos as evidence</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                <button className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                  Choose Files
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  ← Back
                </button>
                <button onClick={generateAISummary} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  Generate AI Summary
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center animate-pulse">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">AI is analyzing your complaint...</p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">AI-Generated Summary</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{aiSummary}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Title:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                      <Badge variant="warning">Medium</Badge>
                    </div>
                  </div>
                  <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25">
                    <CheckCircle className="w-4 h-4" />
                    Submit Complaint
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ComplaintsPage = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockComplaints.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.referenceNumber.includes(search) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="p-6 md:p-8 max-w-screen-xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Complaint Center</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your grievances</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 w-fit"
          >
            <Plus className="w-4 h-4" />
            File New Complaint
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: '3', color: 'text-gray-900 dark:text-white' },
            { label: 'Open', value: '1', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'In Progress', value: '1', color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Resolved', value: '1', color: 'text-emerald-600 dark:text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label} Complaints</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search complaints by title, reference number..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Complaint cards */}
        <div className="space-y-4">
          {filtered.map((c, i) => {
            const s = statusBadge(c.status);
            const p = priorityBadge(c.priority);
            const isExpanded = expandedId === c.id;

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
              >
                <div
                  className="p-5 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant={p.variant}>{p.label}</Badge>
                        <Badge variant={s.variant}>{s.label}</Badge>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{c.referenceNumber}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{c.description}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" />{c.department}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Filed: {c.createdAt}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Updated: {c.updatedAt}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-5 space-y-5">
                        {c.aiSummary && (
                          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 mb-2">
                              <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">AI Summary</span>
                            </div>
                            <p className="text-sm text-blue-800 dark:text-blue-200">{c.aiSummary}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Status Timeline</h4>
                          <ComplaintTimeline complaint={c} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showModal && <NewComplaintModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </PageTransition>
  );
};
