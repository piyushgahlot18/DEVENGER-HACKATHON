import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ExternalLink, Clock, IndianRupee, FileText, CheckCircle } from 'lucide-react';
import { PageTransition } from '../components/ui/PageTransition';
import { Badge } from '../components/ui/Badge';
import { mockServices, serviceCategories } from '../data/mockData';
import type { GovernmentService } from '../types';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
};

const ServiceDetailModal = ({ service, onClose }: { service: GovernmentService; onClose: () => void }) => (
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
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${colorMap[service.color]} flex items-center justify-center text-2xl`}>
            {service.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{service.department}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="text-gray-400 text-lg">×</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              Processing Time
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{service.processingTime}</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400 text-xs font-medium">
              <IndianRupee className="w-3.5 h-3.5" />
              Service Fee
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{service.fee}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            Required Documents
          </h3>
          <ul className="space-y-2">
            {service.requiredDocuments.map(doc => (
              <li key={doc} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Eligibility Criteria
          </h3>
          <ul className="space-y-2">
            {service.eligibilityCriteria.map(criteria => (
              <li key={criteria} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {criteria}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 text-sm">
          <ExternalLink className="w-4 h-4" />
          Apply on Official Portal
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export const ServicesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);

  const filtered = mockServices.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || s.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  const recommended = mockServices.filter(s => s.isRecommended);

  return (
    <PageTransition>
      <div className="p-6 md:p-8 max-w-screen-xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Government Services</h1>
          <p className="text-gray-500 dark:text-gray-400">Browse 150+ government services. Find what you need in seconds.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search services, departments..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300'
              }`}
            >
              All Services
            </button>
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
                <span className="text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended */}
        {!selectedCategory && !search && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              ⭐ Recommended For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommended.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedService(service)}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer"
                >
                  <div className="absolute top-3 right-3">
                    <Badge variant="info" size="sm">Recommended</Badge>
                  </div>
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{service.processingTime.split(',')[0]}</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{service.fee.split('(')[0].trim()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {filtered.length} Services Found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedService(service)}
                className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl ${colorMap[service.color] || 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{service.title}</h3>
                    <Badge variant="outline" size="sm">{service.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{service.processingTime.split(',')[0]}</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{service.fee.split('(')[0].trim()}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
