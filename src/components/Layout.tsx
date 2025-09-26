import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileImage } from './SharedComponents';
import { PersonalInfo } from '../data/portfolioData';

interface LayoutProps {
  children: React.ReactNode;
  personalInfo: PersonalInfo;
}

const Layout: React.FC<LayoutProps> = ({ children, personalInfo }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'About Me' },
    { path: '/skills', label: 'Skills' },
    { path: '/education', label: 'Education' },
    { path: '/work', label: 'Work Experience' },
    { path: '/hobbies', label: 'Hobbies & Interests' },
    { path: '/contact', label: 'Get In Touch' },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <ProfileImage 
                src={personalInfo.profileImage || null} 
                alt={`${personalInfo.name} Profile Picture`} 
                fallback={personalInfo.name.split(' ').map(n => n[0]).join('')} 
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-text">{personalInfo.name}</h1>
              <p className="text-slate-300 mt-2">{personalInfo.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm">{personalInfo.age}</span>
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm">{personalInfo.experience}</span>
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm">{personalInfo.location}</span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brand-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Aljen A. Mondarte. All rights reserved.</p>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
