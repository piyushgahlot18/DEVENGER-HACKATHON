import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload, FileText, CheckCircle, AlertCircle, Clock, Download,
  Bot, Sparkles, Eye, RefreshCcw
} from 'lucide-react';
import { PageTransition } from '../components/ui/PageTransition';
import { Badge } from '../components/ui/Badge';
import type { Document } from '../types';

const mockDocuments: Document[] = [
  { id: 'd1', name: 'Aadhaar Card', type: 'Identity', uploadedAt: '2026-01-10', status: 'uploaded', size: '245 KB' },
  { id: 'd2', name: 'PAN Card', type: 'Identity', uploadedAt: '2026-01-10', status: 'uploaded', size: '189 KB' },
  { id: 'd3', name: 'Driving License', type: 'Transport', uploadedAt: '2025-03-15', status: 'expired', size: '312 KB', expiryDate: '2026-03-15' },
  { id: 'd4', name: 'Passport', type: 'Travel', uploadedAt: '2024-06-20', status: 'uploaded', size: '1.2 MB', expiryDate: '2034-06-19' },
  { id: 'd5', name: 'Voter ID', type: 'Civic', status: 'missing' },
  { id: 'd6', name: 'Birth Certificate', type: 'Identity', status: 'missing' },
  { id: 'd7', name: 'Income Certificate', type: 'Revenue', uploadedAt: '2026-05-01', status: 'processing', size: '156 KB' },
  { id: 'd8', name: 'Ration Card', type: 'Food', uploadedAt: '2023-08-10', status: 'uploaded', size: '290 KB' },
];

const statusIcon = {
  uploaded: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  missing: <AlertCircle className="w-4 h-4 text-red-500" />,
  expired: <AlertCircle className="w-4 h-4 text-amber-500" />,
  processing: <Clock className="w-4 h-4 text-blue-500 animate-spin" />,
};

export const DocumentsPage = () => {
  const [dragOver, setDragOver] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const uploaded = mockDocuments.filter(d => d.status === 'uploaded');
  const missing = mockDocuments.filter(d => d.status === 'missing');
  const expired = mockDocuments.filter(d => d.status === 'expired');
  const processing = mockDocuments.filter(d => d.status === 'processing');

  const runAIAnalysis = async () => {
    setAiAnalyzing(true);
    setAiInsight(null);
    await new Promise(r => setTimeout(r, 2500));
    setAiInsight(`Your document profile is **62% complete**. You're missing your Voter ID and Birth Certificate which are required for most government schemes. Your Driving License has expired — renew it at your nearest RTO or via the Parivahan Seva portal. Your Passport is valid until 2034 ✅. Upload your Voter ID to unlock 8 additional government services.`);
    setAiAnalyzing(false);
  };

  return (
    <PageTransition>
      <div className="p-6 md:p-8 max-w-screen-xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Document Assistant</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and verify your important documents</p>
          </div>
          <button
            onClick={runAIAnalysis}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 w-fit"
          >
            <Bot className="w-4 h-4" />
            AI Document Analysis
          </button>
        </div>

        {/* AI Insight */}
        {(aiAnalyzing || aiInsight) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200 dark:border-violet-800"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-violet-700 dark:text-violet-300 text-sm">AI Document Insight</span>
              {aiAnalyzing && <span className="text-xs text-violet-500 animate-pulse">Analyzing...</span>}
            </div>
            {aiAnalyzing ? (
              <div className="space-y-2">
                <div className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full animate-pulse w-3/4" />
                <div className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full animate-pulse w-1/2" />
                <div className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full animate-pulse w-2/3" />
              </div>
            ) : (
              <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed">{aiInsight}</p>
            )}
          </motion.div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Uploaded', count: uploaded.length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            { label: 'Missing', count: missing.length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
            { label: 'Expired', count: expired.length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { label: 'Processing', count: processing.length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          ].map(({ label, count, icon: Icon, color, bg }) => (
            <div key={label} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document checklist */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); }}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                dragOver
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              } cursor-pointer`}
            >
              <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragOver ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'}`} />
              <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">Drop files here or click to upload</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, JPG, PNG up to 20MB</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                Browse Files
              </button>
            </div>

            {/* Document list */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Documents</h2>
              <div className="space-y-3">
                {mockDocuments.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${
                      doc.status === 'missing'
                        ? 'bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900'
                        : doc.status === 'expired'
                        ? 'bg-amber-50/50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900'
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      doc.status === 'missing' ? 'bg-red-100 dark:bg-red-900/30' :
                      doc.status === 'expired' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        doc.status === 'missing' ? 'text-red-500' :
                        doc.status === 'expired' ? 'text-amber-500' :
                        'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{doc.name}</p>
                        {statusIcon[doc.status]}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <Badge variant="outline" size="sm">{doc.type}</Badge>
                        {doc.uploadedAt && <span>Uploaded: {doc.uploadedAt}</span>}
                        {doc.size && <span>{doc.size}</span>}
                        {doc.expiryDate && (
                          <span className={doc.status === 'expired' ? 'text-red-500 dark:text-red-400 font-medium' : ''}>
                            {doc.status === 'expired' ? 'Expired:' : 'Expires:'} {doc.expiryDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {doc.status === 'uploaded' && (
                        <>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors" title="Download">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {doc.status === 'expired' && (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors">
                          <RefreshCcw className="w-3 h-3" />
                          Renew
                        </button>
                      )}
                      {doc.status === 'missing' && (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                          <Upload className="w-3 h-3" />
                          Upload
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist sidebar */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Document Health Score
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Completeness</span>
                  <span className="font-semibold text-gray-900 dark:text-white">62%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {mockDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3">
                    {statusIcon[doc.status]}
                    <span className={`text-sm flex-1 ${
                      doc.status === 'missing' ? 'text-red-600 dark:text-red-400' :
                      doc.status === 'expired' ? 'text-amber-600 dark:text-amber-400' :
                      'text-gray-700 dark:text-gray-300'
                    }`}>{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required for services */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Commonly Required
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                {['Aadhaar Card — Required for 95% services', 'PAN Card — Required for 70% financial services', 'Passport — Required for travel & identity', 'Voter ID — Required for electoral services'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download className="w-4 h-4" />
              Download Checklist PDF
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
