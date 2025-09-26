import React from 'react';
import { SectionTitleProps, InfoRowProps, PillProps, CardProps, ProfileImageProps } from '../types';

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
    {subtitle && <p className="text-slate-300 mt-1">{subtitle}</p>}
  </div>
);

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, href }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
    <span className="text-slate-400 min-w-28">{label}</span>
    {href ? (
      <a 
        className="text-white hover:text-brand-400 underline underline-offset-4" 
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
  <span className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/10 px-3 py-1 text-xs md:text-sm">
    {children}
  </span>
);

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6 shadow-lg shadow-black/20 floating-card parallax-element">
    {children}
  </div>
);

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, fallback }) => (
  <div className="relative">
    {src ? (
      <img 
        src={src} 
        alt={alt} 
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white/20"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallbackElement = e.currentTarget.nextSibling as HTMLElement;
          if (fallbackElement) fallbackElement.style.display = 'flex';
        }}
      />
    ) : null}
    <div 
      className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg border-4 border-white/20 ${src ? 'hidden' : 'flex'}`}
    >
      {fallback}
    </div>
  </div>
);
