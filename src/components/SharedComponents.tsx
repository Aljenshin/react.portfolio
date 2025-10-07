import React, { useState, useEffect } from 'react';
import { SectionTitleProps, InfoRowProps, PillProps, CardProps, ProfileImageProps } from '../types';
import TuxedoImg from '../assets/tuxedo.v1.png';

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="mb-6 animate-slide-in-up">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white gradient-text">{title}</h2>
    {subtitle && <p className="text-slate-300 mt-1 animate-fade-in delay-200">{subtitle}</p>}
  </div>
);

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, href }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 animate-slide-in-left">
    <span className="text-slate-400 min-w-28 font-medium">{label}</span>
    {href ? (
      <a 
        className="text-white hover:text-brand-400 underline underline-offset-4 transition-colors duration-300 hover-glow" 
        href={href} 
        target="_blank" 
        rel="noreferrer"
      >
        {value}
      </a>
    ) : (
      <span className="text-white">{value}</span>
    )}
  </div>
);

export const Pill: React.FC<PillProps> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm hover:bg-white/20 hover:border-white/20 transition-all duration-300 hover-lift">
    {children}
  </span>
);

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6 shadow-lg shadow-black/20 floating-card parallax-element hover-lift hover-glow transition-all duration-300 animate-scale-in ${className}`}>
    {children}
  </div>
);

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, fallback }) => {
  const resolvedSrc = src || TuxedoImg;
  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 via-purple-500 to-cyan-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
      <img
        src={resolvedSrc}
        alt={alt}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white/20 hover-lift transition-all duration-300"
        onError={(e) => {
          // If external path fails, swap to bundled image
          if (resolvedSrc !== TuxedoImg) {
            (e.currentTarget as HTMLImageElement).src = TuxedoImg;
          } else {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const fallbackElement = e.currentTarget.nextSibling as HTMLElement;
            if (fallbackElement) fallbackElement.style.display = 'flex';
          }
        }}
      />
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 hidden items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg border-4 border-white/20">
        {fallback}
      </div>
    </div>
  );
};

// New enhanced components
export interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  percentage, 
  color = 'bg-gradient-to-r from-brand-500 to-purple-500',
  animated = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm text-slate-300">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out ${
            animated && isVisible ? 'progress-bar' : ''
          }`}
          style={{ 
            '--progress-width': `${percentage}%`,
            width: animated && isVisible ? `${percentage}%` : '0%'
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = 'text-2xl font-bold text-white'
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export interface TimelineItemProps {
  title: string;
  subtitle?: string;
  period: string;
  description?: string;
  isLast?: boolean;
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ 
  title, 
  subtitle, 
  period, 
  description, 
  isLast = false,
  icon 
}) => {
  return (
    <div className="relative flex items-start space-x-4 animate-slide-in-left">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-12 w-0.5 h-full bg-gradient-to-b from-brand-500 to-transparent"></div>
      )}
      
      {/* Icon */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
        {icon || '●'}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="text-sm text-brand-400 font-medium">{period}</span>
        </div>
        {subtitle && (
          <p className="text-slate-300 text-sm mt-1">{subtitle}</p>
        )}
        {description && (
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
};

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}) => {
  return (
    <div 
      className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover-lift hover-glow transition-all duration-300 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-r from-brand-500 to-purple-500 text-white group-hover:animate-pulse-slow transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
};

export interface StatsCardProps {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  value, 
  label, 
  suffix = '', 
  icon,
  color = 'from-brand-500 to-purple-500'
}) => {
  return (
    <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover-lift transition-all duration-300 animate-fade-in">
      <div className={`mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${color} text-white shadow-lg`}>
        <span className="text-lg mr-1" aria-hidden>{icon}</span>
        <AnimatedCounter end={value} suffix={suffix} className="text-2xl font-extrabold text-white" />
      </div>
      <p className="text-slate-300 text-sm font-medium">{label}</p>
    </div>
  );
};

// Simple marquee for tech stack
export const TechMarquee: React.FC<{ items: string[] }> = ({ items }) => {
  const duplicated = [...items, ...items];
  return (
    <div className="marquee-container marquee-fade border-y border-white/10 bg-white/5">
      <div className="marquee-track">
        {duplicated.map((item, idx) => (
          <span key={idx} className="marquee-pill">{item}</span>
        ))}
      </div>
    </div>
  );
};