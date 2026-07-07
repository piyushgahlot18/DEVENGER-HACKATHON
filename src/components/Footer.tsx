import { Shield, Heart } from 'lucide-react';

const footerLinks = {
  Services: ['Aadhaar Services', 'PAN Card', 'Passport', 'Driving License', 'Voter ID'],
  Resources: ['User Guide', 'FAQs', 'API Documentation', 'Privacy Policy', 'Terms of Service'],
  Support: ['Contact Us', 'Grievance Portal', 'Feedback', 'Status Page', 'Help Center'],
  Government: ['DigiLocker', 'UMANG App', 'mParivahan', 'National Portal', 'MyGov'],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Civic AI</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              India's most intelligent citizen services companion. Powered by AI, built for every Indian.
            </p>
            <div className="flex items-center gap-3">
              {['Twitter', 'GitHub', 'LinkedIn'].map((label) => (
                <a key={label} href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-gray-400 hover:text-white text-xs font-bold">
                  {label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 Civic AI. Government services made accessible.
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};
