import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Shield, CheckCircle, Edit3,
  FileText, AlertCircle, Bot, Key, Bell, Globe, LogOut
} from 'lucide-react';
import { PageTransition } from '../components/ui/PageTransition';
import { Badge } from '../components/ui/Badge';
import { mockUser } from '../data/mockData';

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: Key, label: 'Change Password', desc: 'Update your login credentials' },
      { icon: Bell, label: 'Notification Preferences', desc: 'Manage alerts and updates' },
      { icon: Globe, label: 'Language', desc: 'English (India)' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { icon: Shield, label: 'Two-Factor Authentication', desc: 'Enabled via mobile OTP' },
      { icon: FileText, label: 'Data & Privacy', desc: 'Control your data sharing settings' },
    ],
  },
];

const activityItems = [
  { action: 'AI Query', desc: 'Asked about Passport renewal process', time: '2 hours ago', icon: Bot, color: 'text-blue-500' },
  { action: 'Complaint Filed', desc: 'Pothole on Sector 18 Main Road', time: '2 days ago', icon: AlertCircle, color: 'text-rose-500' },
  { action: 'Service Accessed', desc: 'PAN Card verification completed', time: '3 days ago', icon: FileText, color: 'text-emerald-500' },
  { action: 'Document Uploaded', desc: 'Income Certificate uploaded', time: '1 week ago', icon: FileText, color: 'text-violet-500' },
];

export const ProfilePage = () => {
  return (
    <PageTransition>
      <div className="p-6 md:p-8 max-w-screen-xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile card */}
          <div className="space-y-6">
            {/* Avatar & basic info */}
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/30 mx-auto">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Edit3 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{mockUser.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockUser.email}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Badge variant="success" size="sm">
                  <CheckCircle className="w-3 h-3" />
                  Aadhaar Verified
                </Badge>
              </div>
            </div>

            {/* Contact info */}
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Contact Information</h3>
              {[
                { icon: Mail, label: 'Email', value: mockUser.email },
                { icon: Phone, label: 'Phone', value: mockUser.phone },
                { icon: MapPin, label: 'Location', value: mockUser.location },
                { icon: Shield, label: 'Aadhaar', value: mockUser.aadhaar },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mt-2">
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Complaints', value: '3' },
                { label: 'Services', value: '12' },
                { label: 'AI Queries', value: '47' },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Settings + Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Settings */}
            {settingsSections.map(section => (
              <div key={section.title} className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map(({ icon: Icon, label, desc }) => (
                    <motion.button
                      key={label}
                      whileHover={{ x: 2 }}
                      className="w-full flex items-center gap-4 p-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{desc}</p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            {/* Verification status */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Verification Status
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Aadhaar Verified', status: true },
                  { label: 'Mobile Verified', status: true },
                  { label: 'Email Verified', status: true },
                  { label: 'PAN Linked', status: false },
                ].map(({ label, status }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-blue-800 dark:text-blue-200">{label}</span>
                    {status ? (
                      <Badge variant="success" size="sm"><CheckCircle className="w-3 h-3" /> Verified</Badge>
                    ) : (
                      <Badge variant="warning" size="sm">Pending</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Recent Activity</h3>
              <div className="space-y-4">
                {activityItems.map(({ action, desc, time, icon: Icon, color }, i) => (
                  <motion.div
                    key={action + i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sign out */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
