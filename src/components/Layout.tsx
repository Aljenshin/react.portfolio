import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileImage, AnimatedCounter, TechMarquee } from './SharedComponents';
import { PersonalInfo } from '../data/portfolioData';

interface LayoutProps {
  children: React.ReactNode;
  personalInfo: PersonalInfo;
}

const Layout: React.FC<LayoutProps> = ({ children, personalInfo }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'About Me', icon: '👤' },
    { path: '/skills', label: 'Skills', icon: '⚡' },
    { path: '/education', label: 'Education', icon: '🎓' },
    { path: '/work', label: 'Work Experience', icon: '💼' },
    { path: '/hobbies', label: 'Hobbies & Interests', icon: '🎮' },
    { path: '/contact', label: 'Get In Touch', icon: '📧' },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Enhanced Parallax Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      {/* Spotlight cursor layer */}
      <div
        className="spotlight"
        onMouseMove={(e) => {
          const root = document.documentElement as HTMLElement;
          root.style.setProperty('--spot-x', `${e.clientX}px`);
          root.style.setProperty('--spot-y', `${e.clientY}px`);
        }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse-slow"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Admin Login Button */}
        <div className="fixed top-6 right-6 z-50">
          <Link
            to="/admin/login"
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover-lift"
            aria-label="Admin Login"
          >
            🔐
          </Link>
        </div>

        {/* Enhanced Header */}
        <header className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14 transition-all duration-300 ${
          isScrolled ? 'animate-slide-in-up' : ''
        }`}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 animate-scale-in">
              <ProfileImage 
                src={personalInfo.profileImage || null} 
                alt={`${personalInfo.name} Profile Picture`} 
                fallback={personalInfo.name.split(' ').map(n => n[0]).join('')} 
              />
            </div>
            <div className="animate-slide-in-left delay-200">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-text">{personalInfo.name}</h1>
              <p className="text-slate-300 mt-2 text-lg font-medium">{personalInfo.title}</p>
              
              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="text-center">
                  <AnimatedCounter end={23} suffix="+" className="text-xl font-bold text-brand-400" />
                  <p className="text-xs text-slate-400">Years Old</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={3} suffix="+" className="text-xl font-bold text-purple-400" />
                  <p className="text-xs text-slate-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={10} suffix="+" className="text-xl font-bold text-cyan-400" />
                  <p className="text-xs text-slate-400">Projects</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="px-5 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-purple-500 text-white hover:opacity-90 transition">Hire Me</a>
                <a href="#projects" className="px-5 py-2 rounded-lg bg-white/10 text-white border border-white/10 hover:bg-white/20 transition">View Projects</a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 animate-slide-in-right delay-300">
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm hover:bg-white/20 transition-all duration-300 hover-lift">{personalInfo.age}</span>
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm hover:bg-white/20 transition-all duration-300 hover-lift">{personalInfo.experience}</span>
            <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm hover:bg-white/20 transition-all duration-300 hover-lift">{personalInfo.location}</span>
          </div>
        </header>

        {/* Enhanced Navigation */}
        <nav className="mb-8 animate-fade-in delay-400">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-brand-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white hover-glow'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mr-2 group-hover:animate-pulse-slow">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Tech stack marquee */}
        <div className="mb-8">
          <TechMarquee items={[
            'React', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PHP', 'MySQL', 'REST API', 'Vite', 'Git'
          ]} />
        </div>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Enhanced Footer */}
        <footer className="mt-12 md:mt-16 text-center text-slate-400 animate-fade-in delay-500">
          <div className="border-t border-white/10 pt-8">
            <p className="mb-4">© {new Date().getFullYear()} Aljen A. Mondarte. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-brand-400 transition-colors duration-300 hover-glow">
                📧 Email
              </a>
              <a href={`tel:${personalInfo.phone}`} className="text-slate-400 hover:text-brand-400 transition-colors duration-300 hover-glow">
                📞 Phone
              </a>
              <span className="text-slate-500">•</span>
              <span className="text-slate-500">Made with ❤️ and React</span>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
