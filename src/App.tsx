import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssistantPage } from './pages/AssistantPage';
import { ServicesPage } from './pages/ServicesPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ProfilePage } from './pages/ProfilePage';

const AppLayout = ({ darkMode, onToggleDark }: { darkMode: boolean; onToggleDark: () => void }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AlertBanner />
      <Navbar darkMode={darkMode} onToggleDark={onToggleDark} />
      <main className={isLanding ? '' : 'pt-16'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('civic-dark') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('civic-dark', String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppLayout darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
    </BrowserRouter>
  );
}

export default App;
