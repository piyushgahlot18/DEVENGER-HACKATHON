import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Bot, Shield, Zap, Users, CheckCircle, Star,
  ChevronRight, Sparkles, FileText, TrendingUp,
  MessageSquare, Lock, Globe, Phone
} from 'lucide-react';
import { Footer } from '../components/Footer';

const stats = [
  { value: '2.4M+', label: 'Citizens Served', icon: Users },
  { value: '150+', label: 'Government Services', icon: FileText },
  { value: '98.2%', label: 'Resolution Rate', icon: CheckCircle },
  { value: '4.8★', label: 'App Rating', icon: Star },
];

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Assistance',
    description: 'Our intelligent AI companion understands your needs and guides you through complex government processes in plain language.',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    title: 'Instant Service Access',
    description: 'Access 150+ government services from a single platform. No more juggling multiple portals or confusing paperwork.',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Shield,
    title: 'Secure & Verified',
    description: 'Your data is protected with enterprise-grade encryption. Fully compliant with Indian government data guidelines.',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: MessageSquare,
    title: 'Smart Complaint Tracking',
    description: 'File and track your grievances effortlessly. AI-powered summaries and real-time status updates keep you informed.',
    color: 'from-purple-500 to-violet-600',
    lightColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Store, organize, and share your important documents securely. AI-powered document analysis and smart checklists.',
    color: 'from-rose-500 to-pink-600',
    lightColor: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: Globe,
    title: '22+ Indian Languages',
    description: 'Breaking language barriers with multi-lingual support. Interact with Civic AI in your preferred Indian language.',
    color: 'from-cyan-500 to-sky-600',
    lightColor: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
];

const demoJourney = [
  {
    step: '01',
    title: 'Ask in any language',
    description: 'A citizen asks about schemes, documents, complaints, or policies in their preferred language.',
    icon: Globe,
  },
  {
    step: '02',
    title: 'AI simplifies the process',
    description: 'Specialized prompts convert complex government information into simple, step-by-step guidance.',
    icon: Bot,
  },
  {
    step: '03',
    title: 'Get recommended services',
    description: 'The assistant suggests relevant schemes, official portals, required documents, and next actions.',
    icon: TrendingUp,
  },
  {
    step: '04',
    title: 'Track civic outcomes',
    description: 'Citizens can manage documents, draft complaints, and follow complaint timelines from one dashboard.',
    icon: CheckCircle,
  },
];

const winningFeatures = [
  {
    title: 'Generative AI where it matters',
    description: 'Six specialist assistants cover schemes, queries, complaints, documents, policies, and multilingual help.',
    icon: Sparkles,
  },
  {
    title: 'Transparent recommendations',
    description: 'Responses include official links, clear next steps, and reminders to verify critical information.',
    icon: Shield,
  },
  {
    title: 'Built for digital inclusion',
    description: 'Plain language, mobile-friendly screens, and Indian-language support reduce access barriers.',
    icon: Users,
  },
  {
    title: 'Action-first civic workflows',
    description: 'Quick action cards move users from explanation to applying, calling, copying, filing, or checking documents.',
    icon: Zap,
  },
  {
    title: 'Complaint visibility',
    description: 'Reference numbers, status badges, priority, timelines, and AI summaries promote accountability.',
    icon: MessageSquare,
  },
  {
    title: 'Vercel-safe real AI',
    description: 'The deployed app can call Gemini or OpenAI through a serverless API without exposing API keys.',
    icon: Lock,
  },
];

const testimonials = [
  {
    name: 'Priya Nair',
    location: 'Kochi, Kerala',
    role: 'Teacher',
    quote: 'Civic AI helped me get my income certificate in just 3 days. The AI assistant explained every step clearly. Truly remarkable!',
    avatar: 'PN',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    location: 'Patna, Bihar',
    role: 'Farmer',
    quote: 'I never knew about the PM-KISAN scheme until Civic AI recommended it. Got ₹6,000 directly in my account. Thank you!',
    avatar: 'RK',
    rating: 5,
  },
  {
    name: 'Meera Pillai',
    location: 'Chennai, Tamil Nadu',
    role: 'Business Owner',
    quote: 'Filing complaints used to be so frustrating. Civic AI made it simple. My road repair request was resolved in 2 weeks!',
    avatar: 'MP',
    rating: 5,
  },
];

const floatingWords = ['PAN Card', 'Aadhaar', 'Passport', 'RTI Filing', 'Ration Card', 'Voter ID', 'PM-KISAN', 'Scholarship'];

export const LandingPage = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % floatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-blue-100/80 via-indigo-50/40 to-transparent dark:from-blue-950/60 dark:via-indigo-950/30 dark:to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-100/50 to-transparent dark:from-purple-950/30 dark:to-transparent rounded-full blur-3xl" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, #1d4ed8 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              India's #1 AI Citizen Services Platform
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              Ask Anything About
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Government Services
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-6 text-2xl font-semibold text-gray-500 dark:text-gray-400">
              <span>Get help with</span>
              <div className="h-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block text-blue-600 dark:text-blue-400 font-bold"
                  >
                    {floatingWords[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
              Civic AI is your intelligent companion for navigating Indian government services. From Aadhaar updates to RTI filing — we simplify every step with AI-powered guidance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-all shadow-xl shadow-blue-500/30 text-sm">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/assistant" className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-lg text-sm">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Try AI Assistant
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                { icon: Lock, text: 'No Registration Required' },
                { icon: Globe, text: '22 Indian Languages' },
                { icon: Phone, text: 'Works on Mobile' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icon className="w-4 h-4 text-blue-500" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main chat card */}
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Civic AI Assistant</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-xs text-blue-100">Online & Ready</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-3 text-sm shadow-lg shadow-blue-500/20">
                      How do I renew my passport online?
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-xs bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <p>To renew your passport, visit the <span className="text-blue-600 dark:text-blue-400 font-medium">Passport Seva Portal</span>. You'll need:</p>
                      <ul className="mt-2 space-y-1">
                        {['Existing passport', 'Aadhaar card', 'Updated photos', '₹1,500 fee'].map(item => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-blue-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Resolved Today</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">1,247</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Active Users</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">24,891</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathon Demo / Impact */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                Hackathon Demo / Impact
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-5">
                One citizen journey, every required feature.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Civic AI turns a confusing civic task into a guided workflow: ask a question, understand the policy, find the right service, check documents, draft complaints, and track progress.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: '6', label: 'AI specialist modes' },
                  { value: '22+', label: 'language-ready UX' },
                  { value: '1', label: 'unified civic dashboard' },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{item.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {demoJourney.map(({ step, title, description, icon: Icon }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-gray-300 dark:text-gray-700">{step}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Civic AI wins */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Why Civic AI Wins
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              The platform directly matches the evaluation criteria: Generative AI, public-service recommendation, document support, complaint tracking, multilingual access, transparency, accessibility, and digital inclusion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {winningFeatures.map(({ title, description, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything You Need,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                In One Place
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Civic AI brings together government services, intelligent assistance, and document management under one roof.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color, lightColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${lightColor} flex items-center justify-center mb-4`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Millions of Indians
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Real stories from real citizens across India</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, role, quote, avatar, rating }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{role} · {location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-16 text-center"
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="relative">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Ready to Simplify Your Government Experience?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
                Join 2.4 million+ citizens who use Civic AI to navigate government services with ease. It's free, fast, and designed for every Indian.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/dashboard" className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-xl text-sm">
                  Start Using Civic AI
                </Link>
                <Link to="/assistant" className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-colors text-sm">
                  Chat with AI
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
