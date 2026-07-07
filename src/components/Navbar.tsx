import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Bot, FileText, AlertCircle, FolderOpen, User,
  Menu, X, Bell, Search, ChevronRight, Shield
} from 'lucide-react';
import { cn } from '../lib/utils';
import { mockNotifications } from '../data/mockData';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/assistant', label: 'AI Assistant', icon: Bot },
  { path: '/services', label: 'Gov Services', icon: FileText },
  { path: '/complaints', label: 'Complaints', icon: AlertCircle },
  { path: '/documents', label: 'Documents', icon: FolderOpen },
  { path: '/profile', label: 'Profile', icon: User },
];

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export const Navbar = ({ }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const isLanding = location.pathname === '/';

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16',
        isLanding
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60'
          : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60'
      )}>
        <div className="max-w-screen-xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Civic AI
            </span>
          </Link>

          {/* Desktop Nav (only for app pages) */}
          {!isLanding && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    location.pathname === path
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Landing Nav */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-6">
              {['Features', 'Services', 'About'].map(item => (
                <a key={item} href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {!isLanding && (
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
                <kbd className="ml-1 text-xs text-gray-400">⌘K</kbd>
              </button>
            )}

            

            {/* Notifications */}
            {!isLanding && (
              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                        <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                        {mockNotifications.map(n => (
                          <div key={n.id} className={cn(
                            'p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors',
                            !n.isRead && 'bg-blue-50/50 dark:bg-blue-900/10'
                          )}>
                            <div className="flex items-start gap-3">
                              <div className={cn('mt-0.5 w-2 h-2 rounded-full flex-shrink-0',
                                n.type === 'success' ? 'bg-emerald-500' :
                                n.type === 'warning' ? 'bg-amber-500' :
                                n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              )} />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {isLanding ? (
              <Link to="/dashboard" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                Get Started
              </Link>
            ) : (
              <Link to="/profile" className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex-shrink-0">
                A
              </Link>
            )}

            {/* Mobile menu */}
            {!isLanding && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && !isLanding && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl pt-16"
          >
            <div className="p-4 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    location.pathname === path
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  <ChevronRight className="ml-auto w-3 h-3 opacity-40" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
