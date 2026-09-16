import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from './types/portfolio';
import { defaultPortfolioData } from './data/defaultPortfolioData';
import { Navbar } from './components/portfolio/Navbar';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { CertificationsSection } from './components/portfolio/CertificationsSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const STORAGE_KEY = 'akshay_portfolio_data_v1';
const AUTH_KEY = 'portfolio_admin_auth';

export default function App() {
  // Load data from localStorage or fallback to default resume data
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved portfolio data from localStorage:', e);
    }
    return defaultPortfolioData;
  });

  // Check current route (hash-based or path-based)
  const isRouteAdmin = useCallback(() => {
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    return (
      hash === '#/admin' ||
      hash === '#admin' ||
      pathname.startsWith('/admin') ||
      search.has('admin')
    );
  }, []);

  const [isAdminView, setIsAdminView] = useState<boolean>(isRouteAdmin);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(isRouteAdmin());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    // Keyboard shortcut for easy admin access: Ctrl+Shift+A or Alt+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        window.location.hash = '#/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRouteAdmin]);

  // Handler for saving changes in Admin
  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  };

  // Handler for resetting data back to resume default
  const handleResetData = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  };

  // Navigation handlers
  const handleGoToPortfolio = () => {
    if (window.location.pathname.toLowerCase().startsWith('/admin') || window.location.search.toLowerCase().includes('admin')) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
    setIsAdminView(false);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    handleGoToPortfolio();
  };

  // Render Admin View
  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAuthenticated(true)}
          onBackToPortfolio={handleGoToPortfolio}
        />
      );
    }

    return (
      <AdminDashboard
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
        onViewPortfolio={handleGoToPortfolio}
        onLogout={handleAdminLogout}
      />
    );
  }

  // Render Clean Portfolio Landing Page (Strictly NO login buttons or admin controls)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500/20 selection:text-teal-300">
      <Navbar hero={data.hero} />

      <main className="flex-1">
        <HeroSection hero={data.hero} />
        <AboutSection about={data.about} />
        <ExperienceSection experience={data.experience} />
        <EducationSection education={data.education} />
        <ProjectsSection projects={data.projects} />
        <CertificationsSection certifications={data.certifications} />
        <SkillsSection skillCategories={data.skillCategories} />
        <ContactSection contact={data.contact} />
      </main>

      <Footer hero={data.hero} />
    </div>
  );
}
