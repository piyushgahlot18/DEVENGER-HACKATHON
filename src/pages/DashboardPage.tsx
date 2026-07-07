import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot, FileText, AlertCircle, FolderOpen, TrendingUp, Bell,
  ChevronRight, ArrowRight, CheckCircle, Clock, Sparkles, BarChart3
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge, statusBadge, priorityBadge } from '../components/ui/Badge';
import { DashboardSkeleton } from '../components/ui/Skeleton';
import { PageTransition } from '../components/ui/PageTransition';
import { mockUser, mockComplaints, mockSchemes, mockNotifications } from '../data/mockData';

const quickActions = [
  { icon: Bot, label: 'Ask AI Assistant', desc: 'Get instant help', to: '/assistant', color: 'from-blue-600 to-indigo-600', bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30' },
  { icon: AlertCircle, label: 'File Complaint', desc: 'Raise an issue', to: '/complaints', color: 'from-rose-500 to-red-600', bg: 'from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30' },
  { icon: FileText, label: 'Find Services', desc: '150+ gov services', to: '/services', color: 'from-emerald-500 to-teal-600', bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30' },
  { icon: FolderOpen, label: 'My Documents', desc: 'Manage docs', to: '/documents', color: 'from-amber-500 to-orange-600', bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30' },
];

const statCards = [
  { label: 'Active Complaints', value: '3', change: '+1 this week', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30', icon: AlertCircle },
  { label: 'Services Used', value: '12', change: 'All time', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', icon: FileText },
  { label: 'Documents Saved', value: '8', change: '2 expiring', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: FolderOpen },
  { label: 'AI Queries', value: '47', change: 'This month', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', icon: Bot },
];

export const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const unread = mockNotifications.filter(n => !n.isRead);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return (
    <div className="p-6 md:p-8 max-w-screen-xl mx-auto">
      <DashboardSkeleton />
    </div>
  );

  return (
    <PageTransition>
      <div className="p-6 md:p-8 max-w-screen-xl mx-auto space-y-8">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              {greeting}!
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {mockUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {unread.length} unread notifications · Last login: Today, 9:30 AM
            </p>
          </div>
          <Link to="/assistant" className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 w-fit">
            <Bot className="w-4 h-4" />
            Ask AI Assistant
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, change, color, bg, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{change}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, label, desc, to, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link to={to}>
                  <GlassCard hover className={`p-5 bg-gradient-to-br ${bg} border-0`}>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Complaints */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                Recent Complaints
              </h2>
              <Link to="/complaints" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {mockComplaints.map((c, i) => {
                const s = statusBadge(c.status);
                const p = priorityBadge(c.priority);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Link to="/complaints">
                      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{c.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{c.referenceNumber} · {c.department}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Badge variant={p.variant}>{p.label}</Badge>
                            <Badge variant={s.variant}>{s.label}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          Updated {c.updatedAt}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recommended Schemes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                For You
              </h2>
              <Link to="/services" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {mockSchemes.map((scheme, i) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{scheme.title}</p>
                    {scheme.isNew && <Badge variant="success" size="sm">New</Badge>}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{scheme.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{scheme.benefit}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-500" />
            Today's Updates
          </h2>
          <div className="space-y-3">
            {mockNotifications.slice(0, 3).map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  !n.isRead
                    ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className={`mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  n.type === 'success' ? 'bg-emerald-500' :
                  n.type === 'warning' ? 'bg-amber-500' :
                  n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                </div>
                {!n.isRead && <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Promo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8"
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
          />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-200" />
                <span className="text-blue-200 text-sm font-medium">AI Insight</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">You may qualify for 4 new schemes</h3>
              <p className="text-blue-100 text-sm">Based on your profile, Civic AI recommends checking PM Awas Yojana, NSP Scholarship and more.</p>
            </div>
            <Link to="/assistant" className="flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-2xl font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap flex-shrink-0 shadow-xl">
              <CheckCircle className="w-4 h-4" />
              Check Eligibility
            </Link>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
};
